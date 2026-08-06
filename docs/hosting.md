# kyle.wongworks.dev — hosting plan

Revised 2026-08-06. Supersedes both the original `wongworks.dev` draft and the
static-snapshot revision; see [Decision history](#decision-history).

## Intent

Move the site off Vercel and onto neo, served through a Cloudflare Tunnel. The
app runs as a container behind the host's existing nginx. The CMS and the
database are never on the public hostname.

## Target

Everything runs on neo.

```
                 internet
                    |
            Cloudflare edge  (cache rule)
                    |
                 tunnel
                    |
   ------------- neo -----------------------------------
   |                                                    |
   |   nginx (host service)                             |
   |     :8080  public   -> app, /admin + /api = 404    |
   |     :8081  tailnet  -> app, everything             |
   |        |                                           |
   |        v                                           |
   |   app container   127.0.0.1:3000                   |
   |        |                                           |
   |        v                                           |
   |   mongo container (compose network only)           |
   ---------|--------------------------------------------
            | admin over Tailscale
           Kyle
```

Two nginx server blocks, not one. The public block proxies the site but returns
404 for `/admin` and `/api`; a separate block bound to neo's tailnet address
proxies everything. Proxying the public hostname straight through would put the
CMS and REST API on the internet.

The database publishes no ports at all — it is reachable only on the compose
network, not from the host and not from the tailnet.

## Layout

```
neo:
  /opt/stacks/wongworks/          repo checkout
    docker-compose.yml            app + mongo
    frontend/Dockerfile           multi-stage build
    .env                          PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL
  /etc/nginx/conf.d/              deploy/nginx/kyle.wongworks.dev.conf
```

## Deploy

```bash
cp .env.example .env          # set PAYLOAD_SECRET: openssl rand -base64 32
docker compose up -d --build
```

Content edits happen at `http://neo:8081/admin` over Tailscale and take effect
without a redeploy. Code changes need `docker compose up -d --build`.

`NEXT_PUBLIC_SITE_URL` is compiled into the bundle, so changing the public
origin is a rebuild, not a restart.

## Verified

Built and run end to end on 2026-08-06:

- image builds; `/`, `/work/all`, `/projects/all`, `/mindspace/all`,
  `/robots.txt`, `/sitemap.xml`, `/admin` all return 200 from the container
- security headers present on responses
- `sharp` 0.35.3 resolves in the runtime image with `linux-x64` libvips
- mongo replica set initialises from its own healthcheck; the app waits on it
- nginx config passes `nginx -t`

Not yet verified: the tunnel itself, and a media upload through `/admin`.

## Gotchas found while building this

- **`.npmrc` is load-bearing.** It carries `legacy-peer-deps=true`, without
  which `npm ci` fails in a clean container. See the Next version item below —
  the flag is masking a real conflict, not a preference.
- **`NEXT_PUBLIC_*` is inlined at compile time.** Setting it in the runtime
  environment does nothing; it has to be a build arg.
- **The build runs without a database.** `payload.config.ts` calls
  `requireEnv()` at import time, so placeholders are required for `next build`
  to complete. Every page wraps its fetch in try/catch, so pages that prerender
  during the build ship with empty content until the first revalidation. This
  is why a freshly deployed container briefly serves default copy.
- **`add_header` does not merge across nginx levels.** Any nested `location`
  declaring one drops every inherited header, so each block repeats the set.
- **Mongo needs a replica set.** Payload uses transactions where available and
  mongoose requires a replica set for them. A single-node set via the
  healthcheck is enough.

## Security posture

- No inbound ports; the tunnel dials out. Origin IP is never exposed.
- `/admin` and `/api` are 404 on the public block and reachable only over the
  tailnet. `robots.txt` also disallows them, but that is a hint, not a control.
- Database publishes no ports.
- The container runs as a non-root user (`nextjs`, uid 1001).
- `.dockerignore` excludes `.env*` so secrets never enter an image layer.
- Compose fails to start if `PAYLOAD_SECRET` is unset, rather than booting with
  an empty signing key.
- Draft posts are filtered at `Posts.access.read`, so the public REST API can
  never return them.

## Open items

- **Next is on an unsupported version.** `@payloadcms/next@3.87.0` declares
  `next@">=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.2.6
  <17.0.0"`. Installed is **15.5.22**, which matches none of them;
  `legacy-peer-deps=true` suppresses the error. Upgrading to Next 16.3.0 both
  restores a supported combination and clears four high-severity advisories
  (`next` and its bundled `postcss` and `sharp`). This is the highest-value
  outstanding change and is a major version bump — do it deliberately, not
  bundled with the cutover.
- **Remaining advisories with no upstream fix:** `undici` (via `payload`, which
  is already latest at 3.87.0) and `mongoose` (pinned by
  `@payloadcms/db-mongodb`). Nothing to do but track them.
- **Cutover:** stand up `staging.kyle.wongworks.dev` on the tunnel first, run
  both for a week, then move DNS. Rollback is a DNS change.
- **Confirm the tailnet IP** in the nginx admin block — it is currently a
  placeholder from the dev machine, not neo. Get it with `tailscale ip -4`.
- **Backups.** neo now holds the CMS, the database and the site. The
  `mongo-data` volume is the only copy of all content.
- **Postgres vs MongoDB:** the original draft assumed Postgres; the repo is
  MongoDB. Not planned, recorded so it stops resurfacing.

## Decision history

| Draft said | Actual | Why |
| --- | --- | --- |
| `wongworks.dev` apex | `kyle.wongworks.dev` | Confirmed. `frontend/lib/site.ts` defaults to it. |
| Postgres | MongoDB | Repo uses `@payloadcms/db-mongodb`. Migration not planned. |
| cayde replica | neo only | nginx already on neo. Long edge TTL covers most of what a replica bought. |
| Static snapshot, crawled with `wget` | **Live app behind nginx** | Simpler: no crawl, no atomic swap, no cache purge, no publish step. Cost: the Node app and database are in the request path, which the static approach avoided. |

`deploy/wongworks-build.sh` implements the rejected static-snapshot approach. It
is **not used** by the current setup and is kept only as a starting point if the
live app ever needs to become static files again.
