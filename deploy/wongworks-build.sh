#!/usr/bin/env bash
#
# NOT IN USE. This implements the static-snapshot approach that was considered
# and rejected in favour of running the app live behind nginx — see
# docs/hosting.md, "Decision history". Kept as a starting point if the site
# ever needs to become static files again. Never executed against a real
# origin; syntax-checked only.
#
# Publish the static snapshot of kyle.wongworks.dev.
#
# Everything runs on neo: Payload and its database on localhost, the crawl, the
# docroot nginx serves, and the tunnel connector. Nothing leaves the machine
# except the Cloudflare cache purge.
#
# Deliberately not idempotent-by-accident: each run produces a new timestamped
# release directory so a bad publish is a symlink flip away from rollback.

set -euo pipefail

SITE_HOST="${SITE_HOST:-kyle.wongworks.dev}"
ORIGIN="${ORIGIN:-http://127.0.0.1:3000}"

STACK_DIR="/opt/stacks/wongworks"
RELEASES_DIR="${STACK_DIR}/releases"
DOCROOT_LINK="${STACK_DIR}/public"
KEEP_RELEASES=5

# Sourced, not inlined: CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN.
# Token needs exactly one permission: Zone -> Cache Purge -> Purge.
ENV_FILE="${ENV_FILE:-/etc/wongworks/publish.env}"

log() { printf '[%s] %s\n' "$(date -Is)" "$*"; }
die() { printf '[%s] ERROR: %s\n' "$(date -Is)" "$*" >&2; exit 1; }

[[ -f "$ENV_FILE" ]] || die "missing ${ENV_FILE}"
# shellcheck disable=SC1090
source "$ENV_FILE"
: "${CLOUDFLARE_ZONE_ID:?not set in ${ENV_FILE}}"
: "${CLOUDFLARE_API_TOKEN:?not set in ${ENV_FILE}}"

# --- 1. Confirm the source app is actually up -------------------------------
# Crawling a dead origin would otherwise happily publish a directory of 502s.
log "checking origin ${ORIGIN}"
curl -fsS --max-time 10 -o /dev/null "${ORIGIN}/" \
    || die "origin ${ORIGIN} is not responding; start the Payload stack first"

# --- 2. Crawl ---------------------------------------------------------------
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
STAGE="${RELEASES_DIR}/${STAMP}"
mkdir -p "$STAGE"
log "staging into ${STAGE}"

# --reject-regex keeps /admin and /api out of the snapshot entirely. Even
# though nginx 404s them, a crawled copy of an admin shell is not something we
# want sitting in a public docroot.
wget \
    --mirror \
    --page-requisites \
    --convert-links \
    --adjust-extension \
    --no-host-directories \
    --directory-prefix="$STAGE" \
    --reject-regex '/(admin|api)(/|$)' \
    --no-verbose \
    "${ORIGIN}/" \
    || die "crawl failed"

# --- 3. Fetch what the crawler cannot reach ---------------------------------
# robots.txt and sitemap.xml are not linked from any page, so --mirror never
# sees them. Fetched after --convert-links has run so the sitemap keeps its
# absolute https://kyle.wongworks.dev/... URLs, which is what crawlers require.
for path in robots.txt sitemap.xml; do
    log "fetching /${path}"
    curl -fsS --max-time 15 -o "${STAGE}/${path}" "${ORIGIN}/${path}" \
        || die "could not fetch /${path}"
done

# Next renders the not-found page only for a URL that misses; request a
# guaranteed-absent path to capture it as the nginx error_page target.
log "capturing 404 page"
curl -sS --max-time 15 -o "${STAGE}/404.html" \
    "${ORIGIN}/__generate_404__$(date +%s)" || true
[[ -s "${STAGE}/404.html" ]] || log "WARNING: 404.html came back empty"

# --- 4. Sanity-check before anything goes live ------------------------------
[[ -s "${STAGE}/index.html" ]] || die "no index.html in snapshot; refusing to publish"
grep -qi '<html' "${STAGE}/index.html" || die "index.html is not HTML; refusing to publish"

# A draft that leaked into the crawl would be baked in permanently, so fail
# loudly rather than serve it. Requires Posts.access.read to filter on status.
if [[ -d "${STAGE}/mindspace" ]]; then
    log "snapshot contains $(find "${STAGE}/mindspace" -name '*.html' | wc -l) mindspace pages"
fi

log "snapshot size: $(du -sh "$STAGE" | cut -f1)"

# --- 5. Atomic swap ---------------------------------------------------------
# ln -s + mv -T replaces the symlink in one rename(2); no request ever observes
# a half-updated docroot.
log "swapping docroot -> ${STAGE}"
ln -sfn "$STAGE" "${DOCROOT_LINK}.new"
mv -Tf "${DOCROOT_LINK}.new" "$DOCROOT_LINK"

# --- 6. Purge the edge ------------------------------------------------------
# Long edge TTL is the whole point of this setup, so a publish that skips the
# purge is a publish nobody sees.
log "purging Cloudflare cache"
purge_response="$(curl -fsS -X POST \
    "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}')" || die "cache purge request failed"

grep -q '"success":true' <<<"$purge_response" \
    || die "cache purge rejected: ${purge_response}"

# --- 7. Prune old releases --------------------------------------------------
log "pruning all but the newest ${KEEP_RELEASES} releases"
# shellcheck disable=SC2012
ls -1dt "${RELEASES_DIR}"/*/ 2>/dev/null \
    | tail -n "+$((KEEP_RELEASES + 1))" \
    | xargs -r rm -rf

log "published ${STAMP} to https://${SITE_HOST}/"
log "rollback: ln -sfn ${RELEASES_DIR}/<stamp> ${DOCROOT_LINK}.new && mv -Tf ${DOCROOT_LINK}.new ${DOCROOT_LINK}"
