// Frontend bundle for the OpenEverest plugin-hub.
//
// Registers a sidebar entry and a dedicated route that renders the Hub
// browser — a searchable, filterable list of available and installed
// extensions, pulled from the host's /v1/plugins/plugin-hub/api/summary
// endpoint (which proxies to this plugin's Go backend).
//
// Runtime contract (v0.2): React, MUI, Emotion and the SDK are declared as
// external in vite.config.ts and resolved at runtime by the host's browser
// import map. That means `import { Button } from '@mui/material'` here
// evaluates to the exact same module instance the host loads, so the host's
// ThemeProvider (including dark mode) applies transparently to this bundle.
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Link,
  Paper,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import type { SvgIconProps } from '@mui/material';
import type {
  PluginRegisterFn,
  PluginApi,
  PluginRouteProps,
} from '@openeverest/plugin-sdk';

// ---------------------------------------------------------------------------
// Inline icons.
//
// We avoid `@mui/icons-material` imports because each icon lives at a deep
// subpath (e.g. `@mui/icons-material/CheckCircleOutlineRounded`) that would
// need its own entry in the host's browser import map. Native import maps
// don't do prefix matching, so it's simpler to inline the six SVG paths
// we actually use on top of the host-shared MUI `<SvgIcon>` component.
// ---------------------------------------------------------------------------

const CheckCircleOutlineRoundedIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.88-11.71L10 14.17l-1.88-1.88a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.39.7c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0" />
  </SvgIcon>
);

const CancelOutlinedIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
  </SvgIcon>
);

const CloseRoundedIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <path d="M18.3 5.71a.9959.9959 0 0 0-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" />
  </SvgIcon>
);

const LaunchRoundedIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1M14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V3h-6c-.55 0-1 .45-1 1" />
  </SvgIcon>
);

const RefreshRoundedIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <path d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71z" />
  </SvgIcon>
);

const SearchRoundedIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
  </SvgIcon>
);

// Bound at register() time so the module-level fetchSummary helper can call it.
let pluginFetch: PluginApi['fetch'];

// ---------------------------------------------------------------------------
// Types matching the backend /api/summary shape.
// ---------------------------------------------------------------------------

type ExtensionType = 'plugin' | 'provider' | string;

interface CatalogEntry {
  name: string;
  type: ExtensionType;
  displayName?: string;
  description?: string;
  icon?: string;
  homepage?: string;
  sourceRepo?: string;
  license?: string;
  verified?: boolean;
  categories?: string[];
  keywords?: string[];
  maintainers?: Array<{ name?: string; email?: string; github?: string }>;
  compatibility?: { openeverest?: string };
  artifacts?: {
    chart?: {
      defaultChannel?: string;
      channels?: Record<string, { ref?: string; version?: string }>;
    };
  };
  install?: {
    helm?: { namespace?: string; releaseName?: string };
  };
  plugin?: {
    contributes?: { backend?: boolean; ui?: boolean; cli?: boolean };
    extensionPoints?: string[];
  };
  provider?: {
    providerName?: string;
    supportedEngines?: string[];
  };
  maturity?: string;
  capabilities?: Record<string, unknown>;
  installed?: boolean;
  installedVersion?: string;
  installedPhase?: string;
}

interface SummaryResponse {
  extensions?: CatalogEntry[];
  metadata?: {
    catalogId?: string;
    generatedAt?: string;
    totalExtensions?: number;
  };
  stale?: boolean;
  installedError?: string;
}

interface FilterState {
  query: string;
  type: 'all' | 'plugin' | 'provider';
  installedOnly: boolean;
}

type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const ICON_FALLBACK_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='3'/><path d='M3 9h18M9 3v18'/></svg>",
  );

const failedIconSrcs = new Set<string>();

function resolveIconSrc(
  rawIcon: string | undefined,
  pluginName: string,
): string {
  if (!rawIcon) return ICON_FALLBACK_DATA_URI;
  if (
    rawIcon.startsWith('data:') ||
    rawIcon.startsWith('http://') ||
    rawIcon.startsWith('https://') ||
    rawIcon.startsWith('/')
  ) {
    return rawIcon;
  }
  if (!pluginName) return ICON_FALLBACK_DATA_URI;
  return `/v1/plugins/${pluginName}/${rawIcon}`;
}

interface IconImgProps {
  src: string;
  alt?: string;
  size?: number;
}

function IconImg({ src, alt, size = 28 }: IconImgProps): JSX.Element {
  const initial = failedIconSrcs.has(src) ? ICON_FALLBACK_DATA_URI : src;
  return (
    <Avatar
      variant="rounded"
      src={initial}
      alt={alt ?? ''}
      sx={{
        width: size,
        height: size,
        bgcolor: 'transparent',
        '& img': { objectFit: 'contain' },
      }}
      imgProps={{
        onError: (e) => {
          const el = e.currentTarget as HTMLImageElement & {
            dataset: DOMStringMap;
          };
          if (el.dataset.failed === '1') return;
          el.dataset.failed = '1';
          failedIconSrcs.add(src);
          if (el.src !== ICON_FALLBACK_DATA_URI) {
            el.src = ICON_FALLBACK_DATA_URI;
          }
        },
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Chip color helpers — all resolved through the host MUI theme so dark mode
// picks up the correct palette automatically.
// ---------------------------------------------------------------------------

function maturityColor(maturity: string | undefined): ChipColor {
  switch ((maturity || 'unknown').toLowerCase()) {
    case 'ga':
    case 'stable':
      return 'success';
    case 'beta':
      return 'info';
    case 'alpha':
      return 'warning';
    case 'deprecated':
      return 'error';
    default:
      return 'default';
  }
}

function typeColor(type: string): ChipColor {
  return type === 'provider' ? 'info' : 'secondary';
}

// ---------------------------------------------------------------------------
// Data loading
// ---------------------------------------------------------------------------

async function fetchSummary(): Promise<SummaryResponse> {
  const res = await pluginFetch('/api/summary');
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

function matchesFilter(entry: CatalogEntry, filter: FilterState): boolean {
  if (filter.type !== 'all' && entry.type !== filter.type) return false;
  if (filter.installedOnly && !entry.installed) return false;
  if (filter.query) {
    const q = filter.query.toLowerCase();
    const haystack = [
      entry.name,
      entry.displayName ?? '',
      entry.description ?? '',
      (entry.categories ?? []).join(' '),
      (entry.keywords ?? []).join(' '),
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function defaultChannelVersion(entry: CatalogEntry): string | null {
  const chart = entry.artifacts?.chart;
  if (!chart) return null;
  const channel = chart.defaultChannel ?? Object.keys(chart.channels ?? {})[0];
  if (!channel) return null;
  return chart.channels?.[channel]?.version ?? null;
}

function helmInstallCommand(entry: CatalogEntry): string {
  const chart = entry.artifacts?.chart;
  const channel =
    chart?.defaultChannel ?? Object.keys(chart?.channels ?? {})[0] ?? '';
  const ref = chart?.channels?.[channel]?.ref ?? '<chart-ref>';
  const version = chart?.channels?.[channel]?.version ?? '<version>';
  const release = entry.install?.helm?.releaseName ?? entry.name;
  const namespace = entry.install?.helm?.namespace ?? 'everest-system';
  return [
    `helm install ${release} ${ref} \\`,
    `  --version ${version} \\`,
    `  -n ${namespace}`,
  ].join('\n');
}

function humanizeKey(key: string): string {
  return key
    .replace(/[._-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Capabilities renderer
// ---------------------------------------------------------------------------

function CapabilityValue({
  name,
  value,
}: {
  name: string;
  value: unknown;
}): JSX.Element | null {
  const label = humanizeKey(name);
  if (typeof value === 'boolean') {
    return (
      <Chip
        size="small"
        variant={value ? 'filled' : 'outlined'}
        color={value ? 'success' : 'default'}
        icon={
          value ? (
            <CheckCircleOutlineRoundedIcon fontSize="small" />
          ) : (
            <CancelOutlinedIcon fontSize="small" />
          )
        }
        label={label}
        sx={{
          mr: 0.75,
          mb: 0.75,
          ...(value
            ? {}
            : { textDecoration: 'line-through', color: 'text.disabled' }),
        }}
      />
    );
  }
  if (Array.isArray(value)) {
    return (
      <Stack
        direction="row"
        spacing={1}
        alignItems="baseline"
        flexWrap="wrap"
        sx={{ mb: 0.5 }}
      >
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', minWidth: 120 }}
        >
          {label}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {value.map((v, i) => (
            <Chip key={i} size="small" variant="outlined" label={String(v)} />
          ))}
        </Stack>
      </Stack>
    );
  }
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') {
    return (
      <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 0.5 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', minWidth: 120 }}
        >
          {label}
        </Typography>
        <Box
          component="code"
          sx={{ fontSize: '0.8125rem', color: 'text.primary' }}
        >
          {JSON.stringify(value)}
        </Box>
      </Stack>
    );
  }
  return (
    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 0.5 }}>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', minWidth: 120 }}
      >
        {label}
      </Typography>
      <Typography variant="body2">{String(value)}</Typography>
    </Stack>
  );
}

function Capabilities({
  caps,
}: {
  caps: Record<string, unknown>;
}): JSX.Element | null {
  const entries = Object.entries(caps);
  if (!entries.length) return null;
  const booleans = entries.filter(([, v]) => typeof v === 'boolean');
  const others = entries.filter(([, v]) => typeof v !== 'boolean');
  return (
    <Box>
      {booleans.length > 0 && (
        <Box sx={{ mb: others.length ? 1.5 : 0 }}>
          {booleans.map(([k, v]) => (
            <CapabilityValue key={k} name={k} value={v} />
          ))}
        </Box>
      )}
      {others.length > 0 && (
        <Box>
          {others.map(([k, v]) => (
            <CapabilityValue key={k} name={k} value={v} />
          ))}
        </Box>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

interface ToolbarProps {
  filter: FilterState;
  onChange: (f: FilterState) => void;
  onRefresh: () => void;
  refreshing: boolean;
  lastRefreshed: Date | null;
}

function Toolbar({
  filter,
  onChange,
  onRefresh,
  refreshing,
  lastRefreshed,
}: ToolbarProps): JSX.Element {
  const chipDefs: Array<{ key: FilterState['type']; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'plugin', label: 'Plugins' },
    { key: 'provider', label: 'Providers' },
  ];
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        gap: 1.5,
        alignItems: 'center',
        flexWrap: 'wrap',
        px: 2,
        py: 1.25,
        mb: 2,
      }}
    >
      <TextField
        size="small"
        type="search"
        placeholder="Search by name, description, category…"
        value={filter.query}
        onChange={(e) => onChange({ ...filter, query: e.target.value })}
        InputProps={{
          startAdornment: (
            <SearchRoundedIcon
              fontSize="small"
              sx={{ color: 'text.secondary', mr: 1 }}
            />
          ),
        }}
        sx={{ flex: '1 1 240px', minWidth: 200 }}
      />
      <Stack direction="row" spacing={0.5}>
        {chipDefs.map((c) => {
          const active = filter.type === c.key;
          return (
            <Chip
              key={c.key}
              label={c.label}
              size="small"
              onClick={() => onChange({ ...filter, type: c.key })}
              color={active ? 'primary' : 'default'}
              variant={active ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
            />
          );
        })}
      </Stack>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={filter.installedOnly}
            onChange={(e) =>
              onChange({ ...filter, installedOnly: e.target.checked })
            }
          />
        }
        label={<Typography variant="body2">Installed only</Typography>}
      />
      <Button
        size="small"
        variant="outlined"
        onClick={onRefresh}
        disabled={refreshing}
        startIcon={
          refreshing ? (
            <CircularProgress size={14} thickness={5} />
          ) : (
            <RefreshRoundedIcon fontSize="small" />
          )
        }
      >
        {refreshing ? 'Refreshing…' : 'Refresh'}
      </Button>
      {lastRefreshed && (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Updated {lastRefreshed.toLocaleTimeString()}
        </Typography>
      )}
    </Paper>
  );
}

// ---------------------------------------------------------------------------
// Table row
// ---------------------------------------------------------------------------

interface RowProps {
  entry: CatalogEntry;
  pluginName: string;
  onSelect: (e: CatalogEntry) => void;
}

function Row({ entry, pluginName, onSelect }: RowProps): JSX.Element {
  const version = defaultChannelVersion(entry);
  return (
    <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => onSelect(entry)}>
      <TableCell sx={{ width: 56 }}>
        <IconImg src={resolveIconSrc(entry.icon, pluginName)} size={32} />
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {entry.displayName || entry.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', display: 'block' }}
        >
          {entry.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          size="small"
          label={entry.type}
          color={typeColor(entry.type)}
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2">{version ?? '—'}</Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {(entry.categories ?? []).map((c) => (
            <Chip key={c} size="small" variant="outlined" label={c} />
          ))}
        </Stack>
      </TableCell>
      <TableCell>
        <Stack spacing={0.5} alignItems="flex-start">
          <Chip
            size="small"
            label={entry.maturity || 'unknown'}
            color={maturityColor(entry.maturity)}
            variant="filled"
            sx={{ textTransform: 'capitalize' }}
          />
          {entry.installed && (
            <Chip
              size="small"
              color="success"
              variant="outlined"
              label={
                entry.installedVersion
                  ? `Installed · ${entry.installedVersion}`
                  : 'Installed'
              }
            />
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

// ---------------------------------------------------------------------------
// Detail drawer content
// ---------------------------------------------------------------------------

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <Box sx={{ mt: 2.5 }}>
      <Typography
        variant="overline"
        sx={{
          display: 'block',
          color: 'text.secondary',
          letterSpacing: '0.05em',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 1.25 }} />
      {children}
    </Box>
  );
}

function MetaLine({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <Typography variant="body2">
      <Box component="span" sx={{ fontWeight: 600 }}>
        {label}:{' '}
      </Box>
      {value}
    </Typography>
  );
}

interface DrawerContentProps {
  entry: CatalogEntry;
  pluginName: string;
  onClose: () => void;
}

function DetailDrawer({
  entry,
  pluginName,
  onClose,
}: DrawerContentProps): JSX.Element {
  const version = defaultChannelVersion(entry);
  const install = helmInstallCommand(entry);
  const extensionPoints = entry.plugin?.extensionPoints ?? [];
  const supportedEngines = entry.provider?.supportedEngines ?? [];
  const maintainers = entry.maintainers ?? [];

  return (
    <Box
      role="presentation"
      sx={{ width: { xs: '100vw', sm: 560 }, p: 3, boxSizing: 'border-box' }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
        <IconImg src={resolveIconSrc(entry.icon, pluginName)} size={40} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {entry.displayName || entry.name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ color: 'text.secondary' }}
          >
            <Typography variant="caption" noWrap>
              {entry.name}
            </Typography>
            <Chip
              size="small"
              label={entry.type}
              color={typeColor(entry.type)}
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
            />
          </Stack>
        </Box>
        <IconButton aria-label="Close" onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      {entry.installed && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip
            size="small"
            color="success"
            variant="filled"
            label={
              entry.installedVersion
                ? `Installed · ${entry.installedVersion}`
                : 'Installed'
            }
          />
          {entry.installedPhase && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Phase: {entry.installedPhase}
            </Typography>
          )}
        </Stack>
      )}

      {entry.description && (
        <Typography
          variant="body2"
          sx={{ whiteSpace: 'pre-line', color: 'text.primary', mb: 2 }}
        >
          {entry.description}
        </Typography>
      )}

      <Section title="Metadata">
        <Stack spacing={0.75}>
          {version && <MetaLine label="Version" value={version} />}
          {entry.maturity && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Maturity:
              </Typography>
              <Chip
                size="small"
                label={entry.maturity}
                color={maturityColor(entry.maturity)}
                variant="filled"
                sx={{ textTransform: 'capitalize' }}
              />
            </Stack>
          )}
          {entry.compatibility?.openeverest && (
            <MetaLine
              label="Requires OpenEverest"
              value={entry.compatibility.openeverest}
            />
          )}
          {entry.license && <MetaLine label="License" value={entry.license} />}
          {entry.verified && <MetaLine label="Verified" value="yes" />}
        </Stack>
      </Section>

      {extensionPoints.length > 0 && (
        <Section title="Extension points">
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {extensionPoints.map((p) => (
              <Chip key={p} size="small" variant="outlined" label={p} />
            ))}
          </Stack>
        </Section>
      )}

      {supportedEngines.length > 0 && (
        <Section title="Supported engines">
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {supportedEngines.map((e) => (
              <Chip key={e} size="small" variant="outlined" label={e} />
            ))}
          </Stack>
        </Section>
      )}

      {entry.capabilities && Object.keys(entry.capabilities).length > 0 && (
        <Section title="Capabilities">
          <Capabilities caps={entry.capabilities} />
        </Section>
      )}

      {maintainers.length > 0 && (
        <Section title="Maintainers">
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            {maintainers.map((m, i) => (
              <Box component="li" key={i} sx={{ fontSize: '0.875rem' }}>
                {m.name || m.github || m.email || 'unknown'}
              </Box>
            ))}
          </Box>
        </Section>
      )}

      <Section title="Install with Helm">
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 1.5,
            borderRadius: 1,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '0.8125rem',
            whiteSpace: 'pre',
            overflowX: 'auto',
            bgcolor: 'grey.900',
            color: 'grey.100',
          }}
        >
          {install}
        </Box>
      </Section>

      {(entry.sourceRepo || entry.homepage) && (
        <Box sx={{ mt: 2.5 }}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {entry.sourceRepo && (
              <Link
                href={entry.sourceRepo}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
              >
                Source repository
                <LaunchRoundedIcon fontSize="inherit" />
              </Link>
            )}
            {entry.homepage && (
              <Link
                href={entry.homepage}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
              >
                Homepage
                <LaunchRoundedIcon fontSize="inherit" />
              </Link>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function HubPage(props: PluginRouteProps): JSX.Element {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [filter, setFilter] = useState<FilterState>({
    query: '',
    type: 'all',
    installedOnly: false,
  });
  const [selected, setSelected] = useState<CatalogEntry | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchSummary()
      .then((res) => {
        setData(res);
        setLastRefreshed(new Date());
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const entries = data?.extensions ?? [];
  const filtered = entries.filter((e) => matchesFilter(e, filter));
  const counts = {
    total: entries.length,
    installed: entries.filter((e) => e.installed).length,
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1280, mx: 'auto' }}>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        flexWrap="wrap"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Plugin Hub
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Browse OpenEverest plugins and providers. {counts.total} available
            · {counts.installed} installed.
          </Typography>
        </Box>
        {props.pluginName && (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            plugin: {props.pluginName}
          </Typography>
        )}
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load catalog: {error}
        </Alert>
      )}
      {data?.stale && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Showing cached catalog — upstream hub index is currently unreachable.
        </Alert>
      )}
      {data?.installedError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Could not load installed extensions: {data.installedError}. Showing
          catalog without install status.
        </Alert>
      )}

      <Toolbar
        filter={filter}
        onChange={setFilter}
        onRefresh={load}
        refreshing={loading}
        lastRefreshed={lastRefreshed}
      />

      {loading && !data ? (
        <Box
          sx={{
            py: 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            color: 'text.secondary',
          }}
        >
          <CircularProgress size={20} />
          <Typography variant="body2">Loading catalog…</Typography>
        </Box>
      ) : filtered.length === 0 ? (
        <Box
          sx={{
            py: 6,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">
            {entries.length === 0
              ? 'No extensions in the catalog.'
              : 'No extensions match the current filters.'}
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 56 }} />
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Maturity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((entry) => (
                <Row
                  key={entry.name}
                  entry={entry}
                  pluginName={props.pluginName}
                  onSelect={setSelected}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Drawer
        anchor="right"
        open={!!selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <DetailDrawer
            entry={selected}
            pluginName={props.pluginName}
            onClose={() => setSelected(null)}
          />
        )}
      </Drawer>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Plugin registration
// ---------------------------------------------------------------------------

const register: PluginRegisterFn = (api: PluginApi) => {
  pluginFetch = api.fetch.bind(api);

  api.registerExtension({
    type: 'sidebarItem',
    label: 'Plugin Hub',
  });

  api.registerExtension({
    type: 'route',
    label: 'Plugin Hub',
    component: HubPage,
  });
};

export default register;
