import { h } from '../runtime';
import { styles } from '../styles';
import type { FilterState } from '../types';

export function Toolbar(props: {
  filter: FilterState;
  onChange: (f: FilterState) => void;
  onRefresh: () => void;
  refreshing: boolean;
  lastRefreshed: Date | null;
}): any {
  const { filter, onChange, onRefresh, refreshing, lastRefreshed } = props;
  const chipDefs: Array<{ key: FilterState['type']; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'plugin', label: 'Plugins' },
    { key: 'provider', label: 'Providers' },
  ];
  return h(
    'div',
    { style: styles.toolbar },
    h('input', {
      type: 'search',
      placeholder: 'Search by name, description, category…',
      value: filter.query,
      style: styles.input,
      onChange: (e: any) => onChange({ ...filter, query: e.target.value }),
    }),
    h(
      'div',
      { style: styles.chipGroup },
      ...chipDefs.map((c) =>
        h(
          'button',
          {
            key: c.key,
            type: 'button',
            style: styles.chip(filter.type === c.key),
            onClick: () => onChange({ ...filter, type: c.key }),
          },
          c.label,
        ),
      ),
    ),
    h(
      'label',
      { style: styles.checkboxRow },
      h('input', {
        type: 'checkbox',
        checked: filter.installedOnly,
        onChange: (e: any) =>
          onChange({ ...filter, installedOnly: e.target.checked }),
      }),
      'Installed only',
    ),
    h(
      'label',
      { style: styles.checkboxRow },
      h('input', {
        type: 'checkbox',
        checked: !filter.hideGated,
        onChange: (e: any) =>
          onChange({ ...filter, hideGated: !e.target.checked }),
      }),
      'Include gated',
    ),
    h(
      'button',
      {
        type: 'button',
        style: styles.refreshBtn,
        onClick: onRefresh,
        disabled: refreshing,
      },
      refreshing ? 'Refreshing…' : 'Refresh',
    ),
    lastRefreshed
      ? h(
          'span',
          { style: { fontSize: '0.75rem', color: '#6b7280' } },
          `Updated ${lastRefreshed.toLocaleTimeString()}`,
        )
      : null,
  );
}
