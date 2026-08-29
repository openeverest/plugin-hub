import { h } from '../runtime';
import { sx } from '../styles';
import {
  Box,
  TextField,
  Chip,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from '@openeverest/ui-lib';
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
    Box,
    { sx: sx.toolbar },
    h(TextField, {
      size: 'small',
      type: 'search',
      placeholder: 'Search by name, description, category…',
      value: filter.query,
      onChange: (e: any) => onChange({ ...filter, query: e.target.value }),
      sx: { flex: '1 1 240px', minWidth: 200 },
    }),
    h(
      Box,
      { sx: { display: 'flex', gap: 0.5 } },
      ...chipDefs.map((c) =>
        h(Chip, {
          key: c.key,
          label: c.label,
          size: 'small',
          onClick: () => onChange({ ...filter, type: c.key }),
          color: filter.type === c.key ? 'primary' : 'default',
          variant: filter.type === c.key ? 'filled' : 'outlined',
        })
      )
    ),
    h(FormControlLabel, {
      control: h(Checkbox, {
        size: 'small',
        checked: filter.installedOnly,
        onChange: (e: any) =>
          onChange({ ...filter, installedOnly: e.target.checked }),
      }),
      label: 'Installed only',
    }),
    h(FormControlLabel, {
      control: h(Checkbox, {
        size: 'small',
        checked: !filter.hideGated,
        onChange: (e: any) =>
          onChange({ ...filter, hideGated: !e.target.checked }),
      }),
      label: 'Include gated',
    }),
    h(
      Button,
      {
        variant: 'outlined',
        size: 'small',
        onClick: onRefresh,
        disabled: refreshing,
      },
      refreshing ? 'Refreshing…' : 'Refresh'
    ),
    lastRefreshed
      ? h(
          Typography,
          { variant: 'caption', sx: { color: 'text.secondary' } },
          `Updated ${lastRefreshed.toLocaleTimeString()}`
        )
      : null
  );
}
