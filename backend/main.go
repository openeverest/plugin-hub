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
	"embed"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
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
	defaultEverestService = "http://everest-server.everest-system.svc.cluster.local:8080"
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
	host := os.Getenv("EVEREST_SERVICE_HOST")
	port := os.Getenv("EVEREST_SERVICE_PORT")
	if host != "" && port != "" {
		return fmt.Sprintf("http://%s:%s", host, port)
	}
	return defaultEverestService
}

func listenPort() string {
	if p := os.Getenv("PORT"); p != "" {
		return p
	}
	return defaultListenPort
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

// handleIcon serves the plugin icon.
func handleIcon(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "image/png")
	w.Header().Set("Cache-Control", "public, max-age=86400")
	_, _ = w.Write(iconData)
}

func handleHealthz(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte("ok"))
}

func makeCatalogHandler(cache *catalogCache) http.HandlerFunc {
	return func(w http.ResponseWriter, _ *http.Request) {
		body, stale, err := cache.get()
		if err != nil {
			apiError(w, http.StatusBadGateway, "failed to fetch hub index: "+err.Error())
			return
		}
		w.Header().Set("Content-Type", "application/json")
		if stale {
			w.Header().Set("X-Hub-Stale", "true")
		}
		_, _ = w.Write(body)
	}
}

// fetchInstalled calls the OpenEverest API for the list of installed
// extensions, forwarding the caller's JWT as a bearer token. A 404 is
// translated to an empty list so the UI works on hosts that haven't yet
// shipped the endpoint.
func fetchInstalled(apiBase string, userJWT string) ([]installedExtension, error) {
	if apiBase == "" {
		return nil, errors.New("everest API URL not configured")
	}
	req, err := http.NewRequest(http.MethodGet, apiBase+"/v1/installed-extensions", nil)
	if err != nil {
		return nil, err
	}
	if userJWT != "" {
		req.Header.Set("Authorization", "Bearer "+userJWT)
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
		return nil, fmt.Errorf("everest API returned status %d", resp.StatusCode)
	}

	var payload installedExtensionsResponse
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		return nil, fmt.Errorf("decode installed extensions: %w", err)
	}
	if len(payload.Items) > 0 {
		return payload.Items, nil
	}
	return payload.InstalledExtensions, nil
}

func makeInstalledHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := fetchInstalled(everestAPIURL(), r.Header.Get("X-Everest-User"))
		if err != nil {
			apiError(w, http.StatusBadGateway, err.Error())
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"items": items})
	}
}

func makeSummaryHandler(cache *catalogCache) http.HandlerFunc {
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

		installed, installedErr := fetchInstalled(everestAPIURL(), r.Header.Get("X-Everest-User"))
		// Build a quick lookup keyed by the canonical extension name.
		installedByName := map[string]installedExtension{}
		for _, ie := range installed {
			key := installedExtensionKey(ie)
			if key != "" {
				installedByName[key] = ie
			}
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
			ie, ok := installedByName[ext.Name]
			ext.Installed = ok
			if ok {
				ext.InstalledVersion = ie.Version
				ext.InstalledPhase = ie.Status.Phase
			}
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
	Installed        bool           `json:"installed"`
	InstalledVersion string         `json:"installedVersion,omitempty"`
	InstalledPhase   string         `json:"installedPhase,omitempty"`
}

type installedExtensionsResponse struct {
	Items               []installedExtension `json:"items"`
	InstalledExtensions []installedExtension `json:"installedExtensions"`
}

type installedExtension struct {
	Name    string `json:"name"`
	Type    string `json:"type"`
	Version string `json:"version"`
	Spec    struct {
		Type     string `json:"type"`
		Plugin   struct {
			PluginCRName string `json:"pluginCRName"`
		} `json:"plugin"`
		Provider struct {
			ProviderName string `json:"providerName"`
		} `json:"provider"`
	} `json:"spec"`
	Status struct {
		Phase string `json:"phase"`
	} `json:"status"`
}

type summaryResponse struct {
	APIVersion     string             `json:"apiVersion"`
	Kind           string             `json:"kind"`
	Metadata       map[string]any     `json:"metadata"`
	Extensions     []extensionSummary `json:"extensions"`
	Stale          bool               `json:"stale"`
	InstalledError string             `json:"installedError,omitempty"`
}

// installedExtensionKey returns the catalog name to match against. The CR
// spec is the authoritative source; the top-level metadata.name is used as a
// fallback because some early host versions surfaced installs under the same
// name as the Plugin CR / provider.
func installedExtensionKey(ie installedExtension) string {
	if ie.Spec.Plugin.PluginCRName != "" {
		return ie.Spec.Plugin.PluginCRName
	}
	if ie.Spec.Provider.ProviderName != "" {
		return ie.Spec.Provider.ProviderName
	}
	return ie.Name
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

func main() {
	cache := newCatalogCache(hubIndexURL(), cacheTTL())

	mux := http.NewServeMux()
	mux.HandleFunc("GET /main.js", handleBundle)
	mux.HandleFunc("GET /icon.png", handleIcon)
	mux.HandleFunc("GET /healthz", handleHealthz)
	mux.HandleFunc("GET /api/catalog", makeCatalogHandler(cache))
	mux.HandleFunc("GET /api/installed", makeInstalledHandler())
	mux.HandleFunc("GET /api/summary", makeSummaryHandler(cache))

	port := listenPort()
	log.Printf("plugin-hub backend listening on :%s (hub: %s, everest: %s, cache TTL: %s)",
		port, hubIndexURL(), everestAPIURL(), cacheTTL())
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
