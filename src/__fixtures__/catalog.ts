import type { CatalogEntry } from '../types';

export const pluginEntry: CatalogEntry = {
  name: 'plugin-hub',
  type: 'plugin',
  displayName: 'Plugin Hub',
  integration: null,
};

export const providerEntry: CatalogEntry = {
  name: 'provider-percona-server-mongodb',
  type: 'provider',
  displayName: 'Percona Server for MongoDB',
  integration: null,
};

export const pmmIntegration: CatalogEntry = {
  name: 'monitoring-pmm',
  type: 'integration',
  displayName: 'PMM',
  categories: ['monitoring', 'observability'],
  maturity: 'alpha',
  artifacts: {
    chart: {
      defaultChannel: 'stable',
      channels: {
        stable: { ref: 'oci://ghcr.io/openeverest/charts/monitoring-pmm', version: '0.1.0' },
      },
    },
  },
  install: {
    helm: { releaseName: 'monitoring-pmm', namespace: 'everest-system' },
    prerequisites: [
      {
        name: 'PMM 3 server',
        installUrl:
          'https://docs.percona.com/percona-monitoring-and-management/3/install-pmm/install-pmm-server/deployment-options/helm/index.html',
      },
    ],
  },
  integration: {
    area: 'monitoring',
    monitoring: {
      classes: ['pmm'],
      executionModes: ['ProviderManaged'],
      nativeIntegration: 'pmm',
    },
  },
};

export const prometheusIntegration: CatalogEntry = {
  name: 'monitoring-prometheus',
  type: 'integration',
  displayName: 'Prometheus',
  categories: ['monitoring', 'observability'],
  install: {
    prerequisites: [
      {
        name: 'Prometheus Operator',
        description: 'Renders the generated PodMonitors; a Prometheus must select them.',
      },
    ],
  },
  integration: {
    area: 'monitoring',
    monitoring: {
      classes: ['prometheus'],
      executionModes: ['ExtensionManaged'],
      requires: { metrics: true },
    },
  },
};

export const corootIntegration: CatalogEntry = {
  name: 'monitoring-coroot',
  type: 'integration',
  displayName: 'Coroot',
  integration: {
    area: 'monitoring',
    monitoring: {
      classes: ['coroot'],
      executionModes: ['ExtensionManaged'],
      requires: { connection: true },
    },
  },
};

// A type this build doesn't know about yet — must render without crashing.
export const futureTypeEntry: CatalogEntry = {
  name: 'something-new',
  type: 'gizmo',
  displayName: 'Something New',
};
