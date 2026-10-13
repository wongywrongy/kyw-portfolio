#!/usr/bin/env bash
# Ship what you wrote in the editor: commit content and images, push, rebuild
# the public site. Run on neo from the repo:
#   ./publish.sh           commit message defaults to the changed post titles
#   ./publish.sh "message"
set -euo pipefail
cd "$(dirname "$0")"

git add -A frontend/content frontend/public/images
if git diff --cached --quiet; then
  echo "nothing to publish"
  exit 0
fi

msg="${1:-}"
if [[ -z "$msg" ]]; then
  titles=$(git diff --cached --name-only -- 'frontend/content/posts/*.mdx' \
    | xargs -r -I{} sh -c "grep -m1 '^title:' '{}' 2>/dev/null | sed -E 's/^title: *//; s/^[\"'\'']//; s/[\"'\'']\$//'" \
    | paste -sd ', ' -)
  msg="Content: ${titles:-update}"
fi

git commit -q -m "$msg"
git push
docker compose up -d --build web
echo "published: $msg"
