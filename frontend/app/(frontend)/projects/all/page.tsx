import Link from 'next/link';
import { Navigation } from '@/components/layout';
import { getProjects } from '@/lib/payload';
import type { Project } from '@/lib/payload/types';

export const revalidate = 60;

export default async function ProjectsAllPage() {
  let projects: Project[] = [];

  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-[52px] px-6 pb-20 fade-in">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <h1 className="font-sans text-[36px] font-medium text-[var(--text-primary)]">
              Projects
            </h1>
            <Link
              href="/"
              className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              Back
            </Link>
          </div>

          {projects && projects.length > 0 ? (
            <div>
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="py-[18px] border-b border-[var(--border)] last:border-b-0 hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <h2 className="text-[15px] font-medium text-[var(--text-primary)]">
                        {project.title}
                      </h2>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono text-[var(--text-tertiary)] border border-[var(--border)] px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] mb-1">
                    {project.subtitle}
                  </p>
                  {project.description && (
                    <p className="text-[14px] text-[var(--text-body)] leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--text-secondary)]">No projects yet.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
