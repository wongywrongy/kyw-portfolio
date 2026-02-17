import type { Hero } from '@/lib/payload/types';

interface HeroSectionProps {
  data?: Hero | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  const name = data?.name || 'Your Name';
  const greeting = data?.greeting || "Hey, I'm";
  const tagline = data?.tagline || 'Designer & developer creating thoughtful digital experiences.';
  const email = data?.email || 'hello@example.com';
  const linkedin = data?.linkedin;
  const github = data?.github;

  return (
    <section id="home" className="pt-14 pb-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <p
            className="font-[family-name:var(--font-display)] font-light text-[32px] md:text-[48px] leading-tight text-[var(--text-secondary)]"
          >
            {greeting}
          </p>
          <h1
            className="font-[family-name:var(--font-display)] italic font-semibold text-[56px] md:text-[88px] leading-[1.0] tracking-[0.01em] text-white dark:text-white text-[var(--text-primary)]"
            style={{ transform: 'skewX(-1.5deg)', transformOrigin: 'left bottom' }}
          >
            {name}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <p className="font-sans text-[15px] text-[var(--text-secondary)] max-w-md">
            {tagline}
          </p>

          <div className="flex gap-6">
            <a
              href={`mailto:${email}`}
              className="text-[12px] font-sans uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              Email
            </a>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-sans uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                LinkedIn
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-sans uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
