# kyle.wongworks.dev

Personal site. A static, file-based Next.js export: content lives in the repo, `next build` writes plain files to `frontend/out/`, and nginx serves them.

## Develop

```bash
cd frontend
npm ci
npm run dev      # http://localhost:3000, drafts visible
npm run lint
npm run build    # writes frontend/out/
```

## Add content

Everything is under `frontend/content/`; templates and linking are in [EDITING.md](EDITING.md).

- **Project**: add an object to `projects.ts`. `name` and `description` are required; `stack` and `href` are optional. With an `href` the row becomes a link.
- **Job**: add an object to `work.ts`. `company` and `role` are required; `period`, `description` and `href` are optional.
- **Post**: add `content/posts/<slug>.mdx` with `title`, `date` (YYYY-MM-DD), `summary` and `draft` in the frontmatter. Images go in `public/images/`. Drafts only show up in `npm run dev`; set `draft: false` to publish. See `content/how-to-write-a-post.mdx` for an example.
- **Bio, role, links**: `site.ts`. A link with an empty value is hidden.

Order in the lists is the order in the files. Posts sort newest first.

## Deploy

On neo: `git pull && docker compose up -d --build`. See [docs/DEPLOY.md](docs/DEPLOY.md).

## Layout

```
frontend/   Next.js app, content/, Dockerfile
deploy/     nginx site config
docs/       deploy notes
```
