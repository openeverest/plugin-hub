package main

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart"
	"helm.sh/helm/v3/pkg/chartutil"
	kubefake "helm.sh/helm/v3/pkg/kube/fake"
	"helm.sh/helm/v3/pkg/release"
	"helm.sh/helm/v3/pkg/storage"
	"helm.sh/helm/v3/pkg/storage/driver"
)

func TestEvaluatePermissions(t *testing.T) {
	tests := []struct {
		name        string
		rbacEnabled bool
		perms       [][]string
		want        bool
	}{
		{name: "rbac disabled allows any authenticated user", rbacEnabled: false, want: true},
		{
			name:        "admin role wildcard action",
			rbacEnabled: true,
			perms:       [][]string{{"admin", "plugins", "*", "*/*"}},
			want:        true,
		},
		{
			name:        "explicit create on all plugins in this cluster",
			rbacEnabled: true,
			perms:       [][]string{{"alice", "plugins", "create", "main/*"}},
			want:        true,
		},
		{
			name:        "create scoped to one named plugin is not enough",
			rbacEnabled: true,
			perms:       [][]string{{"alice", "plugins", "create", "main/plugin-metrics"}},
			want:        false,
		},
		{
			name:        "create on another cluster is not enough",
			rbacEnabled: true,
			perms:       [][]string{{"alice", "plugins", "create", "other/*"}},
			want:        false,
		},
		{
			name:        "read-only plugins access",
			rbacEnabled: true,
			perms:       [][]string{{"bob", "plugins", "read", "*/*"}},
			want:        false,
		},
		{
			name:        "unrelated resource wildcard",
			rbacEnabled: true,
			perms:       [][]string{{"bob", "instances", "*", "*/*/*"}},
			want:        false,
		},
		{name: "no permissions", rbacEnabled: true, want: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := evaluatePermissions(tt.rbacEnabled, tt.perms, "main")
			if got.canAdmin != tt.want {
				t.Fatalf("canAdmin = %v, want %v", got.canAdmin, tt.want)
			}
		})
	}
}

func TestResolveTarget(t *testing.T) {
	index := extensionIndex{Extensions: []extensionSummary{
		{
			Name: "plugin-metrics",
			Type: "plugin",
			Artifacts: map[string]any{"chart": map[string]any{
				"defaultChannel": "stable",
				"channels": map[string]any{"stable": map[string]any{
					"ref": "oci://ghcr.io/openeverest/charts/plugin-metrics", "version": "0.2.2",
				}},
			}},
			Install: map[string]any{"helm": map[string]any{"releaseName": "metrics", "namespace": "everest-system"}},
		},
		{Name: "mssql", Type: "provider", Access: "gated"},
	}}

	got, err := resolveTarget(index, "plugin", "plugin-metrics")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	want := installTarget{
		Type: "plugin", Name: "plugin-metrics",
		ChartRef: "oci://ghcr.io/openeverest/charts/plugin-metrics", Version: "0.2.2",
		Releases: []catalogRelease{{Version: "0.2.2"}},
		Release:  "metrics", Namespace: "everest-system",
		RootObjectNames: []string{"plugin-metrics"},
	}
	assert.Equal(t, want, got)

	if _, err := resolveTarget(index, "provider", "plugin-metrics"); err == nil {
		t.Fatal("type mismatch must not resolve")
	}
	if _, err := resolveTarget(index, "provider", "mssql"); err == nil {
		t.Fatal("gated entry must not resolve")
	}
}

func TestTargetProviderName(t *testing.T) {
	chartArtifacts := map[string]any{"chart": map[string]any{
		"defaultChannel": "stable",
		"channels":       map[string]any{"stable": map[string]any{"ref": "oci://example/chart", "version": "1.0.0"}},
	}}
	tests := []struct {
		name string
		ext  extensionSummary
		want string
	}{
		{
			name: "provider uses providerName when set",
			ext: extensionSummary{Name: "percona-postgresql", Type: "provider", Artifacts: chartArtifacts,
				Provider: map[string]any{"providerName": "provider-percona-postgresql"}},
			want: "provider-percona-postgresql",
		},
		{
			name: "provider falls back to catalog name",
			ext:  extensionSummary{Name: "valkey", Type: "provider", Artifacts: chartArtifacts},
			want: "valkey",
		},
		{
			name: "plugins have no provider name",
			ext:  extensionSummary{Name: "plugin-metrics", Type: "plugin", Artifacts: chartArtifacts},
			want: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := targetFromEntry(tt.ext)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got.ProviderName != tt.want {
				t.Fatalf("ProviderName = %q, want %q", got.ProviderName, tt.want)
			}
		})
	}
}

func TestResolveTargetReadsCatalogReleases(t *testing.T) {
	index := extensionIndex{Extensions: []extensionSummary{chartEntry("psmdb", "provider", map[string]any{
		"ref": "oci://example/psmdb", "version": "0.8.0", "head": "0.8.0",
		"releases": []any{indexRelease("0.8.0", "2.2.0"), indexRelease("0.7.0", "")},
	})}}
	got, err := resolveTarget(index, "provider", "psmdb")
	require.NoError(t, err)
	assert.Equal(t, "0.8.0", got.Version)
	assert.Equal(t, []catalogRelease{
		{Version: "0.8.0", Digest: "sha256:0.8.0", ContractVersion: "2.2.0"},
		{Version: "0.7.0", Digest: "sha256:0.7.0"},
	}, got.Releases)
}

func revision(version int, status release.Status) *release.Release {
	return &release.Release{
		Name: "demo", Namespace: "everest-system", Version: version,
		Info:  &release.Info{Status: status},
		Chart: demoChart("0.6.0"),
	}
}

func TestNeverDeployed(t *testing.T) {
	tests := []struct {
		name string
		hist []*release.Release
		want bool
	}{
		{"failed first install", []*release.Release{revision(1, release.StatusFailed)}, true},
		{"failed retry of a failed install", []*release.Release{
			revision(1, release.StatusFailed), revision(2, release.StatusFailed),
		}, true},
		{"deployed", []*release.Release{revision(1, release.StatusDeployed)}, false},
		{"failed upgrade of a deployed release", []*release.Release{
			revision(1, release.StatusSuperseded), revision(2, release.StatusFailed),
		}, false},
		{"install in progress", []*release.Release{revision(1, release.StatusPendingInstall)}, false},
		{"no history", nil, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.want, neverDeployed(tt.hist))
		})
	}
}

func demoChart(version string) *chart.Chart {
	return &chart.Chart{
		Metadata: &chart.Metadata{APIVersion: chart.APIVersionV2, Name: "demo", Version: version},
		Templates: []*chart.File{{
			Name: "templates/configmap.yaml",
			Data: []byte("apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: demo\n"),
		}},
	}
}

func memoryConfig(t *testing.T) *action.Configuration {
	t.Helper()
	return &action.Configuration{
		Releases:     storage.Init(driver.NewMemory()),
		KubeClient:   &kubefake.PrintingKubeClient{Out: io.Discard},
		Capabilities: chartutil.DefaultCapabilities,
		Log:          func(string, ...any) {},
	}
}

func TestFailedFirstInstallCanBeRetried(t *testing.T) {
	cfg := memoryConfig(t)
	target := installTarget{Name: "demo", Release: "demo", Namespace: "everest-system"}

	replace, err := replaceableRelease(cfg, target)
	require.NoError(t, err)
	assert.False(t, replace, "nothing to replace before the first install")

	require.NoError(t, cfg.Releases.Create(revision(1, release.StatusFailed)))
	_, err = newInstallAction(cfg, target, false).RunWithContext(context.Background(), demoChart("0.7.0"), nil)
	require.Error(t, err, "Helm alone refuses to install over a failed release")

	replace, err = replaceableRelease(cfg, target)
	require.NoError(t, err)
	require.True(t, replace)
	rel, err := newInstallAction(cfg, target, replace).RunWithContext(context.Background(), demoChart("0.7.0"), nil)
	require.NoError(t, err)
	assert.Equal(t, 2, rel.Version)
	assert.Equal(t, release.StatusDeployed, rel.Info.Status)
	assert.False(t, failedFirstInstall(cfg, revision(1, release.StatusFailed)),
		"once a revision is deployed the release is no longer a failed install")

	_, err = replaceableRelease(cfg, target)
	var conflict errConflict
	require.ErrorAs(t, err, &conflict, "a deployed release is not replaced")
}

func TestFailedFirstInstallIgnoresOtherNamespaces(t *testing.T) {
	mem := driver.NewMemory()
	cfg := memoryConfig(t)
	cfg.Releases = storage.Init(mem)
	require.NoError(t, cfg.Releases.Create(revision(1, release.StatusFailed)))
	other := revision(1, release.StatusDeployed)
	other.Namespace = "elsewhere"
	require.NoError(t, cfg.Releases.Create(other))
	// Like the release list, which spans every namespace.
	mem.SetNamespace("")

	assert.True(t, failedFirstInstall(cfg, revision(1, release.StatusFailed)))
}

func TestAcknowledgeValues(t *testing.T) {
	assert.Equal(t, map[string]any{
		"compatibility": map[string]any{"acknowledge": map[string]any{"coreVersion": "2.1.0"}},
	}, acknowledgeValues("2.1.0"))
}

func TestInstallerActionHandler(t *testing.T) {
	core := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write([]byte(`{"enabled": false, "permissions": []}`))
	}))
	defer core.Close()
	t.Setenv("EVEREST_API_URL", core.URL)
	index, err := json.Marshal(testIndex())
	require.NoError(t, err)
	hub := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write(index)
	}))
	defer hub.Close()
	cache := newCatalogCache(hub.URL, time.Minute)

	call := func(opErr error) (*httptest.ResponseRecorder, actionRequest) {
		var got actionRequest
		op := func(_ context.Context, _ installTarget, req actionRequest) (releaseInfo, error) {
			got = req
			return releaseInfo{Release: "psmdb", Status: "deployed"}, opErr
		}
		body := `{"type": "provider", "name": "percona-server-mongodb", "version": "0.8.0", "acknowledgeIncompatible": true}`
		req := httptest.NewRequest(http.MethodPost, "/api/install", strings.NewReader(body))
		req.Header.Set("Authorization", "Bearer token")
		rec := httptest.NewRecorder()
		makeInstallerActionHandler(&installer{enabled: true}, cache, "install", op)(rec, req)
		return rec, got
	}

	rec, req := call(nil)
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, "0.8.0", req.Version)
	assert.True(t, req.AcknowledgeIncompatible)

	rec, _ = call(errIncompatible{msg: "needs OpenEverest 2.2.0 or later", reason: "CoreTooOld", needs: "2.2.0", recommended: "0.7.0"})
	assert.Equal(t, http.StatusConflict, rec.Code)
	assert.JSONEq(t,
		`{"error": "needs OpenEverest 2.2.0 or later", "incompatible": true, "reason": "CoreTooOld", "needs": "2.2.0", "recommended": "0.7.0"}`,
		rec.Body.String())

	rec, _ = call(errBadRequest{"9.9.9 is not a release"})
	assert.Equal(t, http.StatusBadRequest, rec.Code)
}

func hubEntry() extensionSummary {
	ext := chartEntry("plugin-hub", "plugin", map[string]any{
		"ref": "oci://ghcr.io/openeverest/charts/plugin-hub", "version": "0.1.3",
	})
	ext.Install = map[string]any{"helm": map[string]any{"releaseName": "plugin-hub", "namespace": "everest-system"}}
	return ext
}

func deployedRelease(name, namespace, chartName, version string) *release.Release {
	ch := demoChart(version)
	ch.Metadata.Name = chartName
	ch.Metadata.AppVersion = "app-" + version
	return &release.Release{Name: name, Namespace: namespace, Version: 1,
		Info: &release.Info{Status: release.StatusDeployed}, Chart: ch}
}

// As a subchart of the core chart, plugin-hub runs in the core release, so the
// catalog's release name does not match; it must still recognise itself.
func TestInstallerRecognisesItselfAsSubchart(t *testing.T) {
	inst := &installer{selfRelease: "everest", selfNamespace: "everest-system",
		selfChartVersion: "0.1.2", selfAppVersion: "0.1.0"}
	index := extensionIndex{Extensions: append(testIndex().Extensions, hubEntry())}
	rels := []*release.Release{deployedRelease("everest", "everest-system", "everest", "2.0.0")}

	assert.Equal(t, "plugin:plugin-hub", inst.selfKey(index))
	assert.Equal(t, map[string]releaseInfo{"plugin:plugin-hub": {
		Release: "everest", Namespace: "everest-system", Status: "deployed",
		ChartVersion: "0.1.2", AppVersion: "0.1.0",
	}}, inst.matchReleases(memoryConfig(t), rels, index))

	// Without the chart's versions, the core chart's must not be reported.
	inst.selfChartVersion, inst.selfAppVersion = "", ""
	got := inst.matchReleases(memoryConfig(t), rels, index)["plugin:plugin-hub"]
	assert.Empty(t, got.ChartVersion)
	assert.Empty(t, got.AppVersion)
}

func TestInstallerRecognisesItselfStandalone(t *testing.T) {
	inst := &installer{selfRelease: "hub", selfNamespace: "tools"}
	index := extensionIndex{Extensions: []extensionSummary{hubEntry()}}
	rels := []*release.Release{
		deployedRelease("hub", "tools", "plugin-hub", "0.1.1"),
		// Not this pod's release, even though it matches the catalog.
		deployedRelease("plugin-hub", "everest-system", "plugin-hub", "0.0.9"),
	}

	assert.Equal(t, map[string]releaseInfo{"plugin:plugin-hub": {
		Release: "hub", Namespace: "tools", Status: "deployed",
		ChartVersion: "0.1.1", AppVersion: "app-0.1.1",
	}}, inst.matchReleases(memoryConfig(t), rels, index))
}

func TestInstallerRefusesToModifyItselfAsSubchart(t *testing.T) {
	core := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write([]byte(`{"enabled": false, "permissions": []}`))
	}))
	defer core.Close()
	t.Setenv("EVEREST_API_URL", core.URL)
	index, err := json.Marshal(extensionIndex{Extensions: []extensionSummary{hubEntry()}})
	require.NoError(t, err)
	hub := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write(index)
	}))
	defer hub.Close()
	inst := &installer{enabled: true, selfRelease: "everest", selfNamespace: "everest-system"}
	op := func(context.Context, installTarget, actionRequest) (releaseInfo, error) {
		t.Fatal("plugin-hub must not run Helm on itself")
		return releaseInfo{}, nil
	}

	for _, verb := range []string{"install", "uninstall"} {
		req := httptest.NewRequest(http.MethodPost, "/api/"+verb, strings.NewReader(`{"type": "plugin", "name": "plugin-hub"}`))
		req.Header.Set("Authorization", "Bearer token")
		rec := httptest.NewRecorder()
		makeInstallerActionHandler(inst, newCatalogCache(hub.URL, time.Minute), verb, op)(rec, req)
		assert.Equal(t, http.StatusBadRequest, rec.Code, verb)
		assert.Contains(t, rec.Body.String(), "cannot "+verb+" itself", verb)
	}
}

func TestChartName(t *testing.T) {
	for ref, want := range map[string]string{
		"oci://ghcr.io/openeverest/charts/plugin-hub":            "plugin-hub",
		"oci://ghcr.io/openeverest/charts/plugin-hub:0.1.2":      "plugin-hub",
		"oci://ghcr.io/openeverest/charts/plugin-hub@sha256:abc": "plugin-hub",
		"oci://ghcr.io/openeverest/charts/plugin-hub-extra":      "plugin-hub-extra",
		"": "",
	} {
		assert.Equal(t, want, chartName(ref), ref)
	}
}
