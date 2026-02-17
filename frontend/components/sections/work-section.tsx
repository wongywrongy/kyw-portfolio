import type { WorkExperience } from '@/lib/payload/types';

interface WorkSectionProps {
  experiences?: WorkExperience[];
  resumeUrl?: string;
}

export function WorkSection({ experiences = [], resumeUrl }: WorkSectionProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between pb-3.5 mb-0">
        <h2 className="font-sans text-[21px] font-medium text-[var(--text-primary)]">
          Work Experience
        </h2>
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            Resume
          </a>
        )}
      </div>

      {experiences.length === 0 ? (
        <p className="text-[14px] text-[var(--text-secondary)] py-4">No work experience added yet.</p>
      ) : (
        <div>
          {experiences.map((item) => (
            <div
              key={item._id}
              className="py-[18px] border-b border-[var(--border)] last:border-b-0 hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                <h3 className="text-[15px] font-medium text-[var(--text-primary)]">{item.company}</h3>
                <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                  {item.period}
                </span>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-1">{item.role}</p>
              {item.description && (
                <p className="text-[14px] text-[var(--text-body)]">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
