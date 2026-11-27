// Compatibility between catalog extensions and the OpenEverest in the cluster.
//
// OpenEverest publishes on its CRDs the range of extension builds it accepts:
// the annotations openeverest.io/min-contract-version and
// openeverest.io/contract-version. Every extension build is stamped, in its
// Chart.yaml annotations, with the contract version of the OpenEverest it was
// built against, and the hub index copies that stamp into each release it
// lists. A release works with the cluster when the window contains its stamp.
//
// The check runs twice: on the catalog, to offer the newest release that
// works rather than the newest one, and on the chart actually pulled before
// Helm runs, since that Chart.yaml is the authoritative stamp. Unstamped
// releases (every chart published before stamping existed) are allowed with a
// notice. Only a failed check blocks, and an admin can still install anyway,
// which is recorded in the Helm values so the chart's own render-time check
// and core's admission accept it. When the CRDs cannot be read, the catalog
// offers channel heads as it did before checks existed, while install and
// upgrade fail rather than run unchecked.
//
// An acknowledgement names the OpenEverest release it was given on, and holds
// while that release is within what the core CRDs publish: no older than their
// contract version, no newer than their release (contract.AcknowledgementHolds).
// It thus survives the patch releases that keep the contract and expires with
// the first one that changes it. The core chart can also acknowledge
// extensions itself, by root object name, in a list on its CRDs; every reader
// honours that list, so the hub does too: a release it covers is allowed with
// a notice rather than refused. The core chart's policy for incompatible
// plugins is not an acknowledgement: under "continue" core admits a Plugin
// built for an older OpenEverest but does not load it, so the hub still does
// not offer one.
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"slices"
	"strings"
	"sync"

	"github.com/openeverest/openeverest/v2/contract"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/metadata"
)

// coreCRDsByType lists, per extension type, the core CRDs whose objects that
// type of extension creates. Each of them has to accept the extension, so the
// window is their intersection. Keep in sync with the crd-reader ClusterRole
// in charts/plugin-hub/templates/installer-rbac.yaml (a test checks it).
var coreCRDsByType = map[string][]string{
	"provider":    {"providers.core.openeverest.io", "backupclasses.backup.openeverest.io"},
	"integration": {"monitoringclasses.monitoring.openeverest.io"},
	"plugin":      {"plugins.extensions.openeverest.io"},
}

// coreCRDsFor returns the CRDs to read for an extension type. Types this build
// does not know read all of them, which never claims more than core serves.
func coreCRDsFor(extType string) []string {
	if names, ok := coreCRDsByType[extType]; ok {
		return names
	}
	return allCoreCRDs()
}

func allCoreCRDs() []string {
	seen := map[string]bool{}
	var out []string
	for _, t := range []string{"provider", "integration", "plugin"} {
		for _, name := range coreCRDsByType[t] {
			if !seen[name] {
				seen[name] = true
				out = append(out, name)
			}
		}
	}
	return out
}

var crdGVR = schema.GroupVersionResource{Group: "apiextensions.k8s.io", Version: "v1", Resource: "customresourcedefinitions"}

// crdGetter reads the metadata of a CustomResourceDefinition by name.
type crdGetter func(ctx context.Context, name string) (*metav1.PartialObjectMetadata, error)

// clusterCRDGetter reads CRD metadata only: the schemas are large and the
// window lives in annotations.
var clusterCRDGetter = sync.OnceValues(func() (crdGetter, error) {
	restCfg, err := genericclioptions.NewConfigFlags(false).ToRESTConfig()
	if err != nil {
		return nil, fmt.Errorf("kubernetes config: %w", err)
	}
	client, err := metadata.NewForConfig(restCfg)
	if err != nil {
		return nil, fmt.Errorf("kubernetes metadata client: %w", err)
	}
	return func(ctx context.Context, name string) (*metav1.PartialObjectMetadata, error) {
		return client.Resource(crdGVR).Get(ctx, name, metav1.GetOptions{})
	}, nil
})

// coreCRD is what one core CRD in the cluster declares.
type coreCRD struct {
	window   contract.Window
	declared bool
	version  string
	// acknowledged is the core chart's list of acknowledged extensions: the
	// core release each is acknowledged on, by root object name.
	acknowledged map[string]string
}

// coreCRDs maps the name of every core CRD found in the cluster to what it
// declares.
type coreCRDs map[string]coreCRD

func readCoreCRDs(ctx context.Context, get crdGetter, names []string) (coreCRDs, error) {
	out := coreCRDs{}
	for _, name := range names {
		crd, err := get(ctx, name)
		if apierrors.IsNotFound(err) {
			continue
		}
		if err != nil {
			return nil, fmt.Errorf("read CustomResourceDefinition %s: %w", name, err)
		}
		annotations := crd.GetAnnotations()
		w, declared := contract.WindowFromAnnotations(annotations)
		// A list that does not parse acknowledges nothing, as it does for
		// core's admission: guessing what the admin meant could install an
		// extension nobody acknowledged.
		acknowledged, err := contract.ParseAcknowledgedExtensions(annotations[contract.AcknowledgedExtensionsAnnotation])
		if err != nil {
			log.Printf("compatibility: ignoring %s on %s: %v", contract.AcknowledgedExtensionsAnnotation, name, err)
		}
		out[name] = coreCRD{
			window:       w,
			declared:     declared,
			version:      crd.GetLabels()[contract.CoreVersionKey],
			acknowledged: acknowledged,
		}
	}
	return out, nil
}

// clusterWindow is the window the OpenEverest in the cluster serves to one
// type of extension.
type clusterWindow struct {
	window contract.Window
	// declared is false when none of the CRDs carries a window: the
	// OpenEverest in the cluster predates the check.
	declared bool
	// partial is true when only some of the CRDs carry one, as happens while
	// OpenEverest is being upgraded from a release that predates the check.
	partial bool
	// coreVersion is the OpenEverest release, from the CRD label.
	coreVersion string
	// crds are the CRDs the window was read from. Acknowledgements must hold
	// on each of them, since core admits every object against the CRD of its
	// own kind only.
	crds []coreCRD
}

// windowFor intersects the windows of the CRDs an extension type creates
// objects of. ok is false when the cluster has none of them, so nothing can be
// checked.
func (c coreCRDs) windowFor(extType string) (clusterWindow, bool) {
	var (
		out        clusterWindow
		windows    []contract.Window
		undeclared int
	)
	for _, name := range coreCRDsFor(extType) {
		crd, ok := c[name]
		if !ok {
			continue
		}
		if out.coreVersion == "" {
			out.coreVersion = crd.version
		}
		out.crds = append(out.crds, crd)
		if !crd.declared {
			undeclared++
			continue
		}
		windows = append(windows, crd.window)
	}
	if len(windows) == 0 && undeclared == 0 {
		return clusterWindow{}, false
	}
	out.declared = len(windows) > 0
	out.partial = out.declared && undeclared > 0
	out.window = contract.Intersect(windows...)
	return out, true
}

// check runs the compatibility check of a stamp against the window.
func (w clusterWindow) check(stamp string) contract.Result {
	switch {
	case stamp == "":
		return contract.Result{Status: metav1.ConditionUnknown, Reason: contract.ReasonUnversioned}
	case !contract.Valid(stamp):
		return contract.Result{Status: metav1.ConditionUnknown, Reason: contract.ReasonInvalidVersion}
	case !w.declared:
		// An OpenEverest without a window predates every stamp: the stamp
		// is the contract version of a release that publishes one.
		return contract.Result{Status: metav1.ConditionFalse, Reason: contract.ReasonCoreTooOld}
	case w.partial:
		return contract.Result{Status: metav1.ConditionUnknown, Reason: contract.ReasonCoreVersionSkew}
	default:
		return w.window.Check(stamp)
	}
}

// acknowledgementHolds reports whether an acknowledgement naming the core
// release ack holds on every CRD of the window.
func (w clusterWindow) acknowledgementHolds(ack string) bool {
	if len(w.crds) == 0 {
		return false
	}
	for _, crd := range w.crds {
		if !contract.AcknowledgementHolds(ack, crd.window.Current, crd.version) {
			return false
		}
	}
	return true
}

// acknowledgedByCore reports whether the core chart acknowledges the
// extension whose root objects are named names: the list on every CRD of the
// window names each of them, on a release for which the acknowledgement
// holds.
func (w clusterWindow) acknowledgedByCore(names []string) bool {
	if len(names) == 0 || len(w.crds) == 0 {
		return false
	}
	for _, crd := range w.crds {
		for _, name := range names {
			ack, ok := crd.acknowledged[name]
			if !ok || !contract.AcknowledgementHolds(ack, crd.window.Current, crd.version) {
				return false
			}
		}
	}
	return true
}

// rootObjectNames returns the names of the objects the core chart's list of
// acknowledged extensions refers to an extension by: its Provider, its
// MonitoringClasses, or its Plugin. The index names them where they differ
// from the entry name.
func rootObjectNames(ext extensionSummary) []string {
	switch ext.Type {
	case "provider":
		if name, ok := ext.Provider["providerName"].(string); ok && name != "" {
			return []string{name}
		}
	case "integration":
		var spec struct {
			Monitoring struct {
				Classes []string `json:"classes"`
			} `json:"monitoring"`
		}
		if err := remarshal(ext.Integration, &spec); err == nil {
			names := slices.DeleteFunc(slices.Clone(spec.Monitoring.Classes), func(n string) bool { return n == "" })
			if len(names) > 0 {
				return names
			}
		}
	}
	return []string{ext.Name}
}

// ---------------------------------------------------------------------------
// Catalog releases
// ---------------------------------------------------------------------------

// catalogRelease is one release of a chart channel in the hub index.
type catalogRelease struct {
	Version         string `json:"version"`
	Digest          string `json:"digest,omitempty"`
	ContractVersion string `json:"contractVersion,omitempty"`
	KubeVersion     string `json:"kubeVersion,omitempty"`
	// MinChartVersion is the oldest chart of the extension that can run this
	// release's image; plugin-hub uses it to update its image in place.
	MinChartVersion string `json:"minChartVersion,omitempty"`
}

type chartChannel struct {
	Ref      string           `json:"ref"`
	Version  string           `json:"version"`
	Head     string           `json:"head"`
	Releases []catalogRelease `json:"releases"`
}

// head is the newest release of the channel, the one its formula points at.
func (c chartChannel) head() string {
	if c.Head != "" {
		return c.Head
	}
	return c.Version
}

// releases lists the channel's releases newest first. An index that predates
// per-release data only knows the head, which then counts as unstamped.
func (c chartChannel) releases() []catalogRelease {
	if len(c.Releases) > 0 {
		return c.Releases
	}
	if h := c.head(); h != "" {
		return []catalogRelease{{Version: h}}
	}
	return nil
}

type chartArtifacts struct {
	Chart struct {
		DefaultChannel string                  `json:"defaultChannel"`
		Channels       map[string]chartChannel `json:"channels"`
	} `json:"chart"`
}

// releaseVerdict is the result of the check for one release.
type releaseVerdict struct {
	Version         string `json:"version"`
	ContractVersion string `json:"contractVersion,omitempty"`
	// Status is True (works with this OpenEverest), False (does not) or
	// Unknown (cannot be checked; allowed with a notice). A release that does
	// not work but is acknowledged stays False, with an Acknowledged reason,
	// and is allowed with a notice too.
	Status  metav1.ConditionStatus `json:"status"`
	Reason  string                 `json:"reason"`
	Message string                 `json:"message"`
	// Needs is the OpenEverest release a CoreTooOld release needs.
	Needs string `json:"needs,omitempty"`
}

// verdictFor checks one release. acknowledged is whether the core chart
// acknowledges the extension.
func verdictFor(version, stamp string, w clusterWindow, acknowledged bool) releaseVerdict {
	r := w.check(stamp)
	if acknowledged && r.Status == metav1.ConditionFalse {
		r = contract.Acknowledge(r)
	}
	v := releaseVerdict{
		Version:         version,
		ContractVersion: stamp,
		Status:          r.Status,
		Reason:          r.Reason,
		Message:         contract.Message(r, stamp, w.window),
	}
	if (r.Reason == contract.ReasonCoreTooOld || r.Reason == contract.ReasonCoreTooOldAcknowledged) &&
		!contract.IsDevelopment(stamp) {
		v.Needs = stamp
	}
	return v
}

func verdicts(releases []catalogRelease, w clusterWindow, acknowledged bool) []releaseVerdict {
	out := make([]releaseVerdict, 0, len(releases))
	for _, r := range releases {
		out = append(out, verdictFor(r.Version, r.ContractVersion, w, acknowledged))
	}
	return out
}

// installable reports whether a release may be installed without an explicit
// acknowledgement: it works with the cluster, it cannot be checked, or the
// core chart acknowledges it.
func installable(v releaseVerdict) bool {
	return v.Status != metav1.ConditionFalse || isAcknowledged(v.Reason)
}

func isAcknowledged(reason string) bool {
	return reason == contract.ReasonCoreTooOldAcknowledged || reason == contract.ReasonExtensionTooOldAcknowledged
}

// noReleaseSupports says that no release of an extension works with the
// OpenEverest in the cluster. "Yet": usually the extension has not caught up
// with an OpenEverest upgrade.
func noReleaseSupports(name, coreVersion string) string {
	if coreVersion == "" {
		return fmt.Sprintf("No release of %s supports this OpenEverest yet.", name)
	}
	return fmt.Sprintf("No release of %s supports OpenEverest %s yet.", name, coreVersion)
}

// newestInstallable returns the newest installable release other than skip,
// or "" when there is none. vs is ordered newest first.
func newestInstallable(vs []releaseVerdict, skip string) string {
	for _, v := range vs {
		if v.Version != skip && installable(v) {
			return v.Version
		}
	}
	return ""
}

// entryCompatibility is the check of every release of an entry's default
// channel.
type entryCompatibility struct {
	Channel string `json:"channel"`
	Head    string `json:"head"`
	// Recommended is the newest installable release; empty when every
	// release needs an acknowledgement.
	Recommended string           `json:"recommended,omitempty"`
	Releases    []releaseVerdict `json:"releases"`
}

type compatibilityResponse struct {
	// CoreVersion is the OpenEverest release in the cluster, when its CRDs
	// say so.
	CoreVersion string `json:"coreVersion,omitempty"`
	// Extensions is keyed by "<type>:<name>". Entries are missing when the
	// cluster has none of the CRDs their type needs, or when they have no
	// installable chart.
	Extensions map[string]entryCompatibility `json:"extensions"`
	Error      string                        `json:"error,omitempty"`
}

func compatibilityFor(index extensionIndex, crds coreCRDs) compatibilityResponse {
	out := compatibilityResponse{Extensions: map[string]entryCompatibility{}}
	for _, ext := range index.Extensions {
		if ext.Access == "gated" {
			continue
		}
		w, ok := crds.windowFor(ext.Type)
		if !ok {
			continue
		}
		if out.CoreVersion == "" {
			out.CoreVersion = w.coreVersion
		}
		name, channel, err := decodeChannel(ext)
		if err != nil {
			continue
		}
		vs := verdicts(channel.releases(), w, w.acknowledgedByCore(rootObjectNames(ext)))
		out.Extensions[ext.Type+":"+ext.Name] = entryCompatibility{
			Channel:     name,
			Head:        channel.head(),
			Recommended: newestInstallable(vs, ""),
			Releases:    vs,
		}
	}
	return out
}

// makeCompatibilityHandler serves the check of every catalog entry. It needs
// no installer rights, only read access to the core CRDs, so browse-only hubs
// show it too; a failure to read them is reported, not fatal.
func makeCompatibilityHandler(cache *catalogCache, crds func() (crdGetter, error)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		index, err := loadIndex(cache)
		if err != nil {
			apiError(w, http.StatusBadGateway, err.Error())
			return
		}
		get, err := crds()
		if err != nil {
			writeJSON(w, http.StatusOK, compatibilityResponse{Error: "could not read the OpenEverest version: " + err.Error()})
			return
		}
		ctx, cancel := context.WithTimeout(r.Context(), everestCallTimeout)
		defer cancel()
		found, err := readCoreCRDs(ctx, get, allCoreCRDs())
		if err != nil {
			writeJSON(w, http.StatusOK, compatibilityResponse{Error: "could not read the OpenEverest version: " + err.Error()})
			return
		}
		writeJSON(w, http.StatusOK, compatibilityFor(index, found))
	}
}

// ---------------------------------------------------------------------------
// Install-time check
// ---------------------------------------------------------------------------

// errIncompatible refuses a release that does not work with the cluster.
type errIncompatible struct {
	msg         string
	reason      string
	needs       string
	recommended string
}

func (e errIncompatible) Error() string { return e.msg }

func (e errIncompatible) body() map[string]any {
	body := map[string]any{"error": e.msg, "incompatible": true, "reason": e.reason}
	if e.needs != "" {
		body["needs"] = e.needs
	}
	if e.recommended != "" {
		body["recommended"] = e.recommended
	}
	return body
}

// compatCheck is the cluster window an operation checks against.
type compatCheck struct {
	window clusterWindow
	// checked is false when the cluster has none of the CRDs, so the
	// operation proceeds unchecked, as the chart's own check does.
	checked bool
	// acknowledged is whether the core chart acknowledges the extension.
	acknowledged bool
	verdicts     []releaseVerdict
}

// pickVersion resolves the release to install: the requested one, which must
// be a release of the catalog channel, or else the newest installable one,
// or else the head (which the chart check then refuses unless acknowledged).
func pickVersion(t installTarget, requested string, c compatCheck) (string, error) {
	if requested != "" {
		if requested == t.Version {
			return requested, nil
		}
		for _, r := range t.Releases {
			if r.Version == requested {
				return requested, nil
			}
		}
		return "", fmt.Errorf("%s is not a release of %s in the hub catalog", requested, t.Name)
	}
	if c.checked {
		if v := newestInstallable(c.verdicts, ""); v != "" {
			return v, nil
		}
	}
	return t.Version, nil
}

// admitChart checks the stamp of the pulled chart, which is authoritative over
// the catalog's copy. It returns the Helm values to add: the acknowledgement,
// when an incompatible release is installed anyway.
func admitChart(t installTarget, version string, annotations map[string]string, c compatCheck, acknowledge bool) (map[string]any, error) {
	if !c.checked {
		return nil, nil
	}
	stamp := annotations[contract.VersionAnnotation]
	r := c.window.check(stamp)
	switch r.Status {
	case metav1.ConditionTrue:
		return nil, nil
	case metav1.ConditionUnknown:
		log.Printf("installer: %s %s %s", t.Name, version, contract.Message(r, stamp, c.window.window))
		return nil, nil
	}
	if c.acknowledged {
		// The chart's own check and core's admission read the same list on
		// the CRDs, so there is nothing to record.
		log.Printf("installer: %s %s %s in %s", t.Name, version,
			contract.Message(contract.Acknowledge(r), stamp, c.window.window), contract.AcknowledgedExtensionsAnnotation)
		return nil, nil
	}
	if acknowledge {
		return acknowledgeIncompatible(t, version, r, stamp, c.window)
	}
	v := verdictFor(version, stamp, c.window, false)
	msg := fmt.Sprintf("%s %s %s", t.Name, version, v.Message)
	if c.window.coreVersion != "" {
		msg += fmt.Sprintf("; this cluster runs OpenEverest %s", c.window.coreVersion)
	}
	recommended := newestInstallable(c.verdicts, version)
	if recommended != "" {
		msg += fmt.Sprintf(". The newest release that works with it is %s.", recommended)
	} else {
		msg += ". " + noReleaseSupports(t.Name, c.window.coreVersion)
	}
	return nil, errIncompatible{msg: msg, reason: r.Reason, needs: v.Needs, recommended: recommended}
}

// acknowledgeIncompatible returns the Helm values that let a release which
// does not work with the cluster install anyway: an acknowledgement naming the
// OpenEverest release in the cluster, which holds until a core release changes
// the contract.
func acknowledgeIncompatible(t installTarget, version string, r contract.Result, stamp string,
	w clusterWindow) (map[string]any, error) {
	msg := contract.Message(contract.Acknowledge(r), stamp, w.window)
	if !w.declared {
		// An OpenEverest without a window checks nothing, so there is
		// nothing to record.
		log.Printf("installer: %s %s %s", t.Name, version, msg)
		return nil, nil
	}
	// The release in the CRD label always holds, unless the label is missing
	// or the CRDs disagree mid-upgrade. Installing then would only fail in the
	// chart's own check or in core's admission, so refuse with the reason.
	if !w.acknowledgementHolds(w.coreVersion) {
		return nil, errConflict{fmt.Sprintf(
			"%s %s %s, and cannot be installed anyway: an acknowledgement names the OpenEverest release, and the "+
				"CustomResourceDefinitions of this OpenEverest do not agree on one (label %s); retry once its install "+
				"or upgrade completes",
			t.Name, version, contract.Message(r, stamp, w.window), contract.CoreVersionKey)}
	}
	log.Printf("installer: %s %s %s on OpenEverest %s", t.Name, version, msg, w.coreVersion)
	return acknowledgeValues(w.coreVersion), nil
}

// acknowledgeValues sets the chart value that lets it install on this
// OpenEverest release despite the check.
func acknowledgeValues(coreVersion string) map[string]any {
	keys := strings.Split(contract.AcknowledgeValuePath, ".")
	var v any = coreVersion
	for i := len(keys) - 1; i >= 0; i-- {
		v = map[string]any{keys[i]: v}
	}
	out, _ := v.(map[string]any)
	return out
}

// errNoChannel is returned for entries without an installable channel.
var errNoChannel = errors.New("catalog entry has no installable default channel")

// decodeChannel reads the default chart channel of a catalog entry.
func decodeChannel(ext extensionSummary) (string, chartChannel, error) {
	var artifacts chartArtifacts
	if err := remarshal(ext.Artifacts, &artifacts); err != nil {
		return "", chartChannel{}, fmt.Errorf("invalid artifacts: %w", err)
	}
	name := artifacts.Chart.DefaultChannel
	channel, ok := artifacts.Chart.Channels[name]
	if !ok || channel.Ref == "" || channel.head() == "" {
		return "", chartChannel{}, errNoChannel
	}
	return name, channel, nil
}

// remarshal copies a loosely typed JSON value into a typed one.
func remarshal(in any, out any) error {
	if in == nil {
		return nil
	}
	raw, err := json.Marshal(in)
	if err != nil {
		return err
	}
	return json.Unmarshal(raw, out)
}
