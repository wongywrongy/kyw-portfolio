# Deploying

Two containers on neo, both from this repo:

- **web** – nginx serving the files `next build` exports. The Cloudflare Tunnel points at `127.0.0.1:8080`.
- **editor** – Next.js with Keystatic at `/keystatic`, bound to neo's tailnet address on port 3100. It writes posts and images into this checkout; it is never reachable from the internet.

## First run

```bash
cd /opt/stacks/wongworks
cp .env.example .env     # set TAILNET_IP (tailscale ip -4), PUID/PGID (id -u, id -g), GITHUB_TOKEN
docker compose up -d --build
```

Then open `http://<TAILNET_IP>:3100/keystatic` from any device on the tailnet.

## Day to day

| What changed | Where | Command on neo |
| --- | --- | --- |
| Wrote or edited a post in the editor | neo | `./publish.sh` |
| Edited code or `content/*.ts` and pushed from your laptop | laptop → neo | `./deploy.sh` |
| Changed the editor's code (`keystatic.config.ts`, Dockerfile.editor) | laptop → neo | `./deploy.sh --editor` |

`publish.sh` stages `frontend/content` and `frontend/public/images`, commits (message from the post titles unless you pass one), pushes, and rebuilds `web`. `deploy.sh` pulls and rebuilds `web`.

neo needs push access to GitHub for `publish.sh`: a deploy key with write access on the repo, or your own SSH key. If you only ever write posts through the editor, neo is the only place that commits content and nothing drifts.

## Settings

- `NEXT_PUBLIC_SITE_URL` (default `https://kyle.wongworks.dev`) is compiled into the pages; change it in `.env` and rebuild.
- `GITHUB_TOKEN` feeds the homepage activity graph at build time. Passed to the build as a BuildKit secret, never stored in the image.
- `TAILNET_IP` is the address the editor listens on. Empty means loopback, reachable only from neo itself.
- `PUID`/`PGID` make the editor run as your user, so saved files belong to you.

## Check it

```bash
curl -sI http://127.0.0.1:8080/              # 200 plus security headers
curl -sI http://127.0.0.1:8080/nope          # 404, serves the styled 404 page
curl -sI http://127.0.0.1:8080/keystatic     # 404: the editor is not in the public build
curl -sI http://$TAILNET_IP:3100/keystatic   # 200
```

## Logs and rollback

```bash
docker compose logs -f web
docker compose logs -f editor
git checkout <previous-commit> && docker compose up -d --build web
```
