import { site } from '@/content/site'
import { work } from '@/content/work'
import { projects } from '@/content/projects'
import { getPosts } from '@/lib/posts'
import { FlickerBand } from '@/components/flicker-band'
import { ActivityCard } from '@/components/activity'
import { Section } from '@/components/section'
import { BlogRail } from '@/components/blog-rail'

export default function Home() {
  const posts = getPosts()
  const links = [
    site.links.email && { label: 'Email', href: `mailto:${site.links.email}` },
    site.links.github && { label: 'GitHub', href: site.links.github },
    site.links.linkedin && { label: 'LinkedIn', href: site.links.linkedin },
    site.links.resume && { label: 'Resume', href: site.links.resume },
  ].filter((l): l is { label: string; href: string } => Boolean(l))

  return (
    <div className="page">
      {/* Dots come first so the band paints over them where the two cross-fade. */}
      <div className="dots" aria-hidden="true" />
      <FlickerBand />

      <div className="col">
        <header className="fade-up" style={{ '--i': 0 } as React.CSSProperties}>
          <div className="who">
            {site.avatar && (
              // eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized anyway
              <img src={site.avatar} alt="" width={64} height={64} className="avatar" />
            )}
            <div>
              <h1 className="name">{site.name}</h1>
              <p className="role">{site.role}</p>
            </div>
          </div>
          <div className="bio">
            {site.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {links.length > 0 && (
            <nav aria-label="Links" className="links">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="link"
                  {...(l.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {l.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ))}
            </nav>
          )}

          <ActivityCard />
        </header>

        <Section
          title="Work"
          tone="accent"
          index={1}
          items={work.map((job) => ({
            title: job.company,
            href: job.href,
            meta: job.period,
            sub: [job.role, ...(job.description ? [job.description] : [])],
            logo: job.logo,
          }))}
        />

        <Section
          title="Projects"
          tone="warm"
          index={2}
          items={projects.map((p) => ({
            title: p.name,
            href: p.href,
            meta: p.stack?.join(', '),
            sub: [p.description],
          }))}
        />

        <BlogRail posts={posts} index={3} />

        <footer className="footer fade-up" style={{ '--i': 4 } as React.CSSProperties}>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </footer>
      </div>
    </div>
  )
}
