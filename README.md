# OpenEverest Plugin Hub

The Hub plugin for [OpenEverest](https://github.com/openeverest/openeverest). It surfaces every plugin and provider published in the [official catalog](https://github.com/openeverest/hub) and shows which ones are currently installed on your cluster.

- **Sidebar entry + dedicated route** registered as an OpenEverest generic plugin.
- **Searchable, filterable table** of all catalog entries (plugins and providers) with install status, default-channel version, categories, and a per-entry detail drawer.
- **Deep-linkable URLs** under `/plugins/plugin-hub/`:

  | Path | Shows |
  | --- | --- |
  | `/` | All extensions |
  | `/plugins` · `/providers` | Only plugins · only providers |
  | `/plugins/<name>` · `/providers/<name>` | That list with the entry's detail drawer open |

  An unknown entry name opens a "not found" drawer over the list; any other unknown path shows an in-plugin "Page not found" view.
- **Backend-side join**: a single `/api/summary` call merges the hub catalog with the live `InstalledExtension` list so the UI does one round-trip.
- **Stale-tolerant**: the upstream catalog is cached in-memory; if GitHub becomes unreachable the last successful response is served with an `X-Hub-Stale: true` header.
- **Browse-only by default.** Each catalog entry shows a copy-pasteable `helm install …` / `helm upgrade …` command. Admins can opt in to one-click install, upgrade and uninstall — see [One-click install, upgrade & uninstall](#one-click-install-upgrade--uninstall-opt-in).

Built from the [`openeverest/generic-plugin-template`](https://github.com/openeverest/generic-plugin-template) and following the [Generic Plugins spec (003)](https://github.com/openeverest/specs/blob/main/specs/003-generic-plugins.md).

## Install

```bash
helm install plugin-hub oci://ghcr.io/openeverest/charts/plugin-hub \
  --version 0.1.16 \
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
| `installer.enabled` | Enable one-click install/upgrade/uninstall from the UI (grants the plugin cluster-wide rights — see below) | `false` |
| `installer.clusterRole` | ClusterRole bound to the plugin's ServiceAccount when the installer is enabled | `cluster-admin` |

## One-click install, upgrade & uninstall (opt-in)

Off by default. When enabled, OpenEverest admins get **Install now**, **Upgrade to &lt;version&gt;** and **Uninstall** buttons in the entry drawer; everyone else keeps seeing the copy-paste Helm commands.

```bash
helm upgrade plugin-hub oci://ghcr.io/openeverest/charts/plugin-hub \
  -n everest-system --reuse-values --set installer.enabled=true
```

How it is gated:

- **Operator opt-in.** Only with `installer.enabled=true` does the chart create a ServiceAccount bound to `installer.clusterRole`. With it off, the pod has no Kubernetes rights to install anything and the endpoints refuse every request. Turn it off again with `--set installer.enabled=false`; this removes the binding.
- **Admins only.** Every request is checked against the caller's OpenEverest permissions (`GET /v1/permissions`, validated by core). Only users who may create `plugins` cluster-wide — the `admin` role by default — can install, upgrade or uninstall. When OpenEverest RBAC is disabled, every authenticated user counts as an admin, matching core.
- **Catalog-only.** The UI sends just `{type, name}`. The chart reference, version (default channel), release name and namespace come from the hub catalog, so arbitrary charts cannot be deployed or removed.

Behavior:

- Install runs `helm install` with the formula's `install.helm.releaseName` / `namespace`; Upgrade runs `helm upgrade` on that release, keeping user-supplied values while picking up new chart defaults.
- Upgrade availability is computed from the Helm release's chart version, so it is accurate even when a chart's `appVersion` differs.
- Uninstall runs `helm uninstall` on that release after a confirmation dialog. If **instances still use a provider** (matched on `spec.providerRef.name` across all namespaces), the dialog lists them and the admin must type `UNINSTALL`; the backend enforces the same phrase, so the warning can't be skipped via the API. Helm keeps CRDs, so database resources are not deleted — they just stop being managed until the provider is reinstalled.
- Not handled: prerequisites (e.g. cert-manager), CRD updates on upgrade or removal on uninstall (Helm limitation), releases installed under a non-default name, and plugin-hub modifying itself — use Helm directly for those.

> **Security note.** With the installer enabled, plugin-hub effectively holds cluster-admin. Anyone who can change its image or its `hubIndexURL` can use those rights — treat the catalog URL as a root of trust.

## Local development

```bash
# Frontend
npm install
npm run dev                 # Vite dev server on http://localhost:3001

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
