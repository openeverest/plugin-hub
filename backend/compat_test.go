package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/openeverest/openeverest/v2/contract"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

const (
	providersCRD     = "providers.core.openeverest.io"
	backupClassesCRD = "backupclasses.backup.openeverest.io"
	monitoringCRD    = "monitoringclasses.monitoring.openeverest.io"
	pluginsCRD       = "plugins.extensions.openeverest.io"
)

// crd builds the metadata of a core CRD; empty min and current mean no window.
func crd(name, minimum, current, coreVersion string) *metav1.PartialObjectMetadata {
	obj := &metav1.PartialObjectMetadata{ObjectMeta: metav1.ObjectMeta{Name: name}}
	if minimum != "" || current != "" {
		obj.Annotations = map[string]string{
			contract.MinVersionAnnotation: minimum,
			contract.VersionAnnotation:    current,
		}
	}
	if coreVersion != "" {
		obj.Labels = map[string]string{contract.CoreVersionKey: coreVersion}
	}
	return obj
}

// acknowledging adds the core chart's list of acknowledged extensions to a
// core CRD.
func acknowledging(obj *metav1.PartialObjectMetadata, list string) *metav1.PartialObjectMetadata {
	obj = obj.DeepCopy()
	if obj.Annotations == nil {
		obj.Annotations = map[string]string{}
	}
	obj.Annotations[contract.AcknowledgedExtensionsAnnotation] = list
	return obj
}

func fakeCRDs(objs ...*metav1.PartialObjectMetadata) crdGetter {
	byName := map[string]*metav1.PartialObjectMetadata{}
	for _, o := range objs {
		byName[o.Name] = o
	}
	return func(_ context.Context, name string) (*metav1.PartialObjectMetadata, error) {
		if o, ok := byName[name]; ok {
			return o, nil
		}
		return nil, apierrors.NewNotFound(schema.GroupResource{Group: "apiextensions.k8s.io", Resource: "customresourcedefinitions"}, name)
	}
}

func readFake(t *testing.T, objs ...*metav1.PartialObjectMetadata) coreCRDs {
	t.Helper()
	crds, err := readCoreCRDs(context.Background(), fakeCRDs(objs...), allCoreCRDs())
	require.NoError(t, err)
	return crds
}

func TestReadCoreCRDsFailsOnErrorsOtherThanNotFound(t *testing.T) {
	get := func(context.Context, string) (*metav1.PartialObjectMetadata, error) {
		return nil, apierrors.NewForbidden(schema.GroupResource{Resource: "customresourcedefinitions"}, "x", errors.New("no"))
	}
	_, err := readCoreCRDs(context.Background(), get, allCoreCRDs())
	require.Error(t, err)
	assert.Contains(t, err.Error(), providersCRD)
}

func TestReadCoreCRDsAcknowledgedExtensions(t *testing.T) {
	crds := readFake(t,
		acknowledging(crd(providersCRD, "2.0.0", "2.1.0", "2.1.0"), " psmdb@2.1.0 , pmm@2.1.1"),
		acknowledging(crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.0"), "psmdb@2.1.0,psmdb@2.1.1"),
		crd(pluginsCRD, "2.0.0", "2.1.0", "2.1.0"),
	)
	assert.Equal(t, map[string]string{"psmdb": "2.1.0", "pmm": "2.1.1"}, crds[providersCRD].acknowledged)
	assert.Empty(t, crds[backupClassesCRD].acknowledged, "a list that does not parse acknowledges nothing")
	assert.Empty(t, crds[pluginsCRD].acknowledged)
}

func TestWindowFor(t *testing.T) {
	tests := []struct {
		name     string
		crds     []*metav1.PartialObjectMetadata
		extType  string
		wantOK   bool
		want     clusterWindow
		wantCRDs int
	}{
		{
			name:    "no CRD of the type in the cluster",
			crds:    []*metav1.PartialObjectMetadata{crd(pluginsCRD, "2.0.0", "2.1.0", "")},
			extType: "provider",
		},
		{
			name: "providers intersect the Provider and BackupClass windows",
			crds: []*metav1.PartialObjectMetadata{
				crd(providersCRD, "2.0.0", "2.2.0", "2.2.0"),
				crd(backupClassesCRD, "2.1.0", "2.3.0", "2.3.0"),
			},
			extType: "provider",
			wantOK:  true,
			want: clusterWindow{
				window:      contract.Window{Min: "2.1.0", Current: "2.2.0"},
				declared:    true,
				coreVersion: "2.2.0",
			},
			wantCRDs: 2,
		},
		{
			name: "a missing CRD of the type is skipped",
			crds: []*metav1.PartialObjectMetadata{
				crd(providersCRD, "2.0.0", "2.2.0", ""),
			},
			extType:  "provider",
			wantOK:   true,
			want:     clusterWindow{window: contract.Window{Min: "2.0.0", Current: "2.2.0"}, declared: true},
			wantCRDs: 1,
		},
		{
			name:     "CRDs without a window predate the check",
			crds:     []*metav1.PartialObjectMetadata{crd(monitoringCRD, "", "", "")},
			extType:  "integration",
			wantOK:   true,
			want:     clusterWindow{},
			wantCRDs: 1,
		},
		{
			name: "only some CRDs with a window is an upgrade in progress",
			crds: []*metav1.PartialObjectMetadata{
				crd(providersCRD, "", "", ""),
				crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.0"),
			},
			extType: "provider",
			wantOK:  true,
			want: clusterWindow{
				window:      contract.Window{Min: "2.0.0", Current: "2.1.0"},
				declared:    true,
				partial:     true,
				coreVersion: "2.1.0",
			},
			wantCRDs: 2,
		},
		{
			name: "unknown types read every core CRD",
			crds: []*metav1.PartialObjectMetadata{
				crd(pluginsCRD, "2.0.0", "2.4.0", ""),
				crd(monitoringCRD, "2.1.0", "2.3.0", ""),
			},
			extType:  "gizmo",
			wantOK:   true,
			want:     clusterWindow{window: contract.Window{Min: "2.1.0", Current: "2.3.0"}, declared: true},
			wantCRDs: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, ok := readFake(t, tt.crds...).windowFor(tt.extType)
			require.Equal(t, tt.wantOK, ok)
			assert.Len(t, got.crds, tt.wantCRDs)
			got.crds = nil
			assert.Equal(t, tt.want, got)
		})
	}
}

// providerWindow reads the window a provider is checked against from a
// providers and a backupclasses CRD.
func providerWindow(t *testing.T, providers, backupClasses *metav1.PartialObjectMetadata) clusterWindow {
	t.Helper()
	w, ok := readFake(t, providers, backupClasses).windowFor("provider")
	require.True(t, ok)
	return w
}

// An acknowledgement must hold exactly when core's own rule says so.
func TestAcknowledgementHoldsMatchesContractVectors(t *testing.T) {
	var vectors struct {
		Acknowledge []struct {
			Ack, ContractVersion, CoreVersion string
			Holds                             bool
		} `json:"acknowledge"`
	}
	require.NoError(t, json.Unmarshal(contract.OrderVectors, &vectors))
	require.NotEmpty(t, vectors.Acknowledge)
	for _, v := range vectors.Acknowledge {
		providers := crd(providersCRD, "2.0.0-alpha.1", v.ContractVersion, v.CoreVersion)
		backupClasses := crd(backupClassesCRD, "2.0.0-alpha.1", v.ContractVersion, v.CoreVersion)
		assert.Equal(t, v.Holds, providerWindow(t, providers, backupClasses).acknowledgementHolds(v.Ack), "%+v", v)
		if !contract.Valid(v.Ack) {
			continue
		}
		list := "psmdb@" + v.Ack
		w := providerWindow(t, acknowledging(providers, list), acknowledging(backupClasses, list))
		assert.Equal(t, v.Holds, w.acknowledgedByCore([]string{"psmdb"}), "%+v", v)
	}
}

func TestAcknowledgementHolds(t *testing.T) {
	current := providerWindow(t, crd(providersCRD, "2.0.0", "2.1.0", "2.1.2"), crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.2"))
	tests := []struct {
		name  string
		ack   string
		holds bool
	}{
		{"the release running now", "2.1.2", true},
		{"a patch release that kept the contract", "2.1.0", true},
		{"a release before the contract moved", "2.0.5", false},
		{"a release not installed yet", "2.1.3", false},
		{"an invalid value", "v2.1.2", false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.holds, current.acknowledgementHolds(tt.ack))
		})
	}

	upgrading := providerWindow(t, crd(providersCRD, "2.0.0", "2.1.0", "2.1.2"), crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.1"))
	assert.False(t, upgrading.acknowledgementHolds("2.1.2"), "it must hold on every CRD the extension creates objects of")
	assert.True(t, upgrading.acknowledgementHolds("2.1.1"))

	unlabelled := providerWindow(t, crd(providersCRD, "2.0.0", "2.1.0", ""), crd(backupClassesCRD, "2.0.0", "2.1.0", ""))
	assert.False(t, unlabelled.acknowledgementHolds("2.1.0"))
	assert.False(t, clusterWindow{}.acknowledgementHolds("2.1.0"))
}

func TestAcknowledgedByCore(t *testing.T) {
	both := func(list string) clusterWindow {
		return providerWindow(t,
			acknowledging(crd(providersCRD, "2.0.0", "2.1.0", "2.1.2"), list),
			acknowledging(crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.2"), list))
	}
	tests := []struct {
		name   string
		window clusterWindow
		names  []string
		want   bool
	}{
		{"listed on the release running now", both("psmdb@2.1.2"), []string{"psmdb"}, true},
		{"listed on a patch release that kept the contract", both("other@2.0.0, psmdb@2.1.0"), []string{"psmdb"}, true},
		{"listed before the contract moved", both("psmdb@2.0.0"), []string{"psmdb"}, false},
		{"listed ahead of an upgrade", both("psmdb@2.2.0"), []string{"psmdb"}, false},
		{"another extension", both("pxc@2.1.2"), []string{"psmdb"}, false},
		{"every root object must be listed", both("pmm@2.1.2"), []string{"pmm", "pmm-ha"}, false},
		{"every root object listed", both("pmm@2.1.2,pmm-ha@2.1.2"), []string{"pmm", "pmm-ha"}, true},
		{"no root object", both("psmdb@2.1.2"), nil, false},
		{"a list that does not parse", both("psmdb@2.1.2,@2.1.2"), []string{"psmdb"}, false},
		{
			"listed on one CRD only",
			providerWindow(t,
				acknowledging(crd(providersCRD, "2.0.0", "2.1.0", "2.1.2"), "psmdb@2.1.2"),
				crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.2")),
			[]string{"psmdb"}, false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.want, tt.window.acknowledgedByCore(tt.names))
		})
	}
}

func TestRootObjectNames(t *testing.T) {
	tests := []struct {
		name string
		ext  extensionSummary
		want []string
	}{
		{
			name: "the Provider name, when the index names it",
			ext: extensionSummary{Name: "percona-postgresql", Type: "provider",
				Provider: map[string]any{"providerName": "provider-percona-postgresql"}},
			want: []string{"provider-percona-postgresql"},
		},
		{
			name: "a Provider named like the entry",
			ext:  extensionSummary{Name: "valkey", Type: "provider"},
			want: []string{"valkey"},
		},
		{
			name: "the MonitoringClasses of an integration",
			ext: extensionSummary{Name: "monitoring-pmm", Type: "integration",
				Integration: map[string]any{"area": "monitoring", "monitoring": map[string]any{"classes": []any{"pmm", "", "pmm-ha"}}}},
			want: []string{"pmm", "pmm-ha"},
		},
		{
			name: "an integration that names no MonitoringClass",
			ext:  extensionSummary{Name: "monitoring-pmm", Type: "integration", Integration: map[string]any{"area": "monitoring"}},
			want: []string{"monitoring-pmm"},
		},
		{
			name: "the Plugin",
			ext:  extensionSummary{Name: "plugin-metrics", Type: "plugin"},
			want: []string{"plugin-metrics"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.want, rootObjectNames(tt.ext))
		})
	}
}

func TestClusterWindowCheck(t *testing.T) {
	window := clusterWindow{window: contract.Window{Min: "2.0.0", Current: "2.1.0"}, declared: true}
	tests := []struct {
		name   string
		window clusterWindow
		stamp  string
		status metav1.ConditionStatus
		reason string
	}{
		{"unstamped", window, "", metav1.ConditionUnknown, contract.ReasonUnversioned},
		{"invalid stamp", window, "v2.0.0", metav1.ConditionUnknown, contract.ReasonInvalidVersion},
		{"inside the window", window, "2.1.0", metav1.ConditionTrue, contract.ReasonSupported},
		{"built for a newer core", window, "2.2.0", metav1.ConditionFalse, contract.ReasonCoreTooOld},
		{"built for a core no longer served", window, "1.9.0", metav1.ConditionFalse, contract.ReasonExtensionTooOld},
		{"core predates the check", clusterWindow{}, "2.0.0", metav1.ConditionFalse, contract.ReasonCoreTooOld},
		{"unstamped on a core that predates the check", clusterWindow{}, "", metav1.ConditionUnknown, contract.ReasonUnversioned},
		{
			"upgrade in progress",
			clusterWindow{window: window.window, declared: true, partial: true},
			"2.1.0", metav1.ConditionUnknown, contract.ReasonCoreVersionSkew,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.window.check(tt.stamp)
			assert.Equal(t, tt.status, got.Status)
			assert.Equal(t, tt.reason, got.Reason)
		})
	}
}

// A declared window must decide exactly as core's own check does.
func TestClusterWindowCheckMatchesContractVectors(t *testing.T) {
	var vectors struct {
		Check []struct {
			Ext, Min, Cur, Status, Reason string
		} `json:"check"`
	}
	require.NoError(t, json.Unmarshal(contract.OrderVectors, &vectors))
	require.NotEmpty(t, vectors.Check)
	for _, v := range vectors.Check {
		w := clusterWindow{window: contract.Window{Min: v.Min, Current: v.Cur}, declared: true}
		got := w.check(v.Ext)
		assert.Equal(t, v.Status, string(got.Status), "%+v", v)
		assert.Equal(t, v.Reason, got.Reason, "%+v", v)
	}
}

func TestChannelReleases(t *testing.T) {
	legacy := chartChannel{Ref: "oci://example/chart", Version: "0.6.0"}
	assert.Equal(t, "0.6.0", legacy.head())
	assert.Equal(t, []catalogRelease{{Version: "0.6.0"}}, legacy.releases(),
		"an index without releases[] offers the channel version, unstamped")

	current := chartChannel{
		Ref: "oci://example/chart", Version: "0.7.0", Head: "0.7.0",
		Releases: []catalogRelease{{Version: "0.7.0", ContractVersion: "2.1.0"}, {Version: "0.6.0"}},
	}
	assert.Equal(t, "0.7.0", current.head())
	assert.Equal(t, current.Releases, current.releases())

	assert.Empty(t, chartChannel{}.releases())
}

func chartEntry(name, extType string, channel map[string]any) extensionSummary {
	return extensionSummary{
		Name: name,
		Type: extType,
		Artifacts: map[string]any{"chart": map[string]any{
			"defaultChannel": "stable",
			"channels":       map[string]any{"stable": channel},
		}},
	}
}

func indexRelease(version, stamp string) map[string]any {
	r := map[string]any{"version": version, "digest": "sha256:" + version}
	if stamp != "" {
		r["contractVersion"] = stamp
	}
	return r
}

func testIndex() extensionIndex {
	return extensionIndex{Extensions: []extensionSummary{
		chartEntry("percona-server-mongodb", "provider", map[string]any{
			"ref": "oci://example/psmdb", "version": "0.8.0", "head": "0.8.0",
			"releases": []any{
				indexRelease("0.8.0", "2.2.0"),
				indexRelease("0.7.0", "2.1.0"),
				indexRelease("0.6.0", ""),
			},
		}),
		chartEntry("too-new", "provider", map[string]any{
			"ref": "oci://example/too-new", "version": "1.0.0", "head": "1.0.0",
			"releases": []any{indexRelease("1.0.0", "2.2.0"), indexRelease("0.9.0", "2.1.1")},
		}),
		chartEntry("legacy", "plugin", map[string]any{"ref": "oci://example/legacy", "version": "0.3.0"}),
		chartEntry("monitoring-pmm", "integration", map[string]any{"ref": "oci://example/pmm", "version": "0.1.0"}),
		{Name: "mssql", Type: "provider", Access: "gated"},
		{Name: "no-chart", Type: "provider"},
	}}
}

func TestCompatibilityFor(t *testing.T) {
	crds := readFake(t,
		crd(providersCRD, "2.0.0", "2.1.0", "2.1.0"),
		crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.0"),
		crd(pluginsCRD, "2.0.0", "2.1.0", "2.1.0"),
	)
	got := compatibilityFor(testIndex(), crds)

	assert.Equal(t, "2.1.0", got.CoreVersion)
	assert.ElementsMatch(t,
		[]string{"provider:percona-server-mongodb", "provider:too-new", "plugin:legacy"},
		keys(got.Extensions),
		"gated entries, entries without a chart and types whose CRDs are missing are skipped")

	psmdb := got.Extensions["provider:percona-server-mongodb"]
	assert.Equal(t, "stable", psmdb.Channel)
	assert.Equal(t, "0.8.0", psmdb.Head)
	assert.Equal(t, "0.7.0", psmdb.Recommended, "the newest compatible release, not the head")
	require.Len(t, psmdb.Releases, 3)
	assert.Equal(t, releaseVerdict{
		Version: "0.8.0", ContractVersion: "2.2.0",
		Status: metav1.ConditionFalse, Reason: contract.ReasonCoreTooOld,
		Message: "needs OpenEverest 2.2.0 or later", Needs: "2.2.0",
	}, psmdb.Releases[0])
	assert.Equal(t, metav1.ConditionTrue, psmdb.Releases[1].Status)
	assert.Equal(t, contract.ReasonUnversioned, psmdb.Releases[2].Reason)

	tooNew := got.Extensions["provider:too-new"]
	assert.Empty(t, tooNew.Recommended, "no release works with this cluster")
	assert.Equal(t, "2.1.1", tooNew.Releases[1].Needs)

	legacy := got.Extensions["plugin:legacy"]
	assert.Equal(t, "0.3.0", legacy.Recommended, "unstamped releases are installable")
	assert.Equal(t, []releaseVerdict{{
		Version: "0.3.0", Status: metav1.ConditionUnknown, Reason: contract.ReasonUnversioned,
		Message: contract.Message(contract.Result{Reason: contract.ReasonUnversioned}, "", contract.Window{}),
	}}, legacy.Releases)
}

func TestCompatibilityForCoreThatPredatesTheCheck(t *testing.T) {
	got := compatibilityFor(testIndex(), readFake(t, crd(providersCRD, "", "", ""), crd(pluginsCRD, "", "", "")))
	psmdb := got.Extensions["provider:percona-server-mongodb"]
	assert.Equal(t, "0.6.0", psmdb.Recommended, "only the unstamped release can be installed")
	assert.Equal(t, "needs OpenEverest 2.1.0 or later", psmdb.Releases[1].Message)
	assert.Equal(t, "0.3.0", got.Extensions["plugin:legacy"].Recommended)
}

func TestCompatibilityForExtensionsTheCoreChartAcknowledges(t *testing.T) {
	list := "too-new@2.1.0, legacy@2.1.0"
	crds := readFake(t,
		acknowledging(crd(providersCRD, "2.0.0", "2.1.0", "2.1.0"), list),
		acknowledging(crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.0"), list),
		acknowledging(crd(pluginsCRD, "2.0.0", "2.1.0", "2.1.0"), list),
	)
	got := compatibilityFor(testIndex(), crds)

	tooNew := got.Extensions["provider:too-new"]
	assert.Equal(t, "1.0.0", tooNew.Recommended, "an acknowledged release is installable")
	assert.Equal(t, releaseVerdict{
		Version: "1.0.0", ContractVersion: "2.2.0",
		Status: metav1.ConditionFalse, Reason: contract.ReasonCoreTooOldAcknowledged,
		Message: "needs OpenEverest 2.2.0 or later; allowed anyway because the incompatibility was acknowledged",
		Needs:   "2.2.0",
	}, tooNew.Releases[0])

	psmdb := got.Extensions["provider:percona-server-mongodb"]
	assert.Equal(t, "0.7.0", psmdb.Recommended, "extensions the list does not name are unaffected")
	assert.Equal(t, contract.ReasonCoreTooOld, psmdb.Releases[0].Reason)

	// OpenEverest 2.2.0 moved the contract, which expires the acknowledgement.
	expired := compatibilityFor(testIndex(), readFake(t,
		acknowledging(crd(providersCRD, "2.2.0", "2.2.0", "2.2.0"), "too-new@2.1.0"),
		acknowledging(crd(backupClassesCRD, "2.2.0", "2.2.0", "2.2.0"), "too-new@2.1.0"),
	)).Extensions["provider:too-new"]
	assert.Equal(t, contract.ReasonSupported, expired.Releases[0].Reason)
	assert.Equal(t, contract.ReasonExtensionTooOld, expired.Releases[1].Reason)
}

func keys[V any](m map[string]V) []string {
	out := make([]string, 0, len(m))
	for k := range m {
		out = append(out, k)
	}
	return out
}

func TestCompatibilityHandler(t *testing.T) {
	index, err := json.Marshal(testIndex())
	require.NoError(t, err)
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write(index)
	}))
	defer upstream.Close()
	cache := newCatalogCache(upstream.URL, time.Minute)

	serve := func(get func() (crdGetter, error)) compatibilityResponse {
		rec := httptest.NewRecorder()
		makeCompatibilityHandler(cache, get)(rec, httptest.NewRequest(http.MethodGet, "/api/compatibility", nil))
		require.Equal(t, http.StatusOK, rec.Code)
		var body compatibilityResponse
		require.NoError(t, json.Unmarshal(rec.Body.Bytes(), &body))
		return body
	}

	ok := serve(func() (crdGetter, error) {
		return fakeCRDs(crd(providersCRD, "2.0.0", "2.1.0", "2.1.0")), nil
	})
	assert.Empty(t, ok.Error)
	assert.Equal(t, "0.7.0", ok.Extensions["provider:percona-server-mongodb"].Recommended)

	forbidden := serve(func() (crdGetter, error) {
		return func(context.Context, string) (*metav1.PartialObjectMetadata, error) {
			return nil, apierrors.NewForbidden(schema.GroupResource{Resource: "customresourcedefinitions"}, "x", errors.New("no"))
		}, nil
	})
	assert.Contains(t, forbidden.Error, "could not read the OpenEverest version")
	assert.Empty(t, forbidden.Extensions)
}

func psmdbTarget(t *testing.T) installTarget {
	t.Helper()
	target, err := resolveTarget(testIndex(), "provider", "percona-server-mongodb")
	require.NoError(t, err)
	return target
}

func checkFor(t *testing.T, target installTarget, w clusterWindow) compatCheck {
	t.Helper()
	acknowledged := w.acknowledgedByCore(target.RootObjectNames)
	return compatCheck{window: w, checked: true, acknowledged: acknowledged, verdicts: verdicts(target.Releases, w, acknowledged)}
}

func TestPickVersion(t *testing.T) {
	target := psmdbTarget(t)
	window := clusterWindow{window: contract.Window{Min: "2.0.0", Current: "2.1.0"}, declared: true}
	newCore := clusterWindow{window: contract.Window{Min: "2.0.0", Current: "2.2.0"}, declared: true}
	futureOnly := clusterWindow{window: contract.Window{Min: "3.0.0", Current: "3.0.0"}, declared: true}

	tests := []struct {
		name      string
		requested string
		check     compatCheck
		want      string
		wantErr   bool
	}{
		{name: "newest compatible release", check: checkFor(t, target, window), want: "0.7.0"},
		{name: "head when it is compatible", check: checkFor(t, target, newCore), want: "0.8.0"},
		{name: "unstamped releases are installable", check: checkFor(t, target, futureOnly), want: "0.6.0"},
		{name: "head when the cluster cannot be checked", check: compatCheck{}, want: "0.8.0"},
		{name: "an explicit catalog release", requested: "0.8.0", check: checkFor(t, target, window), want: "0.8.0"},
		{name: "an older catalog release", requested: "0.6.0", check: checkFor(t, target, window), want: "0.6.0"},
		{name: "a version outside the catalog", requested: "9.9.9", check: checkFor(t, target, window), wantErr: true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := pickVersion(target, tt.requested, tt.check)
			if tt.wantErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)
			assert.Equal(t, tt.want, got)
		})
	}

	noneInstallable := installTarget{Name: "x", Version: "1.0.0", Releases: []catalogRelease{{Version: "1.0.0", ContractVersion: "9.0.0"}}}
	got, err := pickVersion(noneInstallable, "", checkFor(t, noneInstallable, window))
	require.NoError(t, err)
	assert.Equal(t, "1.0.0", got, "the head, which the chart check then refuses unless acknowledged")

	list := "percona-server-mongodb@2.1.0"
	acknowledged := providerWindow(t,
		acknowledging(crd(providersCRD, "2.0.0", "2.1.0", "2.1.0"), list),
		acknowledging(crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.0"), list))
	got, err = pickVersion(target, "", checkFor(t, target, acknowledged))
	require.NoError(t, err)
	assert.Equal(t, "0.8.0", got, "the head, which the core chart acknowledges")
}

func stamped(stamp string) map[string]string {
	return map[string]string{contract.VersionAnnotation: stamp, "other": "kept"}
}

func TestAdmitChart(t *testing.T) {
	target := psmdbTarget(t)
	window := clusterWindow{window: contract.Window{Min: "2.0.0", Current: "2.1.0"}, declared: true, coreVersion: "2.1.0"}
	check := checkFor(t, target, window)

	t.Run("compatible", func(t *testing.T) {
		vals, err := admitChart(target, "0.7.0", stamped("2.1.0"), check, false)
		require.NoError(t, err)
		assert.Nil(t, vals)
	})

	t.Run("unstamped is allowed", func(t *testing.T) {
		vals, err := admitChart(target, "0.6.0", nil, check, false)
		require.NoError(t, err)
		assert.Nil(t, vals)
	})

	t.Run("unchecked cluster is allowed", func(t *testing.T) {
		vals, err := admitChart(target, "0.8.0", stamped("9.0.0"), compatCheck{}, false)
		require.NoError(t, err)
		assert.Nil(t, vals)
	})

	t.Run("the chart's stamp wins over the catalog", func(t *testing.T) {
		_, err := admitChart(target, "0.6.0", stamped("2.2.0"), check, false)
		var incompatible errIncompatible
		require.ErrorAs(t, err, &incompatible)
		assert.Equal(t, "0.7.0", incompatible.recommended)
	})

	t.Run("core too old is refused with the version needed and the newest compatible", func(t *testing.T) {
		_, err := admitChart(target, "0.8.0", stamped("2.2.0"), check, false)
		var incompatible errIncompatible
		require.ErrorAs(t, err, &incompatible)
		assert.Equal(t, contract.ReasonCoreTooOld, incompatible.reason)
		assert.Equal(t, "2.2.0", incompatible.needs)
		assert.Equal(t, "0.7.0", incompatible.recommended)
		assert.Equal(t,
			"percona-server-mongodb 0.8.0 needs OpenEverest 2.2.0 or later; this cluster runs OpenEverest 2.1.0. "+
				"The newest release that works with it is 0.7.0.",
			err.Error())
		assert.Equal(t, map[string]any{
			"error": err.Error(), "incompatible": true, "reason": contract.ReasonCoreTooOld,
			"needs": "2.2.0", "recommended": "0.7.0",
		}, incompatible.body())
	})

	t.Run("extension too old", func(t *testing.T) {
		_, err := admitChart(target, "0.7.0", stamped("1.0.0"), check, false)
		var incompatible errIncompatible
		require.ErrorAs(t, err, &incompatible)
		assert.Equal(t, contract.ReasonExtensionTooOld, incompatible.reason)
		assert.Empty(t, incompatible.needs)
		assert.Contains(t, err.Error(), "built for an older OpenEverest")
	})

	t.Run("no compatible release in the catalog", func(t *testing.T) {
		only := installTarget{Name: "x", Version: "1.0.0", Releases: []catalogRelease{{Version: "1.0.0", ContractVersion: "1.0.0"}}}
		_, err := admitChart(only, "1.0.0", stamped("1.0.0"), checkFor(t, only, window), false)
		var incompatible errIncompatible
		require.ErrorAs(t, err, &incompatible)
		assert.Empty(t, incompatible.recommended)
		assert.Equal(t,
			"x 1.0.0 was built for an older OpenEverest; update it to a release built for OpenEverest 2.0.0 or later; "+
				"this cluster runs OpenEverest 2.1.0. No release of x supports OpenEverest 2.1.0 yet.",
			err.Error())

		_, err = admitChart(only, "1.0.0", stamped("1.0.0"), checkFor(t, only, clusterWindow{window: window.window, declared: true}), false)
		assert.ErrorContains(t, err, "No release of x supports this OpenEverest yet.")
	})

	t.Run("acknowledged by the core chart", func(t *testing.T) {
		list := "percona-server-mongodb@2.1.0"
		acknowledged := providerWindow(t,
			acknowledging(crd(providersCRD, "2.0.0", "2.1.0", "2.1.0"), list),
			acknowledging(crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.0"), list))
		vals, err := admitChart(target, "0.8.0", stamped("2.2.0"), checkFor(t, target, acknowledged), false)
		require.NoError(t, err)
		assert.Nil(t, vals, "the chart reads the same list, so nothing is recorded")
	})

	t.Run("acknowledged sets the chart value to the core release", func(t *testing.T) {
		patch := providerWindow(t, crd(providersCRD, "2.0.0", "2.1.0", "2.1.3"), crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.3"))
		vals, err := admitChart(target, "0.8.0", stamped("2.2.0"), checkFor(t, target, patch), true)
		require.NoError(t, err)
		assert.Equal(t, map[string]any{
			"compatibility": map[string]any{"acknowledge": map[string]any{"coreVersion": "2.1.3"}},
		}, vals)
		assert.True(t, patch.acknowledgementHolds("2.1.3"))
	})

	t.Run("acknowledged on a core that predates the check", func(t *testing.T) {
		vals, err := admitChart(target, "0.8.0", stamped("2.2.0"), checkFor(t, target, clusterWindow{}), true)
		require.NoError(t, err)
		assert.Nil(t, vals, "nothing checks it, so nothing is recorded")
	})

	t.Run("acknowledged on a core that labels no release", func(t *testing.T) {
		unlabelled := providerWindow(t, crd(providersCRD, "2.0.0", "2.1.0", ""), crd(backupClassesCRD, "2.0.0", "2.1.0", ""))
		_, err := admitChart(target, "0.8.0", stamped("2.2.0"), checkFor(t, target, unlabelled), true)
		var conflict errConflict
		require.ErrorAs(t, err, &conflict)
		assert.Contains(t, err.Error(), "cannot be installed anyway")
	})

	t.Run("acknowledged while the CRDs disagree on the release", func(t *testing.T) {
		upgrading := providerWindow(t, crd(providersCRD, "2.0.0", "2.1.0", "2.1.3"), crd(backupClassesCRD, "2.0.0", "2.1.0", "2.1.2"))
		_, err := admitChart(target, "0.8.0", stamped("2.2.0"), checkFor(t, target, upgrading), true)
		var conflict errConflict
		require.ErrorAs(t, err, &conflict)
	})
}

func TestCRDReaderRoleListsEveryCoreCRD(t *testing.T) {
	raw, err := os.ReadFile("../charts/plugin-hub/templates/installer-rbac.yaml")
	require.NoError(t, err)
	for _, name := range allCoreCRDs() {
		assert.Contains(t, string(raw), "- "+name, "the crd-reader ClusterRole must allow reading %s", name)
	}
}
