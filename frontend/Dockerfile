# syntax=docker/dockerfile:1

# Build context is the repo root (see docker-compose.yml) so the nginx conf in
# deploy/ can be copied into the final image.

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
RUN npm run build

# --- serve: nginx with the exported site ------------------------------------
FROM nginx:1.27-alpine
COPY deploy/nginx/kyle.wongworks.dev.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080
