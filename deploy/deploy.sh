#!/usr/bin/env bash
# Deploy the site on neo: pull main, build, and switch over with no downtime.
#
#   ./deploy/deploy.sh               pull and deploy now
#   ./deploy/deploy.sh --if-changed  only when origin/main has new commits
#                                    (what the webhook runs)
#   ./deploy/deploy.sh --fresh       build without Docker's cache, so the
#                                    GitHub activity graph is refetched
#   ./deploy/deploy.sh --rollback    point the site back at the previous build
#
# How it works: the static site is built into releases/<id>/, then the
# releases/current symlink is swapped to it in a single rename. nginx (the
# `web` container) keeps running and serves from releases/current, so every
# request gets either the old site or the new one, never a 502. nginx is then
# reloaded gracefully to pick up any change to deploy/nginx/. If the build
# fails, current is never touched. The newest KEEP builds are kept.
#
# Logs: journalctl -u wongworks-webhook -n 50

set -euo pipefail

cd "$(dirname "$0")/.."
REPO="$PWD"
MODE="${1:-}"
RELEASES="$REPO/releases"
KEEP=5

log() { printf '%s %s\n' "$(date '+%F %T')" "$*"; }

# One deploy at a time. A run that starts mid-build waits its turn, then
# fetches again, so a push that lands during a build still gets deployed.
exec 9>"$REPO/.deploy.lock"
if ! flock -n 9; then
  log "another deploy is running; waiting for it"
  if ! flock -w 1800 9; then
    log "error: still locked after 30 minutes; giving up"
    exit 1
  fi
fi

if ! docker info >/dev/null 2>&1; then
  log "error: $(id -un) can't reach Docker (is it in the docker group?)"
  exit 1
fi

# Point releases/current at another build in one atomic rename.
switch_to() {
  ln -sfn "$1" "$RELEASES/.current.tmp"
  mv -Tf "$RELEASES/.current.tmp" "$RELEASES/current"
}

# Start nginx if it isn't running, and reload it gracefully so changes to
# deploy/nginx/ apply. A reload keeps serving open connections throughout.
serve() {
  docker compose up -d --quiet-pull web
  if docker compose exec -T web nginx -t -q; then
    docker compose exec -T web nginx -s reload
  else
    log "error: nginx config in deploy/nginx/ is invalid; still serving with the old config"
    return 1
  fi
}

# Finished builds, oldest first. Names start with a timestamp, so they sort.
builds() {
  ls -1 "$RELEASES" | grep -E '^[0-9]{8}-[0-9]{6}-' | sort || true
}

mkdir -p "$RELEASES"

if [[ "$MODE" == "--rollback" ]]; then
  current="$(readlink "$RELEASES/current" 2>/dev/null || true)"
  previous="$(builds | awk -v cur="$current" '$0 == cur { print prev; exit } { prev = $0 }')"
  if [[ -z "$previous" ]]; then
    log "error: no build older than ${current:-the current one} to roll back to"
    exit 1
  fi
  switch_to "$previous"
  log "rolled back: $current -> $previous (run again to go further back; the next push deploys normally)"
  exit 0
fi

git fetch --quiet origin main
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/main)"

if [[ "$MODE" == "--if-changed" && "$LOCAL" == "$REMOTE" && -e "$RELEASES/current" ]]; then
  exit 0
fi

if [[ "$LOCAL" != "$REMOTE" ]]; then
  if ! git merge --ff-only --quiet origin/main; then
    log "error: $REPO has local commits or edits that block a fast-forward to origin/main; fix by hand"
    exit 1
  fi
  log "updated $(git rev-parse --short "$LOCAL") -> $(git rev-parse --short HEAD): $(git log -1 --format=%s)"
fi

# Build settings come from the stack's .env, like compose used to read them.
if [[ -f "$REPO/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  . "$REPO/.env"
  set +a
fi

id="$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)"
staging="$RELEASES/.build-$id"
rm -rf "$staging"

build_args=(
  --file frontend/Dockerfile
  --target export
  --build-arg "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://kyle.wongworks.dev}"
  --output "type=local,dest=$staging"
  --quiet
)
# The activity-graph token is a build secret, never an image layer. Optional.
if [[ -n "${GITHUB_TOKEN:-}" ]]; then
  export GITHUB_TOKEN
  build_args+=(--secret id=github_token,env=GITHUB_TOKEN)
fi
if [[ "$MODE" == "--fresh" ]]; then
  build_args+=(--no-cache)
  log "building $id without cache"
else
  log "building $id"
fi

if ! docker build "${build_args[@]}" . >/dev/null || [[ ! -f "$staging/index.html" ]]; then
  rm -rf "$staging"
  log "error: build failed; the site stays on $(readlink "$RELEASES/current" 2>/dev/null || echo 'nothing yet')"
  exit 1
fi

mv "$staging" "$RELEASES/$id"
switch_to "$id"
serve
log "deployed $id"

# Keep the newest KEEP builds for rollback; never delete what current points at.
current="$(readlink "$RELEASES/current")"
{ builds | head -n -"$KEEP" | grep -vx -e "$current" || true; } | while read -r old; do
  rm -rf "${RELEASES:?}/$old"
done
# Leftovers from builds that were interrupted.
find "$RELEASES" -maxdepth 1 -name '.build-*' -mmin +60 -exec rm -rf {} + 2>/dev/null || true
