// Backend for the OpenEverest "plugin-hub" generic plugin.
//
// Surfaces three categories of HTTP routes:
//
//  1. Bundle + icon + health   — served straight from embedded files.
//  2. Catalog                  — fetches the upstream hub index, caches it in
//                                memory, and returns the parsed JSON. Falls
//                                back to the last successful response when the
//                                upstream is unreachable.
//  3. Installed extensions     — proxied call to the OpenEverest API server,
//                                forwarding the caller's X-Everest-User JWT.
//  4. Summary                  — server-side join of catalog + installed,
//                                annotating each catalog entry with its
//                                install status. Single round-trip for the UI.
package main

import (
	"crypto/sha256"
	"embed"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

//go:embed dist/main.js
var distFS embed.FS

//go:embed dist/icon.png
var iconData []byte

const (
	defaultHubIndexURL    = "https://raw.githubusercontent.com/openeverest/hub/refs/heads/main/index/index.json"
	defaultCacheTTL       = 5 * time.Minute
	upstreamFetchTimeout  = 10 * time.Second
	everestCallTimeout    = 10 * time.Second
	defaultListenPort     = "8080"
	defaultEverestService = "http://everest.everest-system.svc.cluster.local:8080"
	defaultClusterName    = "main"

	iconFetchTimeout    = 8 * time.Second
	iconMaxBytesPerItem = 2 * 1024 * 1024  // 2 MiB
	iconCacheMaxBytes   = 32 * 1024 * 1024 // 32 MiB
	iconCacheMaxItems   = 512
	iconPositiveTTL     = 24 * time.Hour
	iconNegativeTTL     = 5 * time.Minute
)

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

func hubIndexURL() string {
	if v := os.Getenv("HUB_INDEX_URL"); v != "" {
		return v
	}
	return defaultHubIndexURL
}

func cacheTTL() time.Duration {
	if v := os.Getenv("CACHE_TTL_SECONDS"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			return time.Duration(n) * time.Second
		}
	}
	return defaultCacheTTL
}

func everestAPIURL() string {
	if v := os.Getenv("EVEREST_API_URL"); v != "" {
		return strings.TrimRight(v, "/")
	}
	// NOTE: we deliberately do NOT consult the Kubernetes-injected
	// EVEREST_SERVICE_HOST / EVEREST_SERVICE_PORT env vars. Those are a
	// point-in-time snapshot of the everest Service's ClusterIP taken by
	// kubelet when this pod started and are never refreshed. If the everest
	// Service is deleted and recreated (e.g. during a redeploy) it gets a new
	// ClusterIP, the snapshot goes stale, and every request dials a dead IP
	// until this pod is restarted. The stable in-cluster DNS name always
	// resolves to the live ClusterIP, so we rely on it (overridable via
	// EVEREST_API_URL for non-standard deployments).
	return defaultEverestService
}

func listenPort() string {
	if p := os.Getenv("PORT"); p != "" {
		return p
	}
	return defaultListenPort
}

// clusterName is the cluster identifier used in the host API path
// /v1/clusters/{cluster}/providers when listing installed providers.
func clusterName() string {
	if v := os.Getenv("EVEREST_CLUSTER_NAME"); v != "" {
		return v
	}
	return defaultClusterName
}

// ---------------------------------------------------------------------------
// Catalog cache
// ---------------------------------------------------------------------------

type catalogCache struct {
	mu          sync.RWMutex
	ttl         time.Duration
	url         string
	client      *http.Client
	body        []byte // last successful raw JSON body
	fetchedAt   time.Time
	lastErr     error
	lastErrAt   time.Time
}

func newCatalogCache(url string, ttl time.Duration) *catalogCache {
	return &catalogCache{
		ttl:    ttl,
		url:    url,
		client: &http.Client{Timeout: upstreamFetchTimeout},
	}
}

// get returns the catalog body, a flag indicating whether it was served from
// stale cache, and any error. If the cache is fresh it returns immediately
// without an upstream call.
func (c *catalogCache) get() (body []byte, stale bool, err error) {
	c.mu.RLock()
	if c.body != nil && time.Since(c.fetchedAt) < c.ttl {
		body = c.body
		c.mu.RUnlock()
		return body, false, nil
	}
	c.mu.RUnlock()

	c.mu.Lock()
	defer c.mu.Unlock()
	// Re-check after acquiring the write lock.
	if c.body != nil && time.Since(c.fetchedAt) < c.ttl {
		return c.body, false, nil
	}

	fresh, fetchErr := c.fetchLocked()
	if fetchErr == nil {
		c.body = fresh
		c.fetchedAt = time.Now()
		c.lastErr = nil
		return fresh, false, nil
	}

	c.lastErr = fetchErr
	c.lastErrAt = time.Now()
	if c.body != nil {
		// Serve stale.
		return c.body, true, nil
	}
	return nil, false, fetchErr
}

func (c *catalogCache) fetchLocked() ([]byte, error) {
	req, err := http.NewRequest(http.MethodGet, c.url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode/100 != 2 {
		return nil, fmt.Errorf("hub index upstream returned status %d", resp.StatusCode)
	}
	return io.ReadAll(resp.Body)
}

// ---------------------------------------------------------------------------
// Icon proxy
// ---------------------------------------------------------------------------
//
// The upstream catalog references icons by absolute URLs (typically
// raw.githubusercontent.com). The host UI enforces a `default-src 'self'`
// CSP that blocks those cross-origin image loads, so the backend rewrites
// every absolute icon URL in the catalog/summary responses to a *relative*
// path (e.g. `api/icon/<key>`). The frontend then prepends the plugin's
// runtime mount prefix (`/v1/plugins/<pluginName>`) — derived from the
// SDK-supplied pluginName — so the URL is always correct regardless of the
// release name the chart was installed under.
//
// Keys are SHA-256 of the upstream URL: stable, opaque, and content-addressed
// by URL (no caller-supplied URL parameter, no SSRF surface). Only URLs that
// appeared in a validated catalog response can be fetched.

type iconEntry struct {
	body        []byte
	contentType string
	err         error
	cachedAt    time.Time
}

type iconProxy struct {
	mu         sync.Mutex
	urls       map[string]string    // key -> upstream URL (populated on catalog rewrite)
	cache      map[string]iconEntry // key -> cached fetch result
	order      []string             // FIFO eviction order
	totalBytes int64
	client     *http.Client
}

func newIconProxy() *iconProxy {
	return &iconProxy{
		urls:   map[string]string{},
		cache:  map[string]iconEntry{},
		client: &http.Client{Timeout: iconFetchTimeout},
	}
}

// register validates the URL and, if proxiable, records the mapping and
// returns a *relative* path (`api/icon/<key>`) the frontend will resolve
// against its runtime plugin mount prefix. Non-absolute, data:, or otherwise
// unproxiable values are returned unchanged so the frontend can still render
// them inline.
func (p *iconProxy) register(rawURL string) string {
	if rawURL == "" {
		return ""
	}
	u, err := url.Parse(rawURL)
	if err != nil || u.Host == "" {
		return rawURL
	}
	if u.Scheme != "http" && u.Scheme != "https" {
		return rawURL
	}
	sum := sha256.Sum256([]byte(rawURL))
	key := hex.EncodeToString(sum[:])

	p.mu.Lock()
	p.urls[key] = rawURL
	p.mu.Unlock()
	return "api/icon/" + key
}

// rewriteCatalogBody parses the raw upstream catalog JSON, rewrites every
// extensions[].icon to a proxy URL, and returns the new bytes. On parse
// failure it returns the original body unchanged so the catalog endpoint
// stays useful even if the upstream schema drifts.
func (p *iconProxy) rewriteCatalogBody(body []byte) []byte {
	var doc map[string]any
	if err := json.Unmarshal(body, &doc); err != nil {
		log.Printf("icon rewrite: parse failed, serving upstream verbatim: %v", err)
		return body
	}
	exts, ok := doc["extensions"].([]any)
	if !ok {
		return body
	}
	for _, e := range exts {
		m, ok := e.(map[string]any)
		if !ok {
			continue
		}
		icon, ok := m["icon"].(string)
		if !ok || icon == "" {
			continue
		}
		m["icon"] = p.register(icon)
	}
	out, err := json.Marshal(doc)
	if err != nil {
		log.Printf("icon rewrite: marshal failed, serving upstream verbatim: %v", err)
		return body
	}
	return out
}

// serve handles GET /api/icon/{key}. Unknown keys and upstream failures fall
// back to the embedded plugin icon so the UI never shows a broken image.
func (p *iconProxy) serve(w http.ResponseWriter, r *http.Request) {
	key := r.PathValue("key")
	p.mu.Lock()
	rawURL, known := p.urls[key]
	entry, cached := p.cache[key]
	p.mu.Unlock()

	if !known {
		writeEmbeddedIcon(w, "public, max-age=300")
		return
	}
	if cached {
		ttl := iconPositiveTTL
		if entry.err != nil {
			ttl = iconNegativeTTL
		}
		if time.Since(entry.cachedAt) < ttl {
			if entry.err != nil {
				writeEmbeddedIcon(w, "public, max-age=60")
				return
			}
			writeIcon(w, entry.contentType, entry.body)
			return
		}
	}

	body, ct, fetchErr := p.fetch(rawURL)
	p.store(key, body, ct, fetchErr)
	if fetchErr != nil {
		log.Printf("icon fetch failed for %s: %v", rawURL, fetchErr)
		writeEmbeddedIcon(w, "public, max-age=60")
		return
	}
	writeIcon(w, ct, body)
}

func (p *iconProxy) fetch(rawURL string) ([]byte, string, error) {
	req, err := http.NewRequest(http.MethodGet, rawURL, nil)
	if err != nil {
		return nil, "", err
	}
	req.Header.Set("Accept", "image/*")
	resp, err := p.client.Do(req)
	if err != nil {
		return nil, "", err
	}
	defer resp.Body.Close()
	if resp.StatusCode/100 != 2 {
		return nil, "", fmt.Errorf("upstream returned status %d", resp.StatusCode)
	}
	ct := resp.Header.Get("Content-Type")
	if ct == "" {
		ct = "application/octet-stream"
	}
	if !strings.HasPrefix(strings.ToLower(ct), "image/") {
		return nil, "", fmt.Errorf("upstream content-type %q is not an image", ct)
	}
	body, err := io.ReadAll(io.LimitReader(resp.Body, iconMaxBytesPerItem+1))
	if err != nil {
		return nil, "", err
	}
	if int64(len(body)) > iconMaxBytesPerItem {
		return nil, "", fmt.Errorf("upstream icon exceeds %d bytes", iconMaxBytesPerItem)
	}
	return body, ct, nil
}

func (p *iconProxy) store(key string, body []byte, ct string, fetchErr error) {
	p.mu.Lock()
	defer p.mu.Unlock()
	// Drop any prior bytes for this key from the total.
	if prev, ok := p.cache[key]; ok {
		p.totalBytes -= int64(len(prev.body))
	} else {
		p.order = append(p.order, key)
	}
	p.cache[key] = iconEntry{
		body:        body,
		contentType: ct,
		err:         fetchErr,
		cachedAt:    time.Now(),
	}
	p.totalBytes += int64(len(body))

	// Evict FIFO until we're back under both caps.
	for len(p.order) > 0 && (len(p.cache) > iconCacheMaxItems || p.totalBytes > iconCacheMaxBytes) {
		victim := p.order[0]
		p.order = p.order[1:]
		if victim == key {
			// Don't evict the entry we just inserted; rotate it instead.
			p.order = append(p.order, victim)
			break
		}
		if e, ok := p.cache[victim]; ok {
			p.totalBytes -= int64(len(e.body))
			delete(p.cache, victim)
		}
	}
}

func writeIcon(w http.ResponseWriter, contentType string, body []byte) {
	w.Header().Set("Content-Type", contentType)
	w.Header().Set("Cache-Control", "public, max-age=86400, immutable")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	_, _ = w.Write(body)
}

func writeEmbeddedIcon(w http.ResponseWriter, cacheControl string) {
	w.Header().Set("Content-Type", "image/png")
	w.Header().Set("Cache-Control", cacheControl)
	w.Header().Set("X-Content-Type-Options", "nosniff")
	_, _ = w.Write(iconData)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("writeJSON error: %v", err)
	}
}

func apiError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

// handleBundle serves the dynamically loaded plugin frontend.
func handleBundle(w http.ResponseWriter, _ *http.Request) {
	data, err := distFS.ReadFile("dist/main.js")
	if err != nil {
		http.Error(w, "bundle not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/javascript")
	w.Header().Set("Cache-Control", "public, max-age=3600")
	_, _ = w.Write(data)
}

// handleIcon serves the plugin's own sidebar icon (embedded asset).
func handleIcon(w http.ResponseWriter, _ *http.Request) {
	writeEmbeddedIcon(w, "public, max-age=86400")
}

func handleHealthz(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte("ok"))
}

func makeCatalogHandler(cache *catalogCache, icons *iconProxy) http.HandlerFunc {
	return func(w http.ResponseWriter, _ *http.Request) {
		body, stale, err := cache.get()
		if err != nil {
			apiError(w, http.StatusBadGateway, "failed to fetch hub index: "+err.Error())
			return
		}
		body = icons.rewriteCatalogBody(body)
		w.Header().Set("Content-Type", "application/json")
		if stale {
			w.Header().Set("X-Hub-Stale", "true")
		}
		_, _ = w.Write(body)
	}
}

// fetchInstalled discovers what is currently installed on the host by
// hitting two endpoints in parallel-ish (sequentially is fine; both are cheap
// in-cluster calls):
//
//   - GET /v1/clusters/{cluster}/providers — Kubernetes-style list, one item
//     per installed Provider CR. The catalog name lives at metadata.name,
//     the chart version at metadata.labels["app.kubernetes.io/version"].
//   - GET /v1/plugins — flat list of host-registered generic plugins. Catalog
//     name lives at .name, version at .version.
//
// We surface a non-fatal error if either call fails so the UI can still show
// partial state. A 404 on either endpoint is treated as "feature absent" and
// returns an empty list silently — the host may not expose both kinds yet.
func fetchInstalled(apiBase, cluster, authHeader string) ([]installedExtension, error) {
	if apiBase == "" {
		return nil, errors.New("everest API URL not configured")
	}
	var (
		all  []installedExtension
		errs []string
	)
	if providers, err := fetchProviders(apiBase, cluster, authHeader); err != nil {
		errs = append(errs, "providers: "+err.Error())
	} else {
		all = append(all, providers...)
	}
	if plugins, err := fetchPlugins(apiBase, authHeader); err != nil {
		errs = append(errs, "plugins: "+err.Error())
	} else {
		all = append(all, plugins...)
	}
	if len(errs) > 0 {
		return all, errors.New(strings.Join(errs, "; "))
	}
	return all, nil
}

func fetchProviders(apiBase, cluster, authHeader string) ([]installedExtension, error) {
	body, err := everestGET(apiBase+"/v1/clusters/"+url.PathEscape(cluster)+"/providers", authHeader)
	if err != nil {
		return nil, err
	}
	if body == nil {
		return nil, nil
	}
	var payload struct {
		Items []struct {
			Metadata struct {
				Name   string            `json:"name"`
				Labels map[string]string `json:"labels"`
			} `json:"metadata"`
		} `json:"items"`
	}
	if err := json.Unmarshal(body, &payload); err != nil {
		return nil, fmt.Errorf("decode providers: %w", err)
	}
	out := make([]installedExtension, 0, len(payload.Items))
	for _, it := range payload.Items {
		if it.Metadata.Name == "" {
			continue
		}
		version := ""
		if it.Metadata.Labels != nil {
			version = it.Metadata.Labels["app.kubernetes.io/version"]
		}
		out = append(out, installedExtension{
			Name:    it.Metadata.Name,
			Type:    "provider",
			Version: version,
		})
	}
	return out, nil
}

func fetchPlugins(apiBase, authHeader string) ([]installedExtension, error) {
	body, err := everestGET(apiBase+"/v1/plugins", authHeader)
	if err != nil {
		return nil, err
	}
	if body == nil {
		return nil, nil
	}
	var items []struct {
		Name    string `json:"name"`
		Version string `json:"version"`
	}
	if err := json.Unmarshal(body, &items); err != nil {
		return nil, fmt.Errorf("decode plugins: %w", err)
	}
	out := make([]installedExtension, 0, len(items))
	for _, it := range items {
		if it.Name == "" {
			continue
		}
		out = append(out, installedExtension{
			Name:    it.Name,
			Type:    "plugin",
			Version: it.Version,
		})
	}
	return out, nil
}

// everestGET performs an authenticated GET against the host API. A 404 is
// translated to (nil, nil) so callers can treat it as "feature unavailable".
// authHeader is forwarded verbatim into the outbound Authorization header
// (caller is responsible for any "Bearer " prefix).
func everestGET(url, authHeader string) ([]byte, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	if authHeader != "" {
		req.Header.Set("Authorization", authHeader)
	}
	req.Header.Set("Accept", "application/json")

	client := &http.Client{Timeout: everestCallTimeout}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusNotFound {
		return nil, nil
	}
	if resp.StatusCode/100 != 2 {
		return nil, fmt.Errorf("status %d", resp.StatusCode)
	}
	return io.ReadAll(resp.Body)
}

// resolveAuthHeader extracts the auth credential the host attaches to the
// inbound plugin request. The OpenEverest gateway forwards the user's JWT as
// a standard Authorization: Bearer <token> header; we pass it through to the
// upstream API verbatim. Legacy X-Everest-User is supported as a fallback so
// older host versions keep working.
func resolveAuthHeader(r *http.Request) string {
	if v := r.Header.Get("Authorization"); v != "" {
		return v
	}
	if v := r.Header.Get("X-Everest-User"); v != "" {
		return "Bearer " + v
	}
	return ""
}

func makeInstalledHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := fetchInstalled(everestAPIURL(), clusterName(), resolveAuthHeader(r))
		if err != nil && len(items) == 0 {
			apiError(w, http.StatusBadGateway, err.Error())
			return
		}
		resp := map[string]any{"items": items}
		if err != nil {
			resp["error"] = err.Error()
		}
		writeJSON(w, http.StatusOK, resp)
	}
}

func makeSummaryHandler(cache *catalogCache, icons *iconProxy) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		catalogBody, stale, err := cache.get()
		if err != nil {
			apiError(w, http.StatusBadGateway, "failed to fetch hub index: "+err.Error())
			return
		}

		var index extensionIndex
		if err := json.Unmarshal(catalogBody, &index); err != nil {
			apiError(w, http.StatusInternalServerError, "failed to parse hub index: "+err.Error())
			return
		}

		installed, installedErr := fetchInstalled(everestAPIURL(), clusterName(), resolveAuthHeader(r))
		// Match on (type, name) — plugins and providers live in separate
		// namespaces upstream, so we don't want a same-named plugin and
		// provider to alias each other.
		installedByKey := map[string]installedExtension{}
		for _, ie := range installed {
			installedByKey[ie.Type+":"+ie.Name] = ie
		}

		out := summaryResponse{
			APIVersion: index.APIVersion,
			Kind:       index.Kind,
			Metadata:   index.Metadata,
			Stale:      stale,
		}
		if installedErr != nil {
			out.InstalledError = installedErr.Error()
		}
		for _, ext := range index.Extensions {
			ie, ok := installedByKey[ext.Type+":"+ext.Name]
			ext.Installed = ok
			if ok && ie.Version != "" {
				ext.InstalledVersion = ie.Version
			}
			ext.Icon = icons.register(ext.Icon)
			out.Extensions = append(out.Extensions, ext)
		}

		w.Header().Set("Content-Type", "application/json")
		if stale {
			w.Header().Set("X-Hub-Stale", "true")
		}
		_ = json.NewEncoder(w).Encode(out)
	}
}

// ---------------------------------------------------------------------------
// Data shapes
// ---------------------------------------------------------------------------

type extensionIndex struct {
	APIVersion string             `json:"apiVersion"`
	Kind       string             `json:"kind"`
	Metadata   map[string]any     `json:"metadata"`
	Extensions []extensionSummary `json:"extensions"`
}

// extensionSummary is intentionally permissive — the upstream shape evolves,
// so we keep raw maps for nested blobs we don't need to interpret server-side.
type extensionSummary struct {
	Name             string         `json:"name"`
	Type             string         `json:"type"`
	DisplayName      string         `json:"displayName"`
	Description      string         `json:"description"`
	Icon             string         `json:"icon"`
	Homepage         string         `json:"homepage"`
	SourceRepo       string         `json:"sourceRepo"`
	License          string         `json:"license"`
	Verified         bool           `json:"verified"`
	Health           string         `json:"health"`
	Categories       []string       `json:"categories"`
	Keywords         []string       `json:"keywords"`
	Maintainers      []any          `json:"maintainers"`
	Compatibility    map[string]any `json:"compatibility"`
	Artifacts        map[string]any `json:"artifacts"`
	Install          map[string]any `json:"install"`
	Plugin           map[string]any `json:"plugin,omitempty"`
	Provider         map[string]any `json:"provider,omitempty"`
	Maturity         string         `json:"maturity,omitempty"`
	Capabilities     map[string]any `json:"capabilities,omitempty"`
	Access           string         `json:"access,omitempty"`
	Gated            map[string]any `json:"gated,omitempty"`
	Installed        bool           `json:"installed"`
	InstalledVersion string         `json:"installedVersion,omitempty"`
	InstalledPhase   string         `json:"installedPhase,omitempty"`
}

// installedExtension is a normalized view of "something currently installed".
// Type is "plugin" or "provider".
type installedExtension struct {
	Name    string `json:"name"`
	Type    string `json:"type"`
	Version string `json:"version,omitempty"`
}

type summaryResponse struct {
	APIVersion     string             `json:"apiVersion"`
	Kind           string             `json:"kind"`
	Metadata       map[string]any     `json:"metadata"`
	Extensions     []extensionSummary `json:"extensions"`
	Stale          bool               `json:"stale"`
	InstalledError string             `json:"installedError,omitempty"`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

func main() {
	cache := newCatalogCache(hubIndexURL(), cacheTTL())
	icons := newIconProxy()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /main.js", handleBundle)
	mux.HandleFunc("GET /icon.png", handleIcon)
	mux.HandleFunc("GET /healthz", handleHealthz)
	mux.HandleFunc("GET /api/catalog", makeCatalogHandler(cache, icons))
	mux.HandleFunc("GET /api/installed", makeInstalledHandler())
	mux.HandleFunc("GET /api/summary", makeSummaryHandler(cache, icons))
	mux.HandleFunc("GET /api/icon/{key}", icons.serve)

	port := listenPort()
	log.Printf("plugin-hub backend listening on :%s (hub: %s, everest: %s, cache TTL: %s)",
		port, hubIndexURL(), everestAPIURL(), cacheTTL())
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
