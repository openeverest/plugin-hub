// Pure catalog helpers — filtering and chart/version derivation.
import type { CatalogEntry, FilterState } from './types';

export function matchesFilter(entry: CatalogEntry, filter: FilterState): boolean {
  if (filter.type !== 'all' && entry.type !== filter.type) return false;
  if (filter.installedOnly && !entry.installed) return false;
  if (filter.hideGated && entry.access === 'gated') return false;
  if (filter.query) {
    const q = filter.query.toLowerCase();
    const haystack = [
      entry.name,
      entry.displayName ?? '',
      entry.description ?? '',
      (entry.categories ?? []).join(' '),
      (entry.keywords ?? []).join(' '),
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export function defaultChannelVersion(entry: CatalogEntry): string | null {
  const chart = entry.artifacts?.chart;
  if (!chart) return null;
  const channel = chart.defaultChannel ?? Object.keys(chart.channels ?? {})[0];
  if (!channel) return null;
  return chart.channels?.[channel]?.version ?? null;
}

export function helmInstallCommand(entry: CatalogEntry): string {
  const chart = entry.artifacts?.chart;
  const channel = chart?.defaultChannel ?? Object.keys(chart?.channels ?? {})[0] ?? '';
  const ref = chart?.channels?.[channel]?.ref ?? '<chart-ref>';
  const version = chart?.channels?.[channel]?.version ?? '<version>';
  const release = entry.install?.helm?.releaseName ?? entry.name;
  const namespace = entry.install?.helm?.namespace ?? 'everest-system';
  return [
    `helm install ${release} ${ref} \\`,
    `  --version ${version} \\`,
    `  -n ${namespace}`,
  ].join('\n');
}

// Helper to parse semver strings like "v0.1.0" or "1.2.3-beta" into integer arrays [1, 2, 3]
function parseVersion(v: string): number[] {
  return v
    .replace(/^v/i, '')
    .split(/[-+]/)[0] // ignore prerelease/build metadata
    .split('.')
    .map((n) => parseInt(n, 10) || 0);
}

// Returns true if latestVersion > installedVersion
export function isVersionOutdated(
  installedVersion?: string,
  latestVersion?: string | null,
): boolean {
  if (!installedVersion || !latestVersion) return false;
  const inst = parseVersion(installedVersion);
  const lat = parseVersion(latestVersion);

  for (let i = 0; i < Math.max(inst.length, lat.length); i++) {
    const a = inst[i] || 0;
    const b = lat[i] || 0;
    if (b > a) return true;
    if (b < a) return false;
  }
  return false;
}

// Generates the helm upgrade command for outdated extensions
export function helmUpgradeCommand(entry: CatalogEntry): string {
  const chart = entry.artifacts?.chart;
  const channel = chart?.defaultChannel ?? Object.keys(chart?.channels ?? {})[0] ?? '';
  const ref = chart?.channels?.[channel]?.ref ?? '<chart-ref>';
  const version = chart?.channels?.[channel]?.version ?? '<version>';
  const release = entry.install?.helm?.releaseName ?? entry.name;
  const namespace = entry.install?.helm?.namespace ?? 'everest-system';
  return [
    `helm upgrade ${release} ${ref} \\`,
    `  --version ${version} \\`,
    `  -n ${namespace}`,
  ].join('\n');
}
