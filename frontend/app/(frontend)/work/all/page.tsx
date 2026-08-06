import Link from 'next/link';
import { Navigation } from '@/components/layout';
import { getWorkExperiences, getSiteSettings } from '@/lib/payload';
import type { WorkExperience } from '@/lib/payload/types';

export const revalidate = 60;

export default async function WorkAllPage() {
  let experiences: WorkExperience[] = [];
  let resumeUrl = '';

  try {
    const [experiencesData, siteSettings] = await Promise.all([
      getWorkExperiences(),
      getSiteSettings(),
    ]);
    experiences = experiencesData;
    resumeUrl = siteSettings.resumeUrl || '';
  } catch (error) {
    console.error('Failed to fetch work experiences:', error);
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-14 px-6 pb-20 fade-in">
        <div className="max-w-[var(--w-wide)] mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <h1 className="font-sans text-[36px] font-medium text-[var(--text-primary)]">
              Work Experience
            </h1>
            <div className="flex items-baseline gap-4">
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
              <Link
                href="/"
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                Back
              </Link>
            </div>
          </div>

          {experiences && experiences.length > 0 ? (
            <div>
              {experiences.map((item) => (
                <article
                  key={item._id}
                  className="py-[18px] border-b border-[var(--border)] last:border-b-0 hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                    <h2 className="text-[15px] font-medium text-[var(--text-primary)]">
                      {item.company}
                    </h2>
                    <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] mb-1">{item.role}</p>
                  {item.description && (
                    <p className="text-[14px] text-[var(--text-body)] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--text-secondary)]">No work experience yet.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
