// Frontend bundle for the OpenEverest plugin-hub.
//
// Registers a sidebar entry and a dedicated route that renders the Hub
// browser — a searchable, filterable list of available and installed
// extensions. The catalog is pulled from the plugin's Go backend
// (/api/catalog) and install status is loaded separately (/api/installed) so
// a slow or failing everest API never blocks the catalog from rendering.
//
// The runtime contract follows the openeverest/generic-plugin-template
// pattern: React and the host-authenticated fetch are injected via the
// `register(api)` call (see runtime.ts), so this module uses
// React.createElement (via `h`) directly and does not import React or any UI
// framework. The bundle stays small and the host stays in charge of
// dependency versions.
import type {
  PluginRegisterFn,
  PluginApi,
  PluginRouteProps,
} from '@openeverest/plugin-sdk';

import { React, h, initRuntime } from './runtime';
import { styles } from './styles';
import { fetchCatalog, fetchInstalled, installedKey } from './data';
import { matchesFilter } from './catalog';
import { Toolbar } from './components/Toolbar';
import { Row } from './components/Row';
import { Drawer } from './components/Drawer';
import type { CatalogEntry, FilterState, InstalledItem, SummaryResponse } from './types';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const HubPage = (props: PluginRouteProps): any => {
  const [data, setData] = React.useState<SummaryResponse | null>(null);
  const [installedMap, setInstalledMap] = React.useState<Map<string, InstalledItem> | null>(null);
  const [installedError, setInstalledError] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = React.useState<Date | null>(null);
  const [filter, setFilter] = React.useState<FilterState>({
    query: '',
    type: 'all',
    installedOnly: false,
    hideGated: false,
  });
  const [selected, setSelected] = React.useState<CatalogEntry | null>(null);

  const load = React.useCallback(() => {
    setLoading(true);
    setError(null);
    // Catalog is the fast, cached call — it gates the initial paint.
    fetchCatalog()
      .then((res) => {
        setData(res);
        setLastRefreshed(new Date());
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));

    // Install status is loaded independently so a slow or failing everest API
    // never blocks the catalog. Labels fill in once this resolves.
    setInstalledMap(null);
    setInstalledError(null);
    fetchInstalled()
      .then((res) => {
        const map = new Map<string, InstalledItem>();
        for (const item of res.items ?? []) {
          if (item?.name) map.set(installedKey(item.type, item.name), item);
        }
        setInstalledMap(map);
        if (res.error) setInstalledError(res.error);
      })
      .catch((err: Error) => {
        setInstalledMap(new Map());
        setInstalledError(err.message);
      });
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const installedLoading = installedMap === null;
  const entries = React.useMemo(() => {
    const raw = data?.extensions ?? [];
    if (!installedMap) return raw;
    return raw.map((e) => {
      const installed = installedMap.get(installedKey(e.type, e.name));
      return {
        ...e,
        installed: !!installed,
        installedVersion: installed?.version || e.installedVersion,
      };
    });
  }, [data, installedMap]);
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
        h('h1', { style: styles.title }, 'The Hub'),
        h(
          'p',
          { style: styles.subtitle },
          `Browse OpenEverest plugins and providers. ${counts.total} available · ${
            installedLoading ? 'checking installed…' : `${counts.installed} installed`
          }.`,
        ),
      ),
      h(
        'div',
        { style: styles.headerActions },
        h(
          'a',
          {
            href: 'https://github.com/openeverest/hub',
            target: '_blank',
            rel: 'noopener noreferrer',
            style: styles.ctaBtn,
          },
          'Add extension',
        ),
        h(
          'a',
          {
            href: 'https://github.com/openeverest/openeverest/issues/',
            target: '_blank',
            rel: 'noopener noreferrer',
            style: styles.ctaLink,
          },
          'Need other tech? →',
        ),
      ),
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
    installedError
      ? h(
          'div',
          { style: styles.warnBox },
          `Could not load installed extensions: ${installedError}. Showing catalog without install status.`,
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
              h('th', { style: styles.th }, 'Maturity'),
            ),
          ),
          h('tbody', null, ...filtered.map((entry) => Row({ entry, pluginName: props.pluginName, onSelect: setSelected }))),
        ),

    selected ? h(Drawer, { entry: selected, pluginName: props.pluginName, onClose: () => setSelected(null) }) : null,
  );
};

// ---------------------------------------------------------------------------
// Plugin registration
// ---------------------------------------------------------------------------

const register: PluginRegisterFn = (api: PluginApi) => {
  initRuntime(api);

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
