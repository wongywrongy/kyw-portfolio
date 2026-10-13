# kyle.wongworks.dev

Personal site. A static, file-based Next.js export: content lives in the repo, `next build` writes plain files to `frontend/out/`, and nginx serves them. Posts are written in a self-hosted editor (Keystatic) that runs on the same server and is only reachable over Tailscale.

## Develop

```bash
cd frontend
npm ci
npm run dev        # http://localhost:3000, drafts visible
npm run lint
npm run build      # the public site → frontend/out/
EDITOR=1 npm run build && EDITOR=1 npx next start -p 3100   # the editor at /keystatic
```

## Content

Everything is under `frontend/content/`; see [EDITING.md](EDITING.md).

- **Posts** – the editor, or `content/posts/<slug>.mdx`.
- **Experience** – `content/experience.ts` (work and education).
- **Projects** – `content/projects.ts`.
- **Bio, role, links** – `content/site.ts`.

## Deploy

On neo: `./publish.sh` after writing, `./deploy.sh` after code changes. See [docs/DEPLOY.md](docs/DEPLOY.md).

## Layout

```
frontend/
  app/            pages: /, /projects, /experience, /mindspace, /mindspace/<slug>
  app/keystatic/  the editor (only built with EDITOR=1)
  components/     tiles, cards, thread, activity, chrome
  content/        everything you edit
  lib/            posts loader, dates, GitHub activity, card patterns
  Dockerfile          the public site (nginx)
  Dockerfile.editor   the editor (Next.js server)
deploy/           nginx site config
docs/             deploy notes
deploy.sh         pull + rebuild the site
publish.sh        commit content + push + rebuild the site
```
