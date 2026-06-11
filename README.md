# OpenEverest Plugin Hub

The Hub plugin for [OpenEverest](https://github.com/openeverest/openeverest). It surfaces every plugin and provider published in the [official catalog](https://github.com/openeverest/hub) and shows which ones are currently installed on your cluster.

- **Sidebar entry + dedicated route** registered as an OpenEverest generic plugin.
- **Searchable, filterable table** of all catalog entries (plugins and providers) with install status, default-channel version, categories, and a per-entry detail drawer.
- **Backend-side join**: a single `/api/summary` call merges the hub catalog with the live `InstalledExtension` list so the UI does one round-trip.
- **Stale-tolerant**: the upstream catalog is cached in-memory; if GitHub becomes unreachable the last successful response is served with an `X-Hub-Stale: true` header.
- **Browse-only in v1.** Each catalog entry shows a copy-pasteable `helm install …` command. Install/uninstall actions from the UI will land in a later release.

Built from the [`openeverest/generic-plugin-template`](https://github.com/openeverest/generic-plugin-template) and following the [Generic Plugins Architecture Design](https://github.com/openeverest/openeverest/blob/main/docs/process/generic-plugins-design.md).

## Install

```bash
helm install plugin-hub oci://ghcr.io/openeverest/charts/plugin-hub \
  --version 0.1.0 \
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
| `everestAPIURL` | OpenEverest API server URL (in-cluster autodiscovered when empty) | `""` |
| `hubIndexURL` | Override the catalog index URL | official hub when empty |
| `cacheTTLSeconds` | Catalog cache TTL (seconds) | `300` when empty |

## Local development

```bash
# Frontend
npm install
npm run dev                 # Vite dev server on http://localhost:3001

# Backend (in another terminal)
npm run build               # produces dist/main.js for the backend to embed
cp src/extension-icon.png backend/dist/icon.png
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
