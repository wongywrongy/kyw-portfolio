import Link from 'next/link'
import { formatShortDate, type Post } from '@/lib/posts'
import { PostArt } from '@/components/post-art'

const RAIL_SHOWN = 5
const STRIP_SHOWN = 6

/** One post as a card: same-size image, date, title, optional summary. */
export function PostCard({ post, summary }: { post: Post; summary: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <PostArt slug={post.slug} cover={post.image} cols={25} rows={14} count={30} className="art-card" />
      <span className="card-meta">
        {formatShortDate(post.date)} · {post.readingTime} min read
      </span>
      <span className="post-title">{post.title}</span>
      {summary && post.summary && <span className="post-summary">{post.summary}</span>}
    </Link>
  )
}

/**
 * Desktop (1360px and up): the blog floats in the right margin beside the
 * main column, every post as the same card. Its heading mirrors the main
 * column's: rule, title, square. Hidden below 1360px, where BlogStrip shows.
 */
export function BlogRail({ posts, index }: { posts: Post[]; index: number }) {
  if (posts.length === 0) return null
  const shown = posts.slice(0, RAIL_SHOWN)

  return (
    <aside aria-label="Blog" className="rail fade-up" style={{ '--i': index } as React.CSSProperties}>
      <div className="section-head">
        <span className="section-rule section-rule-r" />
        <h2>Blog</h2>
        <span className="section-mark" style={{ background: 'var(--accent)' }} />
      </div>
      <ul className="rail-posts">
        {shown.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} summary />
          </li>
        ))}
      </ul>
      {posts.length > RAIL_SHOWN && (
        <Link href="/blog" className="link rail-more">
          All posts →
        </Link>
      )}
    </aside>
  )
}

/**
 * Phones and tablets (below 1360px): a row of post cards right under the
 * links that scrolls sideways, so the blog is on the first screen instead of
 * after Projects. The next card peeks in to show there is more.
 */
export function BlogStrip({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  return (
    <section aria-label="Blog" className="blog-strip">
      <div className="section-head strip-head">
        <span className="section-mark" style={{ background: 'var(--accent)' }} />
        <h2>Blog</h2>
        <span className="section-rule" />
        <Link href="/blog" className="strip-all">
          All posts →
        </Link>
      </div>
      <ul className="strip">
        {posts.slice(0, STRIP_SHOWN).map((post) => (
          <li key={post.slug}>
            <PostCard post={post} summary={false} />
          </li>
        ))}
      </ul>
    </section>
  )
}
