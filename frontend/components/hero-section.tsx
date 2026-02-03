import type { Hero } from '@/lib/sanity/types';

interface HeroSectionProps {
  data?: Hero | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  // Provide sensible fallbacks for the hero section since it's the first thing visitors see
  const name = data?.name || 'Your Name';
  const title = data?.title || "Hey, I'm";
  const bio = data?.bio || 'Designer & developer creating thoughtful digital experiences.';
  const email = data?.email || 'hello@example.com';
  const linkedin = data?.linkedin;
  const github = data?.github;

  return (
    <section
      id="home"
      className="h-screen pt-16 pb-32 px-6 flex flex-col justify-center"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight">
          {title}
          <br />
          <span className="font-medium">{name}</span>
          <span className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed block mt-4 max-w-2xl">
            {bio}
          </span>
        </h1>

        <div id="contact" className="mt-6 flex gap-6">
          <a
            href={`mailto:${email}`}
            className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
