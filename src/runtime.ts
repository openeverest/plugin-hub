// Shared runtime wiring for the plugin-hub frontend.
//
// The host injects React and an authenticated fetch via the `register(api)`
// call, so no module imports React directly. `initRuntime` is called once from
// register(); every other module reads these live bindings.
import type { PluginApi } from '@openeverest/plugin-sdk';

export let React: PluginApi['React'];
export let pluginFetch: PluginApi['fetch'];
// CSP nonce read from the host DOM, forwarded to PluginThemeProvider's Emotion cache.
export let cssNonce: string;

export function initRuntime(api: PluginApi): void {
  React = api.React;
  pluginFetch = api.fetch.bind(api);
  cssNonce =
    document
      .querySelector("meta[name='csp-nonce']")
      ?.getAttribute('content') ?? '';
}

// h is a thin React.createElement wrapper so components can be authored
// without JSX (the host owns the React version).
export const h = (type: any, props: any, ...children: any[]): any =>
  React.createElement(type, props, ...children);
