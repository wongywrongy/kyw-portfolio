# Editing content

Everything lives in `frontend/content/`. Run `cd frontend && npm run dev` to preview; `git pull && docker compose up -d --build` on neo to publish.

## Templates

Job, in `content/work.ts`:

```ts
{
  company: 'Company',
  href: '',
  role: 'Role',
  period: 'Aug 2025 – Mar 2026', // optional
  description: 'One or two sentences.', // optional
},
```

Project, in `content/projects.ts`:

```ts
{
  name: 'Project',
  href: '',
  description: 'One line.',
  stack: ['Tool', 'Tool'], // optional
},
```

Posts are `content/posts/<slug>.mdx`; see `content/how-to-write-a-post.mdx`.

## Link a job or project

Leave `href` as `''` and the card is plain text. Set it and the whole card becomes a link with a ↗.

```ts
// Another site: full URL, opens in a new tab
{ name: 'ShuttleWorks', href: 'https://github.com/wongywrongy/shuttleworks', ... }

// A page on this site: starts with /, opens in the same tab
{ name: 'ShuttleWorks', href: '/mindspace/shuttleworks', ... }
```

Anything else (`mailto:`, `javascript:`, a bare `example.com`) fails the build with a message like:

```
content/projects.ts: "Ara" href must start with https:// or / (got "ara.dev")
```

## GitHub activity

The contribution graph on the homepage is fetched from GitHub when the site builds, using `GITHUB_TOKEN` from the stack's `.env` on neo (see `.env.example`). Without a token the graph renders blank and the build still succeeds.

The graph updates on each deploy that changes the site. A rebuild with no changes reuses Docker's cached build and keeps the old graph, so to refresh it on its own, build without the cache. To keep it current, add a daily cron on neo:

```
0 6 * * * cd /opt/stacks/wongworks && docker compose build --no-cache && docker compose up -d
```
