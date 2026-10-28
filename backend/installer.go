// One-click install / upgrade of catalog extensions (opt-in).
//
// Two independent gates protect these endpoints:
//
//  1. Operator opt-in. INSTALLER_ENABLED is only set — and the pod only gets a
//     ServiceAccount bound to a (cluster-admin by default) ClusterRole — when
//     the chart is deployed with installer.enabled=true. With the flag off the
//     endpoints refuse every request and the pod has no Kubernetes rights to
//     install anything anyway.
//  2. Per-request admin check. The caller's token is forwarded to the core
//     /v1/permissions endpoint; only users allowed to create plugins (the
//     admin role by default) may install or upgrade. Core validates the token,
//     so the plugin never trusts client-supplied identity.
//
// The client only ever sends {type, name}. The chart reference, version,
// release name and namespace are resolved from the cached hub catalog, so the
// endpoint cannot be used to deploy arbitrary charts.
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
	"strings"
	"sync"
	"time"

	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/cli"
	"helm.sh/helm/v3/pkg/registry"
	"helm.sh/helm/v3/pkg/release"
	"k8s.io/cli-runtime/pkg/genericclioptions"
)

const (
	helmOperationTimeout = 5 * time.Minute
	helmDriver           = "secret"
	maxActionBodyBytes   = 4 * 1024
)

type installer struct {
	enabled bool
	// selfRelease/selfNamespace identify plugin-hub's own Helm release, which
	// it refuses to modify (an upgrade would restart the pod mid-operation and
	// could silently flip installer.enabled).
	selfRelease   string
	selfNamespace string

	settings *cli.EnvSettings
	registry *registry.Client
	// Helm operations are serialized: this is an admin-only, low-traffic path
	// and serializing avoids racing two operations on the same release.
	mu sync.Mutex
}

func newInstaller() *installer {
	inst := &installer{
		enabled:       strings.EqualFold(os.Getenv("INSTALLER_ENABLED"), "true"),
		selfRelease:   os.Getenv("PLUGIN_HUB_RELEASE_NAME"),
		selfNamespace: os.Getenv("POD_NAMESPACE"),
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
	Type      string
	Name      string
	ChartRef  string
	Version   string
	Release   string
	Namespace string
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
	var artifacts struct {
		Chart struct {
			DefaultChannel string `json:"defaultChannel"`
			Channels       map[string]struct {
				Ref     string `json:"ref"`
				Version string `json:"version"`
			} `json:"channels"`
		} `json:"chart"`
	}
	var install struct {
		Helm struct {
			ReleaseName string `json:"releaseName"`
			Namespace   string `json:"namespace"`
		} `json:"helm"`
	}
	if err := remarshal(ext.Artifacts, &artifacts); err != nil {
		return installTarget{}, fmt.Errorf("invalid artifacts: %w", err)
	}
	if err := remarshal(ext.Install, &install); err != nil {
		return installTarget{}, fmt.Errorf("invalid install spec: %w", err)
	}
	channel, ok := artifacts.Chart.Channels[artifacts.Chart.DefaultChannel]
	if !ok || channel.Ref == "" || channel.Version == "" {
		return installTarget{}, errors.New("catalog entry has no installable default channel")
	}
	target := installTarget{
		Type:      ext.Type,
		Name:      ext.Name,
		ChartRef:  channel.Ref,
		Version:   channel.Version,
		Release:   install.Helm.ReleaseName,
		Namespace: install.Helm.Namespace,
	}
	if target.Release == "" {
		target.Release = ext.Name
	}
	if target.Namespace == "" {
		target.Namespace = "everest-system"
	}
	return target, nil
}

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

// ---------------------------------------------------------------------------
// Helm operations
// ---------------------------------------------------------------------------

type releaseInfo struct {
	Release      string `json:"release"`
	Namespace    string `json:"namespace"`
	ChartVersion string `json:"chartVersion"`
	AppVersion   string `json:"appVersion,omitempty"`
	Status       string `json:"status"`
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

func (i *installer) isSelf(t installTarget) bool {
	return i.selfRelease != "" && t.Release == i.selfRelease &&
		(i.selfNamespace == "" || t.Namespace == i.selfNamespace)
}

func (i *installer) loadChart(opts *action.ChartPathOptions, ref string) (*chart.Chart, error) {
	path, err := opts.LocateChart(ref, i.settings)
	if err != nil {
		return nil, fmt.Errorf("pull chart %s@%s: %w", ref, opts.Version, err)
	}
	return loader.Load(path)
}

func (i *installer) install(ctx context.Context, t installTarget) (releaseInfo, error) {
	i.mu.Lock()
	defer i.mu.Unlock()

	cfg, err := i.actionConfig(t.Namespace)
	if err != nil {
		return releaseInfo{}, err
	}
	if _, err := action.NewGet(cfg).Run(t.Release); err == nil {
		return releaseInfo{}, errConflict{fmt.Sprintf("release %s/%s already exists", t.Namespace, t.Release)}
	}

	inst := action.NewInstall(cfg)
	inst.ReleaseName = t.Release
	inst.Namespace = t.Namespace
	inst.CreateNamespace = true
	inst.Version = t.Version
	inst.Timeout = helmOperationTimeout
	inst.SetRegistryClient(i.registry)

	ch, err := i.loadChart(&inst.ChartPathOptions, t.ChartRef)
	if err != nil {
		return releaseInfo{}, err
	}
	rel, err := inst.RunWithContext(ctx, ch, nil)
	if err != nil {
		return releaseInfo{}, err
	}
	return toReleaseInfo(rel), nil
}

func (i *installer) upgrade(ctx context.Context, t installTarget) (releaseInfo, error) {
	i.mu.Lock()
	defer i.mu.Unlock()

	cfg, err := i.actionConfig(t.Namespace)
	if err != nil {
		return releaseInfo{}, err
	}
	if _, err := action.NewGet(cfg).Run(t.Release); err != nil {
		return releaseInfo{}, errConflict{fmt.Sprintf(
			"release %s/%s not found; it may have been installed under a different name — upgrade it with helm directly",
			t.Namespace, t.Release)}
	}

	up := action.NewUpgrade(cfg)
	up.Namespace = t.Namespace
	up.Version = t.Version
	up.Timeout = helmOperationTimeout
	// Keep the admin's custom values, but pick up new chart defaults.
	up.ResetThenReuseValues = true
	up.SetRegistryClient(i.registry)

	ch, err := i.loadChart(&up.ChartPathOptions, t.ChartRef)
	if err != nil {
		return releaseInfo{}, err
	}
	rel, err := up.RunWithContext(ctx, t.Release, ch, nil)
	if err != nil {
		return releaseInfo{}, err
	}
	return toReleaseInfo(rel), nil
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
		if rel, ok := byKey[t.Namespace+"/"+t.Release]; ok {
			out[ext.Type+":"+ext.Name] = toReleaseInfo(rel)
		}
	}
	return out, nil
}

type errConflict struct{ msg string }

func (e errConflict) Error() string { return e.msg }

// ---------------------------------------------------------------------------
// HTTP handlers
// ---------------------------------------------------------------------------

type installerStatus struct {
	Enabled    bool                   `json:"enabled"`
	CanInstall bool                   `json:"canInstall"`
	Releases   map[string]releaseInfo `json:"releases,omitempty"`
	Error      string                 `json:"error,omitempty"`
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
		writeJSON(w, http.StatusOK, status)
	}
}

type actionRequest struct {
	Type string `json:"type"`
	Name string `json:"name"`
}

type helmOperation func(*installer, context.Context, installTarget) (releaseInfo, error)

func makeInstallerActionHandler(inst *installer, cache *catalogCache, verb string, op helmOperation) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !inst.enabled {
			apiError(w, http.StatusForbidden, "installer is disabled; enable it with --set installer.enabled=true")
			return
		}
		caller, err := resolveCaller(resolveAuthHeader(r))
		if err != nil {
			apiError(w, http.StatusBadGateway, "could not verify permissions: "+err.Error())
			return
		}
		if !caller.canAdmin {
			apiError(w, http.StatusForbidden, "only administrators can "+verb+" extensions")
			return
		}

		var req actionRequest
		if err := json.NewDecoder(io.LimitReader(r.Body, maxActionBodyBytes)).Decode(&req); err != nil {
			apiError(w, http.StatusBadRequest, "invalid request body")
			return
		}
		index, err := loadIndex(cache)
		if err != nil {
			apiError(w, http.StatusBadGateway, err.Error())
			return
		}
		target, err := resolveTarget(index, req.Type, req.Name)
		if err != nil {
			apiError(w, http.StatusBadRequest, err.Error())
			return
		}
		if inst.isSelf(target) {
			apiError(w, http.StatusBadRequest, "plugin-hub cannot "+verb+" itself; use helm directly")
			return
		}

		log.Printf("installer: %s requested %s of %s %q (%s@%s → %s/%s)",
			caller.subject, verb, target.Type, target.Name, target.ChartRef, target.Version, target.Namespace, target.Release)

		ctx, cancel := context.WithTimeout(r.Context(), helmOperationTimeout)
		defer cancel()
		info, err := op(inst, ctx, target)
		if err != nil {
			log.Printf("installer: %s of %s %q failed: %v", verb, target.Type, target.Name, err)
			var conflict errConflict
			if errors.As(err, &conflict) {
				apiError(w, http.StatusConflict, err.Error())
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
