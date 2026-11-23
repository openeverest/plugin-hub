import type { CatalogEntry, EntryCompatibility } from '../types';

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

const notDeclared =
  'does not declare the OpenEverest it was built for, so its compatibility cannot be checked';

// Compatibility as /api/compatibility reports it for a cluster running
// OpenEverest 2.1.0: the head needs a newer OpenEverest, the release before it
// works, the oldest one predates stamping.
export const mongodbCompat: EntryCompatibility = {
  channel: 'stable',
  head: '0.8.0',
  recommended: '0.7.0',
  coreVersion: '2.1.0',
  releases: [
    {
      version: '0.8.0',
      contractVersion: '2.2.0',
      status: 'False',
      reason: 'CoreTooOld',
      message: 'needs OpenEverest 2.2.0 or later',
      needs: '2.2.0',
    },
    {
      version: '0.7.0',
      contractVersion: '2.1.0',
      status: 'True',
      reason: 'Supported',
      message: 'works with this version of OpenEverest',
    },
    { version: '0.6.0', status: 'Unknown', reason: 'Unversioned', message: notDeclared },
  ],
};

export const mongodbEntry: CatalogEntry = {
  name: 'percona-server-mongodb',
  type: 'provider',
  displayName: 'MongoDB',
  artifacts: {
    chart: {
      defaultChannel: 'stable',
      channels: {
        stable: {
          ref: 'oci://ghcr.io/openeverest/charts/provider-percona-server-mongodb',
          version: '0.8.0',
          head: '0.8.0',
        },
      },
    },
  },
  install: { helm: { releaseName: 'percona-server-mongodb', namespace: 'everest-system' } },
  integration: null,
};

// Only the head is compatible-checked and it needs a newer OpenEverest.
export const blockedCompat: EntryCompatibility = {
  ...mongodbCompat,
  recommended: undefined,
  releases: [mongodbCompat.releases[0]],
};

// Only unstamped releases: allowed, with a notice.
export const undeclaredCompat: EntryCompatibility = {
  channel: 'stable',
  head: '0.8.0',
  recommended: '0.8.0',
  coreVersion: '2.1.0',
  releases: [{ version: '0.8.0', status: 'Unknown', reason: 'Unversioned', message: notDeclared }],
};
