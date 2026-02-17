import Link from 'next/link';
import { Navigation } from '@/components/layout';
import { getBlogPosts } from '@/lib/payload';
import type { BlogPost } from '@/lib/payload/types';
import { truncateWords, calculateReadTime } from '@/lib/utils/text';

export const revalidate = 60;

export default async function MindspaceAllPage() {
  let posts: BlogPost[] = [];

  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-[52px] px-6 pb-20 fade-in">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <h1 className="font-sans text-[36px] font-medium text-[var(--text-primary)]">
              Mindspace
            </h1>
            <Link
              href="/"
              className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              Back
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div>
              {posts.map((post) => {
                const readTime = calculateReadTime(post.wordCount || 0);
                const truncatedExcerpt = truncateWords(post.excerpt, 30);

                return (
                  <Link
                    key={post._id}
                    href={`/mindspace/${post.slug || post._id}`}
                    className="block group"
                  >
                    <article className="py-[22px] border-b border-[var(--border)] pl-0 group-hover:pl-2 transition-all duration-[250ms] ease-out">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                        <h2 className="text-[16px] font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                          {post.title}
                        </h2>
                        <span className="text-[11px] font-mono text-[var(--text-tertiary)] whitespace-nowrap">
                          {post.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        {post.category && (
                          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)] border border-[var(--border)] px-2 py-0.5">
                            {post.category}
                          </span>
                        )}
                        <span className="text-[12px] text-[var(--text-secondary)]">
                          {readTime}
                        </span>
                      </div>

                      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                        {truncatedExcerpt}
                      </p>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--text-secondary)]">No posts yet.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
