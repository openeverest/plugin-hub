import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import type { PluginRouteProps } from '@openeverest/plugin-sdk';
import register from './main';
import {
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

function registerHubPage(): React.ComponentType<PluginRouteProps> {
  let routeComponent: React.ComponentType<PluginRouteProps> | undefined;
  register({
    React,
    registerExtension: (extension) => {
      if (extension.type === 'route') routeComponent = extension.component;
    },
    fetch: async (path) =>
      jsonResponse(path === '/api/catalog' ? catalog : { items: [] }),
    basePath: '/v1/clusters/test/plugins/plugin-hub',
    cssNonce: '',
    hostVersion: 'test',
    uiContractVersion: 'test',
  });
  if (!routeComponent) throw new Error('plugin-hub did not register a route');
  return routeComponent;
}

const renderHub = (subPath: string) =>
  render(React.createElement(registerHubPage(), { pluginName: 'plugin-hub', subPath }));

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
