// Types matching the backend catalog/installed API shapes.

// Open-ended so catalog entries of types this build doesn't know yet still load.
export type ExtensionType = 'plugin' | 'provider' | 'integration' | string;

export type MonitoringExecutionMode = 'ProviderManaged' | 'ExtensionManaged';

// What an integration connects to. Only `monitoring` exists today; new areas
// arrive with their own area-specific block.
export interface IntegrationSpec {
  area?: 'monitoring' | string;
  monitoring?: {
    classes?: string[];
    executionModes?: Array<MonitoringExecutionMode | string>;
    requires?: { metrics?: boolean; connection?: boolean };
    nativeIntegration?: string;
  };
}

export interface Prerequisite {
  name: string;
  description?: string;
  installUrl?: string;
  helm?: {
    oci: string;
    version?: string;
    namespace: string;
    createNamespace?: boolean;
    defaultValues?: Record<string, string>;
  };
}

export interface CatalogEntry {
  name: string;
  type: ExtensionType;
  displayName?: string;
  description?: string;
  icon?: string;
  homepage?: string;
  sourceRepo?: string;
  // The GitHub account the extension is published from, and whether that is
  // outside the OpenEverest organization. Older indexes carry neither.
  publisher?: string;
  thirdParty?: boolean;
  license?: string;
  verified?: boolean;
  categories?: string[];
  keywords?: string[];
  maintainers?: Array<{ name?: string; email?: string; github?: string }>;
  artifacts?: {
    chart?: {
      defaultChannel?: string;
      channels?: Record<string, ChartChannel>;
    };
  };
  install?: {
    helm?: { namespace?: string; releaseName?: string };
    prerequisites?: Prerequisite[];
  };
  plugin?: {
    contributes?: { backend?: boolean; ui?: boolean; cli?: boolean };
    extensionPoints?: string[];
  };
  provider?: {
    providerName?: string;
    supportedEngines?: string[];
  };
  // The hub index emits `null` for entries that aren't integrations.
  integration?: IntegrationSpec | null;
  maturity?: string;
  capabilities?: Record<string, unknown>;
  access?: 'public' | 'gated';
  gated?: { contactUrl?: string; instructions?: string; provider?: string };
  installed?: boolean;
  installedVersion?: string;
  installedPhase?: string;
  // Helm release backing this entry; only known to admins when the installer
  // is enabled. Carries the real chart version used for upgrade detection.
  release?: ReleaseInfo;
  // Which releases work with the OpenEverest in the cluster; absent when it
  // could not be checked.
  compat?: EntryCompatibility;
}

export interface ChartChannel {
  ref?: string;
  // The channel head, the newest release; `head` repeats it in indexes that
  // list releases.
  version?: string;
  head?: string;
  // Newest first. Older indexes only know the head.
  releases?: CatalogRelease[];
}

export interface CatalogRelease {
  version: string;
  digest?: string;
  // The OpenEverest contract version the chart was built against; absent when
  // the chart does not declare it.
  contractVersion?: string;
  kubeVersion?: string;
}

// Result of checking one release against the OpenEverest in the cluster.
// True: works with it. False: does not; installing needs an acknowledgement,
// unless OpenEverest already acknowledges it (an *Acknowledged reason), which
// allows it with a notice. Unknown: cannot be checked (e.g. the release does
// not declare it); allowed with a notice.
export interface ReleaseVerdict {
  version: string;
  contractVersion?: string;
  status: 'True' | 'False' | 'Unknown';
  reason: string;
  // Reads after the extension name and version, e.g. "needs OpenEverest 2.1.0 or later".
  message: string;
  // The OpenEverest release a release that is too new needs.
  needs?: string;
}

export interface EntryCompatibility {
  channel: string;
  head: string;
  // The newest release that can be installed without an acknowledgement from
  // the user; absent when none can.
  recommended?: string;
  releases: ReleaseVerdict[];
  // The OpenEverest release in the cluster, copied from the response.
  coreVersion?: string;
}

export interface CompatibilityResponse {
  coreVersion?: string;
  // Keyed by "<type>:<name>".
  extensions?: Record<string, EntryCompatibility>;
  error?: string;
}

export interface ReleaseInfo {
  release: string;
  namespace: string;
  chartVersion: string;
  appVersion?: string;
  status: string;
  // The release was never deployed: its first install failed. Installing
  // again replaces it.
  failedInstall?: boolean;
}

export interface InstallerStatus {
  enabled: boolean;
  canInstall: boolean;
  releases?: Record<string, ReleaseInfo>;
  // "<type>:<name>" of plugin-hub's own entry; one-click actions are hidden for it.
  self?: string;
  error?: string;
}

export type InstallerAction = 'install' | 'upgrade';

export interface InstallerActionOptions {
  // A release of the entry's catalog channel; the backend defaults to the
  // newest one that works with the cluster.
  version?: string;
  // Install a release that does not work with the cluster anyway.
  acknowledgeIncompatible?: boolean;
}

export interface UninstallPreflight {
  release: string;
  namespace: string;
  // "<namespace>/<name>" of instances still using this provider.
  instances: string[];
}

export interface SummaryResponse {
  extensions?: CatalogEntry[];
  metadata?: { catalogId?: string; generatedAt?: string; totalExtensions?: number };
  stale?: boolean;
  installedError?: string;
}

export interface InstalledItem {
  name: string;
  type: ExtensionType;
  version?: string;
}

export interface InstalledResponse {
  items?: InstalledItem[];
  error?: string;
}

export interface FilterState {
  query: string;
  type: 'all' | 'plugin' | 'provider' | 'integration';
  installedOnly: boolean;
  hideGated: boolean;
}
