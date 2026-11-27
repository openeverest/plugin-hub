import { describe, expect, it } from 'vitest';
import {
  compatibilityLabel,
  countEntries,
  currentVersion,
  helmInstallCommand,
  helmUpgradeCommand,
  incompatibleHead,
  isAcknowledged,
  matchesFilter,
  noReleaseLabel,
  noReleaseSupports,
  offeredVersion,
  releaseVerdict,
} from './catalog';
import type { FilterState } from './types';
import {
  acknowledgedCompat,
  blockedCompat,
  corootIntegration,
  futureTypeEntry,
  mongodbCompat,
  mongodbEntry,
  pluginEntry,
  pmmIntegration,
  prometheusIntegration,
  providerEntry,
  undeclaredCompat,
} from './__fixtures__/catalog';

const entries = [
  pluginEntry,
  providerEntry,
  pmmIntegration,
  { ...prometheusIntegration, installed: true },
  corootIntegration,
  futureTypeEntry,
];

const filter = (overrides: Partial<FilterState>): FilterState => ({
  query: '',
  type: 'all',
  installedOnly: false,
  hideGated: false,
  ...overrides,
});

describe('countEntries', () => {
  it('counts integrations separately and keeps unknown types in the total only', () => {
    expect(countEntries(entries)).toEqual({
      total: 6,
      plugin: 1,
      provider: 1,
      integration: 3,
      installed: 1,
    });
  });
});

describe('matchesFilter', () => {
  it('lists only integrations on the integrations tab', () => {
    const names = entries
      .filter((e) => matchesFilter(e, filter({ type: 'integration' })))
      .map((e) => e.name);
    expect(names).toEqual(['monitoring-pmm', 'monitoring-prometheus', 'monitoring-coroot']);
  });

  it('combines the integration type with search and installed filters', () => {
    expect(
      entries
        .filter((e) => matchesFilter(e, filter({ type: 'integration', query: 'coroot' })))
        .map((e) => e.name)
    ).toEqual(['monitoring-coroot']);
    expect(
      entries
        .filter((e) => matchesFilter(e, filter({ type: 'integration', installedOnly: true })))
        .map((e) => e.name)
    ).toEqual(['monitoring-prometheus']);
  });

  it('keeps unknown types visible on the All tab', () => {
    expect(matchesFilter(futureTypeEntry, filter({}))).toBe(true);
  });
});

describe('compatibility helpers', () => {
  const checked = { ...mongodbEntry, compat: mongodbCompat };

  it('offers the newest compatible release, or the head when nothing was checked', () => {
    expect(offeredVersion(checked)).toBe('0.7.0');
    expect(offeredVersion({ ...mongodbEntry, compat: blockedCompat })).toBeNull();
    expect(offeredVersion(mongodbEntry)).toBe('0.8.0');
  });

  it('finds the verdict of a release and an incompatible head', () => {
    expect(releaseVerdict(checked, '0.7.0')?.status).toBe('True');
    expect(releaseVerdict(checked, '9.9.9')).toBeUndefined();
    expect(releaseVerdict(mongodbEntry, '0.8.0')).toBeUndefined();
    expect(incompatibleHead(checked)?.needs).toBe('2.2.0');
    expect(incompatibleHead({ ...mongodbEntry, compat: undeclaredCompat })).toBeUndefined();
  });

  it('treats a release OpenEverest acknowledges as installable', () => {
    const acknowledged = { ...mongodbEntry, compat: acknowledgedCompat };
    expect(isAcknowledged(acknowledgedCompat.releases[0])).toBe(true);
    expect(isAcknowledged(mongodbCompat.releases[0])).toBe(false);
    expect(offeredVersion(acknowledged)).toBe('0.8.0');
    expect(incompatibleHead(acknowledged)).toBeUndefined();
    expect(compatibilityLabel(acknowledgedCompat.releases[0])).toBe('Incompatibility acknowledged');
  });

  it('says when no release supports the OpenEverest in the cluster', () => {
    const blocked = { ...mongodbEntry, compat: blockedCompat };
    expect(noReleaseSupports(blocked)).toBe('No release of MongoDB supports OpenEverest 2.1.0 yet');
    expect(noReleaseSupports(blocked, true)).toBe('No newer release of MongoDB supports OpenEverest 2.1.0 yet');
    expect(noReleaseLabel(blocked)).toBe('No release supports OpenEverest 2.1.0 yet');
    const unknownCore = { ...mongodbEntry, compat: { ...blockedCompat, coreVersion: undefined } };
    expect(noReleaseSupports(unknownCore)).toBe('No release of MongoDB supports this OpenEverest yet');
    expect(noReleaseLabel(unknownCore)).toBe('No release supports this OpenEverest yet');
  });

  it('labels each verdict', () => {
    const [tooNew, works, undeclared] = mongodbCompat.releases;
    expect(compatibilityLabel(tooNew)).toBe('Needs OpenEverest 2.2.0');
    expect(compatibilityLabel(works)).toBe('Works with this OpenEverest');
    expect(compatibilityLabel(undeclared)).toBe('Compatibility not declared');
    expect(compatibilityLabel({ ...tooNew, needs: undefined, reason: 'ExtensionTooOld' })).toBe(
      'Built for an older OpenEverest'
    );
    expect(compatibilityLabel({ ...undeclared, reason: 'CoreVersionSkew' })).toBe(
      'Compatibility cannot be checked'
    );
  });

  it('builds Helm commands for a given release', () => {
    expect(helmInstallCommand(checked, '0.7.0')).toContain('--version 0.7.0');
    expect(helmInstallCommand(checked)).toContain('--version 0.8.0');
    expect(helmUpgradeCommand(checked, '0.7.0')).toContain('--version 0.7.0');
  });
});

describe('currentVersion', () => {
  const release = { release: 'everest', namespace: 'everest-system', chartVersion: '0.1.18', status: 'deployed' };

  it('prefers the release plugin-hub runs over its chart', () => {
    expect(currentVersion({ ...pluginEntry, release, runningVersion: '0.1.20' })).toBe('0.1.20');
    expect(currentVersion({ ...pluginEntry, release })).toBe('0.1.18');
  });
});
