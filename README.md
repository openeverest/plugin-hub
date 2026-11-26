# OpenEverest Plugin Hub

The Hub plugin for [OpenEverest](https://github.com/openeverest/openeverest). It surfaces every plugin, provider and integration published in the [official catalog](https://github.com/openeverest/hub) and shows which ones are currently installed on your cluster.

- **Sidebar entry + dedicated route** registered as an OpenEverest generic plugin.
- **Searchable, filterable table** of all catalog entries (plugins, providers and integrations) with install status, default-channel version, categories, and a per-entry detail drawer.
- **Deep-linkable URLs** under `/plugins/plugin-hub/`:

  | Path | Shows |
  | --- | --- |
  | `/` | All extensions |
  | `/plugins` · `/providers` · `/integrations` | Only plugins · only providers · only integrations |
  | `/plugins/<name>` · `/providers/<name>` · `/integrations/<name>` | That list with the entry's detail drawer open |

  An unknown entry name opens a "not found" drawer over the list; any other unknown path shows an in-plugin "Page not found" view.
- **Integrations** connect OpenEverest to an external system (today: monitoring). Their drawer shows the area, the MonitoringClass names the chart installs, how it runs (rendered by the provider or via its own controller), what providers must expose, and the external system's prerequisites.
- **Backend-side join**: a single `/api/summary` call merges the hub catalog with the live `InstalledExtension` list so the UI does one round-trip.
- **Stale-tolerant**: the upstream catalog is cached in-memory; if GitHub becomes unreachable the last successful response is served with an `X-Hub-Stale: true` header.
- **Install from the UI.** OpenEverest admins get one-click install, upgrade and uninstall (on by default; operators can opt out) — see [One-click install, upgrade & uninstall](#one-click-install-upgrade--uninstall). Every catalog entry also shows a copy-pasteable `helm install …` / `helm upgrade …` command.
- **Compatibility-aware.** Each release is checked against the OpenEverest running in the cluster, and the hub offers the newest release that works with it rather than the newest release — see [Compatibility](#compatibility).

Built from the [`openeverest/generic-plugin-template`](https://github.com/openeverest/generic-plugin-template) and following the [Generic Plugins spec (003)](https://github.com/openeverest/specs/blob/main/specs/003-generic-plugins.md).

## Install

```bash
helm install plugin-hub oci://ghcr.io/openeverest/charts/plugin-hub \
  -n everest-system
```

Open the OpenEverest UI — **Plugin Hub** appears in the sidebar.

### Prerequisites

- An OpenEverest v2+ cluster with the `Plugin` CRD installed.
- Helm 3.
- `kubectl` configured to access the cluster.

### Verify

```bash
kubectl get plugins
kubectl get pods -n everest-system -l app.kubernetes.io/name=plugin-hub
```

## Configuration

Edit `charts/plugin-hub/values.yaml` (or pass `--set` flags):

| Key | Description | Default |
|---|---|---|
| `image.repository` | Container image | `ghcr.io/openeverest/plugin-hub` |
| `image.tag` | Image tag | chart `appVersion` |
| `replicaCount` | Replicas | `1` |
| `service.port` | Service port | `8080` |
| `plugin.displayName` | Display name in the UI | `Plugin Hub` |
| `plugin.enabled` | Enable/disable the plugin | `true` |
| `everestAPIURL` | OpenEverest API server URL (defaults to in-cluster DNS `everest.everest-system.svc.cluster.local:8080` when empty) | `""` |
| `hubIndexURL` | Override the catalog index URL | official hub when empty |
| `cacheTTLSeconds` | Catalog cache TTL (seconds) | `300` when empty |
| `installer.enabled` | One-click install/upgrade/uninstall from the UI (grants the plugin cluster-wide rights — see below). Set to `false` to opt out | `true` |
| `installer.clusterRole` | ClusterRole bound to the plugin's ServiceAccount when the installer is enabled | `cluster-admin` |
| `openshift.requiredSCC` | SCC pinned via the `openshift.io/required-scc` pod annotation (OpenShift ≥ 4.14; ignored elsewhere). `""` drops it | `restricted-v2` |

The pod meets the `restricted` Pod Security Standard and OpenShift's `restricted-v2` SCC with no cluster detection: the image runs as `USER 65532:65532` and the chart sets no fixed UID/GID, so OpenShift can assign one from the namespace range.

## One-click install, upgrade & uninstall

On by default. OpenEverest admins get **Install now**, **Upgrade to &lt;version&gt;** and **Uninstall** buttons in the entry drawer; everyone else sees the copy-paste Helm commands.

### Opting out

Disabling the installer removes its ClusterRoleBinding and makes the hub browse-only (copy-paste Helm commands for everyone):

```bash
# Standalone plugin-hub release
helm upgrade plugin-hub oci://ghcr.io/openeverest/charts/plugin-hub \
  -n everest-system --reuse-values --set installer.enabled=false

# plugin-hub bundled with the OpenEverest chart
helm upgrade everest-core openeverest/openeverest \
  -n everest-system --reuse-values --set plugin-hub.installer.enabled=false
```

For local development, set `INSTALLER_ENABLED=false` in `dev/.env` (this repo's Tilt setup) or `enablePluginHubInstaller: false` in `dev/config.yaml` (OpenEverest core's Tilt setup).

### How it is gated

- **Operator switch.** Only with `installer.enabled=true` (the default) does the chart create a ServiceAccount bound to `installer.clusterRole`. With it off, the pod has no Kubernetes rights to install anything and the endpoints refuse every request.
- **Admins only.** Every request is checked against the caller's OpenEverest permissions (`GET /v1/permissions`, validated by core). Only users who may create `plugins` cluster-wide — the `admin` role by default — can install, upgrade or uninstall. When OpenEverest RBAC is disabled, every authenticated user counts as an admin, matching core.
- **Catalog-only.** The UI sends `{type, name}` and, optionally, a version that must be a release of the entry's default channel in the hub catalog. The chart reference, release name and namespace come from the catalog too, so arbitrary charts cannot be deployed or removed.

### Behavior

- Install runs `helm install` with the formula's `install.helm.releaseName` / `namespace`; Upgrade runs `helm upgrade` on that release, keeping user-supplied values while picking up new chart defaults. Both first [check](#compatibility) that the chart works with the OpenEverest in the cluster.
- A release whose first install failed can be installed again (**Retry install**): the new attempt replaces it, as Helm otherwise refuses to install over it and cannot upgrade it either.
- When a Helm hook Job or Pod fails, the error shows the last lines of its logs (or why its container never started), not just `BackoffLimitExceeded`.
- Upgrade availability is computed from the Helm release's chart version, so it is accurate even when a chart's `appVersion` differs.
- Uninstall runs `helm uninstall` on that release after a confirmation dialog. If **instances still use a provider** (matched on `spec.providerRef.name` across all namespaces), the dialog lists them and the admin must type `UNINSTALL`; the backend enforces the same phrase, so the warning can't be skipped via the API. Helm keeps CRDs, so database resources are not deleted — they just stop being managed until the provider is reinstalled.
- Not handled: prerequisites (e.g. cert-manager), CRD updates on upgrade or removal on uninstall (Helm limitation), releases installed under a non-default name, and plugin-hub modifying itself — use Helm directly for those.

> **Security note.** With the installer enabled (the default), plugin-hub effectively holds cluster-admin. Anyone who can change its image or its `hubIndexURL` can use those rights — treat the catalog URL as a root of trust.
>
> On OpenShift, cluster-admin may `use` any SCC, so the pod's hardening must not rely on SCC enforcement. The chart pins `restricted-v2` with `openshift.io/required-scc` so the pod can't fall back to a broader SCC (OpenShift ≥ 4.14; older releases ignore the annotation). Charts the installer deploys are rendered by the Helm SDK against the live cluster, so their own OpenShift detection (`.Capabilities.APIVersions.Has`) works.

## Compatibility

OpenEverest publishes the range of extension builds it accepts as annotations on its CRDs (`openeverest.io/min-contract-version` and `openeverest.io/contract-version`, with the release in the `openeverest.io/version` label). Every extension chart built with the provider SDK is stamped with the version of OpenEverest it was built against, in the `openeverest.io/contract-version` annotation of its `Chart.yaml`, and the hub index copies that stamp into each release it lists. A release works with the cluster when the range contains its stamp. Nobody writes version ranges by hand.

The hub reads the range from the CRDs of the kinds the extension creates (Provider and BackupClass for providers, MonitoringClass for integrations, Plugin for plugins; the intersection when there are several) and, for each entry:

- offers the **newest release that works** with the cluster, which may be older than the newest release;
- shows releases that do not work with what they need (**Needs OpenEverest X**), says when none works (**No release of X supports OpenEverest Y yet**), and lets admins install them anyway after a confirmation;
- allows releases that do not declare a stamp (**Compatibility not declared**), with a notice — every chart published before stamping existed, and every release of an index that does not list releases yet.

Before running Helm, install and upgrade pull the chart and check the stamp in its `Chart.yaml`, which is authoritative. An incompatible release is refused with the version of OpenEverest it needs and the newest release that works. Installing it anyway sets `compatibility.acknowledge.coreVersion` to the running OpenEverest release (the `openeverest.io/version` label of its CRDs), which the chart's own check and OpenEverest accept for as long as the acknowledgement holds: while the acknowledged release is no older than the `openeverest.io/contract-version` of the CRDs and no newer than their `openeverest.io/version`. It thus survives the OpenEverest releases that keep the same `openeverest.io/contract-version`, patch releases typically, which would otherwise teach admins to acknowledge again without reading, and the check applies again with the first upgrade that moves it.

OpenEverest can also acknowledge extensions itself: the `openeverest.io/acknowledged-extensions` annotation on its CRDs lists `<name>@<release>` entries, where `<name>` is the extension's Provider, MonitoringClass or Plugin name (the hub takes it from the index: `provider.providerName`, `integration.monitoring.classes`, or the entry name). An entry that holds by the same rule makes the hub offer and install that extension's incompatible releases with a notice instead of refusing them; a list that does not parse acknowledges nothing. The `openeverest.io/incompatible-plugins: continue` policy is not an acknowledgement: OpenEverest then keeps a plugin built for an older OpenEverest installed but does not load it, so the hub does not offer one.

An OpenEverest whose CRDs carry no range predates the check: stamped releases then need a newer OpenEverest, and unstamped ones are allowed. The chart grants the installer's ServiceAccount `get` on those CRDs by name (the `-crd-reader` ClusterRole), so the check does not depend on `installer.clusterRole`. With the installer disabled the pod relies on OpenEverest granting that read to authenticated identities; when it cannot read them, the hub offers each channel's newest release, as before.

## Local development

```bash
# Frontend
npm install
npm run dev                 # Vite dev server on http://localhost:3001
npm test                    # Vitest (jsdom) behaviour tests
npm run typecheck           # tsc --noEmit

# Backend (in another terminal)
npm run build               # produces dist/main.js for the backend to embed
cp src/icon.png backend/dist/icon.png
cp dist/main.js backend/dist/main.js
cd backend && go run .      # serves on :8080
```

Then:

```bash
curl -s http://localhost:8080/api/catalog | jq '.extensions | length'
curl -s http://localhost:8080/api/summary | jq '.extensions[] | {name, type, installed}'
curl -s http://localhost:8080/api/compatibility | jq '.extensions | map_values(.recommended)'
```

Point your OpenEverest dev environment at `http://localhost:3001/main.js` for hot-reload during frontend work.

## Build the Docker image

```bash
npm install && npm run build
cd backend && go mod tidy && cd ..
docker build -t plugin-hub:dev .
```

## Architecture

```
                      ┌────────────────────┐
                      │  OpenEverest UI    │
                      │  (React shell)     │
                      └────────┬───────────┘
                               │ dynamic import
                               ▼
                      ┌────────────────────┐
                      │  plugin-hub bundle │
                      │  (main.js)         │
                      └────────┬───────────┘
                               │ pluginFetch('/api/summary')
                               │ → host proxy adds X-Everest-User JWT
                               ▼
            ┌──────────────────────────────────────┐
            │  plugin-hub backend (Go)             │
            │                                      │
            │  /api/summary  ──┬─► catalog cache   │
            │                  │   (5 min TTL)     │
            │                  │       │           │
            │                  │       ▼           │
            │                  │   GitHub raw      │
            │                  │   hub/index.json  │
            │                  │                   │
            │                  └─► OpenEverest API │
            │                      /v1/installed-  │
            │                       extensions     │
            └──────────────────────────────────────┘
```

## License

Apache-2.0
