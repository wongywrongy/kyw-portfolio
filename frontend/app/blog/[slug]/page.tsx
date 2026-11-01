import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts, formatLongDate } from '@/lib/posts'
import { Mdx } from '@/components/mdx'
import { Backdrop } from '@/components/backdrop'

export const dynamicParams = false

// `output: 'export'` rejects an empty list, so with no published posts we emit
// one placeholder slug. It resolves to no post and renders the 404 page.
const PLACEHOLDER_SLUG = '_none'

export function generateStaticParams() {
  const posts = getPosts()
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER_SLUG }]
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const url = `/blog/${post.slug}`
  return {
    title: post.title,
    description: post.summary || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
      url,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="page">
      <Backdrop />
      <article className="reading">
        <Link href="/" className="link text-[13px] text-text-2">
          ← Back
        </Link>
        <header className="fade-up mt-10" style={{ '--i': 0 } as React.CSSProperties}>
          <h1 className="post-h1">{post.title}</h1>
          <p className="meta mt-4">
            {formatLongDate(post.date)} · {post.readingTime} min read
          </p>
        </header>
        {post.cover && (
          // eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized anyway
          <img
            src={post.cover}
            alt=""
            className="post-cover fade-up mt-10"
            style={{ '--i': 1 } as React.CSSProperties}
          />
        )}
        <div className="fade-up prose-post mt-10" style={{ '--i': 1 } as React.CSSProperties}>
          <Mdx source={post.content} format={post.format} />
        </div>
        <footer className="mt-16 border-t border-card-border pt-6">
          <Link href="/" className="link text-[13px] text-text-2">
            ← Back
          </Link>
        </footer>
      </article>
    </div>
  )
}
