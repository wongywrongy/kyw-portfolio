import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export type PostMeta = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  summary: string
  draft: boolean
  readingTime: number // minutes
}

export type Post = PostMeta & { content: string }

function normalizeDate(value: unknown, file: string): string {
  // gray-matter hands back a Date for an unquoted YYYY-MM-DD.
  const d = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Post "${file}" has an invalid date: ${String(value)}. Use YYYY-MM-DD.`)
  }
  return d.toISOString().slice(0, 10)
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
  const { data, content } = matter(raw)
  if (!data.title) throw new Error(`Post "${file}" is missing a title in its frontmatter.`)
  if (!data.date) throw new Error(`Post "${file}" is missing a date in its frontmatter (YYYY-MM-DD).`)

  const words = content.trim().split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: String(data.title),
    date: normalizeDate(data.date, file),
    summary: data.summary ? String(data.summary) : '',
    draft: data.draft === true,
    readingTime: Math.max(1, Math.round(words / 220)),
    content,
  }
}

/** Published posts, newest first. Drafts are included only under `next dev`. */
export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const showDrafts = process.env.NODE_ENV === 'development'
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(readPost)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export function formatShortDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatLongDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
