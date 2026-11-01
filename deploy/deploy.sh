#!/usr/bin/env bash
# Deploy the site on neo: pull main and rebuild the container.
#
#   ./deploy/deploy.sh               pull and rebuild now
#   ./deploy/deploy.sh --if-changed  only when origin/main has new commits
#                                    (what the auto-deploy timer runs)
#   ./deploy/deploy.sh --fresh       rebuild without Docker's cache, so the
#                                    GitHub activity graph is refetched
#
# If the build fails, compose leaves the running container alone, so the site
# stays up on the previous version. See the log with:
#   journalctl -u wongworks-deploy -n 50

set -euo pipefail

cd "$(dirname "$0")/.."
REPO="$PWD"
MODE="${1:-}"

log() { printf '%s %s\n' "$(date '+%F %T')" "$*"; }

# One deploy at a time: a timer run that lands mid-build just skips.
exec 9>"/tmp/wongworks-deploy.lock"
if ! flock -n 9; then
  log "another deploy is running; skipping"
  exit 0
fi

if ! docker info >/dev/null 2>&1; then
  log "error: $(id -un) can't reach Docker (is it in the docker group?)"
  exit 1
fi

git fetch --quiet origin main
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/main)"

if [[ "$MODE" == "--if-changed" && "$LOCAL" == "$REMOTE" ]]; then
  exit 0
fi

if [[ "$LOCAL" != "$REMOTE" ]]; then
  if ! git merge --ff-only --quiet origin/main; then
    log "error: $REPO has local commits or edits that block a fast-forward to origin/main; fix by hand"
    exit 1
  fi
  log "updated $(git rev-parse --short "$LOCAL") -> $(git rev-parse --short HEAD): $(git log -1 --format=%s)"
fi

if [[ "$MODE" == "--fresh" ]]; then
  log "building without cache"
  docker compose build --no-cache --quiet
else
  log "building"
  docker compose build --quiet
fi
docker compose up -d
log "deployed $(git rev-parse --short HEAD)"
