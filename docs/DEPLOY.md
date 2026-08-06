# Deploying kyle.wongworks.dev on neo

Everything needed to stand the site up, start to finish. Self-contained — you
don't need any other file to follow this. `hosting.md` is background reading on
*why* it's built this way; you don't need it to deploy.

## What you're deploying

A Next.js site with an embedded Payload CMS, running as two containers on neo,
behind the host's nginx, reached through a Cloudflare Tunnel.

```
internet -> Cloudflare edge -> tunnel -> nginx (host)
                                          :8080 public  -> app  (/admin, /api = 404)
                                          :8081 tailnet -> app  (everything)
                                                            |
                                            app container 127.0.0.1:3000
                                                            |
                                            mongo container (no published ports)
```

The public hostname serves the site but **not** the CMS. You reach `/admin` over
Tailscale only.

## Prerequisites on neo

- Docker with the Compose plugin (`docker compose version`)
- nginx running as a host service
- `cloudflared` installed and authenticated
- Tailscale up, and neo reachable by name on the tailnet

---

## 1. Clone

```bash
sudo mkdir -p /opt/stacks
cd /opt/stacks
sudo git clone https://github.com/wongywrongy/kyw-portfolio.git wongworks
cd wongworks
```

## 2. Configure

```bash
cp .env.example .env
```

Edit `.env`:

```bash
PAYLOAD_SECRET=<paste output of: openssl rand -base64 32>
NEXT_PUBLIC_SITE_URL=https://kyle.wongworks.dev
```

`PAYLOAD_SECRET` signs admin login tokens. Compose refuses to start without it
rather than booting with an empty signing key. Changing it later logs everyone
out.

> `NEXT_PUBLIC_SITE_URL` is **compiled into the bundle at build time**, not read
> at runtime. Changing it later requires `docker compose up -d --build`, not a
> restart.

## 3. Start the stack

```bash
docker compose up -d --build
```

First build takes a few minutes. Verify:

```bash
docker compose ps                       # both services up, mongo healthy
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/     # 200
```

If mongo isn't healthy after ~60s, check `docker compose logs mongo`. It
self-initialises a single-node replica set on first boot — Payload needs one for
transactions.

## 4. nginx

Find neo's tailnet address:

```bash
tailscale ip -4
```

Copy the vhost and **replace the placeholder IP in the second server block**
with that address:

```bash
sudo cp deploy/nginx/kyle.wongworks.dev.conf /etc/nginx/conf.d/
sudo nano /etc/nginx/conf.d/kyle.wongworks.dev.conf   # fix the listen line
sudo nginx -t && sudo systemctl reload nginx
```

The file ships with `listen 100.75.156.61:8081;` — that is a placeholder from a
dev machine and **will fail to bind on neo** until you change it.

Check both blocks:

```bash
curl -s -o /dev/null -w 'public root:  %{http_code}\n' -H 'Host: kyle.wongworks.dev' http://127.0.0.1:8080/
curl -s -o /dev/null -w 'public admin: %{http_code}\n' -H 'Host: kyle.wongworks.dev' http://127.0.0.1:8080/admin
```

Expect `200` then `404`. **If `/admin` returns 200, stop** — the CMS would be
public once the tunnel is live.

## 5. Cloudflare Tunnel

Point the tunnel at nginx's public block, not at the app:

```yaml
# ~/.cloudflared/config.yml
tunnel: <tunnel-id>
credentials-file: /root/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: kyle.wongworks.dev
    service: http://localhost:8080
  - service: http_status:404
```

```bash
sudo cloudflared service install
sudo systemctl enable --now cloudflared
cloudflared tunnel route dns <tunnel-id> kyle.wongworks.dev
```

## 6. Create your admin user

Over Tailscale, from any device on the tailnet:

```
http://neo:8081/admin
```

The first visit prompts you to create the first user. **Do this promptly** —
until a user exists, that endpoint will create one for whoever reaches it. It's
tailnet-only, so the exposure is limited, but don't leave it open.

Then fill in Site Settings, Work Experiences, Projects and Posts.

## 7. Verify the live site

```bash
curl -sI https://kyle.wongworks.dev/ | head -1                  # 200
curl -s -o /dev/null -w '%{http_code}\n' https://kyle.wongworks.dev/admin   # 404
curl -s https://kyle.wongworks.dev/robots.txt
curl -s https://kyle.wongworks.dev/sitemap.xml | head -5
```

`/admin` **must** be 404 from the public hostname.

---

## Day to day

**Editing content** — `http://neo:8081/admin` over Tailscale. Changes appear
within 60 seconds; the affected pages revalidate on save.

**Deploying code changes**

```bash
cd /opt/stacks/wongworks
git pull
docker compose up -d --build
```

A freshly built container serves whatever was prerendered at build time — the
build runs without database access, so pages briefly show default copy until the
first revalidation (up to 60s). This is expected and self-corrects.

**Logs**

```bash
docker compose logs -f app
```

## Backups

The `wongworks_mongo-data` volume is the only copy of all your content.

```bash
# Back up
docker compose exec -T mongo mongodump --archive --gzip > wongworks-$(date +%F).gz

# Restore
docker compose exec -T mongo mongorestore --archive --gzip --drop < wongworks-2026-08-06.gz
```

Put the backup command on a cron job and copy the output off neo. Nothing else
in this stack holds state — the containers and images are all reproducible from
the repo.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Compose won't start, "required variable PAYLOAD_SECRET is missing" | `.env` missing or the value is blank. Working as designed. |
| nginx won't reload, "cannot assign requested address" | The tailnet IP in the second server block is still the placeholder. Fix it with `tailscale ip -4`. |
| `/admin` returns 500 | App can't reach mongo. `docker compose ps` — is mongo healthy? |
| `/admin` returns 200 on the public hostname | The tunnel is pointed at port 3000 instead of nginx's 8080. Fix before going live. |
| Site shows "Your Name" / placeholder copy | Site Settings not filled in yet, or the container was just rebuilt and hasn't revalidated. |
| Wrong domain in sitemap.xml | `NEXT_PUBLIC_SITE_URL` is baked at build time. Rebuild with `--build`. |
| Uploads fail on large images | `client_max_body_size` in the tailnet server block; default here is 25m. |

## Known issues

- **Next is on an unsupported version.** `@payloadcms/next@3.87.0` declares
  peer ranges that `next@15.5.22` does not satisfy;
  `frontend/.npmrc` (`legacy-peer-deps=true`) suppresses the error and is
  required for `npm ci` to succeed. Upgrading to Next 16.3.0 restores a
  supported combination *and* clears four high-severity advisories in `next`
  and its bundled `postcss` and `sharp`. Worth doing deliberately, after the
  cutover has settled.
- **`undici` and `mongoose` advisories** have no upstream fix — both are pinned
  by Payload, which is already on its latest release. Nothing to do but track.
- **No staging environment.** If you want one, add
  `staging.kyle.wongworks.dev` to the tunnel ingress pointing at a second
  compose stack on a different port, run both for a week, then move DNS.
  Rollback is a DNS change.
- **`deploy/wongworks-build.sh` is not used.** It implements a static-snapshot
  approach that was considered and rejected. Ignore it.
