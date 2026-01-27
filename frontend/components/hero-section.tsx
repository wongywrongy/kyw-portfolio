interface HeroData {
  greeting?: string;
  name?: string;
  tagline?: string;
  email?: string;
  linkedin?: string;
  github?: string;
}

interface HeroSectionProps {
  data?: HeroData | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  const greeting = data?.greeting || "Hey, I'm";
  const name = data?.name || 'Your Name';
  const tagline = data?.tagline || 'Designer & developer creating thoughtful digital experiences. I focus on building clean, intentional interfaces that solve real problems.';
  const email = data?.email || 'hello@example.com';
  const linkedin = data?.linkedin || 'https://linkedin.com';
  const github = data?.github || 'https://github.com';

  return (
    <section
      id="home"
      className="h-screen pt-16 pb-32 px-6 flex flex-col justify-center"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight">
          {greeting}
          <br />
          <span className="font-medium">{name}</span>
          <span className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed block mt-4 max-w-2xl">
            {tagline}
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
