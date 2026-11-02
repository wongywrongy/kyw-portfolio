import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { PostCard } from '@/components/blog-rail'
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
      <div className="reading reading-wide">
        <Link href="/" className="link text-[13px] text-text-2">
          ← Back
        </Link>
        <h1 className="post-h1 fade-up mt-10">Blog</h1>
        {posts.length > 0 ? (
          <ul className="post-grid fade-up mt-10" style={{ '--i': 1 } as React.CSSProperties}>
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} summary />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-text-2">No posts yet.</p>
        )}
      </div>
    </div>
  )
}
