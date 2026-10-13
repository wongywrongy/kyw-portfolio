import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts, formatLongDate } from '@/lib/posts'
import { Mdx } from '@/components/mdx'
import { ChevronLeft } from '@/components/icons'

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
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="page">
      <article className="stack">
        <nav className="crumbs fade-up" style={{ '--i': 0 } as React.CSSProperties} aria-label="Breadcrumb">
          <Link href="/mindspace" style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            <ChevronLeft />
            Mindspace
          </Link>
        </nav>
        <section className="tile fade-up" style={{ '--i': 1, padding: '20px 28px 32px' } as React.CSSProperties}>
          {post.cover && (
            <div className="cover" style={{ margin: '-20px -28px 24px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt="" />
            </div>
          )}
          <header style={{ marginTop: post.cover ? 0 : 8 }}>
            <h1 className="page-title">{post.title}</h1>
            <p className="meta" style={{ marginTop: 10, fontSize: 13 }}>
              {formatLongDate(post.date)} · {post.readingTime} min read
            </p>
          </header>
          <div className="prose-post" style={{ marginTop: 28 }}>
            <Mdx source={post.content} />
          </div>
        </section>
      </article>
    </div>
  )
}
