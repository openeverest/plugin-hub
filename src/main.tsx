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

import { React, h, initRuntime, cssNonce } from './runtime';
import { sx } from './styles';
import {
  PluginThemeProvider,
  Box,
  Typography,
  Button,
  Link,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@openeverest/ui-lib';
import { fetchCatalog, fetchInstalled, installedKey } from './data';
import { matchesFilter } from './catalog';
import { Toolbar } from './components/Toolbar';
import { Row } from './components/Row';
import { Drawer } from './components/Drawer';
import type { CatalogEntry, FilterState, SummaryResponse } from './types';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const HubPage = (props: PluginRouteProps): any => {
  const [data, setData] = React.useState<SummaryResponse | null>(null);
  const [installedKeys, setInstalledKeys] = React.useState<Set<string> | null>(null);
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
    setInstalledKeys(null);
    setInstalledError(null);
    fetchInstalled()
      .then((res) => {
        const keys = new Set<string>();
        for (const item of res.items ?? []) {
          if (item?.name) keys.add(installedKey(item.type, item.name));
        }
        setInstalledKeys(keys);
        if (res.error) setInstalledError(res.error);
      })
      .catch((err: Error) => {
        setInstalledKeys(new Set());
        setInstalledError(err.message);
      });
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const installedLoading = installedKeys === null;
  const entries = React.useMemo(() => {
    const raw = data?.extensions ?? [];
    if (!installedKeys) return raw;
    return raw.map((e) => ({
      ...e,
      installed: installedKeys.has(installedKey(e.type, e.name)),
    }));
  }, [data, installedKeys]);
  const filtered = entries.filter((e) => matchesFilter(e, filter));
  const counts = {
    total: entries.length,
    plugin: entries.filter((e) => e.type === 'plugin').length,
    provider: entries.filter((e) => e.type === 'provider').length,
    installed: entries.filter((e) => e.installed).length,
  };

  return h(
    PluginThemeProvider,
    { cacheKey: 'plugin-hub', nonce: cssNonce },
    h(
      Box,
      { sx: sx.page },
      h(
        Box,
        { sx: sx.headerRow },
        h(
          Box,
          null,
          h(Typography, { variant: 'h5', sx: { fontWeight: 600 } }, 'The Hub'),
          h(
            Typography,
            { variant: 'body2', sx: sx.subtitle },
            `Browse OpenEverest plugins and providers. ${counts.total} available · ${
              installedLoading ? 'checking installed…' : `${counts.installed} installed`
            }.`
          )
        ),
        h(
          Box,
          { sx: sx.headerActions },
          h(
            Button,
            {
              variant: 'contained',
              size: 'small',
              href: 'https://github.com/openeverest/hub',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            'Add extension'
          ),
          h(
            Link,
            {
              href: 'https://github.com/openeverest/openeverest/issues/',
              target: '_blank',
              rel: 'noopener noreferrer',
              variant: 'caption',
            },
            'Need other tech? →'
          )
        )
      ),

      error
        ? h(
            Alert,
            { severity: 'error', sx: { mb: 2 } },
            `Failed to load catalog: ${error}`
          )
        : null,
      data?.stale
        ? h(
            Alert,
            { severity: 'warning', sx: { mb: 2 } },
            'Showing cached catalog — upstream hub index is currently unreachable.'
          )
        : null,
      installedError
        ? h(
            Alert,
            { severity: 'warning', sx: { mb: 2 } },
            `Could not load installed extensions: ${installedError}. Showing catalog without install status.`
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
        ? h(Box, { sx: sx.empty }, 'Loading catalog…')
        : filtered.length === 0
        ? h(
            Box,
            { sx: sx.empty },
            entries.length === 0
              ? 'No extensions in the catalog.'
              : 'No extensions match the current filters.'
          )
        : h(
            TableContainer,
            { component: Paper, variant: 'outlined' },
            h(
              Table,
              { size: 'small' },
              h(
                TableHead,
                null,
                h(
                  TableRow,
                  null,
                  h(TableCell, { sx: { width: 40 } }, ''),
                  h(TableCell, null, 'Name'),
                  h(TableCell, null, 'Type'),
                  h(TableCell, null, 'Version'),
                  h(TableCell, null, 'Categories'),
                  h(TableCell, null, 'Maturity')
                )
              ),
              h(
                TableBody,
                null,
                ...filtered.map((entry) =>
                  Row({ entry, pluginName: props.pluginName, onSelect: setSelected })
                )
              )
            )
          ),

      selected
        ? h(Drawer, {
            entry: selected,
            pluginName: props.pluginName,
            onClose: () => setSelected(null),
          })
        : null
    )
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
