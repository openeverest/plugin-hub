// Data loading. Catalog and installed state are fetched separately so a slow
// or failing everest API never blocks the catalog from rendering.
import { pluginFetch } from './runtime';
import type { ExtensionType, InstalledResponse, SummaryResponse } from './types';

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
