import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { getProjects } from '@/lib/sanity';

export const revalidate = 60;

interface Project {
  _id: string;
  title: string;
  subtitle: string;
  description?: string;
  link?: string;
  tags?: string[];
}

export default async function ProjectsAllPage() {
  const projects: Project[] = await getProjects();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Projects
            </h1>
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </Link>
          </div>

          {projects && projects.length > 0 ? (
            <div className="space-y-8">
              {projects.map((project) => (
                <article key={project._id} className="pb-8 border-b border-border last:border-b-0">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-medium hover:text-accent transition-colors"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <h2 className="text-xl font-medium">
                        {project.title}
                      </h2>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-mono text-muted-foreground border border-border px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.subtitle}
                  </p>
                  {project.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects yet. Add some in Sanity Studio.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
