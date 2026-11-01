import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts, formatShortDate } from '@/lib/posts'
import { PostArt } from '@/components/post-art'
import { Backdrop } from '@/components/backdrop'

export const metadata: Metadata = {
  title: 'Blog',
  alternates: { canonical: '/blog' },
}

/** Every published post. The homepage rail shows the newest five and links here. */
export default function BlogIndex() {
  const posts = getPosts()

  return (
    <div className="page">
      <Backdrop />
      <div className="reading">
        <Link href="/" className="link text-[13px] text-text-2">
          ← Back
        </Link>
        <h1 className="post-h1 fade-up mt-10">Blog</h1>
        <ul className="posts fade-up mt-8" style={{ '--i': 1 } as React.CSSProperties}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="post post-row">
                <PostArt
                  slug={post.slug}
                  cover={post.image}
                  cols={5}
                  rows={5}
                  count={6}
                  className="art-thumb"
                />
                <span className="post-text">
                  <span className="card-meta">{formatShortDate(post.date)}</span>
                  <span className="post-title">{post.title}</span>
                  {post.summary && <span className="post-summary">{post.summary}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {posts.length === 0 && <p className="mt-8 text-text-2">No posts yet.</p>}
      </div>
    </div>
  )
}
