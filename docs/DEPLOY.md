# Deploying

The site is one container: nginx serving the files `next build` exports. Compose runs it on neo and the Cloudflare Tunnel points at `127.0.0.1:8080`.

## Deploy

```bash
cd /opt/stacks/wongworks
git pull && docker compose up -d --build
```

The image build runs `npm ci && npm run build`, so a content change is a rebuild, not a restart. `NEXT_PUBLIC_SITE_URL` (default `https://kyle.wongworks.dev`) can be overridden in `.env`; it is compiled into the pages.

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
docker compose logs -f web
git checkout <previous-commit> && docker compose up -d --build
```
