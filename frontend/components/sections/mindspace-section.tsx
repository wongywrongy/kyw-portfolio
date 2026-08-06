import Link from 'next/link';
import { truncateWords, calculateReadTime } from '@/lib/utils/text';
import type { BlogPost } from '@/lib/payload/types';

interface MindspaceSectionProps {
  posts?: BlogPost[];
}

export function MindspaceSection({ posts = [] }: MindspaceSectionProps) {
  if (posts.length === 0) {
    return (
      <section id="mindspace" className="py-12 px-6">
        <div className="max-w-[var(--w-text)] mx-auto">
          <div className="flex items-baseline justify-between pb-3.5">
            <h2 className="font-[family-name:var(--font-display)] text-[21px] font-medium text-[var(--text-primary)]">
              Mindspace
            </h2>
            <Link
              href="/mindspace/all"
              className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              View All
            </Link>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)]">No posts yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="mindspace" className="py-12 px-6">
      <div className="max-w-[var(--w-text)] mx-auto">
        <div className="flex items-baseline justify-between pb-3.5">
          <h2 className="font-[family-name:var(--font-display)] text-[21px] font-medium text-[var(--text-primary)]">
            Mindspace
          </h2>
          <Link
            href="/mindspace/all"
            className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        <div>
          {posts.map((post) => {
            const readTime = calculateReadTime(post.wordCount || 0);
            const truncatedExcerpt = truncateWords(post.excerpt, 30);
            const hasSlug = post.slug;

            const content = (
              <article className="py-[18px] border-b border-[var(--border)] last:border-b-0 pl-0 group-hover:pl-2 transition-all duration-[250ms] ease-out">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                  <h3 className="text-[16px] font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                    {post.title}
                  </h3>
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
            );

            if (hasSlug) {
              return (
                <Link
                  key={post._id}
                  href={`/mindspace/${post.slug}`}
                  className="block group"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={post._id} className="block group">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
