# Editing content

Everything lives in `frontend/content/`. Posts have an editor; everything else is a small TypeScript file.

- **Posts** → the editor at `http://<neo tailnet IP>:3100/keystatic` (or the files in `content/posts/`), then `./publish.sh` on neo.
- **Bio, links, experience, projects** → edit the file, commit, push, then `./deploy.sh` on neo.

Preview locally with `cd frontend && npm run dev` (drafts show there).

## Posts

Open the editor from any device on the tailnet, add a post, drop images straight into the text, and save. Saving writes `content/posts/<slug>.mdx` and `public/images/posts/…` into the checkout on neo. Nothing is public until you run `./publish.sh`, which commits, pushes and rebuilds the site.

Fields:

- **Title** – also sets the URL (`/mindspace/<slug>`).
- **Date** – the post date.
- **Summary** – one line for link previews and the Mindspace page.
- **Draft** – on by default. Drafts never reach the public site, only `npm run dev`.
- **Cover image** – optional. On the homepage it shows recoloured (duotone) at the top of the card, so any screenshot or photo fits the theme; the post page shows it in full colour.
- **Content** – the post. Headings, lists, code blocks, images, links.

Writing by hand instead: a post is an `.mdx` file with this at the top. Quote the title if it has a colon.

```yaml
---
title: "My post: a subtitle"
date: 2026-10-01
summary: One line that shows up in link previews.
draft: false
cover: /images/posts/my-post/cover.jpg
---
```

Images go in `frontend/public/images/posts/` and are referenced from the root: `![Alt text](/images/posts/my-post/photo.jpg)`. The build fails with the file name if a post is missing `title` or `date`.

## Experience

`content/experience.ts`, newest first. Work and education share one list; `kind` picks the colour. The homepage shows the first five, `/experience` shows all.

```ts
{
  kind: 'work',                 // or 'education'
  org: 'Company',
  role: 'Role',
  start: '2025-08',             // YYYY-MM
  end: '2026-03',               // leave out for something you still do
  description: 'One line.',     // optional, shown on /experience
  href: '',                     // optional
},
```

## Projects

`content/projects.ts`, in the order you want them shown. The homepage pages through them six at a time.

```ts
{
  name: 'Project',
  href: '',                                   // optional
  description: 'One or two sentences.',       // shown on /projects
  stack: ['Tool', 'Tool'],                    // optional, shown on the card
  image: '/images/projects/project.jpg',      // optional, file in public/images/projects/
},
```

Cards without an image get a generated gradient in the same place, so the grid stays even.

## Bio, role, links

`content/site.ts`. A link with an empty value is hidden. The first link gets the filled button.

## Links

Leave `href` as `''` and the card is plain. Set it and the whole card becomes a link.

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

The graph on the homepage is fetched from GitHub when the site builds, using `GITHUB_TOKEN` from the stack's `.env` on neo (see `.env.example`). Without a token the graph renders blank and the build still succeeds.

The graph updates on each deploy. To keep it current without content changes, add a daily cron on neo:

```
0 6 * * * cd /opt/stacks/wongworks && docker compose build --no-cache web && docker compose up -d web
```
