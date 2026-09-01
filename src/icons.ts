// Icon resolution + a self-healing <img> that falls back to an inline
// placeholder when an upstream icon fails to load.
import { h, pluginBasePath } from './runtime';

export const ICON_FALLBACK_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='3'/><path d='M3 9h18M9 3v18'/></svg>",
  );

// Module-scoped record of icon URLs that already 404'd or otherwise failed.
// Survives React re-renders so the same broken URL is never re-requested.
const failedIconSrcs = new Set<string>();

// resolveIconSrc converts whatever the backend put into entry.icon into a
// usable <img src>. The backend emits *relative* paths (e.g. 'api/icon/<key>')
// for proxied icons; we prepend the host-provided proxy base so the URL routes
// through the OpenEverest proxy for the current cluster.
export function resolveIconSrc(rawIcon: string | undefined): string {
  if (!rawIcon) return ICON_FALLBACK_DATA_URI;
  if (
    rawIcon.startsWith('data:') ||
    rawIcon.startsWith('http://') ||
    rawIcon.startsWith('https://') ||
    rawIcon.startsWith('/')
  ) {
    return rawIcon;
  }
  if (!pluginBasePath) return ICON_FALLBACK_DATA_URI;
  return `${pluginBasePath}/${rawIcon}`;
}

export function IconImg(props: { src: string; alt?: string; style?: any }): any {
  const initial = failedIconSrcs.has(props.src) ? ICON_FALLBACK_DATA_URI : props.src;
  return h('img', {
    src: initial,
    alt: props.alt ?? '',
    style: props.style,
    onError: (e: any) => {
      const el = e.currentTarget as HTMLImageElement & { dataset: DOMStringMap };
      if (el.dataset.failed === '1') return;
      el.dataset.failed = '1';
      failedIconSrcs.add(props.src);
      if (el.src !== ICON_FALLBACK_DATA_URI) {
        el.src = ICON_FALLBACK_DATA_URI;
      }
    },
  });
}
