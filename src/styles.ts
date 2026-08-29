// Styling via MUI `sx` + host theme tokens (palette paths, spacing units).
// Colors resolve to the host-owned `--mui-*` CSS variables, so plugin-hub
// follows the host palette and dark mode with no hardcoded values.
import type { SxProps, Theme } from '@openeverest/ui-lib';

export type MuiColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export const sx: Record<string, SxProps<Theme>> = {
  page: { p: 3, maxWidth: 1280, mx: 'auto' },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    mb: 2,
    flexWrap: 'wrap',
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 0.75,
  },
  subtitle: { color: 'text.secondary' },
  toolbar: {
    display: 'flex',
    gap: 1.5,
    alignItems: 'center',
    flexWrap: 'wrap',
    p: 1.5,
    bgcolor: 'background.paper',
    border: 1,
    borderColor: 'divider',
    borderRadius: 1,
    mb: 2,
  },
  empty: { p: 6, textAlign: 'center', color: 'text.secondary' },
  section: { mt: 2.5 },
  sectionTitle: {
    textTransform: 'uppercase',
    color: 'text.secondary',
    letterSpacing: '0.05em',
    fontSize: '0.75rem',
    mb: 1,
  },
  codeBlock: {
    bgcolor: 'grey.900',
    color: 'grey.100',
    p: 1.5,
    borderRadius: 1,
    fontFamily: 'monospace',
    fontSize: '0.8125rem',
    whiteSpace: 'pre',
    overflowX: 'auto',
  },
  iconImg: { width: 28, height: 28, objectFit: 'contain' },
  drawerHeader: { display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 },
  capRow: {
    display: 'flex',
    gap: 1,
    alignItems: 'baseline',
    mb: 0.5,
    flexWrap: 'wrap',
  },
  capKey: { color: 'text.secondary', fontWeight: 500, minWidth: 120 },
};

// Maps a maturity string to a MUI Chip color, so the chip follows the theme.
export function maturityColor(maturity: string): MuiColor {
  switch ((maturity || 'unknown').toLowerCase()) {
    case 'alpha':
      return 'warning';
    case 'beta':
      return 'info';
    case 'stable':
    case 'ga':
      return 'success';
    case 'deprecated':
      return 'error';
    default:
      return 'default';
  }
}

export function typeColor(type: string): MuiColor {
  return type === 'provider' ? 'info' : 'secondary';
}
