interface WorkExperienceItem {
  _id?: string;
  period: string;
  company: string;
  role: string;
  description?: string;
}

interface WorkSectionProps {
  experiences?: WorkExperienceItem[];
}

export function WorkSection({ experiences }: WorkSectionProps) {
  const defaultExperiences: WorkExperienceItem[] = [
    {
      period: 'Jan 2024 - Present',
      company: 'Design Studio',
      role: 'Senior Designer',
      description: 'Leading design systems and product strategy',
    },
    {
      period: 'June 2023 - Dec 2023',
      company: 'Tech Startup',
      role: 'Full Stack Developer',
      description: 'Built and shipped customer-facing features',
    },
    {
      period: 'Jan 2023 - May 2023',
      company: 'Agency',
      role: 'UI/UX Designer',
      description: 'Designed interfaces for B2B SaaS products',
    },
  ];

  const items = experiences && experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section
      id="work"
      className="min-h-screen py-12 px-6 border-t border-border flex items-start pt-24"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Work Experience
          </h2>
          <a
            href="/resume.pdf"
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="space-y-6">
          {items.map((item, idx) => (
            <div
              key={item._id || idx}
              className="pb-6 border-b border-border last:border-b-0"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                <h3 className="text-lg font-medium">{item.company}</h3>
                <span className="text-sm font-mono text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{item.role}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
