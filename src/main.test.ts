import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import type { PluginRouteProps } from '@openeverest/plugin-sdk';
import register from './main';
import {
  blockedCompat,
  corootIntegration,
  futureTypeEntry,
  pluginEntry,
  pmmIntegration,
  prometheusIntegration,
  providerEntry,
} from './__fixtures__/catalog';

const catalog = {
  extensions: [
    pluginEntry,
    providerEntry,
    pmmIntegration,
    prometheusIntegration,
    corootIntegration,
    futureTypeEntry,
  ],
};

const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });

const responses = (compatibility: unknown): Record<string, unknown> => ({
  '/api/catalog': catalog,
  '/api/compatibility': compatibility,
});

function registerHubPage(compatibility: unknown = {}): React.ComponentType<PluginRouteProps> {
  let routeComponent: React.ComponentType<PluginRouteProps> | undefined;
  register({
    React,
    registerExtension: (extension) => {
      if (extension.type === 'route') routeComponent = extension.component;
    },
    fetch: async (path) => jsonResponse(responses(compatibility)[path] ?? { items: [] }),
    basePath: '/v1/clusters/test/plugins/plugin-hub',
    cssNonce: '',
    hostVersion: 'test',
    uiContractVersion: 'test',
  });
  if (!routeComponent) throw new Error('plugin-hub did not register a route');
  return routeComponent;
}

const renderHub = (subPath: string, compatibility?: unknown) =>
  render(React.createElement(registerHubPage(compatibility), { pluginName: 'plugin-hub', subPath }));

beforeEach(() => {
  window.history.replaceState(null, '', '/plugins/plugin-hub');
});

describe('Hub page with integrations', () => {
  it('shows an Integrations tab with its count', async () => {
    renderHub('');
    await screen.findByText('Prometheus');
    expect(screen.getByTestId('plugin-hub-tab-integration').textContent).toBe('Integrations (3)');
    expect(screen.getByTestId('plugin-hub-tab-all').textContent).toBe('All (6)');
  });

  it('lists only integrations under /integrations', async () => {
    renderHub('integrations');
    expect(await screen.findByText('Prometheus')).toBeTruthy();
    expect(screen.getByText('PMM')).toBeTruthy();
    expect(screen.getByText('Coroot')).toBeTruthy();
    expect(screen.queryByText('Plugin Hub')).toBeNull();
    expect(screen.queryByText('Percona Server for MongoDB')).toBeNull();
  });

  it('navigates to the integrations list when the tab is clicked', async () => {
    renderHub('');
    fireEvent.click(await screen.findByTestId('plugin-hub-tab-integration'));
    expect(window.location.pathname).toBe('/plugins/plugin-hub/integrations');
  });

  it('opens an integration drawer at its deep link from a row click', async () => {
    renderHub('integrations');
    fireEvent.click(await screen.findByText('Coroot'));
    expect(window.location.pathname).toBe('/plugins/plugin-hub/integrations/monitoring-coroot');
  });

  it('renders the drawer for an integration deep link', async () => {
    renderHub('integrations/monitoring-prometheus');
    const details = within(await screen.findByTestId('plugin-hub-integration-details'));
    expect(details.getByText('Runs its own controller')).toBeTruthy();
  });

  it('shows an integration-specific not-found drawer for unknown names', async () => {
    renderHub('integrations/monitoring-missing');
    expect(await screen.findByText('Integration not found')).toBeTruthy();
    expect(screen.getByText('Browse integrations')).toBeTruthy();
  });

  it('keeps entries of unknown types listed but inert', async () => {
    renderHub('');
    fireEvent.click(await screen.findByText('Something New'));
    expect(window.location.pathname).toBe('/plugins/plugin-hub');
  });
});

describe('Hub page compatibility', () => {
  it('marks entries no release of which works with the cluster', async () => {
    renderHub('integrations', {
      coreVersion: '2.1.0',
      extensions: {
        'integration:monitoring-pmm': {
          ...blockedCompat,
          head: '0.1.0',
          releases: [{ ...blockedCompat.releases[0], version: '0.1.0' }],
        },
      },
    });
    const chip = await screen.findByTestId('plugin-hub-row-incompatible');
    expect(chip.textContent).toBe('No release supports OpenEverest 2.1.0 yet');
    expect(chip.getAttribute('title')).toBe(
      'No release of PMM supports OpenEverest 2.1.0 yet. PMM 0.1.0 needs OpenEverest 2.2.0 or later.'
    );
    expect(screen.getAllByTestId('plugin-hub-row-incompatible')).toHaveLength(1);
  });

  it('shows the compatibility of the offered release in the drawer', async () => {
    renderHub('integrations/monitoring-pmm', {
      coreVersion: '2.1.0',
      extensions: {
        'integration:monitoring-pmm': {
          channel: 'stable',
          head: '0.1.0',
          recommended: '0.1.0',
          releases: [
            {
              version: '0.1.0',
              status: 'True',
              reason: 'Supported',
              message: 'works with this version of OpenEverest',
            },
          ],
        },
      },
    });
    expect((await screen.findByTestId('plugin-hub-compatibility')).textContent).toBe(
      'Compatibility: Works with this OpenEverest (2.1.0)'
    );
  });
});
