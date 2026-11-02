# Deploying

The site is one container: nginx serving the files `next build` exports. Compose runs it on neo and the Cloudflare Tunnel points at `127.0.0.1:8080`.

## Deploy

Automatic once set up: GitHub calls neo on every push to `main` (a Pages CMS save, a merged PR) and neo rebuilds right away, so a change is live in about a minute. Pushes that land during a build are queued into one more run, and on restart the listener catches up on anything it missed.

### Turn it on (once)

1. On neo, from the repo:

   ```bash
   cd /opt/stacks/wongworks
   git pull
   sudo ./deploy/install-autodeploy.sh
   ```

   This installs `wongworks-webhook` (a small Python listener on `127.0.0.1:9471`, running as you), generates the shared secret in `/etc/wongworks/webhook.env`, adds a daily 06:00 rebuild without cache for the activity graph, and prints the secret.

2. Cloudflare Zero Trust → Networks → Tunnels → neo's tunnel → **Public Hostname → Add**:
   subdomain `hooks`, domain `wongworks.dev`, no path, service **HTTP** `localhost:9471`.

3. GitHub → repo **Settings → Webhooks → Add webhook**:
   payload URL `https://hooks.wongworks.dev/github`, content type `application/json`, the secret from step 1, **Just the push event**.

GitHub sends a ping when you save the webhook. `journalctl -u wongworks-webhook -f` on neo should print `ping from GitHub: webhook is connected`, and the webhook's **Recent Deliveries** tab should show a green 200.

The listener only accepts POSTs to `/github` signed with the secret; anything else gets 401 or 404. A valid request can only make neo pull `main` and rebuild.

No webhook wanted? `sudo ./deploy/install-autodeploy.sh --poll` checks `main` every 2 minutes instead.

### By hand

Same script the listener runs:

```bash
./deploy/deploy.sh            # pull main and rebuild
./deploy/deploy.sh --fresh    # same, without Docker's cache
```

Only one deploy runs at a time; a second one waits for the first. A failed build stops before the running container is touched, so the site stays on the previous version.

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
journalctl -u wongworks-webhook -f  # webhook deliveries and deploys
docker compose logs -f web          # nginx
```

To roll back, revert the bad commit on GitHub (Revert button on the PR, or `git revert` and push). The revert deploys like any other push. A plain `git checkout <old>` on neo won't stick: the next deploy fast-forwards back to `main`. To pause automatic deploys: `sudo systemctl stop wongworks-webhook`.
