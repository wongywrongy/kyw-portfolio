import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { validateImage } from '@/lib/href'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export type PostMeta = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  summary: string
  cover: string // optional image path, '' for none
  image: string // cover, else the first image in the body, else ''
  draft: boolean
  readingTime: number // minutes
  format: 'md' | 'mdx' // .md is plain Markdown, .mdx allows components
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

/** First image in a post body: Markdown ![alt](src) or an HTML <img src>. */
function firstImage(content: string): string {
  const md = content.match(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/)
  const html = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  const hits = [md, html].filter((m): m is RegExpMatchArray => m !== null)
  if (hits.length === 0) return ''
  hits.sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
  return hits[0][1]
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
  const { data, content } = matter(raw)
  if (!data.title) throw new Error(`Post "${file}" is missing a title in its frontmatter.`)
  if (!data.date) throw new Error(`Post "${file}" is missing a date in its frontmatter (YYYY-MM-DD).`)

  const cover = data.cover ? String(data.cover) : ''
  validateImage(`post "${file}"`, 'cover', cover)

  const words = content.trim().split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.mdx?$/, ''),
    title: String(data.title),
    date: normalizeDate(data.date, file),
    summary: data.summary ? String(data.summary) : '',
    cover,
    image: cover || firstImage(content),
    draft: data.draft === true,
    readingTime: Math.max(1, Math.round(words / 220)),
    format: file.endsWith('.mdx') ? 'mdx' : 'md',
    content,
  }
}

/** Published posts, newest first. Drafts are included only under `next dev`. */
export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const showDrafts = process.env.NODE_ENV === 'development'
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
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
