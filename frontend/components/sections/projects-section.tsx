import Link from 'next/link';
import type { Project } from '@/lib/payload/types';

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  return (
    <section>
      <div className="flex items-baseline justify-between pb-3.5 mb-0">
        <h2 className="font-sans text-[21px] font-medium text-[var(--text-primary)]">
          Projects
        </h2>
        <Link
          href="/projects/all"
          className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          View All
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-[14px] text-[var(--text-secondary)] py-4">No projects added yet.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div
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
                  <h3 className="text-[15px] font-medium text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                )}
                {project.tags && project.tags.length > 0 && (
                  <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                    {project.tags[0]}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-1">
                {project.subtitle}
              </p>
              {project.description && (
                <p className="text-[14px] text-[var(--text-body)]">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
