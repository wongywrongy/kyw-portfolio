# Portfolio Website

A personal portfolio website built with Next.js and Payload CMS.

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Payload CMS v3 (embedded, self-hosted)
- MongoDB Atlas

## Structure

```
frontend/    → Next.js website + Payload CMS admin (/admin)
```

## Getting Started

1. Copy `frontend/.env.example` to `frontend/.env.local` and fill in your MongoDB URI and Payload secret
2. Run `npm run dev` from the root or `npm run dev` inside `frontend/`
3. Visit `/admin` to create your first user and manage content

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB connection string. The app refuses to boot without it. |
| `PAYLOAD_SECRET` | yes | Signs Payload auth tokens. The app refuses to boot without it. |
| `NEXT_PUBLIC_SITE_URL` | no | Public origin for canonical URLs, `robots.txt` and `sitemap.xml`. Defaults to `https://kyle.wongworks.dev`. |

## Deployment

**→ [`docs/DEPLOY.md`](docs/DEPLOY.md) is the setup guide.** Follow it start to
finish; it's self-contained.

`https://kyle.wongworks.dev` runs as a container on neo, behind the host's
nginx, reached through a Cloudflare Tunnel.
[`docs/hosting.md`](docs/hosting.md) covers why it's built this way; deployed
artifacts live in [`deploy/`](deploy/).

```bash
cp .env.example .env          # set PAYLOAD_SECRET: openssl rand -base64 32
docker compose up -d --build
```

The app binds to `127.0.0.1:3000`; nginx proxies to it. MongoDB publishes no
ports.

Notes:

- **Two nginx server blocks.** The public one 404s `/admin` and `/api`; a
  tailnet-only block serves them. Proxying the public hostname straight through
  would expose the CMS.
- `NEXT_PUBLIC_SITE_URL` is compiled into the bundle — changing it requires
  `--build`, not a restart.
- `frontend/.npmrc` (`legacy-peer-deps=true`) is required for `npm ci` to
  succeed. It masks a real Next/Payload peer conflict — see the open items in
  `docs/hosting.md`.
