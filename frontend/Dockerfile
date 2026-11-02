# syntax=docker/dockerfile:1

# Build context is the repo root. Built by deploy/deploy.sh, which exports the
# static site to releases/ on the host; nginx serves it from there.

# --- build: next build exports plain files to out/ --------------------------
FROM node:22-bookworm-slim AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./

# NEXT_PUBLIC_* is inlined at build time, so this has to be a build arg.
ARG NEXT_PUBLIC_SITE_URL=https://kyle.wongworks.dev
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# The GitHub token for the activity graph is mounted as a BuildKit secret for
# this one step, so it never lands in an image layer. Optional: without it the
# graph renders empty.
RUN --mount=type=secret,id=github_token,env=GITHUB_TOKEN npm run build

# --- export: just the static files -------------------------------------------
# deploy/deploy.sh builds this stage with `docker build --output` straight into
# releases/<id>/ on the host, then points releases/current at it. The nginx
# container (docker-compose.yml) keeps running the whole time, so a deploy
# never has a moment with nothing serving.
FROM scratch AS export
COPY --from=build /app/out /
