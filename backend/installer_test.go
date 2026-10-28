package main

import "testing"

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
		Release: "metrics", Namespace: "everest-system",
	}
	if got != want {
		t.Fatalf("got %+v, want %+v", got, want)
	}

	if _, err := resolveTarget(index, "provider", "plugin-metrics"); err == nil {
		t.Fatal("type mismatch must not resolve")
	}
	if _, err := resolveTarget(index, "provider", "mssql"); err == nil {
		t.Fatal("gated entry must not resolve")
	}
}
