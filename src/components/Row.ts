import { h } from '../runtime';
import { maturityColor, typeColor } from '../styles';
import { defaultChannelVersion } from '../catalog';
import { IconImg, resolveIconSrc } from '../icons';
import {
  TableRow,
  TableCell,
  Chip,
  Typography,
  Box,
} from '@openeverest/ui-lib';
import type { CatalogEntry } from '../types';

export function Row(props: {
  entry: CatalogEntry;
  pluginName: string;
  onSelect: (e: CatalogEntry) => void;
}): any {
  const { entry, pluginName, onSelect } = props;
  const version = defaultChannelVersion(entry);
  return h(
    TableRow,
    {
      key: entry.name,
      hover: true,
      sx: { cursor: 'pointer' },
      onClick: () => onSelect(entry),
    },
    h(
      TableCell,
      { sx: { width: 40, textAlign: 'center' } },
      h(IconImg, {
        src: resolveIconSrc(entry.icon, pluginName),
        style: { width: 28, height: 28, objectFit: 'contain' },
      })
    ),
    h(
      TableCell,
      null,
      h(Typography, { sx: { fontWeight: 600 } }, entry.displayName || entry.name),
      h(
        Typography,
        { variant: 'caption', sx: { color: 'text.secondary' } },
        entry.name
      )
    ),
    h(
      TableCell,
      null,
      h(Chip, {
        label: entry.type,
        size: 'small',
        color: typeColor(entry.type),
        variant: 'outlined',
        sx: { textTransform: 'capitalize' },
      })
    ),
    h(TableCell, null, version ?? '—'),
    h(
      TableCell,
      null,
      ...(entry.categories ?? []).map((c) =>
        h(Chip, {
          key: c,
          label: c,
          size: 'small',
          variant: 'outlined',
          sx: { mr: 0.5, mb: 0.5 },
        })
      )
    ),
    h(
      TableCell,
      null,
      h(
        Box,
        {
          sx: {
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            alignItems: 'flex-start',
          },
        },
        h(Chip, {
          label: entry.maturity || 'unknown',
          size: 'small',
          color: maturityColor(entry.maturity || 'unknown'),
          sx: { textTransform: 'capitalize' },
        }),
        entry.access === 'gated'
          ? h(Chip, {
              label: 'Gated',
              size: 'small',
              color: 'secondary',
              variant: 'outlined',
            })
          : null,
        entry.installed
          ? h(Chip, {
              label: entry.installedVersion
                ? `Installed · ${entry.installedVersion}`
                : 'Installed',
              size: 'small',
              color: 'success',
            })
          : null
      )
    )
  );
}
