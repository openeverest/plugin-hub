// Types matching the backend catalog/installed API shapes.

export type ExtensionType = 'plugin' | 'provider' | string;

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
  maturity?: string;
  capabilities?: Record<string, unknown>;
  access?: 'public' | 'gated';
  gated?: { contactUrl?: string; instructions?: string; provider?: string };
  installed?: boolean;
  installedVersion?: string;
  installedPhase?: string;
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
  type: 'all' | 'plugin' | 'provider';
  installedOnly: boolean;
  hideGated: boolean;
}
