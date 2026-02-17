import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/layout';
import { getBlogPosts, getBlogPost } from '@/lib/payload';
import type { BlogPost } from '@/lib/payload/types';
import { RichText } from '@/components/blog';
import { calculateReadTime } from '@/lib/utils/text';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts: BlogPost[] = await getBlogPosts();
    return posts
      .filter((post) => post.slug)
      .map((post) => ({
        slug: post.slug,
      }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const readTime = calculateReadTime(post.wordCount || 0);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-[52px] px-6 pb-20 fade-in">
        <article className="max-w-[720px] mx-auto">
          <Link
            href="/mindspace/all"
            className="text-[11px] font-sans uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 inline-block mb-8"
          >
            All Posts
          </Link>

          <header className="mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-[36px] md:text-[48px] font-medium tracking-tight mb-4 text-[var(--text-primary)]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[11px] font-mono text-[var(--text-tertiary)]">{post.date}</span>
              {post.category && (
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)] border border-[var(--border)] px-2 py-0.5">
                  {post.category}
                </span>
              )}
              <span className="text-[12px] text-[var(--text-secondary)]">{readTime}</span>
            </div>
          </header>

          {post.featuredImage && (
            <div className="mb-8">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                width={post.featuredImage.width || 1200}
                height={post.featuredImage.height || 600}
                className="w-full h-auto"
                priority={false}
              />
              {post.featuredImage.alt && (
                <p className="text-[11px] text-[var(--text-tertiary)] mt-2 text-center">
                  {post.featuredImage.alt}
                </p>
              )}
            </div>
          )}

          {post.content && (
            <div className="max-w-none">
              <RichText content={post.content as SerializedEditorState} />
            </div>
          )}

          <footer className="mt-16 pt-8 border-t border-[var(--border)]">
            <Link
              href="/mindspace/all"
              className="text-[12px] font-sans uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              Back to all posts
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
