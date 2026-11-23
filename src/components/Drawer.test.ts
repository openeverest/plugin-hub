import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { h, initRuntime } from '../runtime';
import { Drawer } from './Drawer';
import {
  blockedCompat,
  corootIntegration,
  futureTypeEntry,
  mongodbCompat,
  mongodbEntry,
  pmmIntegration,
  prometheusIntegration,
  providerEntry,
  undeclaredCompat,
} from '../__fixtures__/catalog';
import type { CatalogEntry, InstallerStatus } from '../types';

const renderDrawer = (entry: CatalogEntry, installer: InstallerStatus | null = null) =>
  render(h(Drawer, { entry, installer, notice: null, onInstallerDone: vi.fn(), onClose: vi.fn() }));

const ADMIN: InstallerStatus = { enabled: true, canInstall: true };

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// Replaces the host fetch; returns the mock to inspect the requests it got.
function stubFetch(respond: () => Response) {
  const fetch = vi.fn(async (_path: string, _init?: RequestInit) => respond());
  initRuntime({
    React,
    registerExtension: () => {},
    fetch,
    basePath: '/v1/clusters/test/plugins/plugin-hub',
    cssNonce: '',
    hostVersion: 'test',
    uiContractVersion: 'test',
  });
  return fetch;
}

const requestBody = (fetch: ReturnType<typeof stubFetch>, call = 0) =>
  JSON.parse(String(fetch.mock.calls[call][1]?.body));

const deployed = { release: 'percona-server-mongodb', namespace: 'everest-system', chartVersion: '0.7.0', status: 'deployed' };

afterEach(() => {
  stubFetch(() => {
    throw new Error('fetch is not stubbed in this test');
  });
});

const integrationDetails = () => within(screen.getByTestId('plugin-hub-integration-details'));

describe('Drawer for integrations', () => {
  it('shows area, MonitoringClass, provider-managed mode and native integration', () => {
    renderDrawer(pmmIntegration);
    const details = integrationDetails();
    expect(details.getByText('Monitoring')).toBeTruthy();
    expect(details.getByText('pmm')).toBeTruthy();
    expect(details.getByText('Rendered by the provider')).toBeTruthy();
    expect(details.getByText("Uses the provider's native pmm integration")).toBeTruthy();
    expect(details.queryByText('Providers must expose metrics')).toBeNull();
  });

  it('describes extension-managed integrations that need provider metrics', () => {
    renderDrawer(prometheusIntegration);
    expect(integrationDetails().getByText('prometheus')).toBeTruthy();
    expect(integrationDetails().getByText('Runs its own controller')).toBeTruthy();
    expect(integrationDetails().getByText('Providers must expose metrics')).toBeTruthy();
  });

  it('describes integrations that need monitoring connections', () => {
    renderDrawer(corootIntegration);
    expect(integrationDetails().getByText('Runs its own controller')).toBeTruthy();
    expect(
      integrationDetails().getByText('Providers must accept monitoring connections')
    ).toBeTruthy();
  });

  it('renders prerequisites and the helm install command', () => {
    renderDrawer(pmmIntegration);
    expect(screen.getByText('Prerequisites')).toBeTruthy();
    expect(screen.getByText('PMM 3 server')).toBeTruthy();
    expect(
      screen.getByText(/helm install monitoring-pmm oci:\/\/ghcr\.io\/openeverest\/charts\/monitoring-pmm/)
    ).toBeTruthy();
  });

  it('omits the integration section for providers', () => {
    renderDrawer(providerEntry);
    expect(screen.getByText('Percona Server for MongoDB')).toBeTruthy();
    expect(screen.queryByTestId('plugin-hub-integration-details')).toBeNull();
  });

  it('renders entries of unknown types without integration details', () => {
    renderDrawer(futureTypeEntry);
    expect(screen.getByText('Something New')).toBeTruthy();
    expect(screen.queryByTestId('plugin-hub-integration-details')).toBeNull();
  });
});

describe('Drawer compatibility', () => {
  const checked = { ...mongodbEntry, compat: mongodbCompat };

  it('offers the newest release that works with the cluster, not the head', () => {
    renderDrawer(checked, ADMIN);
    expect(screen.getByText('0.7.0')).toBeTruthy();
    expect(screen.getByTestId('plugin-hub-compatibility').textContent).toBe(
      'Compatibility: Works with this OpenEverest (2.1.0)'
    );
    expect(screen.getByTestId('plugin-hub-incompatible').textContent).toBe(
      'MongoDB 0.8.0 needs OpenEverest 2.2.0 or later. 0.7.0 is the newest release that works with it.'
    );
    expect(screen.queryByText(/Requires OpenEverest/)).toBeNull();
  });

  it('installs the offered release', async () => {
    const fetch = stubFetch(() => jsonResponse(200, deployed));
    renderDrawer(checked, ADMIN);
    fireEvent.click(screen.getByTestId('plugin-hub-install-now'));
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(fetch.mock.calls[0][0]).toBe('/api/install');
    expect(requestBody(fetch)).toEqual({ type: 'provider', name: 'percona-server-mongodb', version: '0.7.0' });
  });

  it('installs an incompatible release only after a confirmation', async () => {
    const fetch = stubFetch(() => jsonResponse(200, { ...deployed, chartVersion: '0.8.0' }));
    renderDrawer(checked, ADMIN);
    fireEvent.click(screen.getByTestId('plugin-hub-install-anyway'));
    expect(screen.getByText('Install MongoDB 0.8.0 anyway?')).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('plugin-hub-anyway-confirm'));
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(requestBody(fetch)).toEqual({
      type: 'provider',
      name: 'percona-server-mongodb',
      version: '0.8.0',
      acknowledgeIncompatible: true,
    });
  });

  it('disables install when no release works with the cluster', () => {
    renderDrawer({ ...mongodbEntry, compat: blockedCompat }, ADMIN);
    const button = screen.getByTestId('plugin-hub-install-now') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe('Needs OpenEverest 2.2.0');
    expect(screen.getByTestId('plugin-hub-compatibility').textContent).toBe(
      'Compatibility: Needs OpenEverest 2.2.0'
    );
    expect(screen.getByTestId('plugin-hub-incompatible').textContent).toContain(
      'No release in the catalog works with the OpenEverest in this cluster.'
    );
    expect(screen.getByTestId('plugin-hub-install-anyway').textContent).toBe('Install 0.8.0 anyway…');
  });

  it('explains incompatibility to users who cannot install, without the override', () => {
    renderDrawer({ ...mongodbEntry, compat: blockedCompat });
    expect(screen.getByTestId('plugin-hub-incompatible')).toBeTruthy();
    expect(screen.queryByTestId('plugin-hub-install-anyway')).toBeNull();
    expect(screen.getByText(/--version 0\.8\.0/)).toBeTruthy();
  });

  it('allows releases that do not declare compatibility, with a notice', () => {
    renderDrawer({ ...mongodbEntry, compat: undeclaredCompat }, ADMIN);
    expect(screen.getByTestId('plugin-hub-compatibility').textContent).toBe(
      'Compatibility: Compatibility not declared'
    );
    expect(screen.getByTestId('plugin-hub-compat-notice').textContent).toBe(
      'MongoDB 0.8.0 does not declare the OpenEverest it was built for, so its compatibility cannot be checked.'
    );
    expect((screen.getByTestId('plugin-hub-install-now') as HTMLButtonElement).disabled).toBe(false);
  });

  it('offers a release the backend refused to install anyway', async () => {
    const refusal = 'percona-server-mongodb 0.8.0 needs OpenEverest 2.2.0 or later; this cluster runs OpenEverest 2.1.0.';
    stubFetch(() => jsonResponse(409, { error: refusal, incompatible: true, reason: 'CoreTooOld' }));
    renderDrawer(mongodbEntry, ADMIN);
    expect(screen.queryByTestId('plugin-hub-install-anyway')).toBeNull();
    fireEvent.click(screen.getByTestId('plugin-hub-install-now'));
    expect(await screen.findByText(refusal)).toBeTruthy();
    expect(screen.getByTestId('plugin-hub-install-anyway').textContent).toBe('Install 0.8.0 anyway…');
  });

  it('offers an incompatible newer release to installed extensions as an upgrade', () => {
    renderDrawer({ ...checked, installed: true, release: deployed }, ADMIN);
    const button = screen.getByTestId('plugin-hub-upgrade-now') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(screen.getByTestId('plugin-hub-upgrade-anyway').textContent).toBe('Upgrade to 0.8.0 anyway…');
    expect(screen.getByTestId('plugin-hub-incompatible').textContent).toContain(
      'No newer release works with the OpenEverest in this cluster.'
    );
  });

  it('retries a failed first install', () => {
    renderDrawer(
      { ...checked, installed: true, release: { ...deployed, status: 'failed', failedInstall: true } },
      ADMIN
    );
    expect(screen.getByText('Install failed')).toBeTruthy();
    expect(screen.getByTestId('plugin-hub-install-now').textContent).toBe('Retry install');
  });

  it('offers the channel head when the cluster could not be checked', () => {
    renderDrawer(mongodbEntry, ADMIN);
    expect(screen.getByText('0.8.0')).toBeTruthy();
    expect(screen.queryByTestId('plugin-hub-compatibility')).toBeNull();
    expect(screen.queryByTestId('plugin-hub-incompatible')).toBeNull();
  });
});
