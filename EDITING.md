# Editing content

Everything lives in `frontend/content/`. Run `cd frontend && npm run dev` to preview. Anything that lands on `main` (a Pages CMS save, a merged PR) is live within a few minutes; see [docs/DEPLOY.md](docs/DEPLOY.md).

## From the browser (Pages CMS)

Sign in at [pagescms.org](https://pagescms.org) with GitHub and open this repo. `.pages.yml` gives you four sections:

- **Blog**: write, edit and publish posts. New posts start as drafts; untick Draft to publish.
- **Profile**: name, role, photo, bio and links (`content/site.json`).
- **Work**: jobs, each with an optional logo (`content/work.json`).
- **Projects**: `content/projects.json`.

Images you upload land in `frontend/public/images/` and are referenced as `/images/<file>`. Upload whatever you have: the build shrinks big photos (max 1600px wide, re-compressed) in the published site and leaves the originals alone. Each save is a commit to `main` and goes live on the next deploy check, within a few minutes.

## By hand

Job, in `content/work.json`:

```json
{
  "company": "Company",
  "role": "Role",
  "period": "Aug 2025 to Mar 2026",
  "description": "",
  "href": "",
  "logo": "/images/company.png"
}
```

`period`, `description`, `href` and `logo` can be empty. A job with a `logo` gets a white app-icon tile on the left of its card. The build trims whitespace around the logo and squares it, so any logo file works.

Project, in `content/projects.json`:

```json
{
  "name": "Project",
  "href": "",
  "description": "One line.",
  "stack": ["Tool", "Tool"]
}
```

Profile photo: set `avatar` in `content/site.json` to an image path, or leave it empty for none.

Posts are `content/posts/<slug>.md` and show at `/blog/<slug>`; see `content/how-to-write-a-post.mdx`. The homepage shows the newest five in the Blog rail, with an "All posts" link to `/blog` once there are more.

## Link a job or project

Leave `href` as `''` and the card is plain text. Set it and the whole card becomes a link with a ↗.

```json
// Another site: full URL, opens in a new tab
{ "name": "ShuttleWorks", "href": "https://github.com/wongywrongy/shuttleworks", ... }

// A page on this site: starts with /, opens in the same tab
{ "name": "ShuttleWorks", "href": "/blog/shuttleworks", ... }
```

Anything else (`mailto:`, `javascript:`, a bare `example.com`) fails the build with a message like:

```
content/projects.json: "Ara" href must start with https:// or / (got "ara.dev")
```

## GitHub activity

The contribution graph on the homepage is fetched from GitHub when the site builds, using `GITHUB_TOKEN` from the stack's `.env` on neo (see `.env.example`). Without a token the graph renders blank and the build still succeeds.

The graph refreshes on every deploy that changes the site, and the auto-deploy setup adds a daily 06:00 rebuild without cache so it stays current even when nothing else changes.
