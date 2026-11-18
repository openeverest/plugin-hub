import { describe, expect, it } from 'vitest';
import { countEntries, matchesFilter } from './catalog';
import type { FilterState } from './types';
import {
  corootIntegration,
  futureTypeEntry,
  pluginEntry,
  pmmIntegration,
  prometheusIntegration,
  providerEntry,
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
