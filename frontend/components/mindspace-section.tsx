import Link from 'next/link';
import { truncateWords, calculateReadTime } from '@/lib/utils/text';
import type { BlogPost } from '@/lib/sanity/types';

interface MindspaceSectionProps {
  posts?: BlogPost[];
}

export function MindspaceSection({ posts = [] }: MindspaceSectionProps) {
  if (posts.length === 0) {
    return (
      <section
        id="mindspace"
        className="min-h-screen py-12 px-6 border-t border-border flex items-center pt-24"
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Mindspace
            </h2>
            <Link
              href="/mindspace/all"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
            </Link>
          </div>
          <p className="text-muted-foreground">No posts yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="mindspace"
      className="min-h-screen py-12 px-6 border-t border-border flex items-center pt-24"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Mindspace
          </h2>
          <Link
            href="/mindspace/all"
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="space-y-6">
          {posts.map((post) => {
            const readTime = calculateReadTime(post.wordCount || 0);
            const truncatedExcerpt = truncateWords(post.excerpt, 30);
            const hasSlug = post.slug?.current;

            const content = (
              <article>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                    {post.date}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
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
            );

            if (hasSlug) {
              return (
                <Link
                  key={post._id}
                  href={`/mindspace/${post.slug!.current}`}
                  className="block pb-6 border-b border-border last:border-b-0 group"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={post._id}
                className="block pb-6 border-b border-border last:border-b-0 group"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
