import { h } from '../runtime';
import { styles } from '../styles';
import { defaultChannelVersion } from '../catalog';
import { IconImg, resolveIconSrc } from '../icons';
import type { CatalogEntry } from '../types';

export function Row(props: {
  entry: CatalogEntry;
  pluginName: string;
  onSelect: (e: CatalogEntry) => void;
}): any {
  const { entry, pluginName, onSelect } = props;
  const version = defaultChannelVersion(entry);
  return h(
    'tr',
    {
      key: entry.name,
      style: { cursor: 'pointer' },
      onClick: () => onSelect(entry),
    },
    h(
      'td',
      { style: { ...styles.td, ...styles.iconCell } },
      h(IconImg, {
        src: resolveIconSrc(entry.icon, pluginName),
        style: styles.iconImg,
      }),
    ),
    h(
      'td',
      { style: styles.td },
      h('div', { style: { fontWeight: 600 } }, entry.displayName || entry.name),
      h(
        'div',
        { style: { color: '#6b7280', fontSize: '0.8125rem', marginTop: 2 } },
        entry.name,
      ),
    ),
    h('td', { style: styles.td }, h('span', { style: styles.typeChip(entry.type) }, entry.type)),
    h('td', { style: styles.td }, version ?? '—'),
    h(
      'td',
      { style: styles.td },
      ...(entry.categories ?? []).map((c) =>
        h('span', { key: c, style: styles.categoryTag }, c),
      ),
    ),
    h(
      'td',
      { style: styles.td },
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' as const, gap: 4, alignItems: 'flex-start' } },
        h(
          'span',
          { style: styles.maturityChip(entry.maturity || 'unknown') },
          entry.maturity || 'unknown',
        ),
        entry.access === 'gated'
          ? h('span', { style: styles.gatedChip }, 'Gated')
          : null,
        entry.installed
          ? h(
              'span',
              { style: styles.statusInstalled },
              entry.installedVersion ? `Installed · ${entry.installedVersion}` : 'Installed',
            )
          : null,
      ),
    ),
  );
}
