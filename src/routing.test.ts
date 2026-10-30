import { describe, expect, it } from 'vitest';
import { entryPath, isEntryType, listPath, parseHubPath } from './routing';

describe('integration routes', () => {
  it('parses the integrations list and entry deep links', () => {
    expect(parseHubPath('integrations')).toEqual({ kind: 'list', type: 'integration' });
    expect(parseHubPath('integrations/monitoring-pmm')).toEqual({
      kind: 'entry',
      type: 'integration',
      name: 'monitoring-pmm',
    });
  });

  it('builds paths that round-trip through the parser', () => {
    expect(listPath('integration')).toBe('integrations');
    const path = entryPath('integration', 'monitoring-prometheus');
    expect(path).toBe('integrations/monitoring-prometheus');
    expect(parseHubPath(path)).toEqual({
      kind: 'entry',
      type: 'integration',
      name: 'monitoring-prometheus',
    });
  });

  it('accepts integration as an entry type but not unknown or inherited keys', () => {
    expect(isEntryType('integration')).toBe(true);
    expect(isEntryType('gizmo')).toBe(false);
    expect(isEntryType('constructor')).toBe(false);
    expect(parseHubPath('constructor')).toEqual({ kind: 'not-found' });
    expect(parseHubPath('integrations/monitoring-pmm/extra')).toEqual({ kind: 'not-found' });
  });
});
