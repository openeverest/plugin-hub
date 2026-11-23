import { describe, expect, it } from 'vitest';
import {
  compatibilityLabel,
  countEntries,
  helmInstallCommand,
  helmUpgradeCommand,
  incompatibleHead,
  matchesFilter,
  offeredVersion,
  releaseVerdict,
} from './catalog';
import type { FilterState } from './types';
import {
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
