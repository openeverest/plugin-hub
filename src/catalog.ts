// Pure catalog helpers — filtering and chart/version derivation.
import type { CatalogEntry, FilterState, ReleaseVerdict } from './types';

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

export interface CatalogCounts {
  total: number;
  plugin: number;
  provider: number;
  integration: number;
  installed: number;
}

export function countEntries(entries: CatalogEntry[]): CatalogCounts {
  const ofType = (type: string) => entries.filter((e) => e.type === type).length;
  return {
    total: entries.length,
    plugin: ofType('plugin'),
    provider: ofType('provider'),
    integration: ofType('integration'),
    installed: entries.filter((e) => e.installed).length,
  };
}

export function defaultChannelVersion(entry: CatalogEntry): string | null {
  const chart = entry.artifacts?.chart;
  if (!chart) return null;
  const channel = chart.defaultChannel ?? Object.keys(chart.channels ?? {})[0];
  if (!channel) return null;
  return chart.channels?.[channel]?.version ?? null;
}

// offeredVersion is the release the hub offers: the newest one that works
// with the OpenEverest in the cluster, null when none does. Without a
// compatibility check it is the channel head, as before checks existed.
export function offeredVersion(entry: CatalogEntry): string | null {
  if (entry.compat) return entry.compat.recommended ?? null;
  return defaultChannelVersion(entry);
}

export function releaseVerdict(
  entry: CatalogEntry,
  version: string | null | undefined,
): ReleaseVerdict | undefined {
  if (!version) return undefined;
  return entry.compat?.releases.find((r) => r.version === version);
}

// incompatibleHead returns the verdict of the channel head when it does not
// work with the cluster, so it can only be installed by acknowledging that.
export function incompatibleHead(entry: CatalogEntry): ReleaseVerdict | undefined {
  const head = releaseVerdict(entry, entry.compat?.head);
  return head?.status === 'False' ? head : undefined;
}

// Short label for a release that does not work with the cluster.
export function incompatibleLabel(verdict: ReleaseVerdict): string {
  if (verdict.needs) return `Needs OpenEverest ${verdict.needs}`;
  if (verdict.reason === 'ExtensionTooOld') return 'Built for an older OpenEverest';
  return 'Incompatible with this OpenEverest';
}

// Short label for any verdict.
export function compatibilityLabel(verdict: ReleaseVerdict): string {
  if (verdict.status === 'True') return 'Works with this OpenEverest';
  if (verdict.status === 'False') return incompatibleLabel(verdict);
  if (verdict.reason === 'Unversioned') return 'Compatibility not declared';
  return 'Compatibility cannot be checked';
}

export function helmInstallCommand(entry: CatalogEntry, version?: string | null): string {
  const chart = entry.artifacts?.chart;
  const channel = chart?.defaultChannel ?? Object.keys(chart?.channels ?? {})[0] ?? '';
  const ref = chart?.channels?.[channel]?.ref ?? '<chart-ref>';
  version = version || chart?.channels?.[channel]?.version || '<version>';
  const release = entry.install?.helm?.releaseName ?? entry.name;
  const namespace = entry.install?.helm?.namespace ?? 'everest-system';
  return [
    `helm install ${release} ${ref} \\`,
    `  --version ${version} \\`,
    `  -n ${namespace}`,
  ].join('\n');
}

interface ParsedVersion {
  numbers: number[];
  prerelease: string[] | null; 
}


function parseSemver(v: string): ParsedVersion {
  const clean = v.trim().replace(/^v/i, '').split('+')[0]; 
  const [numPart, ...preParts] = clean.split('-');
  const numbers = numPart.split('.').map((n) => parseInt(n, 10) || 0);
  const prerelease = preParts.length > 0 ? preParts.join('-').split('.') : null;
  return { numbers, prerelease };
}


function compareSemver(v1: string, v2: string): number {
  const a = parseSemver(v1);
  const b = parseSemver(v2);

  //  compare major, minor, patch numbers 
  const len = Math.max(a.numbers.length, b.numbers.length);
  for (let i = 0; i < len; i++) {
    const numA = a.numbers[i] || 0;
    const numB = b.numbers[i] || 0;
    if (numA < numB) return -1;
    if (numA > numB) return 1;
  }

  //  Normal version  has HIGHER precedence than a pre-release
  if (!a.prerelease && b.prerelease) return 1;  
  if (a.prerelease && !b.prerelease) return -1; 
  if (!a.prerelease && !b.prerelease) return 0; 

  // Both are prereleases: compare identifier by identifier
  const preA = a.prerelease!;
  const preB = b.prerelease!;
  const preLen = Math.max(preA.length, preB.length);

  for (let i = 0; i < preLen; i++) {
    const idA = preA[i];
    const idB = preB[i];

    if (idA === undefined) return -1; 
    if (idB === undefined) return 1;

    const isNumA = /^\d+$/.test(idA);
    const isNumB = /^\d+$/.test(idB);

    if (isNumA && isNumB) {
      const numA = parseInt(idA, 10);
      const numB = parseInt(idB, 10);
      if (numA < numB) return -1;
      if (numA > numB) return 1;
    } else if (isNumA && !isNumB) {
      return -1; 
    } else if (!isNumA && isNumB) {
      return 1;
    } else {
      const cmp = idA.localeCompare(idB);
      if (cmp !== 0) return cmp < 0 ? -1 : 1;
    }
  }

  return 0;
}

// Returns true if latestVersion is newer than installedVersion
export function isVersionOutdated(
  installedVersion?: string,
  latestVersion?: string | null,
): boolean {
  if (!installedVersion || !latestVersion) return false;
  return compareSemver(installedVersion, latestVersion) < 0;
}

// The Helm chart version (admins with the installer enabled) is what catalog
// channel versions refer to; fall back to the version reported by core.
export function currentVersion(entry: CatalogEntry): string | undefined {
  return entry.release?.chartVersion || entry.installedVersion;
}

// Generates the helm upgrade command for outdated extensions
export function helmUpgradeCommand(entry: CatalogEntry, version?: string | null): string {
  const chart = entry.artifacts?.chart;
  const channel = chart?.defaultChannel ?? Object.keys(chart?.channels ?? {})[0] ?? '';
  const ref = chart?.channels?.[channel]?.ref ?? '<chart-ref>';
  version = version || chart?.channels?.[channel]?.version || '<version>';
  const release = entry.install?.helm?.releaseName ?? entry.name;
  const namespace = entry.install?.helm?.namespace ?? 'everest-system';
  return [
    `helm upgrade ${release} ${ref} \\`,
    `  --version ${version} \\`,
    `  -n ${namespace}`,
  ].join('\n');
}
