package main

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
	"time"
)

// ---------------------------------------------------------------------------
// catalogCache
// ---------------------------------------------------------------------------

func TestCatalogCache_ServesFreshWithinTTL(t *testing.T) {
	calls := 0
	cache := newCatalogCache(time.Hour, func() ([]byte, error) {
		calls++
		return []byte("body"), nil
	})

	for i := 0; i < 3; i++ {
		body, stale, err := cache.get()
		if err != nil {
			t.Fatalf("get() #%d: unexpected error: %v", i, err)
		}
		if stale {
			t.Fatalf("get() #%d: expected fresh, got stale", i)
		}
		if string(body) != "body" {
			t.Fatalf("get() #%d: body = %q, want %q", i, body, "body")
		}
	}
	if calls != 1 {
		t.Fatalf("fetch called %d times within TTL, want 1", calls)
	}
}

func TestCatalogCache_RefetchesAfterTTL(t *testing.T) {
	calls := 0
	cache := newCatalogCache(5*time.Millisecond, func() ([]byte, error) {
		calls++
		return []byte("body"), nil
	})

	if _, _, err := cache.get(); err != nil {
		t.Fatalf("first get(): %v", err)
	}
	time.Sleep(15 * time.Millisecond)
	if _, _, err := cache.get(); err != nil {
		t.Fatalf("second get(): %v", err)
	}
	if calls != 2 {
		t.Fatalf("fetch called %d times across TTL expiry, want 2", calls)
	}
}

func TestCatalogCache_ServesStaleOnFetchError(t *testing.T) {
	calls := 0
	cache := newCatalogCache(5*time.Millisecond, func() ([]byte, error) {
		calls++
		if calls == 1 {
			return []byte("good"), nil
		}
		return nil, errors.New("upstream down")
	})

	if _, _, err := cache.get(); err != nil {
		t.Fatalf("first get(): %v", err)
	}
	time.Sleep(15 * time.Millisecond)

	body, stale, err := cache.get()
	if err != nil {
		t.Fatalf("get() after fetch failure: unexpected error: %v", err)
	}
	if !stale {
		t.Fatal("get() after fetch failure: expected stale=true")
	}
	if string(body) != "good" {
		t.Fatalf("get() after fetch failure: body = %q, want last-good %q", body, "good")
	}
}

func TestCatalogCache_ErrorWithoutPriorSuccess(t *testing.T) {
	cache := newCatalogCache(time.Hour, func() ([]byte, error) {
		return nil, errors.New("upstream down")
	})

	body, stale, err := cache.get()
	if err == nil {
		t.Fatal("get() with no prior success: expected error, got nil")
	}
	if stale {
		t.Fatal("get() with no prior success: expected stale=false")
	}
	if body != nil {
		t.Fatalf("get() with no prior success: body = %q, want nil", body)
	}
}

// ---------------------------------------------------------------------------
// fetchRemoteIndex
// ---------------------------------------------------------------------------

func TestFetchRemoteIndex_Success(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if got := r.Header.Get("Accept"); got != "application/json" {
			t.Errorf("Accept header = %q, want application/json", got)
		}
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"extensions":[]}`))
	}))
	defer srv.Close()

	body, err := fetchRemoteIndex(srv.URL, srv.Client())
	if err != nil {
		t.Fatalf("fetchRemoteIndex: %v", err)
	}
	if string(body) != `{"extensions":[]}` {
		t.Fatalf("body = %q, want catalog JSON", body)
	}
}

func TestFetchRemoteIndex_NonOKStatus(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusServiceUnavailable)
	}))
	defer srv.Close()

	if _, err := fetchRemoteIndex(srv.URL, srv.Client()); err == nil {
		t.Fatal("fetchRemoteIndex: expected error on 503, got nil")
	}
}

// ---------------------------------------------------------------------------
// fetchLocalIndex — the air-gapped path
// ---------------------------------------------------------------------------

func TestFetchLocalIndex_Success(t *testing.T) {
	path := filepath.Join(t.TempDir(), "index.json")
	want := `{"extensions":[{"name":"plugin-hub"}]}`
	if err := os.WriteFile(path, []byte(want), 0o644); err != nil {
		t.Fatalf("seed file: %v", err)
	}

	got, err := fetchLocalIndex(path)
	if err != nil {
		t.Fatalf("fetchLocalIndex: %v", err)
	}
	if string(got) != want {
		t.Fatalf("body = %q, want %q", got, want)
	}
}

func TestFetchLocalIndex_MissingFile(t *testing.T) {
	path := filepath.Join(t.TempDir(), "does-not-exist.json")

	_, err := fetchLocalIndex(path)
	if err == nil {
		t.Fatal("fetchLocalIndex: expected error for missing file, got nil")
	}
	if !errors.Is(err, os.ErrNotExist) {
		t.Fatalf("fetchLocalIndex: error = %v, want it to wrap os.ErrNotExist", err)
	}
}

// ---------------------------------------------------------------------------
// hubIndexPath
// ---------------------------------------------------------------------------

func TestHubIndexPath(t *testing.T) {
	t.Run("unset", func(t *testing.T) {
		t.Setenv("HUB_INDEX_PATH", "")
		if got := hubIndexPath(); got != "" {
			t.Fatalf("hubIndexPath() = %q, want empty", got)
		}
	})

	t.Run("set", func(t *testing.T) {
		t.Setenv("HUB_INDEX_PATH", "/etc/plugin-hub-index/index.json")
		if got := hubIndexPath(); got != "/etc/plugin-hub-index/index.json" {
			t.Fatalf("hubIndexPath() = %q, want the configured path", got)
		}
	})
}
