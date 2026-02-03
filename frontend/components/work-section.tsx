import type { WorkExperience } from '@/lib/sanity/types';

interface WorkSectionProps {
  experiences?: WorkExperience[];
  resumeUrl?: string;
}

export function WorkSection({ experiences = [], resumeUrl }: WorkSectionProps) {
  if (experiences.length === 0) {
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
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume
              </a>
            )}
          </div>
          <p className="text-muted-foreground">No work experience added yet.</p>
        </div>
      </section>
    );
  }

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
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume
            </a>
          )}
        </div>

        <div className="space-y-6">
          {experiences.map((item) => (
            <div
              key={item._id}
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
