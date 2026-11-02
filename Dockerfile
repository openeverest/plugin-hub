# ──────────────────────────────────────────────────────────────────
# Stage 1 — Build the Go backend.
# Expects dist/main.js to be pre-built (npm run build) and present
# in the Docker build context.
#
# Runs on the build host's platform and cross-compiles for the target
# platform, so multi-arch builds need no QEMU emulation.
# ──────────────────────────────────────────────────────────────────
FROM --platform=$BUILDPLATFORM golang:1.26-alpine AS backend-builder

ARG TARGETOS
ARG TARGETARCH

WORKDIR /app

# Copy module files first to cache the dependency download layer.
COPY backend/go.mod backend/go.sum* ./
RUN go mod download

# Copy backend source and the pre-built frontend bundle.
COPY backend/ .
COPY dist/main.js ./dist/main.js
COPY src/icon.png ./dist/icon.png

RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -trimpath -ldflags="-s -w" -o server .

# ──────────────────────────────────────────────────────────────────
# Stage 2 — Minimal runtime image.
# No RUN steps here: they would execute on the target platform and
# require emulation. The CA bundle is copied from the builder instead.
# ──────────────────────────────────────────────────────────────────
FROM alpine:3.19

COPY --from=backend-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=backend-builder /app/server /usr/local/bin/server

# The installer pulls charts via the Helm SDK; keep its cache/config in a
# writable scratch location.
ENV HELM_CACHE_HOME=/tmp/helm/cache \
    HELM_CONFIG_HOME=/tmp/helm/config \
    HELM_DATA_HOME=/tmp/helm/data

EXPOSE 8080

ENTRYPOINT ["server"]
