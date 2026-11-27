// One-click install / upgrade / uninstall of catalog extensions (opt-out).
//
// Two independent gates protect these endpoints:
//
//  1. Operator switch. INSTALLER_ENABLED is only set — and the pod only gets a
//     ServiceAccount bound to a (cluster-admin by default) ClusterRole — when
//     the chart's installer.enabled is true (the default). Operators who opt
//     out get neither: the endpoints refuse every request and the pod has no
//     Kubernetes rights to install anything anyway. The binary itself fails
//     closed when the variable is unset.
//  2. Per-request admin check. The caller's token is forwarded to the core
//     /v1/permissions endpoint; only users allowed to create plugins (the
//     admin role by default) may install or upgrade. Core validates the token,
//     so the plugin never trusts client-supplied identity.
//
// The client sends {type, name}, and optionally a version, which must be a
// release of the entry's catalog channel. The chart reference, release name
// and namespace are resolved from the cached hub catalog, so the endpoint
// cannot be used to deploy or remove arbitrary releases. Uninstalling a
// provider that still has instances requires an explicit confirmation phrase,
// enforced here rather than only in the UI.
//
// Before Helm runs, install and upgrade check that the chart works with the
// OpenEverest in the cluster (see compat.go): the installer runs Helm with
// cluster-wide rights, so it must not apply a chart that core will reject or
// misread. An incompatible release is refused unless the request
// acknowledges it.
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/openeverest/openeverest/v2/contract"
	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/cli"
	"helm.sh/helm/v3/pkg/kube"
	"helm.sh/helm/v3/pkg/registry"
	"helm.sh/helm/v3/pkg/release"
	"helm.sh/helm/v3/pkg/storage/driver"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/dynamic"
)

const (
	helmOperationTimeout = 5 * time.Minute
	helmDriver           = "secret"
	maxActionBodyBytes   = 4 * 1024
)

// selfChartName is the name of plugin-hub's own chart. The catalog entry whose
// chart has this name is plugin-hub itself, whichever release runs it.
const selfChartName = "plugin-hub"

type installer struct {
	enabled bool
	// selfRelease/selfNamespace identify the Helm release that runs this pod,
	// which the installer refuses to modify (an upgrade would restart the pod
	// mid-operation and could silently flip installer.enabled). When
	// plugin-hub is a subchart, it is the parent's release, for example
	// OpenEverest's own.
	selfRelease   string
	selfNamespace string
	// selfChartVersion/selfAppVersion are the plugin-hub chart's versions,
	// which differ from the release's chart when plugin-hub is a subchart.
	// Helm does not keep subcharts in the stored release, so the chart passes
	// them in.
	selfChartVersion string
	selfAppVersion   string

	settings *cli.EnvSettings
	registry *registry.Client
	// crds reads core CRDs, which carry the compatibility window.
	crds func() (crdGetter, error)
	// Helm operations are serialized: this is an admin-only, low-traffic path
	// and serializing avoids racing two operations on the same release.
	mu sync.Mutex
}

func newInstaller() *installer {
	inst := &installer{
		enabled:          strings.EqualFold(os.Getenv("INSTALLER_ENABLED"), "true"),
		selfRelease:      os.Getenv("PLUGIN_HUB_RELEASE_NAME"),
		selfNamespace:    os.Getenv("POD_NAMESPACE"),
		selfChartVersion: os.Getenv("PLUGIN_HUB_CHART_VERSION"),
		selfAppVersion:   os.Getenv("PLUGIN_HUB_APP_VERSION"),
		crds:             clusterCRDGetter,
	}
	if !inst.enabled {
		return inst
	}
	inst.settings = cli.New()
	rc, err := registry.NewClient(
		registry.ClientOptCredentialsFile(inst.settings.RegistryConfig),
		registry.ClientOptWriter(io.Discard),
	)
	if err != nil {
		log.Printf("installer: disabling, failed to create registry client: %v", err)
		inst.enabled = false
		return inst
	}
	inst.registry = rc
	return inst
}

func (i *installer) actionConfig(namespace string) (*action.Configuration, error) {
	flags := genericclioptions.NewConfigFlags(false)
	flags.Namespace = &namespace
	cfg := new(action.Configuration)
	if err := cfg.Init(flags, namespace, helmDriver, func(format string, v ...any) {}); err != nil {
		return nil, err
	}
	cfg.RegistryClient = i.registry
	if kc, ok := cfg.KubeClient.(*kube.Client); ok {
		cfg.KubeClient = &hookLogClient{Client: kc}
	}
	return cfg, nil
}

// ---------------------------------------------------------------------------
// Admin check
// ---------------------------------------------------------------------------

type callerIdentity struct {
	subject  string
	canAdmin bool
}

// resolveCaller asks core who the caller is and whether they may install
// plugins. Any failure (missing token, core unreachable, unexpected status)
// is treated as "not allowed".
func resolveCaller(authHeader string) (callerIdentity, error) {
	if authHeader == "" {
		return callerIdentity{}, nil
	}
	req, err := http.NewRequest(http.MethodGet, everestAPIURL()+"/v1/permissions", nil)
	if err != nil {
		return callerIdentity{}, err
	}
	req.Header.Set("Authorization", authHeader)
	req.Header.Set("Accept", "application/json")
	resp, err := (&http.Client{Timeout: everestCallTimeout}).Do(req)
	if err != nil {
		return callerIdentity{}, err
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusUnauthorized || resp.StatusCode == http.StatusForbidden {
		return callerIdentity{}, nil
	}
	if resp.StatusCode/100 != 2 {
		return callerIdentity{}, fmt.Errorf("permissions endpoint returned status %d", resp.StatusCode)
	}
	var payload struct {
		Enabled     bool       `json:"enabled"`
		Permissions [][]string `json:"permissions"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		return callerIdentity{}, fmt.Errorf("decode permissions: %w", err)
	}
	return evaluatePermissions(payload.Enabled, payload.Permissions, clusterName()), nil
}

// evaluatePermissions mirrors core's install gate (spec 003 §11.1): creating
// plugins at cluster scope. With RBAC disabled core lets every authenticated
// user do everything, so a successful (authenticated) call is enough.
func evaluatePermissions(rbacEnabled bool, perms [][]string, cluster string) callerIdentity {
	id := callerIdentity{}
	for _, p := range perms {
		if len(p) == 4 && id.subject == "" {
			id.subject = p[0]
		}
	}
	if !rbacEnabled {
		id.canAdmin = true
		return id
	}
	for _, p := range perms {
		if len(p) != 4 {
			continue
		}
		resource, action, object := p[1], p[2], p[3]
		if (resource == "plugins" || resource == "*") &&
			(action == "create" || action == "*") &&
			isClusterWideObject(object, cluster) {
			id.canAdmin = true
			return id
		}
	}
	return id
}

// isClusterWideObject accepts "*", "*/*", "<cluster>/*", ... — i.e. a policy
// object that is not narrowed to a specific named plugin.
func isClusterWideObject(object, cluster string) bool {
	parts := strings.Split(object, "/")
	for idx, part := range parts {
		if part == "*" || (idx == 0 && part == cluster && len(parts) > 1) {
			continue
		}
		return false
	}
	return true
}

// ---------------------------------------------------------------------------
// Catalog resolution
// ---------------------------------------------------------------------------

type installTarget struct {
	Type     string
	Name     string
	ChartRef string
	// Version is the head of the default channel, its newest release.
	Version string
	// Releases lists the channel's releases, newest first.
	Releases  []catalogRelease
	Release   string
	Namespace string
	// ProviderName is the Provider CR name instances reference via
	// spec.providerRef.name; it can differ from the catalog name.
	ProviderName string
	// RootObjectNames are the names the core chart's list of acknowledged
	// extensions refers to this extension by.
	RootObjectNames []string
}

func resolveTarget(index extensionIndex, extType, name string) (installTarget, error) {
	for _, ext := range index.Extensions {
		if ext.Type != extType || ext.Name != name {
			continue
		}
		if ext.Access == "gated" {
			return installTarget{}, errors.New("gated extensions cannot be installed from the hub")
		}
		return targetFromEntry(ext)
	}
	return installTarget{}, fmt.Errorf("%s %q not found in the hub catalog", extType, name)
}

func targetFromEntry(ext extensionSummary) (installTarget, error) {
	var install struct {
		Helm struct {
			ReleaseName string `json:"releaseName"`
			Namespace   string `json:"namespace"`
		} `json:"helm"`
	}
	_, channel, err := decodeChannel(ext)
	if err != nil {
		return installTarget{}, err
	}
	if err := remarshal(ext.Install, &install); err != nil {
		return installTarget{}, fmt.Errorf("invalid install spec: %w", err)
	}
	target := installTarget{
		Type:            ext.Type,
		Name:            ext.Name,
		ChartRef:        channel.Ref,
		Version:         channel.head(),
		Releases:        channel.releases(),
		Release:         install.Helm.ReleaseName,
		Namespace:       install.Helm.Namespace,
		RootObjectNames: rootObjectNames(ext),
	}
	if target.Release == "" {
		target.Release = ext.Name
	}
	if target.Namespace == "" {
		target.Namespace = "everest-system"
	}
	if ext.Type == "provider" {
		target.ProviderName = ext.Name
		if name, ok := ext.Provider["providerName"].(string); ok && name != "" {
			target.ProviderName = name
		}
	}
	return target, nil
}

// ---------------------------------------------------------------------------
// Helm operations
// ---------------------------------------------------------------------------

type releaseInfo struct {
	Release      string `json:"release"`
	Namespace    string `json:"namespace"`
	ChartVersion string `json:"chartVersion"`
	AppVersion   string `json:"appVersion,omitempty"`
	Status       string `json:"status"`
	// FailedInstall is set when the release was never deployed: its first
	// install failed. Installing again replaces it.
	FailedInstall bool `json:"failedInstall,omitempty"`
}

func toReleaseInfo(rel *release.Release) releaseInfo {
	info := releaseInfo{Release: rel.Name, Namespace: rel.Namespace}
	if rel.Info != nil {
		info.Status = rel.Info.Status.String()
	}
	if rel.Chart != nil && rel.Chart.Metadata != nil {
		info.ChartVersion = rel.Chart.Metadata.Version
		info.AppVersion = rel.Chart.Metadata.AppVersion
	}
	return info
}

// isSelf reports whether t is plugin-hub itself. It matches by chart, because
// as a subchart plugin-hub runs in its parent's release, whose name and
// namespace differ from the catalog's.
func (i *installer) isSelf(t installTarget) bool {
	if chartName(t.ChartRef) == selfChartName {
		return true
	}
	return i.selfRelease != "" && t.Release == i.selfRelease &&
		(i.selfNamespace == "" || t.Namespace == i.selfNamespace)
}

// chartName is the last path element of a chart reference, without a tag or
// digest: oci://ghcr.io/openeverest/charts/plugin-hub:0.1.2 → plugin-hub.
func chartName(ref string) string {
	ref = strings.TrimSuffix(ref, "/")
	if idx := strings.LastIndex(ref, "/"); idx >= 0 {
		ref = ref[idx+1:]
	}
	if idx := strings.IndexAny(ref, ":@"); idx >= 0 {
		ref = ref[:idx]
	}
	return ref
}

// selfKey is the "<type>:<name>" key of plugin-hub's own catalog entry, "" if
// the catalog has none.
func (i *installer) selfKey(index extensionIndex) string {
	for _, ext := range index.Extensions {
		if t, err := targetFromEntry(ext); err == nil && i.isSelf(t) {
			return ext.Type + ":" + ext.Name
		}
	}
	return ""
}

// selfReleaseInfo describes rel, the release that runs this pod, with the
// plugin-hub chart's versions rather than the release chart's: as a subchart
// the release's chart is the parent's.
func (i *installer) selfReleaseInfo(rel *release.Release) releaseInfo {
	info := toReleaseInfo(rel)
	isRoot := rel.Chart != nil && rel.Chart.Metadata != nil && rel.Chart.Metadata.Name == selfChartName
	if i.selfChartVersion != "" || !isRoot {
		info.ChartVersion = i.selfChartVersion
		info.AppVersion = i.selfAppVersion
	}
	return info
}

func (i *installer) loadChart(opts *action.ChartPathOptions, ref string) (*chart.Chart, error) {
	path, err := opts.LocateChart(ref, i.settings)
	if err != nil {
		return nil, fmt.Errorf("pull chart %s@%s: %w", ref, opts.Version, err)
	}
	return loader.Load(path)
}

// compatCheck reads the window the cluster serves to t's type of extension and
// checks the catalog's releases of t against it.
func (i *installer) compatCheck(ctx context.Context, t installTarget) (compatCheck, error) {
	get, err := i.crds()
	if err != nil {
		return compatCheck{}, fmt.Errorf("could not read the OpenEverest version: %w", err)
	}
	crds, err := readCoreCRDs(ctx, get, coreCRDsFor(t.Type))
	if err != nil {
		return compatCheck{}, fmt.Errorf("could not read the OpenEverest version: %w", err)
	}
	w, ok := crds.windowFor(t.Type)
	if !ok {
		log.Printf("installer: none of %s is in the cluster; %s is not checked for compatibility",
			strings.Join(coreCRDsFor(t.Type), ", "), t.Name)
		return compatCheck{}, nil
	}
	acknowledged := w.acknowledgedByCore(t.RootObjectNames)
	return compatCheck{window: w, checked: true, acknowledged: acknowledged, verdicts: verdicts(t.Releases, w, acknowledged)}, nil
}

// prepareChart picks the release to install, pulls it and checks its stamp.
// installed is the chart version of the release being upgraded, "" on
// install. It returns the chart and the values to pass to Helm.
func (i *installer) prepareChart(ctx context.Context, opts *action.ChartPathOptions, t installTarget,
	req actionRequest, installed string) (*chart.Chart, map[string]any, error) {
	check, err := i.compatCheck(ctx, t)
	if err != nil {
		return nil, nil, err
	}
	version, err := pickVersion(t, req.Version, check)
	if err != nil {
		return nil, nil, errBadRequest{err.Error()}
	}
	if installed != "" && contract.Valid(installed) && contract.Valid(version) && contract.Compare(version, installed) < 0 {
		return nil, nil, errConflict{fmt.Sprintf(
			"%s %s is installed; %s is older and the hub does not downgrade — use helm directly", t.Name, installed, version)}
	}
	opts.Version = version
	ch, err := i.loadChart(opts, t.ChartRef)
	if err != nil {
		return nil, nil, err
	}
	var annotations map[string]string
	if ch.Metadata != nil {
		annotations = ch.Metadata.Annotations
	}
	vals, err := admitChart(t, version, annotations, check, req.AcknowledgeIncompatible)
	if err != nil {
		return nil, nil, err
	}
	return ch, vals, nil
}

func (i *installer) install(ctx context.Context, t installTarget, req actionRequest) (releaseInfo, error) {
	i.mu.Lock()
	defer i.mu.Unlock()

	cfg, err := i.actionConfig(t.Namespace)
	if err != nil {
		return releaseInfo{}, err
	}
	replace, err := replaceableRelease(cfg, t)
	if err != nil {
		return releaseInfo{}, err
	}

	inst := newInstallAction(cfg, t, replace)
	inst.SetRegistryClient(i.registry)
	ch, vals, err := i.prepareChart(ctx, &inst.ChartPathOptions, t, req, "")
	if err != nil {
		return releaseInfo{}, err
	}
	rel, err := inst.RunWithContext(ctx, ch, vals)
	if err != nil {
		return releaseInfo{}, err
	}
	return toReleaseInfo(rel), nil
}

func newInstallAction(cfg *action.Configuration, t installTarget, replace bool) *action.Install {
	inst := action.NewInstall(cfg)
	inst.ReleaseName = t.Release
	inst.Namespace = t.Namespace
	inst.CreateNamespace = true
	inst.Replace = replace
	inst.Timeout = helmOperationTimeout
	return inst
}

// replaceableRelease reports whether installing t must replace an existing
// release, which is the case when its first install failed. Helm refuses to
// install over such a release and cannot upgrade it either ("has no deployed
// releases"), so without this a failed first install could only be retried
// after a manual helm uninstall. Any other existing release is a conflict.
func replaceableRelease(cfg *action.Configuration, t installTarget) (bool, error) {
	hist, err := cfg.Releases.History(t.Release)
	if errors.Is(err, driver.ErrReleaseNotFound) || (err == nil && len(hist) == 0) {
		return false, nil
	}
	if err != nil {
		return false, fmt.Errorf("read history of release %s/%s: %w", t.Namespace, t.Release, err)
	}
	if neverDeployed(hist) {
		return true, nil
	}
	return false, errConflict{fmt.Sprintf("release %s/%s already exists", t.Namespace, t.Release)}
}

// neverDeployed reports whether the latest revision of a release failed and no
// revision was ever deployed (a superseded revision was deployed once).
func neverDeployed(hist []*release.Release) bool {
	var latest *release.Release
	for _, r := range hist {
		if r.Info == nil {
			continue
		}
		if r.Info.Status == release.StatusDeployed || r.Info.Status == release.StatusSuperseded {
			return false
		}
		if latest == nil || r.Version > latest.Version {
			latest = r
		}
	}
	return latest != nil && latest.Info.Status == release.StatusFailed
}

func (i *installer) upgrade(ctx context.Context, t installTarget, req actionRequest) (releaseInfo, error) {
	i.mu.Lock()
	defer i.mu.Unlock()

	cfg, err := i.actionConfig(t.Namespace)
	if err != nil {
		return releaseInfo{}, err
	}
	current, err := action.NewGet(cfg).Run(t.Release)
	if err != nil {
		return releaseInfo{}, errConflict{fmt.Sprintf(
			"release %s/%s not found; it may have been installed under a different name — upgrade it with helm directly",
			t.Namespace, t.Release)}
	}
	if hist, err := cfg.Releases.History(t.Release); err == nil && neverDeployed(hist) {
		return releaseInfo{}, errConflict{fmt.Sprintf(
			"the first install of release %s/%s failed, so there is nothing to upgrade; install it again", t.Namespace, t.Release)}
	}

	up := action.NewUpgrade(cfg)
	up.Namespace = t.Namespace
	up.Timeout = helmOperationTimeout
	// Keep the admin's custom values, but pick up new chart defaults.
	up.ResetThenReuseValues = true
	up.SetRegistryClient(i.registry)

	ch, vals, err := i.prepareChart(ctx, &up.ChartPathOptions, t, req, toReleaseInfo(current).ChartVersion)
	if err != nil {
		return releaseInfo{}, err
	}
	rel, err := up.RunWithContext(ctx, t.Release, ch, vals)
	if err != nil {
		return releaseInfo{}, err
	}
	return toReleaseInfo(rel), nil
}

// uninstallConfirmPhrase must be sent to uninstall a provider that still has
// instances. Enforced server-side so the warning can't be bypassed via API.
const uninstallConfirmPhrase = "UNINSTALL"

type errInstancesInUse struct{ instances []string }

func (e errInstancesInUse) Error() string {
	return fmt.Sprintf("%d instance(s) use this provider; confirm with %q to uninstall anyway",
		len(e.instances), uninstallConfirmPhrase)
}

func (i *installer) uninstall(_ context.Context, t installTarget, confirm string) (releaseInfo, error) {
	i.mu.Lock()
	defer i.mu.Unlock()

	if t.ProviderName != "" && confirm != uninstallConfirmPhrase {
		instances, err := i.instancesUsing(t.ProviderName)
		if err != nil {
			return releaseInfo{}, fmt.Errorf("could not check instances using this provider: %w", err)
		}
		if len(instances) > 0 {
			return releaseInfo{}, errInstancesInUse{instances}
		}
	}

	cfg, err := i.actionConfig(t.Namespace)
	if err != nil {
		return releaseInfo{}, err
	}
	if _, err := action.NewGet(cfg).Run(t.Release); err != nil {
		return releaseInfo{}, errConflict{fmt.Sprintf(
			"release %s/%s not found; it may have been installed under a different name — uninstall it with helm directly",
			t.Namespace, t.Release)}
	}
	un := action.NewUninstall(cfg)
	un.Timeout = helmOperationTimeout
	res, err := un.Run(t.Release)
	if err != nil {
		return releaseInfo{}, err
	}
	info := releaseInfo{Release: t.Release, Namespace: t.Namespace, Status: "uninstalled"}
	if res != nil && res.Release != nil {
		info = toReleaseInfo(res.Release)
	}
	return info, nil
}

var instanceGVR = schema.GroupVersionResource{Group: "core.openeverest.io", Version: "v1alpha1", Resource: "instances"}

// instancesUsing lists "<namespace>/<name>" of every Instance whose
// spec.providerRef.name matches. It uses the plugin's own ServiceAccount, so
// the result covers namespaces the requesting admin may not see in OpenEverest.
func (i *installer) instancesUsing(providerName string) ([]string, error) {
	restCfg, err := genericclioptions.NewConfigFlags(false).ToRESTConfig()
	if err != nil {
		return nil, err
	}
	client, err := dynamic.NewForConfig(restCfg)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), everestCallTimeout)
	defer cancel()
	list, err := client.Resource(instanceGVR).Namespace(metav1.NamespaceAll).List(ctx, metav1.ListOptions{})
	if apierrors.IsNotFound(err) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	var out []string
	for _, item := range list.Items {
		ref, _, _ := unstructured.NestedString(item.Object, "spec", "providerRef", "name")
		if ref == providerName {
			out = append(out, item.GetNamespace()+"/"+item.GetName())
		}
	}
	sort.Strings(out)
	return out, nil
}

// releasesFor reports the Helm release backing each catalog entry, keyed by
// "<type>:<name>". It gives the UI the real chart version (the Plugin CR and
// provider labels carry the app version, which can differ) and in-flight or
// failed statuses that core does not expose.
func (i *installer) releasesFor(index extensionIndex) (map[string]releaseInfo, error) {
	cfg, err := i.actionConfig("")
	if err != nil {
		return nil, err
	}
	list := action.NewList(cfg)
	list.AllNamespaces = true
	list.StateMask = action.ListAll
	rels, err := list.Run()
	if err != nil {
		return nil, err
	}
	return i.matchReleases(cfg, rels, index), nil
}

// matchReleases maps catalog entries to their releases in rels. plugin-hub's
// own entry maps to the release that runs this pod, whatever its name.
func (i *installer) matchReleases(cfg *action.Configuration, rels []*release.Release, index extensionIndex) map[string]releaseInfo {
	byKey := map[string]*release.Release{}
	for _, rel := range rels {
		byKey[rel.Namespace+"/"+rel.Name] = rel
	}
	out := map[string]releaseInfo{}
	for _, ext := range index.Extensions {
		t, err := targetFromEntry(ext)
		if err != nil {
			continue
		}
		if i.isSelf(t) {
			if rel, ok := byKey[i.selfNamespace+"/"+i.selfRelease]; ok {
				out[ext.Type+":"+ext.Name] = i.selfReleaseInfo(rel)
			}
			continue
		}
		if rel, ok := byKey[t.Namespace+"/"+t.Release]; ok {
			info := toReleaseInfo(rel)
			if rel.Info != nil && rel.Info.Status == release.StatusFailed {
				info.FailedInstall = failedFirstInstall(cfg, rel)
			}
			out[ext.Type+":"+ext.Name] = info
		}
	}
	return out
}

func failedFirstInstall(cfg *action.Configuration, rel *release.Release) bool {
	hist, err := cfg.Releases.History(rel.Name)
	if err != nil {
		return false
	}
	var own []*release.Release
	for _, r := range hist {
		if r.Namespace == rel.Namespace {
			own = append(own, r)
		}
	}
	return neverDeployed(own)
}

type errConflict struct{ msg string }

func (e errConflict) Error() string { return e.msg }

type errBadRequest struct{ msg string }

func (e errBadRequest) Error() string { return e.msg }

// ---------------------------------------------------------------------------
// HTTP handlers
// ---------------------------------------------------------------------------

type installerStatus struct {
	Enabled    bool                   `json:"enabled"`
	CanInstall bool                   `json:"canInstall"`
	Releases   map[string]releaseInfo `json:"releases,omitempty"`
	// Self is the "<type>:<name>" key of plugin-hub's own catalog entry, which
	// the installer refuses to modify; the UI hides one-click actions for it.
	Self  string `json:"self,omitempty"`
	Error string `json:"error,omitempty"`
}

func makeInstallerStatusHandler(inst *installer, cache *catalogCache) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		status := installerStatus{Enabled: inst.enabled}
		if !inst.enabled {
			writeJSON(w, http.StatusOK, status)
			return
		}
		caller, err := resolveCaller(resolveAuthHeader(r))
		if err != nil {
			status.Error = "could not verify permissions: " + err.Error()
			writeJSON(w, http.StatusOK, status)
			return
		}
		status.CanInstall = caller.canAdmin
		if !caller.canAdmin {
			writeJSON(w, http.StatusOK, status)
			return
		}
		index, err := loadIndex(cache)
		if err != nil {
			status.Error = err.Error()
			writeJSON(w, http.StatusOK, status)
			return
		}
		releases, err := inst.releasesFor(index)
		if err != nil {
			status.Error = "could not list Helm releases: " + err.Error()
		}
		status.Releases = releases
		status.Self = inst.selfKey(index)
		writeJSON(w, http.StatusOK, status)
	}
}

type actionRequest struct {
	Type    string `json:"type"`
	Name    string `json:"name"`
	Confirm string `json:"confirm,omitempty"`
	// Version picks a release of the catalog channel; by default the newest
	// one that works with the cluster.
	Version string `json:"version,omitempty"`
	// AcknowledgeIncompatible installs a release that does not work with
	// the cluster anyway.
	AcknowledgeIncompatible bool `json:"acknowledgeIncompatible,omitempty"`
}

type helmOperation func(ctx context.Context, t installTarget, req actionRequest) (releaseInfo, error)

func registerInstallerRoutes(mux *http.ServeMux, inst *installer, cache *catalogCache) {
	mux.HandleFunc("GET /api/installer", makeInstallerStatusHandler(inst, cache))
	mux.HandleFunc("GET /api/uninstall/preflight", makeUninstallPreflightHandler(inst, cache))
	mux.HandleFunc("POST /api/install", makeInstallerActionHandler(inst, cache, "install",
		func(ctx context.Context, t installTarget, req actionRequest) (releaseInfo, error) {
			return inst.install(ctx, t, req)
		}))
	mux.HandleFunc("POST /api/upgrade", makeInstallerActionHandler(inst, cache, "upgrade",
		func(ctx context.Context, t installTarget, req actionRequest) (releaseInfo, error) {
			return inst.upgrade(ctx, t, req)
		}))
	mux.HandleFunc("POST /api/uninstall", makeInstallerActionHandler(inst, cache, "uninstall",
		func(ctx context.Context, t installTarget, req actionRequest) (releaseInfo, error) {
			return inst.uninstall(ctx, t, req.Confirm)
		}))
}

// authorizeTarget applies both installer gates and resolves the catalog
// entry. On failure it has already written the HTTP error and returns false.
func authorizeTarget(w http.ResponseWriter, r *http.Request, inst *installer, cache *catalogCache,
	verb, extType, name string) (installTarget, callerIdentity, bool) {
	if !inst.enabled {
		apiError(w, http.StatusForbidden, "installer is disabled; enable it with --set installer.enabled=true")
		return installTarget{}, callerIdentity{}, false
	}
	caller, err := resolveCaller(resolveAuthHeader(r))
	if err != nil {
		apiError(w, http.StatusBadGateway, "could not verify permissions: "+err.Error())
		return installTarget{}, callerIdentity{}, false
	}
	if !caller.canAdmin {
		apiError(w, http.StatusForbidden, "only administrators can "+verb+" extensions")
		return installTarget{}, callerIdentity{}, false
	}
	index, err := loadIndex(cache)
	if err != nil {
		apiError(w, http.StatusBadGateway, err.Error())
		return installTarget{}, callerIdentity{}, false
	}
	target, err := resolveTarget(index, extType, name)
	if err != nil {
		apiError(w, http.StatusBadRequest, err.Error())
		return installTarget{}, callerIdentity{}, false
	}
	if inst.isSelf(target) {
		apiError(w, http.StatusBadRequest, "plugin-hub cannot "+verb+" itself; use helm directly")
		return installTarget{}, callerIdentity{}, false
	}
	return target, caller, true
}

type uninstallPreflight struct {
	Release   string   `json:"release"`
	Namespace string   `json:"namespace"`
	Instances []string `json:"instances"`
}

func makeUninstallPreflightHandler(inst *installer, cache *catalogCache) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		q := r.URL.Query()
		target, _, ok := authorizeTarget(w, r, inst, cache, "uninstall", q.Get("type"), q.Get("name"))
		if !ok {
			return
		}
		out := uninstallPreflight{Release: target.Release, Namespace: target.Namespace, Instances: []string{}}
		if target.ProviderName != "" {
			instances, err := inst.instancesUsing(target.ProviderName)
			if err != nil {
				apiError(w, http.StatusBadGateway, "could not check instances using this provider: "+err.Error())
				return
			}
			if instances != nil {
				out.Instances = instances
			}
		}
		writeJSON(w, http.StatusOK, out)
	}
}

func makeInstallerActionHandler(inst *installer, cache *catalogCache, verb string, op helmOperation) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req actionRequest
		if err := json.NewDecoder(io.LimitReader(r.Body, maxActionBodyBytes)).Decode(&req); err != nil {
			apiError(w, http.StatusBadRequest, "invalid request body")
			return
		}
		target, caller, ok := authorizeTarget(w, r, inst, cache, verb, req.Type, req.Name)
		if !ok {
			return
		}

		requested := req.Version
		if requested == "" {
			requested = "newest compatible"
		}
		log.Printf("installer: %s requested %s of %s %q (%s@%s → %s/%s, acknowledge incompatible: %t)",
			caller.subject, verb, target.Type, target.Name, target.ChartRef, requested, target.Namespace, target.Release,
			req.AcknowledgeIncompatible)

		ctx, cancel := context.WithTimeout(r.Context(), helmOperationTimeout)
		defer cancel()
		info, err := op(ctx, target, req)
		if err != nil {
			log.Printf("installer: %s of %s %q failed: %v", verb, target.Type, target.Name, err)
			var inUse errInstancesInUse
			if errors.As(err, &inUse) {
				writeJSON(w, http.StatusConflict, map[string]any{"error": err.Error(), "instances": inUse.instances})
				return
			}
			var conflict errConflict
			if errors.As(err, &conflict) {
				apiError(w, http.StatusConflict, err.Error())
				return
			}
			var incompatible errIncompatible
			if errors.As(err, &incompatible) {
				writeJSON(w, http.StatusConflict, incompatible.body())
				return
			}
			var badRequest errBadRequest
			if errors.As(err, &badRequest) {
				apiError(w, http.StatusBadRequest, err.Error())
				return
			}
			apiError(w, http.StatusInternalServerError, verb+" failed: "+err.Error())
			return
		}
		log.Printf("installer: %s of %s %q succeeded (status %s)", verb, target.Type, target.Name, info.Status)
		writeJSON(w, http.StatusOK, info)
	}
}

func loadIndex(cache *catalogCache) (extensionIndex, error) {
	body, _, err := cache.get()
	if err != nil {
		return extensionIndex{}, fmt.Errorf("failed to fetch hub index: %w", err)
	}
	var index extensionIndex
	if err := json.Unmarshal(body, &index); err != nil {
		return extensionIndex{}, fmt.Errorf("failed to parse hub index: %w", err)
	}
	return index, nil
}
