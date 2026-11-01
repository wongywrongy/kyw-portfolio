# Deploying

The site is one container: nginx serving the files `next build` exports. Compose runs it on neo and the Cloudflare Tunnel points at `127.0.0.1:8080`.

## Deploy

Automatic once set up: a timer on neo checks `main` every 2 minutes and rebuilds when it moved, so a save in Pages CMS or a merged PR goes live in a few minutes. One-time setup, from the repo on neo:

```bash
cd /opt/stacks/wongworks
sudo ./deploy/install-autodeploy.sh
```

That also adds a daily 06:00 rebuild without cache, which refetches the GitHub activity graph.

To deploy by hand (same script the timer runs):

```bash
./deploy/deploy.sh            # pull main and rebuild
./deploy/deploy.sh --fresh    # same, without Docker's cache
```

A failed build stops before the running container is touched, so the site stays on the previous version. Logs: `journalctl -u wongworks-deploy -n 50`.

The image build runs `npm ci && npm run build`, so a content change is a rebuild, not a restart. `NEXT_PUBLIC_SITE_URL` (default `https://kyle.wongworks.dev`) can be overridden in `.env`; it is compiled into the pages.

`GITHUB_TOKEN` in `.env` feeds the homepage activity graph. It is passed to the build as a BuildKit secret, so it is never stored in the image; see the GitHub activity section of [EDITING.md](../EDITING.md).

## One-time cleanup (moving from the CMS setup)

Before the first `up` on the new version, remove the old containers:

```bash
docker compose down --remove-orphans
docker compose up -d --build
```

Once the new site is confirmed, drop the old database volume. It held no real content:

```bash
docker volume rm wongworks_mongo-data
```

The old `.env` values `PAYLOAD_SECRET` and `TAILNET_IP` are no longer read and can be deleted. The tailnet-only admin listener on 8081 is gone.

## Check it

```bash
curl -sI http://127.0.0.1:8080/              # 200 plus security headers
curl -sI http://127.0.0.1:8080/nope          # 404, serves the styled 404 page
curl -sI http://127.0.0.1:8080/work/all      # 301 to /
```

## Logs and rollback

```bash
journalctl -u wongworks-deploy -f   # deploys
docker compose logs -f web          # nginx
```

To roll back, revert the bad commit on GitHub (Revert button on the PR, or `git revert` and push). The timer deploys the revert like any other change. A plain `git checkout <old>` on neo won't stick: the next timer run fast-forwards back to `main`. To pause deploys: `sudo systemctl stop wongworks-deploy.timer`.
