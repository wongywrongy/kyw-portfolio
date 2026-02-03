import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { getBlogPosts, getBlogPost, urlFor } from '@/lib/sanity';
import type { BlogPost } from '@/lib/sanity/types';
import { PortableText } from '@/components/portable-text';
import { calculateReadTime } from '@/lib/utils/text';

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  try {
    const posts: BlogPost[] = await getBlogPosts();
    return posts
      .filter((post) => post.slug?.current)
      .map((post) => ({
        slug: post.slug!.current,
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
      <main className="min-h-screen pt-20 px-6 pb-20">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/mindspace/all"
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-block mb-8"
          >
            All Posts
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="font-mono">{post.date}</span>
              {post.category && (
                <span className="font-mono uppercase tracking-wider border border-border px-2 py-1">
                  {post.category}
                </span>
              )}
              <span>{readTime}</span>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(600).auto('format').quality(80).url()}
                alt={post.featuredImage.alt || post.title}
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
              {post.featuredImage.alt && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {post.featuredImage.alt}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          {post.content && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <PortableText value={post.content} />
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              href="/mindspace/all"
              className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to all posts
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
