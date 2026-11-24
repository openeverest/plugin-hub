import { h } from '../runtime';
import { maturityColor, typeColor } from '../styles';
import {
  currentVersion,
  defaultChannelVersion,
  incompatibleHead,
  isVersionOutdated,
  noReleaseLabel,
  noReleaseSupports,
  offeredVersion,
} from '../catalog';
import { IconImg, resolveIconSrc } from '../icons';
import {
  TableRow,
  TableCell,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import type { CatalogEntry } from '../types';

export function Row(props: {
  entry: CatalogEntry;
  onSelect: (e: CatalogEntry) => void;
}): any {
  const { entry, onSelect } = props;
  // The newest release that works with this OpenEverest; when none does, the
  // row shows the newest release, says so, and what that release needs.
  const offered = offeredVersion(entry);
  const version = offered ?? defaultChannelVersion(entry);
  const blockedBy = offered === null && entry.access !== 'gated' ? incompatibleHead(entry) : undefined;
  const installedVersion = currentVersion(entry);
  const outdated = isVersionOutdated(installedVersion, offered);
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
        src: resolveIconSrc(entry.icon),
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
    h(
      TableCell,
      null,
      version ?? '—',
      blockedBy
        ? h(Chip, {
            label: noReleaseLabel(entry),
            title: `${noReleaseSupports(entry)}. ${entry.displayName || entry.name} ${blockedBy.version} ${blockedBy.message}.`,
            size: 'small',
            variant: 'outlined',
            sx: { ml: 1 },
            'data-testid': 'plugin-hub-row-incompatible',
          })
        : null
    ),
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
          variant: 'outlined',
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
              label: outdated
                ? `Update available · ${installedVersion} → ${version}`
                : installedVersion
                ? `Installed · ${installedVersion}`
                : 'Installed',
              size: 'small',
              color: outdated ? 'warning' : 'success',
            })
          : null
      )
    )
  );
}
