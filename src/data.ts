// Data loading. Catalog and installed state are fetched separately so a slow
// or failing everest API never blocks the catalog from rendering.
import { pluginFetch } from './runtime';
import type {
  CatalogEntry,
  ExtensionType,
  InstalledResponse,
  InstallerAction,
  InstallerStatus,
  ReleaseInfo,
  SummaryResponse,
} from './types';

// fetchCatalog loads the extension catalog only (no install status). This is
// the cheap, cached call the host can answer immediately, so the UI can paint
// the full list without waiting on the everest API round-trip.
export async function fetchCatalog(): Promise<SummaryResponse> {
  const res = await pluginFetch('/api/catalog');
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  const body = (await res.json()) as SummaryResponse;
  return { ...body, stale: res.headers.get('X-Hub-Stale') === 'true' };
}

// fetchInstalled loads what is currently installed on the host. It is fetched
// separately from the catalog so a slow or failing everest API never blocks
// the catalog from rendering — install labels are applied asynchronously once
// this resolves.
export async function fetchInstalled(): Promise<InstalledResponse> {
  const res = await pluginFetch('/api/installed');
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export function installedKey(type: ExtensionType, name: string): string {
  return `${type}:${name}`;
}

const INSTALLER_DISABLED: InstallerStatus = { enabled: false, canInstall: false };

// fetchInstallerStatus never rejects: any failure just hides the install
// buttons and the UI falls back to copy-paste helm commands.
export async function fetchInstallerStatus(): Promise<InstallerStatus> {
  try {
    const res = await pluginFetch('/api/installer');
    if (!res.ok) return INSTALLER_DISABLED;
    return (await res.json()) as InstallerStatus;
  } catch {
    return INSTALLER_DISABLED;
  }
}

export async function runInstallerAction(
  action: InstallerAction,
  entry: CatalogEntry,
): Promise<ReleaseInfo> {
  const res = await pluginFetch(`/api/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: entry.type, name: entry.name }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error || `HTTP ${res.status}`);
  }
  return body as ReleaseInfo;
}
