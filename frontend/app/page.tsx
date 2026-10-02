import { site } from '@/content/site'
import { work } from '@/content/work'
import { projects } from '@/content/projects'
import { getPosts, formatShortDate } from '@/lib/posts'
import { Section } from '@/components/section'
import { Row, Arrow } from '@/components/row'

export default function Home() {
  const posts = getPosts()
  const links = [
    site.links.email && { label: 'Email', href: `mailto:${site.links.email}` },
    site.links.github && { label: 'GitHub', href: site.links.github },
    site.links.linkedin && { label: 'LinkedIn', href: site.links.linkedin },
    site.links.resume && { label: 'Resume', href: site.links.resume },
  ].filter((l): l is { label: string; href: string } => Boolean(l))

  return (
    <>
      <header className="fade-up" style={{ '--i': 0 } as React.CSSProperties}>
        <h1 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[34px]">
          {site.name}
        </h1>
        <p className="mt-1 text-[15px] text-secondary">{site.role}</p>
        <div className="mt-6 space-y-4">
          {site.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </header>

      {links.length > 0 && (
        <nav
          aria-label="Links"
          className="fade-up mt-6 flex flex-wrap gap-x-5 gap-y-1"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="link"
              {...(l.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}

      <Section label="Work" index={2}>
        <ul>
          {work.map((job) => (
            <li key={job.company}>
              <Row href={job.href}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <p>
                    <span className="font-medium">{job.company}</span>
                    <span className="text-secondary"> · {job.role}</span>
                    {job.href && <Arrow />}
                  </p>
                  {job.period && (
                    <span className="meta shrink-0 group-hover:text-secondary">
                      {job.period}
                    </span>
                  )}
                </div>
                {job.description && <p className="mt-0.5 text-secondary">{job.description}</p>}
              </Row>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Projects" index={3}>
        <ul>
          {projects.map((p) => (
            <li key={p.name}>
              <Row href={p.href}>
                <p className="font-medium">
                  {p.name}
                  {p.href && <Arrow />}
                </p>
                <p className="text-secondary">{p.description}</p>
                {p.stack && p.stack.length > 0 && (
                  <p className="meta mt-1 group-hover:text-secondary">
                    {p.stack.join(', ')}
                  </p>
                )}
              </Row>
            </li>
          ))}
        </ul>
      </Section>

      {posts.length > 0 && (
        <Section label="Mindspace" index={4}>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Row href={`/mindspace/${post.slug}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span>{post.title}</span>
                    <span className="meta shrink-0 group-hover:text-secondary">
                      {formatShortDate(post.date)}
                    </span>
                  </div>
                </Row>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <footer
        className="fade-up mt-14 border-t border-line pt-6 text-[13px] text-tertiary"
        style={{ '--i': 5 } as React.CSSProperties}
      >
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </>
  )
}
