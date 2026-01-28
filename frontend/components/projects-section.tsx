interface Project {
  _id?: string;
  title: string;
  subtitle: string;
  description?: string;
  link?: string;
  tags?: string[];
}

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const defaultProjects: Project[] = [
    {
      title: 'Project One',
      subtitle: 'Web Application',
      description: 'Full-stack application built with Next.js and TypeScript',
      tags: ['Next.js', 'React', 'Design'],
    },
    {
      title: 'Project Two',
      subtitle: 'Design System',
      description: 'Comprehensive component library and design tokens',
      tags: ['UI/UX', 'Components', 'Systems'],
    },
    {
      title: 'Project Three',
      subtitle: 'Mobile App',
      description: 'Cross-platform mobile application',
      tags: ['React Native', 'Product', 'Design'],
    },
    {
      title: 'Project Four',
      subtitle: 'Platform',
      description: 'B2B SaaS platform with complex workflows',
      tags: ['SaaS', 'Product', 'Engineering'],
    },
    {
      title: 'Project Five',
      subtitle: 'Experimental',
      description: 'Creative exploration in interactive media',
      tags: ['Creative', 'Web', 'Experimental'],
    },
    {
      title: 'Project Six',
      subtitle: 'Open Source',
      description: 'Utility library for modern web development',
      tags: ['Open Source', 'Developer Tools', 'Library'],
    },
  ];

  const items = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <section
      id="projects"
      className="min-h-screen py-12 px-6 border-t border-border lg:border-l flex items-start pt-24"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Projects
          </h2>
          <a
            href="/projects/all"
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
          </a>
        </div>

        <div className="space-y-6">
          {items.map((project, idx) => (
            <div key={project._id || idx} className="pb-6 border-b border-border last:border-b-0">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium hover:text-muted-foreground transition-colors cursor-pointer"
                  >
                    {project.title}
                  </a>
                ) : (
                  <h3 className="text-lg font-medium">
                    {project.title}
                  </h3>
                )}
                {project.tags && project.tags.length > 0 && (
                  <span className="text-sm font-mono text-muted-foreground">
                    {project.tags[0]}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {project.subtitle}
              </p>
              {project.description && (
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
