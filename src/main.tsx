// Frontend bundle for the OpenEverest plugin-hub.
//
// Registers a sidebar entry and a dedicated route that renders the Hub
// browser — a searchable, filterable list of available and installed
// extensions, pulled from the host's /v1/plugins/plugin-hub/api/summary
// endpoint (which proxies to this plugin's Go backend).
//
// The runtime contract follows the openeverest/generic-plugin-template
// pattern: React and the host-authenticated fetch are injected via the
// `register(api)` call, so this module uses React.createElement directly and
// does not import React or any UI framework. The bundle stays small and the
// host stays in charge of dependency versions.
import type {
  PluginRegisterFn,
  PluginApi,
  PluginRouteProps,
} from '@openeverest/plugin-sdk';

let React: PluginApi['React'];
let pluginFetch: PluginApi['fetch'];

const h = (
  type: any,
  props: any,
  ...children: any[]
): any => React.createElement(type, props, ...children);

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
  installed?: boolean;
  installedVersion?: string;
  installedPhase?: string;
}

interface SummaryResponse {
  extensions?: CatalogEntry[];
  metadata?: { catalogId?: string; generatedAt?: string; totalExtensions?: number };
  stale?: boolean;
  installedError?: string;
}

interface FilterState {
  query: string;
  type: 'all' | 'plugin' | 'provider';
  installedOnly: boolean;
}

// ---------------------------------------------------------------------------
// Styling — inline objects, host theme inherited.
// ---------------------------------------------------------------------------

const styles = {
  page: { padding: '1.5rem', maxWidth: 1280, margin: '0 auto' } as const,
  headerRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const,
  },
  title: { margin: 0, fontSize: '1.5rem', fontWeight: 600 },
  subtitle: { margin: 0, color: '#6b7280', fontSize: '0.875rem' },
  toolbar: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    padding: '0.75rem 1rem',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    marginBottom: '1rem',
  },
  input: {
    flex: '1 1 240px',
    minWidth: 200,
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    background: '#fff',
  } as const,
  chipGroup: { display: 'flex', gap: '0.25rem' } as const,
  chip: (active: boolean) => ({
    padding: '0.4rem 0.75rem',
    fontSize: '0.8125rem',
    border: '1px solid ' + (active ? '#1f2937' : '#d1d5db'),
    background: active ? '#1f2937' : '#fff',
    color: active ? '#fff' : '#374151',
    borderRadius: 999,
    cursor: 'pointer',
  }),
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.875rem',
    color: '#374151',
    cursor: 'pointer',
  } as const,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  th: {
    textAlign: 'left' as const,
    padding: '0.75rem 1rem',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: '#6b7280',
    background: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    borderBottom: '1px solid #f3f4f6',
    verticalAlign: 'top' as const,
  } as const,
  iconCell: { width: 40, padding: '0.75rem', textAlign: 'center' as const },
  iconImg: { width: 28, height: 28, objectFit: 'contain' as const },
  statusInstalled: {
    display: 'inline-block',
    padding: '0.15rem 0.55rem',
    background: '#dcfce7',
    color: '#166534',
    borderRadius: 999,
    fontSize: '0.75rem',
    fontWeight: 600,
  } as const,
  statusAvailable: {
    display: 'inline-block',
    padding: '0.15rem 0.55rem',
    background: '#e5e7eb',
    color: '#374151',
    borderRadius: 999,
    fontSize: '0.75rem',
    fontWeight: 600,
  } as const,
  typeChip: (type: string) => ({
    display: 'inline-block',
    padding: '0.15rem 0.55rem',
    background: type === 'provider' ? '#dbeafe' : '#ede9fe',
    color: type === 'provider' ? '#1e3a8a' : '#5b21b6',
    borderRadius: 999,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'capitalize' as const,
  }),
  categoryTag: {
    display: 'inline-block',
    padding: '0.1rem 0.5rem',
    fontSize: '0.7rem',
    background: '#f3f4f6',
    color: '#4b5563',
    borderRadius: 4,
    marginRight: 4,
  } as const,
  refreshBtn: {
    padding: '0.4rem 0.9rem',
    fontSize: '0.8125rem',
    border: '1px solid #d1d5db',
    background: '#fff',
    color: '#374151',
    borderRadius: 6,
    cursor: 'pointer',
  } as const,
  empty: {
    padding: '3rem',
    textAlign: 'center' as const,
    color: '#6b7280',
  },
  errorBox: {
    padding: '0.75rem 1rem',
    background: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca',
    borderRadius: 6,
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  warnBox: {
    padding: '0.6rem 1rem',
    background: '#fef3c7',
    color: '#92400e',
    border: '1px solid #fde68a',
    borderRadius: 6,
    marginBottom: '1rem',
    fontSize: '0.8125rem',
  },
  drawerBackdrop: {
    position: 'fixed' as const,
    // Offset below the host's fixed MuiAppBar (regular toolbar = 64px on
    // desktop, 56px on narrow screens) so the navigation stays visible and
    // the drawer header isn't clipped.
    top: 64,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(15, 23, 42, 0.4)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  drawer: {
    width: 'min(560px, 100%)',
    height: '100%',
    background: '#fff',
    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
    overflowY: 'auto' as const,
    padding: '1.5rem',
    boxSizing: 'border-box' as const,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  closeBtn: {
    marginLeft: 'auto',
    border: 'none',
    background: 'transparent',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#6b7280',
  } as const,
  section: { marginTop: '1.25rem' } as const,
  sectionTitle: {
    margin: '0 0 0.5rem',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    color: '#6b7280',
    letterSpacing: '0.05em',
  },
  codeBlock: {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '0.75rem 1rem',
    borderRadius: 6,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '0.8125rem',
    whiteSpace: 'pre' as const,
    overflowX: 'auto' as const,
  },
};

const ICON_FALLBACK = '/v1/plugins/plugin-hub/icon.png';

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

// ---------------------------------------------------------------------------
// Catalog table
// ---------------------------------------------------------------------------

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
  const channel = chart?.defaultChannel ?? Object.keys(chart?.channels ?? {})[0] ?? '';
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

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function Toolbar(props: {
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

function Row(props: { entry: CatalogEntry; onSelect: (e: CatalogEntry) => void }): any {
  const { entry, onSelect } = props;
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
      h('img', {
        src: entry.icon || ICON_FALLBACK,
        alt: '',
        style: styles.iconImg,
        onError: (e: any) => {
          e.currentTarget.src = ICON_FALLBACK;
        },
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
      entry.installed
        ? h(
            'span',
            { style: styles.statusInstalled },
            entry.installedVersion ? `Installed · ${entry.installedVersion}` : 'Installed',
          )
        : h('span', { style: styles.statusAvailable }, 'Available'),
    ),
  );
}

function Drawer(props: { entry: CatalogEntry; onClose: () => void }): any {
  const { entry, onClose } = props;
  const version = defaultChannelVersion(entry);
  const install = helmInstallCommand(entry);
  const extensionPoints = entry.plugin?.extensionPoints ?? [];
  const supportedEngines = entry.provider?.supportedEngines ?? [];
  const maintainers = entry.maintainers ?? [];

  return h(
    'div',
    { style: styles.drawerBackdrop, onClick: onClose },
    h(
      'div',
      {
        style: styles.drawer,
        onClick: (e: any) => e.stopPropagation(),
      },
      h(
        'div',
        { style: styles.drawerHeader },
        h('img', { src: entry.icon || ICON_FALLBACK, alt: '', style: { width: 40, height: 40 } }),
        h(
          'div',
          null,
          h(
            'h2',
            { style: { margin: 0, fontSize: '1.25rem', fontWeight: 600 } },
            entry.displayName || entry.name,
          ),
          h(
            'div',
            { style: { color: '#6b7280', fontSize: '0.8125rem' } },
            entry.name,
            ' · ',
            h('span', { style: styles.typeChip(entry.type) }, entry.type),
          ),
        ),
        h('button', { type: 'button', style: styles.closeBtn, onClick: onClose }, '×'),
      ),

      entry.installed
        ? h(
            'div',
            { style: { marginBottom: '1rem' } },
            h(
              'span',
              { style: styles.statusInstalled },
              entry.installedVersion ? `Installed · ${entry.installedVersion}` : 'Installed',
            ),
            entry.installedPhase
              ? h(
                  'span',
                  { style: { marginLeft: 8, color: '#6b7280', fontSize: '0.8125rem' } },
                  `Phase: ${entry.installedPhase}`,
                )
              : null,
          )
        : h('div', { style: { marginBottom: '1rem' } }, h('span', { style: styles.statusAvailable }, 'Available')),

      entry.description
        ? h(
            'p',
            { style: { color: '#374151', whiteSpace: 'pre-line' } },
            entry.description,
          )
        : null,

      h(
        'div',
        { style: styles.section },
        h('h3', { style: styles.sectionTitle }, 'Metadata'),
        h(
          'div',
          { style: { fontSize: '0.875rem', lineHeight: 1.7 } },
          version ? h('div', null, h('b', null, 'Version: '), version) : null,
          entry.compatibility?.openeverest
            ? h('div', null, h('b', null, 'Requires OpenEverest: '), entry.compatibility.openeverest)
            : null,
          entry.license ? h('div', null, h('b', null, 'License: '), entry.license) : null,
          entry.verified
            ? h('div', null, h('b', null, 'Verified: '), 'yes')
            : null,
        ),
      ),

      extensionPoints.length
        ? h(
            'div',
            { style: styles.section },
            h('h3', { style: styles.sectionTitle }, 'Extension points'),
            h(
              'div',
              null,
              ...extensionPoints.map((p) => h('span', { key: p, style: styles.categoryTag }, p)),
            ),
          )
        : null,

      supportedEngines.length
        ? h(
            'div',
            { style: styles.section },
            h('h3', { style: styles.sectionTitle }, 'Supported engines'),
            h(
              'div',
              null,
              ...supportedEngines.map((e) => h('span', { key: e, style: styles.categoryTag }, e)),
            ),
          )
        : null,

      maintainers.length
        ? h(
            'div',
            { style: styles.section },
            h('h3', { style: styles.sectionTitle }, 'Maintainers'),
            h(
              'ul',
              { style: { margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem' } },
              ...maintainers.map((m, i) =>
                h('li', { key: i }, m.name || m.github || m.email || 'unknown'),
              ),
            ),
          )
        : null,

      h(
        'div',
        { style: styles.section },
        h('h3', { style: styles.sectionTitle }, 'Install with Helm'),
        h('pre', { style: styles.codeBlock }, install),
      ),

      h(
        'div',
        { style: styles.section },
        h(
          'div',
          { style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' } },
          entry.sourceRepo
            ? h(
                'a',
                { href: entry.sourceRepo, target: '_blank', rel: 'noopener noreferrer' },
                'Source repository ↗',
              )
            : null,
          entry.homepage
            ? h(
                'a',
                { href: entry.homepage, target: '_blank', rel: 'noopener noreferrer' },
                'Homepage ↗',
              )
            : null,
        ),
      ),
    ),
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const HubPage = (props: PluginRouteProps): any => {
  const [data, setData] = React.useState<SummaryResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = React.useState<Date | null>(null);
  const [filter, setFilter] = React.useState<FilterState>({
    query: '',
    type: 'all',
    installedOnly: false,
  });
  const [selected, setSelected] = React.useState<CatalogEntry | null>(null);

  const load = React.useCallback(() => {
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

  React.useEffect(() => {
    load();
  }, [load]);

  const entries = data?.extensions ?? [];
  const filtered = entries.filter((e) => matchesFilter(e, filter));
  const counts = {
    total: entries.length,
    plugin: entries.filter((e) => e.type === 'plugin').length,
    provider: entries.filter((e) => e.type === 'provider').length,
    installed: entries.filter((e) => e.installed).length,
  };

  return h(
    'div',
    { style: styles.page },
    h(
      'div',
      { style: styles.headerRow },
      h(
        'div',
        null,
        h('h1', { style: styles.title }, 'Plugin Hub'),
        h(
          'p',
          { style: styles.subtitle },
          `Browse OpenEverest plugins and providers. ${counts.total} available · ${counts.installed} installed.`,
        ),
      ),
      props.pluginName
        ? h(
            'span',
            { style: { fontSize: '0.75rem', color: '#9ca3af' } },
            `plugin: ${props.pluginName}`,
          )
        : null,
    ),

    error
      ? h('div', { style: styles.errorBox }, `Failed to load catalog: ${error}`)
      : null,
    data?.stale
      ? h(
          'div',
          { style: styles.warnBox },
          'Showing cached catalog — upstream hub index is currently unreachable.',
        )
      : null,
    data?.installedError
      ? h(
          'div',
          { style: styles.warnBox },
          `Could not load installed extensions: ${data.installedError}. Showing catalog without install status.`,
        )
      : null,

    h(Toolbar, {
      filter,
      onChange: setFilter,
      onRefresh: load,
      refreshing: loading,
      lastRefreshed,
    }),

    loading && !data
      ? h('div', { style: styles.empty }, 'Loading catalog…')
      : filtered.length === 0
      ? h(
          'div',
          { style: styles.empty },
          entries.length === 0
            ? 'No extensions in the catalog.'
            : 'No extensions match the current filters.',
        )
      : h(
          'table',
          { style: styles.table },
          h(
            'thead',
            null,
            h(
              'tr',
              null,
              h('th', { style: { ...styles.th, ...styles.iconCell } }, ''),
              h('th', { style: styles.th }, 'Name'),
              h('th', { style: styles.th }, 'Type'),
              h('th', { style: styles.th }, 'Version'),
              h('th', { style: styles.th }, 'Categories'),
              h('th', { style: styles.th }, 'Status'),
            ),
          ),
          h('tbody', null, ...filtered.map((entry) => Row({ entry, onSelect: setSelected }))),
        ),

    selected ? h(Drawer, { entry: selected, onClose: () => setSelected(null) }) : null,
  );
};

// ---------------------------------------------------------------------------
// Plugin registration
// ---------------------------------------------------------------------------

const register: PluginRegisterFn = (api: PluginApi) => {
  React = api.React;
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
