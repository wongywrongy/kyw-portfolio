import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts, formatLongDate } from '@/lib/posts'
import { Mdx } from '@/components/mdx'

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
  const url = `/mindspace/${post.slug}`
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
    <article>
      <Link href="/" className="link text-[13px] text-secondary">
        ← Back
      </Link>
      <header className="fade-up mt-10" style={{ '--i': 0 } as React.CSSProperties}>
        <h1 className="text-2xl font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[28px]">
          {post.title}
        </h1>
        <p className="meta mt-3">
          {formatLongDate(post.date)} · {post.readingTime} min read
        </p>
      </header>
      <div className="fade-up prose-post mt-10" style={{ '--i': 1 } as React.CSSProperties}>
        <Mdx source={post.content} />
      </div>
      <footer className="mt-16 border-t border-line pt-6">
        <Link href="/" className="link text-[13px] text-secondary">
          ← Back
        </Link>
      </footer>
    </article>
  )
}
