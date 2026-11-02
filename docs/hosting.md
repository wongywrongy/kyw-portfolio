# Hosting

```
internet -> Cloudflare edge -> tunnel -> neo 127.0.0.1:8080 -> web container (nginx) -> static files
```

- One compose service, `web`, built from `frontend/Dockerfile` (node build stage, nginx final stage).
- The port is published on loopback only, so the site is reachable through the tunnel and nowhere else on the network.
- `deploy/nginx/kyle.wongworks.dev.conf` is baked into the image. It serves the export with `try_files $uri $uri.html $uri/ =404`, returns the exported `404.html` for misses, and sets the security headers. `output: 'export'` ignores `headers()` in the Next config, so the headers have to live in nginx.
- `/_next/static/` is cached as immutable (content-hashed). HTML gets a five-minute cache.
- `/work/all` and `/projects/all` are 301s to `/`; `/mindspace` and `/mindspace/*` are 301s to `/blog` and `/blog/*` (posts moved). `/admin` and `/api` are 404.
- If there are no published posts, the build emits a placeholder `/blog/_none` page (the export requires at least one dynamic route). nginx returns 404 for it.

Cloudflare Tunnel ingress for `kyle.wongworks.dev` is `http://localhost:8080`. With automatic deploys turned on, `hooks.wongworks.dev` routes to the deploy webhook on `http://localhost:9471` (a systemd service on the host, not a container; see [DEPLOY.md](DEPLOY.md)). No database.
