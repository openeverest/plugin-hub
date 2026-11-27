import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { h, initRuntime } from '../runtime';
import { Drawer } from './Drawer';
import {
  acknowledgedCompat,
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
    expect(screen.getByTestId('plugin-hub-incompatible').textContent).toBe(
      'No release of MongoDB supports OpenEverest 2.1.0 yet. MongoDB 0.8.0 needs OpenEverest 2.2.0 or later.'
    );
    expect(screen.getByTestId('plugin-hub-install-anyway').textContent).toBe('Install 0.8.0 anyway…');
  });

  it('installs a release OpenEverest acknowledges, with a notice', async () => {
    const fetch = stubFetch(() => jsonResponse(200, { ...deployed, chartVersion: '0.8.0' }));
    renderDrawer({ ...mongodbEntry, compat: acknowledgedCompat }, ADMIN);
    expect(screen.getByTestId('plugin-hub-compatibility').textContent).toBe(
      'Compatibility: Incompatibility acknowledged'
    );
    expect(screen.getByTestId('plugin-hub-compat-notice').textContent).toBe(
      'MongoDB 0.8.0 needs OpenEverest 2.2.0 or later; allowed anyway because the incompatibility was acknowledged.'
    );
    expect(screen.queryByTestId('plugin-hub-incompatible')).toBeNull();
    expect(screen.queryByTestId('plugin-hub-install-anyway')).toBeNull();
    fireEvent.click(screen.getByTestId('plugin-hub-install-now'));
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(requestBody(fetch)).toEqual({ type: 'provider', name: 'percona-server-mongodb', version: '0.8.0' });
  });

  it('says how long installing anyway lasts', () => {
    renderDrawer(checked, ADMIN);
    fireEvent.click(screen.getByTestId('plugin-hub-install-anyway'));
    expect(screen.getByText(/such as patch releases/)).toBeTruthy();
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
    expect(screen.getByTestId('plugin-hub-incompatible').textContent).toBe(
      'No newer release of MongoDB supports OpenEverest 2.1.0 yet. MongoDB 0.8.0 needs OpenEverest 2.2.0 or later.'
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

  it('marks third-party extensions and names their publisher', () => {
    renderDrawer({ ...mongodbEntry, publisher: 'example-org', thirdParty: true });
    expect(screen.getByTestId('plugin-hub-third-party').getAttribute('title')).toBe(
      'Published by example-org, outside the OpenEverest organization'
    );
    expect(screen.getByText('example-org')).toBeTruthy();
  });

  it('does not mark extensions OpenEverest publishes', () => {
    renderDrawer({ ...mongodbEntry, publisher: 'openeverest', thirdParty: false });
    expect(screen.queryByTestId('plugin-hub-third-party')).toBeNull();
  });

  it('offers the channel head when the cluster could not be checked', () => {
    renderDrawer(mongodbEntry, ADMIN);
    expect(screen.getByText('0.8.0')).toBeTruthy();
    expect(screen.queryByTestId('plugin-hub-compatibility')).toBeNull();
    expect(screen.queryByTestId('plugin-hub-incompatible')).toBeNull();
  });
});

describe('Drawer for plugin-hub itself', () => {
  const hubEntry: CatalogEntry = {
    name: 'plugin-hub',
    type: 'plugin',
    displayName: 'Plugin Hub',
    installed: true,
    runningVersion: '0.1.18',
    release: { release: 'everest', namespace: 'everest-system', chartVersion: '0.1.18', status: 'deployed' },
    artifacts: {
      chart: {
        defaultChannel: 'stable',
        channels: { stable: { ref: 'oci://ghcr.io/openeverest/charts/plugin-hub', version: '0.2.0' } },
      },
    },
  };
  const bundled = {
    mode: 'bundled' as const,
    release: 'everest',
    namespace: 'everest-system',
    parentChart: 'openeverest',
    parentChartVersion: '2.0.0',
    parentChartRepository: 'https://openeverest.github.io/helm-charts',
    chartVersion: '0.1.18',
    version: '0.1.18',
    valuesPath: 'plugin-hub.image.tag',
    available: '0.1.20',
    blocked: { version: '0.2.0', minChartVersion: '0.2.0' },
  };
  const selfAdmin = (selfUpdate: InstallerStatus['selfUpdate']): InstallerStatus => ({
    ...ADMIN,
    self: 'plugin:plugin-hub',
    selfUpdate,
  });

  it('updates a bundled plugin-hub image after confirmation', async () => {
    const fetch = stubFetch(() => jsonResponse(200, { ...bundled, chartVersion: '0.1.18', status: 'deployed' }));
    const onInstallerDone = vi.fn();
    render(
      h(Drawer, { entry: hubEntry, installer: selfAdmin(bundled), notice: null, onInstallerDone, onClose: vi.fn() })
    );
    expect(screen.queryByTestId('plugin-hub-upgrade-now')).toBeNull();
    expect(screen.getByTestId('plugin-hub-self-update-blocked').textContent).toContain(
      'plugin-hub 0.2.0 needs plugin-hub chart 0.2.0 or later'
    );
    expect(screen.getByText(/--set plugin-hub.image.tag=0.1.20/)).toBeTruthy();

    fireEvent.click(screen.getByTestId('plugin-hub-self-update-now'));
    expect(screen.getByText(/keeps openeverest 2.0.0 and its values/)).toBeTruthy();
    fireEvent.click(screen.getByTestId('plugin-hub-self-update-confirm'));
    await waitFor(() => expect(onInstallerDone).toHaveBeenCalled());
    expect(fetch.mock.calls[0][0]).toContain('/api/self-update');
    expect(requestBody(fetch)).toEqual({ version: '0.1.20' });
    expect(onInstallerDone.mock.calls[0][1]).toBe('self-update');
    expect(onInstallerDone.mock.calls[0][2].appVersion).toBe('0.1.20');
  });

  it('shows the error the backend returns', async () => {
    stubFetch(() => jsonResponse(409, { error: 'openeverest 2.0.0 is not the chart release everest-system/everest runs' }));
    renderDrawer(hubEntry, selfAdmin(bundled));
    fireEvent.click(screen.getByTestId('plugin-hub-self-update-now'));
    fireEvent.click(screen.getByTestId('plugin-hub-self-update-confirm'));
    expect(await screen.findByText(/is not the chart release/)).toBeTruthy();
  });

  it('names the value to set when no Helm release deploys it', () => {
    renderDrawer(hubEntry, selfAdmin({ mode: 'unmanaged', valuesPath: 'plugin-hub.image.tag', version: '0.1.18', available: '0.2.0' }));
    expect(screen.queryByTestId('plugin-hub-self-update-now')).toBeNull();
    expect(screen.getByText('plugin-hub.image.tag=0.2.0')).toBeTruthy();
  });

  it('only explains a release that needs a newer chart', () => {
    renderDrawer(hubEntry, selfAdmin({ ...bundled, available: undefined }));
    expect(screen.queryByTestId('plugin-hub-self-update-now')).toBeNull();
    expect(screen.getByTestId('plugin-hub-self-update-blocked')).toBeTruthy();
  });

  it('offers the Helm command to users who cannot update it', () => {
    renderDrawer(hubEntry, { enabled: true, canInstall: false });
    expect(screen.queryByTestId('plugin-hub-self-update')).toBeNull();
    expect(screen.getByTestId('plugin-hub-upgrade-helm')).toBeTruthy();
  });
});
