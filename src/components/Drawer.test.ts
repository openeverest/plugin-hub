import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { h } from '../runtime';
import { Drawer } from './Drawer';
import {
  corootIntegration,
  futureTypeEntry,
  pmmIntegration,
  prometheusIntegration,
  providerEntry,
} from '../__fixtures__/catalog';
import type { CatalogEntry } from '../types';

const renderDrawer = (entry: CatalogEntry) => render(h(Drawer, { entry, onClose: vi.fn() }));

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
