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
