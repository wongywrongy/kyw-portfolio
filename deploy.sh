#!/usr/bin/env bash
# Pull the latest commit and rebuild the public site. Run on neo from the repo:
#   ./deploy.sh
# Add --editor to rebuild the editor container too (needed after code changes
# to the editor, not after writing posts).
set -euo pipefail
cd "$(dirname "$0")"

git pull --ff-only
if [[ "${1:-}" == "--editor" ]]; then
  docker compose up -d --build
else
  docker compose up -d --build web
fi
echo "live: HTTP $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8080/) from 127.0.0.1:8080"
