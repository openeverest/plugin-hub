package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"helm.sh/helm/v3/pkg/chart"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func TestValuesPrefix(t *testing.T) {
	tests := map[string]string{
		"openeverest/charts/plugin-hub/templates":          "plugin-hub",
		"plugin-hub/templates":                             "",
		"umbrella/charts/openeverest/charts/hub/templates": "openeverest.hub",
		"": "",
	}
	for path, want := range tests {
		assert.Equal(t, want, valuesPrefix(path), path)
	}
}

func TestImageTagPath(t *testing.T) {
	i := &installer{selfTemplatePath: "openeverest/charts/plugin-hub/templates"}
	assert.Equal(t, "plugin-hub.image.tag", i.imageTagPath(true))
	i.selfTemplatePath = "plugin-hub/templates"
	assert.Equal(t, "image.tag", i.imageTagPath(false))
	// An older chart does not say where it is rendered.
	i.selfTemplatePath = ""
	assert.Equal(t, "plugin-hub.image.tag", i.imageTagPath(true))
}

func TestRunningVersion(t *testing.T) {
	i := &installer{selfImageTag: "v0.1.20", selfAppVersion: "0.1.18"}
	assert.Equal(t, "0.1.20", i.runningVersion())
	i.selfImageTag = "latest"
	assert.Equal(t, "0.1.18", i.runningVersion())
}

func TestNestedValue(t *testing.T) {
	assert.Equal(t,
		map[string]any{"plugin-hub": map[string]any{"image": map[string]any{"tag": "0.2.0"}}},
		nestedValue("plugin-hub.image.tag", "0.2.0"))
}

func TestNewerReleases(t *testing.T) {
	releases := []catalogRelease{{Version: "0.3.0"}, {Version: "0.2.0"}, {Version: "0.1.5"}, {Version: "0.1.0"}}
	versions := func(rs []catalogRelease) []string {
		var out []string
		for _, r := range rs {
			out = append(out, r.Version)
		}
		return out
	}

	assert.Equal(t, []string{"0.3.0", "0.2.0"}, versions(newerReleases(releases, "0.1.5", compatCheck{})))
	assert.Empty(t, newerReleases(releases, "dev", compatCheck{}), "an unknown running version offers nothing")

	check := compatCheck{checked: true, verdicts: []releaseVerdict{
		{Version: "0.3.0", Status: metav1.ConditionFalse},
		{Version: "0.2.0", Status: metav1.ConditionTrue},
	}}
	assert.Equal(t, []string{"0.2.0"}, versions(newerReleases(releases, "0.1.5", check)))
}

func TestPickSelfUpdate(t *testing.T) {
	cands := []catalogRelease{
		{Version: "0.3.0", MinChartVersion: "0.3.0"},
		{Version: "0.2.1"},
		{Version: "0.2.0", MinChartVersion: "0.1.5"},
	}
	tests := []struct {
		name         string
		imageOnly    bool
		chartVersion string
		want         string
		blocked      *blockedRelease
	}{
		{"standalone takes the newest", false, "0.1.5", "0.3.0", nil},
		{"bundled takes the newest the chart runs", true, "0.1.5", "0.2.0",
			&blockedRelease{Version: "0.3.0", MinChartVersion: "0.3.0"}},
		{"a release without a minimum needs its own chart", true, "0.2.1", "0.2.1",
			&blockedRelease{Version: "0.3.0", MinChartVersion: "0.3.0"}},
		{"bundled with a new enough chart", true, "0.3.0", "0.3.0", nil},
		{"nothing the chart runs", true, "0.1.0", "",
			&blockedRelease{Version: "0.3.0", MinChartVersion: "0.3.0"}},
		{"unknown chart version", true, "", "",
			&blockedRelease{Version: "0.3.0", MinChartVersion: "0.3.0"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, blocked := pickSelfUpdate(cands, tt.imageOnly, tt.chartVersion)
			assert.Equal(t, tt.want, got)
			assert.Equal(t, tt.blocked, blocked)
		})
	}
}

func TestSameChart(t *testing.T) {
	stored := demoChart("1.0.0")
	assert.NoError(t, sameChart(stored, demoChart("1.0.0")))
	assert.Error(t, sameChart(stored, demoChart("1.0.1")))

	changed := demoChart("1.0.0")
	changed.Templates[0].Data = []byte("changed")
	assert.Error(t, sameChart(stored, changed))

	extra := demoChart("1.0.0")
	extra.Templates = append(extra.Templates, &chart.File{Name: "templates/extra.yaml"})
	assert.Error(t, sameChart(stored, extra))

	renamed := demoChart("1.0.0")
	renamed.Templates[0].Name = "templates/other.yaml"
	assert.Error(t, sameChart(stored, renamed))
}

func TestBundledVersion(t *testing.T) {
	parent := demoChart("2.0.0")
	assert.Equal(t, "", bundledVersion(parent))
	parent.AddDependency(&chart.Chart{Metadata: &chart.Metadata{Name: "other", Version: "9.9.9"}},
		&chart.Chart{Metadata: &chart.Metadata{Name: selfChartName, Version: "0.1.18"}})
	assert.Equal(t, "0.1.18", bundledVersion(parent))
}

func TestManualUpdateCommand(t *testing.T) {
	ref, repo := chartLocation(defaultCoreChartRepo, "openeverest")
	assert.Equal(t,
		"helm upgrade everest openeverest --repo https://openeverest.github.io/helm-charts -n everest-system "+
			"--version 2.0.0 --reuse-values --set plugin-hub.image.tag=0.2.0",
		manualUpdateCommand("everest", "everest-system", ref, repo, "2.0.0", "plugin-hub.image.tag", "0.2.0"))

	ref, repo = chartLocation("oci://registry.example/charts/", "openeverest")
	assert.Equal(t, "oci://registry.example/charts/openeverest", ref)
	assert.Equal(t, "", repo)
}
