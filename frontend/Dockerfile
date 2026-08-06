# syntax=docker/dockerfile:1

# Debian, not Alpine. sharp ships glibc-linked libvips prebuilds; the musl path
# is a recurring source of native-module breakage and this image exists partly
# to get sharp built on the platform it will actually run on.
FROM node:22-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1

# --- dependencies -----------------------------------------------------------
FROM base AS deps
WORKDIR /app
# .npmrc carries legacy-peer-deps=true, which is load-bearing: next@15.5.22 is
# outside every range @payloadcms/next@3.87.0 declares as a peer. Without this
# file `npm ci` fails hard here even though it succeeds on the host. See
# docs/hosting.md — the version mismatch is a real open item, not just a flag.
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# --- build ------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# payload.config.ts calls requireEnv() at import time and `next build` imports
# it, so the build fails without these present. They are placeholders: the real
# values are injected at runtime by compose. The database is intentionally
# unreachable here — every page wraps its fetch in try/catch and falls back, so
# the build completes and pages render on demand against the real database.
ARG PAYLOAD_SECRET=build-time-placeholder-not-used-at-runtime
ARG MONGODB_URI=mongodb://placeholder:27017/build
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV MONGODB_URI=$MONGODB_URI

# NEXT_PUBLIC_* is inlined by the compiler, so this must be a build arg —
# setting it in the runtime environment has no effect. Changing the public
# origin requires a rebuild, not a restart.
ARG NEXT_PUBLIC_SITE_URL=https://kyle.wongworks.dev
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run build

# --- runtime ----------------------------------------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
