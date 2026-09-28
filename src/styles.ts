// Styling via MUI `sx` + theme tokens (palette paths, spacing units). The theme
// comes from PluginThemeProvider, which reads the host's `--everest-*` CSS
// variables, so plugin-hub follows the host palette and dark mode.
import type { SxProps, Theme } from '@mui/material';

export type MuiColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export const sx = {
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
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },
  codeBlockWrap: {
    position: 'relative',
    '&:hover .copy-btn': { opacity: 1 },
  },
  copyBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    color: 'grey.100',
    opacity: 0,
    transition: 'opacity 0.15s ease',
  },
  prereqList: { display: 'flex', flexDirection: 'column', gap: 1 },
  prereqCard: { px: 1.5, py: 1.25 },
  prereqHead: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 1,
  },
  prereqSummary: {
    display: 'block',
    cursor: 'pointer',
    color: 'primary.main',
    mt: 1,
    userSelect: 'none',
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
} satisfies Record<string, SxProps<Theme>>;

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
