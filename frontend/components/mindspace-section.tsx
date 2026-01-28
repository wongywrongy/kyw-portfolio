import Link from 'next/link';
import { truncateWords, calculateReadTime } from '@/lib/utils/text';

interface BlogPost {
  _id?: string;
  slug?: { current: string };
  date: string;
  title: string;
  excerpt: string;
  wordCount?: number;
  category?: string;
}

interface MindspaceSectionProps {
  posts?: BlogPost[];
}

export function MindspaceSection({ posts }: MindspaceSectionProps) {
  const defaultPosts: BlogPost[] = [
    {
      date: 'Jan 15, 2024',
      title: 'Thoughts on Design Systems',
      excerpt:
        'Exploring how to build scalable, maintainable design systems that grow with your product.',
      wordCount: 1000,
      category: 'Design',
    },
    {
      date: 'Jan 8, 2024',
      title: 'Building Better Developer Experiences',
      excerpt:
        'Best practices for creating tools and libraries that developers actually want to use.',
      wordCount: 1400,
      category: 'Development',
    },
    {
      date: 'Dec 30, 2023',
      title: 'The Intersection of Design and Code',
      excerpt:
        'How closer collaboration between designers and developers leads to better products.',
      wordCount: 1200,
      category: 'Process',
    },
  ];

  const items = posts && posts.length > 0 ? posts : defaultPosts;

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
          {items.map((post, idx) => {
            const href = post.slug?.current
              ? `/mindspace/${post.slug.current}`
              : '#';
            const PostWrapper = post.slug?.current ? Link : 'div';
            const readTime = calculateReadTime(post.wordCount || 0);
            const truncatedExcerpt = truncateWords(post.excerpt, 30);

            return (
              <PostWrapper
                key={post._id || idx}
                href={href}
                className="block pb-6 border-b border-border last:border-b-0 group"
              >
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
              </PostWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
