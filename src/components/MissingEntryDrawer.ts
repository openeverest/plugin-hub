import { h } from '../runtime';
import { sx } from '../styles';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DrawerShell } from './DrawerShell';
import type { EntryType } from '../routing';

const TYPE_LABEL: Record<EntryType, { singular: string; plural: string }> = {
  plugin: { singular: 'Plugin', plural: 'plugins' },
  provider: { singular: 'Provider', plural: 'providers' },
  integration: { singular: 'Integration', plural: 'integrations' },
};

export function MissingEntryDrawer(props: {
  type: EntryType;
  name: string;
  onClose: () => void;
}): any {
  const { type, name, onClose } = props;
  const label = TYPE_LABEL[type];
  return h(
    DrawerShell,
    { onClose },
    h(
      Box,
      { sx: sx.drawerHeader, 'data-testid': 'plugin-hub-missing-entry' },
      h(
        Typography,
        { variant: 'h6', sx: { fontWeight: 600 } },
        `${label.singular} not found`
      ),
      h(
        IconButton,
        { onClick: onClose, 'aria-label': 'Close', sx: { ml: 'auto' } },
        '×'
      )
    ),
    h(
      Typography,
      { variant: 'body2', sx: { mb: 2 } },
      `There is no ${label.singular.toLowerCase()} named “${name}” in the catalog. ` +
        'It may have been renamed or removed from the hub index.'
    ),
    h(
      Button,
      { variant: 'outlined', size: 'small', onClick: onClose },
      `Browse ${label.plural}`
    )
  );
}
