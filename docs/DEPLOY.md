# Deploying

`next build` exports plain files. `deploy/deploy.sh` builds them with Docker into `releases/<timestamp>-<commit>/` and flips the `releases/current` symlink to the new build in one rename. A stock nginx container (compose service `web`) serves `releases/current` the whole time and gets a graceful reload, so a deploy never has a moment with nothing serving: no 502s through the Cloudflare Tunnel. The tunnel points at `127.0.0.1:8080`.

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

Only one deploy runs at a time; a second one waits for the first. A failed build never touches `releases/current`, so the site stays on the previous version. The newest five builds are kept.

### Roll back

```bash
./deploy/deploy.sh --rollback   # previous build; run again to go further back
```

Instant, no rebuild. The next push to `main` deploys normally again; to stay on the old version, revert the bad commit on GitHub instead.

## One-time switch to zero-downtime deploys

The first deploy of this setup has to run the new `deploy.sh` by hand (the webhook would still be running the old one when it pulls the change):

```bash
sudo systemctl stop wongworks-webhook
# merge the PR on GitHub, then:
cd /opt/stacks/wongworks
git pull
./deploy/deploy.sh
sudo systemctl start wongworks-webhook
docker image rm wongworks-web 2>/dev/null || true   # the old site image, no longer used
```

That deploy recreates the `web` container once (a second of downtime, the last one). Every deploy after it is a symlink swap plus a graceful reload.

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

For a quick rollback use `./deploy/deploy.sh --rollback` (above). For a lasting one, revert the bad commit on GitHub; the revert deploys like any other push. To pause automatic deploys: `sudo systemctl stop wongworks-webhook`.
