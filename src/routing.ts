// URL routing for the hub page. The host mounts the plugin at
// /plugins/<pluginName>/* and passes the remainder as `subPath`:
//
//   ''                     → all extensions
//   'plugins'              → plugins only
//   'providers'            → providers only
//   'integrations'         → integrations only
//   'plugins/<name>'       → plugins list + detail drawer for plugin <name>
//   'providers/<name>'     → providers list + detail drawer for provider <name>
//   'integrations/<name>'  → integrations list + detail drawer for integration <name>
//
// The `subPath` prop is the single source of truth; navigation only updates
// the URL and lets the host router feed the new `subPath` back in.
import type { FilterState } from './types';

export type ListType = FilterState['type'];
export type EntryType = Exclude<ListType, 'all'>;

export type HubRoute =
  | { kind: 'list'; type: ListType }
  | { kind: 'entry'; type: EntryType; name: string }
  | { kind: 'not-found' };

const SEGMENT_BY_TYPE: Record<EntryType, string> = {
  plugin: 'plugins',
  provider: 'providers',
  integration: 'integrations',
};

const TYPE_BY_SEGMENT: Record<string, EntryType | undefined> = {
  plugins: 'plugin',
  providers: 'provider',
  integrations: 'integration',
};

// Stored in history state when a drawer is opened from within the hub, so
// closing it can step back to the exact list the user came from.
const RETURN_TO_STATE_KEY = 'pluginHubReturnTo';

export function parseHubPath(subPath: string | undefined): HubRoute {
  const segments = (subPath ?? '').split('/').filter(Boolean);
  if (segments.length === 0) return { kind: 'list', type: 'all' };
  const type = hasOwn(TYPE_BY_SEGMENT, segments[0])
    ? TYPE_BY_SEGMENT[segments[0]]
    : undefined;
  if (!type || segments.length > 2) return { kind: 'not-found' };
  if (segments.length === 1) return { kind: 'list', type };
  return { kind: 'entry', type, name: segments[1] };
}

export function listPath(type: ListType): string {
  return type === 'all' ? '' : SEGMENT_BY_TYPE[type];
}

export function entryPath(type: EntryType, name: string): string {
  return `${SEGMENT_BY_TYPE[type]}/${encodeURIComponent(name)}`;
}

// Own-property check so inherited keys like `constructor` aren't mistaken for
// known types — catalog entries of unknown future types must stay inert.
function hasOwn(record: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

export function isEntryType(type: string): type is EntryType {
  return hasOwn(SEGMENT_BY_TYPE, type);
}

function currentHistoryState(): Record<string, any> | null {
  const state = window.history.state;
  return state && typeof state === 'object' ? state : null;
}

// The sub-path of the list the open drawer was launched from, or null when
// the drawer was reached directly (deep link, reload in a new tab, etc.).
export function drawerReturnPath(): string | null {
  const returnTo = currentHistoryState()?.usr?.[RETURN_TO_STATE_KEY];
  return typeof returnTo === 'string' ? returnTo : null;
}

function pluginBaseUrl(pluginName: string): string {
  const marker = `/plugins/${pluginName}`;
  const { pathname } = window.location;
  const index = pathname.indexOf(marker);
  return index === -1 ? marker : pathname.slice(0, index + marker.length);
}

interface NavigateOptions {
  replace?: boolean;
  returnTo?: string;
}

// The SDK exposes no navigate(), and the plugin can't share the host's router
// instance. Instead we write a history entry in the shape the host's
// react-router expects ({ usr, key, idx }) and emit `popstate`, which the
// router (like any history-based router) listens to and re-matches against.
// That keeps the host's location — and therefore our `subPath` prop — in sync.
export function navigateHub(
  pluginName: string,
  subPath: string,
  options: NavigateOptions = {}
): void {
  const base = pluginBaseUrl(pluginName);
  const url = subPath ? `${base}/${subPath}` : base;
  const currentIdx = currentHistoryState()?.idx;
  const idx =
    (typeof currentIdx === 'number' ? currentIdx : 0) + (options.replace ? 0 : 1);
  const state = {
    usr:
      options.returnTo === undefined
        ? null
        : { [RETURN_TO_STATE_KEY]: options.returnTo },
    key: Math.random().toString(36).slice(2, 10),
    idx,
  };
  if (options.replace) {
    window.history.replaceState(state, '', url);
  } else {
    window.history.pushState(state, '', url);
  }
  window.dispatchEvent(new PopStateEvent('popstate', { state }));
}
