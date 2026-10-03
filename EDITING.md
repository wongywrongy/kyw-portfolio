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

Leave `href` as `''` and the row is plain text with no hover state. Set it and the whole row becomes a link, with a hover background and a ↗.

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
