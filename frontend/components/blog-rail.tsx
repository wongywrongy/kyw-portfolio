import Link from 'next/link'
import { formatShortDate, type Post } from '@/lib/posts'
import { PostArt } from '@/components/post-art'

const SHOWN = 5

/**
 * The homepage blog list. Wide screens float it in the right margin beside
 * the main column; narrower ones stack it under Projects (see .rail in
 * globals.css). Its heading mirrors the main column's: rule, title, square.
 */
export function BlogRail({ posts, index }: { posts: Post[]; index: number }) {
  if (posts.length === 0) return null
  const [latest, ...rest] = posts
  const older = rest.slice(0, SHOWN - 1)

  return (
    <aside aria-label="Blog" className="rail fade-up" style={{ '--i': index } as React.CSSProperties}>
      <div className="section-head">
        <span className="section-rule section-rule-r" />
        <h2>Blog</h2>
        <span className="section-mark" style={{ background: 'var(--accent)' }} />
      </div>

      <ul className="posts">
        <li>
          <Link href={`/blog/${latest.slug}`} className="post post-latest">
            <PostArt slug={latest.slug} cover={latest.image} cols={25} rows={12} count={34} className="art-cover" />
            <span className="card-meta">
              {formatShortDate(latest.date)} · {latest.readingTime} min read
            </span>
            <span className="post-title">{latest.title}</span>
            {latest.summary && <span className="post-summary">{latest.summary}</span>}
          </Link>
        </li>
        {older.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="post post-row">
              <PostArt slug={post.slug} cover={post.image} cols={5} rows={5} count={6} className="art-thumb" />
              <span className="post-text">
                <span className="card-meta">{formatShortDate(post.date)}</span>
                <span className="post-title">{post.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {posts.length > SHOWN && (
        <Link href="/blog" className="link rail-more">
          All posts →
        </Link>
      )}
    </aside>
  )
}
