// Updating plugin-hub itself from its own UI.
//
// plugin-hub usually ships as a dependency of the OpenEverest chart, so it runs
// in the core release, and a subchart cannot be upgraded on its own. When a
// newer plugin-hub runs on the chart already deployed, an admin can update the
// image in place: the hub upgrades the release that runs it with the chart that
// release already runs, reusing its values and changing only plugin-hub's
// image tag. When plugin-hub runs in its own release, the hub upgrades that
// release to the new chart like any other extension. Without a Helm release
// (Argo CD, OLM) it changes nothing and names the value to set.
//
// Helm does not store subcharts in a release, so the stored chart cannot be
// rendered again: that would delete every subchart's objects, plugin-hub's
// own included. The hub pulls the chart at the stored version from the core
// chart repository instead, and refuses unless its templates are the stored
// ones and it bundles the plugin-hub chart that is running.
//
// Each release in the catalog names the oldest plugin-hub chart that can run
// its image (minChartVersion, from the chart annotation
// openeverest.io/min-chart-version). A release that does not name one needs
// its own chart. An image-only update is offered only when the running chart
// is at least that; a newer release needs a newer OpenEverest chart.
//
// The upgrade does not wait for the rollout: it replaces the pod that runs it.
// The Deployment stops the old pod only once the new one is ready, and the
// server drains in-flight requests on SIGTERM, so the upgrade records its
// result.
package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/openeverest/openeverest/v2/contract"
	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart"
	"helm.sh/helm/v3/pkg/release"
	"helm.sh/helm/v3/pkg/storage/driver"
)

const (
	// minChartVersionAnnotation, in plugin-hub's Chart.yaml, is the oldest
	// plugin-hub chart that can run the image of that release.
	minChartVersionAnnotation = "openeverest.io/min-chart-version"
	defaultCoreChartRepo      = "https://openeverest.github.io/helm-charts"
)

// How plugin-hub is deployed, which decides how it updates itself.
const (
	// selfBundled: a dependency of another chart, in that chart's release.
	selfBundled = "bundled"
	// selfStandalone: plugin-hub's own release.
	selfStandalone = "standalone"
	// selfUnmanaged: no Helm release, e.g. Argo CD or OLM.
	selfUnmanaged = "unmanaged"
)

type selfUpdateStatus struct {
	Mode      string `json:"mode"`
	Release   string `json:"release,omitempty"`
	Namespace string `json:"namespace,omitempty"`
	// ParentChart and ParentChartVersion are the chart plugin-hub is bundled
	// in, e.g. openeverest 2.0.0.
	ParentChart        string `json:"parentChart,omitempty"`
	ParentChartVersion string `json:"parentChartVersion,omitempty"`
	// ParentChartRepository is where the hub pulls the parent chart from.
	ParentChartRepository string `json:"parentChartRepository,omitempty"`
	// ChartVersion is the running plugin-hub chart, Version the running
	// plugin-hub release; they differ after an image-only update.
	ChartVersion string `json:"chartVersion,omitempty"`
	Version      string `json:"version,omitempty"`
	// ValuesPath is the value that sets the image tag, e.g.
	// plugin-hub.image.tag.
	ValuesPath string `json:"valuesPath"`
	// Available is the newest release the hub can update to; on an unmanaged
	// install the one to set by hand.
	Available string `json:"available,omitempty"`
	// Blocked is a release newer than Available that needs a newer chart than
	// the running one.
	Blocked *blockedRelease `json:"blocked,omitempty"`
	Error   string          `json:"error,omitempty"`
}

type blockedRelease struct {
	Version         string `json:"version"`
	MinChartVersion string `json:"minChartVersion"`
}

// selfPlan is what a self-update would do.
type selfPlan struct {
	status selfUpdateStatus
	target installTarget
	// rel is the release that runs this pod; nil when unmanaged.
	rel        *release.Release
	check      compatCheck
	candidates []catalogRelease
}

// runningVersion is the plugin-hub release this pod runs: its image tag when
// that is a version, else the chart's appVersion.
func (i *installer) runningVersion() string {
	if tag := strings.TrimPrefix(i.selfImageTag, "v"); contract.Valid(tag) {
		return tag
	}
	return i.selfAppVersion
}

// valuesPrefix turns a chart's .Template.BasePath into the path of its values
// in the root chart: openeverest/charts/plugin-hub/templates → plugin-hub, and
// "" for the root chart itself.
func valuesPrefix(templatePath string) string {
	parts := strings.Split(strings.TrimSuffix(templatePath, "/templates"), "/")
	var keys []string
	for idx := 1; idx+1 < len(parts); idx++ {
		if parts[idx] == "charts" {
			keys = append(keys, parts[idx+1])
			idx++
		}
	}
	return strings.Join(keys, ".")
}

// imageTagPath is the value that sets plugin-hub's image tag in the release
// that runs it.
func (i *installer) imageTagPath(bundled bool) string {
	prefix := valuesPrefix(i.selfTemplatePath)
	if prefix == "" && bundled {
		prefix = selfChartName
	}
	if prefix == "" {
		return "image.tag"
	}
	return prefix + ".image.tag"
}

// nestedValue builds {a: {b: {c: v}}} from "a.b.c".
func nestedValue(path string, v any) map[string]any {
	keys := strings.Split(path, ".")
	for idx := len(keys) - 1; idx > 0; idx-- {
		v = map[string]any{keys[idx]: v}
	}
	return map[string]any{keys[0]: v}
}

// minChartFor is the oldest plugin-hub chart that runs release version; a
// release that does not say needs its own chart.
func minChartFor(version, declared string) string {
	if declared != "" {
		return declared
	}
	return version
}

// chartRuns reports whether chart version running is at least minimum.
func chartRuns(running, minimum string) bool {
	return contract.Valid(running) && contract.Valid(minimum) && contract.Compare(running, minimum) >= 0
}

// newerReleases lists, newest first, the releases newer than current that
// work with the cluster without an acknowledgement, which a self-update does
// not offer (all of them when the cluster could not be checked).
func newerReleases(releases []catalogRelease, current string, check compatCheck) []catalogRelease {
	if !contract.Valid(current) {
		return nil
	}
	ok := map[string]bool{}
	for _, v := range check.verdicts {
		ok[v.Version] = installable(v)
	}
	var out []catalogRelease
	for _, r := range releases {
		if !contract.Valid(r.Version) || contract.Compare(r.Version, current) <= 0 {
			continue
		}
		if check.checked && !ok[r.Version] {
			continue
		}
		out = append(out, r)
	}
	return out
}

// pickSelfUpdate picks the newest candidate, or for an image-only update the
// newest one the running chart can run; blocked is a newer one it cannot.
func pickSelfUpdate(candidates []catalogRelease, imageOnly bool, chartVersion string) (string, *blockedRelease) {
	var blocked *blockedRelease
	for _, r := range candidates {
		if !imageOnly {
			return r.Version, nil
		}
		minimum := minChartFor(r.Version, r.MinChartVersion)
		if chartRuns(chartVersion, minimum) {
			return r.Version, blocked
		}
		if blocked == nil {
			blocked = &blockedRelease{Version: r.Version, MinChartVersion: minimum}
		}
	}
	return "", blocked
}

// selfTarget is plugin-hub's own catalog entry.
func (i *installer) selfTarget(index extensionIndex) (installTarget, error) {
	for _, ext := range index.Extensions {
		if t, err := targetFromEntry(ext); err == nil && i.isSelf(t) {
			return t, nil
		}
	}
	return installTarget{}, errors.New("the hub catalog has no plugin-hub entry")
}

// selfReleaseObject returns the Helm release that runs this pod, nil if there is
// none.
func (i *installer) selfReleaseObject() (*release.Release, error) {
	if i.selfRelease == "" {
		return nil, nil
	}
	cfg, err := i.actionConfig(i.selfNamespace)
	if err != nil {
		return nil, err
	}
	rel, err := action.NewGet(cfg).Run(i.selfRelease)
	if errors.Is(err, driver.ErrReleaseNotFound) {
		return nil, nil
	}
	return rel, err
}

// planSelfUpdate works out how plugin-hub can update itself. strict fails when
// the cluster cannot be checked for compatibility, as install and upgrade do.
func (i *installer) planSelfUpdate(ctx context.Context, index extensionIndex, strict bool) (selfPlan, error) {
	t, err := i.selfTarget(index)
	if err != nil {
		return selfPlan{}, err
	}
	rel, err := i.selfReleaseObject()
	if err != nil {
		return selfPlan{}, fmt.Errorf("read release %s/%s: %w", i.selfNamespace, i.selfRelease, err)
	}
	p := selfPlan{target: t, rel: rel}
	st := &p.status
	st.Version = i.runningVersion()
	st.ChartVersion = i.selfChartVersion
	switch {
	case rel == nil:
		st.Mode = selfUnmanaged
		st.ValuesPath = i.imageTagPath(valuesPrefix(i.selfTemplatePath) != "")
	case rel.Chart != nil && rel.Chart.Metadata != nil && rel.Chart.Metadata.Name == selfChartName:
		st.Mode = selfStandalone
		st.ValuesPath = i.imageTagPath(false)
		st.ChartVersion = rel.Chart.Metadata.Version
		// A standalone update moves the chart, which the catalog versions.
		st.Version = rel.Chart.Metadata.Version
	default:
		st.Mode = selfBundled
		st.ValuesPath = i.imageTagPath(true)
		if rel.Chart != nil && rel.Chart.Metadata != nil {
			st.ParentChart = rel.Chart.Metadata.Name
			st.ParentChartVersion = rel.Chart.Metadata.Version
		}
		st.ParentChartRepository = i.coreChartRepo
	}
	if rel != nil {
		st.Release, st.Namespace = rel.Name, rel.Namespace
	}

	p.check, err = i.compatCheck(ctx, t)
	if err != nil {
		if strict {
			return selfPlan{}, err
		}
		log.Printf("installer: self-update offered without a compatibility check: %v", err)
	}
	p.candidates = newerReleases(t.Releases, st.Version, p.check)
	st.Available, st.Blocked = pickSelfUpdate(p.candidates, st.Mode == selfBundled, st.ChartVersion)
	return p, nil
}

// selfUpdateStatus reports how plugin-hub can update itself, for the UI.
func (i *installer) selfUpdateStatus(ctx context.Context, index extensionIndex) *selfUpdateStatus {
	p, err := i.planSelfUpdate(ctx, index, false)
	if err != nil {
		log.Printf("installer: self-update status: %v", err)
		return &selfUpdateStatus{Error: err.Error()}
	}
	return &p.status
}

// selfUpdate updates plugin-hub to version, by default the newest one it can.
func (i *installer) selfUpdate(ctx context.Context, index extensionIndex, version string) (releaseInfo, error) {
	i.mu.Lock()
	defer i.mu.Unlock()

	p, err := i.planSelfUpdate(ctx, index, true)
	if err != nil {
		return releaseInfo{}, err
	}
	st := p.status
	if version == "" {
		version = st.Available
	}
	if version == "" {
		if st.Blocked != nil {
			return releaseInfo{}, errConflict{blockedMessage(st)}
		}
		return releaseInfo{}, errConflict{fmt.Sprintf("plugin-hub %s is the newest release that works with this cluster", st.Version)}
	}
	var picked *catalogRelease
	for idx := range p.candidates {
		if p.candidates[idx].Version == version {
			picked = &p.candidates[idx]
		}
	}
	if picked == nil {
		return releaseInfo{}, errBadRequest{fmt.Sprintf(
			"%s is not a newer release of plugin-hub that works with this cluster", version)}
	}

	switch st.Mode {
	case selfUnmanaged:
		return releaseInfo{}, errConflict{fmt.Sprintf(
			"plugin-hub is not deployed by a Helm release; set %s=%s where it is deployed (e.g. the Argo CD application)",
			st.ValuesPath, version)}
	case selfStandalone:
		t := p.target
		t.Release, t.Namespace = p.rel.Name, p.rel.Namespace
		return i.upgradeLocked(ctx, t, actionRequest{Version: version})
	}
	if minimum := minChartFor(version, picked.MinChartVersion); !chartRuns(st.ChartVersion, minimum) {
		return releaseInfo{}, errConflict{blockedMessage(selfUpdateStatus{
			ChartVersion: st.ChartVersion, Blocked: &blockedRelease{Version: version, MinChartVersion: minimum}})}
	}
	return i.updateBundledImage(ctx, p, version)
}

func blockedMessage(st selfUpdateStatus) string {
	return fmt.Sprintf("plugin-hub %s needs plugin-hub chart %s or later, and the OpenEverest chart bundles %s; "+
		"upgrade the OpenEverest chart to a release that bundles it", st.Blocked.Version, st.Blocked.MinChartVersion,
		orUnknown(st.ChartVersion))
}

func orUnknown(v string) string {
	if v == "" {
		return "an unknown version"
	}
	return v
}

// updateBundledImage upgrades the release plugin-hub is bundled in with the
// chart it runs, changing only plugin-hub's image tag.
func (i *installer) updateBundledImage(ctx context.Context, p selfPlan, version string) (releaseInfo, error) {
	cfg, err := i.actionConfig(p.rel.Namespace)
	if err != nil {
		return releaseInfo{}, err
	}
	up := action.NewUpgrade(cfg)
	up.Namespace = p.rel.Namespace
	up.Timeout = helmOperationTimeout
	// The same chart with the same values, but for the image tag.
	up.ReuseValues = true
	// The upgrade replaces this pod; waiting for the rollout would wait on
	// our own replacement.
	up.Wait = false
	up.SetRegistryClient(i.registry)

	// The pulled plugin-hub chart is authoritative over the catalog, as for
	// any install.
	opts := up.ChartPathOptions
	opts.Version = version
	hub, err := i.loadChart(&opts, p.target.ChartRef)
	if err != nil {
		return releaseInfo{}, err
	}
	var annotations map[string]string
	if hub.Metadata != nil {
		annotations = hub.Metadata.Annotations
	}
	if minimum := minChartFor(version, annotations[minChartVersionAnnotation]); !chartRuns(p.status.ChartVersion, minimum) {
		return releaseInfo{}, errConflict{blockedMessage(selfUpdateStatus{
			ChartVersion: p.status.ChartVersion, Blocked: &blockedRelease{Version: version, MinChartVersion: minimum}})}
	}
	// Nothing to acknowledge: the chart, and so what core admits, stays.
	if _, err := admitChart(p.target, version, annotations, p.check, false); err != nil {
		return releaseInfo{}, err
	}

	ch, err := i.loadParentChart(up.ChartPathOptions, p.rel)
	if err != nil {
		return releaseInfo{}, err
	}
	rel, err := up.RunWithContext(ctx, p.rel.Name, ch, nestedValue(p.status.ValuesPath, version))
	if err != nil {
		return releaseInfo{}, err
	}
	info := i.selfReleaseInfo(rel)
	info.AppVersion = version
	return info, nil
}

// loadParentChart pulls the chart rel runs from the core chart repository and
// checks it is that chart, with the running plugin-hub chart in it.
func (i *installer) loadParentChart(opts action.ChartPathOptions, rel *release.Release) (*chart.Chart, error) {
	if rel.Chart == nil || rel.Chart.Metadata == nil {
		return nil, fmt.Errorf("release %s/%s has no chart", rel.Namespace, rel.Name)
	}
	name, version := rel.Chart.Metadata.Name, rel.Chart.Metadata.Version
	ref, repoURL := chartLocation(i.coreChartRepo, name)
	manual := "update plugin-hub with helm: " + manualUpdateCommand(rel.Name, rel.Namespace, ref, repoURL, version,
		i.imageTagPath(true), "<version>")
	opts.Version = version
	opts.RepoURL = repoURL
	ch, err := i.loadChart(&opts, ref)
	if err != nil {
		return nil, errConflict{fmt.Sprintf("could not pull %s %s from %s (%v); %s", name, version, i.coreChartRepo, err, manual)}
	}
	if err := sameChart(rel.Chart, ch); err != nil {
		return nil, errConflict{fmt.Sprintf("%s %s from %s is not the chart release %s/%s runs: %v; %s",
			name, version, i.coreChartRepo, rel.Namespace, rel.Name, err, manual)}
	}
	if got := bundledVersion(ch); got != i.selfChartVersion {
		return nil, errConflict{fmt.Sprintf("%s %s from %s bundles plugin-hub chart %s, but %s is running; %s",
			name, version, i.coreChartRepo, orUnknown(got), orUnknown(i.selfChartVersion), manual)}
	}
	return ch, nil
}

// chartLocation is the reference and repository URL Helm pulls chart name
// from repo with: an OCI repository has no index, so the name joins the URL.
func chartLocation(repo, name string) (ref, repoURL string) {
	if strings.HasPrefix(repo, "oci://") {
		return strings.TrimSuffix(repo, "/") + "/" + name, ""
	}
	return name, repo
}

// manualUpdateCommand is the helm command that does what a bundled self-update
// does.
func manualUpdateCommand(release, namespace, ref, repoURL, chartVersion, valuesPath, version string) string {
	cmd := fmt.Sprintf("helm upgrade %s %s", release, ref)
	if repoURL != "" {
		cmd += " --repo " + repoURL
	}
	return cmd + fmt.Sprintf(" -n %s --version %s --reuse-values --set %s=%s", namespace, chartVersion, valuesPath, version)
}

// sameChart reports how pulled differs from stored, the chart a release keeps:
// its name, version and root templates. Subcharts are not stored.
func sameChart(stored, pulled *chart.Chart) error {
	if pulled.Metadata == nil || pulled.Metadata.Name != stored.Metadata.Name ||
		pulled.Metadata.Version != stored.Metadata.Version {
		return errors.New("name or version differ")
	}
	want := map[string][]byte{}
	for _, f := range stored.Templates {
		want[f.Name] = f.Data
	}
	if len(pulled.Templates) != len(want) {
		return errors.New("templates differ")
	}
	for _, f := range pulled.Templates {
		if data, ok := want[f.Name]; !ok || !bytes.Equal(data, f.Data) {
			return fmt.Errorf("template %s differs", f.Name)
		}
	}
	return nil
}

// bundledVersion is the version of the plugin-hub chart in ch, "" if none.
func bundledVersion(ch *chart.Chart) string {
	for _, dep := range ch.Dependencies() {
		if dep.Metadata != nil && dep.Metadata.Name == selfChartName {
			return dep.Metadata.Version
		}
	}
	return ""
}

type selfUpdateRequest struct {
	// Version is a newer release of plugin-hub; by default the newest one it
	// can update to.
	Version string `json:"version,omitempty"`
}

func makeSelfUpdateHandler(inst *installer, cache *catalogCache) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req selfUpdateRequest
		if err := json.NewDecoder(io.LimitReader(r.Body, maxActionBodyBytes)).Decode(&req); err != nil && !errors.Is(err, io.EOF) {
			apiError(w, http.StatusBadRequest, "invalid request body")
			return
		}
		caller, index, ok := authorizeAdmin(w, r, inst, cache, "update plugin-hub")
		if !ok {
			return
		}
		requested := req.Version
		if requested == "" {
			requested = "newest available"
		}
		log.Printf("installer: %s requested a self-update of plugin-hub to %s", caller.subject, requested)
		ctx, cancel := context.WithTimeout(r.Context(), helmOperationTimeout)
		defer cancel()
		info, err := inst.selfUpdate(ctx, index, req.Version)
		if err != nil {
			log.Printf("installer: self-update of plugin-hub failed: %v", err)
			writeOperationError(w, "update", err)
			return
		}
		log.Printf("installer: self-update of plugin-hub to %s succeeded (release %s/%s, status %s)",
			info.AppVersion, info.Namespace, info.Release, info.Status)
		writeJSON(w, http.StatusOK, info)
	}
}
