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
  license?: string;
  verified?: boolean;
  categories?: string[];
  keywords?: string[];
  maintainers?: Array<{ name?: string; email?: string; github?: string }>;
  compatibility?: { openeverest?: string };
  artifacts?: {
    chart?: {
      defaultChannel?: string;
      channels?: Record<string, { ref?: string; version?: string }>;
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
}

export interface ReleaseInfo {
  release: string;
  namespace: string;
  chartVersion: string;
  appVersion?: string;
  status: string;
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
