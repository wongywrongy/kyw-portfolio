import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { getBlogPosts, urlFor } from '@/lib/sanity';
import { truncateWords, calculateReadTime } from '@/lib/utils/text';

export const revalidate = 60;

interface BlogPost {
  _id: string;
  title: string;
  slug?: { current: string };
  date: string;
  excerpt: string;
  category?: string;
  wordCount?: number;
  featuredImage?: any;
}

export default async function MindspaceAllPage() {
  const posts: BlogPost[] = await getBlogPosts();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Mindspace
            </h1>
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => {
                const readTime = calculateReadTime(post.wordCount || 0);
                const truncatedExcerpt = truncateWords(post.excerpt, 30);

                return (
                  <Link
                    key={post._id}
                    href={`/mindspace/${post.slug?.current || post._id}`}
                    className="block group"
                  >
                    <article className="pb-8 border-b border-border">
                      {post.featuredImage && (
                        <div className="mb-4 overflow-hidden">
                          <Image
                            src={urlFor(post.featuredImage).width(800).height(400).url()}
                            alt={post.featuredImage.alt || post.title}
                            width={800}
                            height={400}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                        <h2 className="text-xl font-medium group-hover:text-muted-foreground transition-colors">
                          {post.title}
                        </h2>
                        <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                          {post.date}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        {post.category && (
                          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border px-2 py-1 w-fit">
                            {post.category}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {readTime}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {truncatedExcerpt}
                      </p>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No posts yet. Add some in Sanity Studio.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
