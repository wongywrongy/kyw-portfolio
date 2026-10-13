import { site } from '@/content/site'
import { experience } from '@/content/experience'
import { projects } from '@/content/projects'
import { getPosts, formatShortDate } from '@/lib/posts'
import { GITHUB_LOGIN } from '@/lib/github'
import { Card } from '@/components/card'
import { PagedTile } from '@/components/paged-tile'
import { Thread, ThreadLegend } from '@/components/thread'
import { ActivityTile } from '@/components/activity'
import { GitHubMark, LinkedInMark, MailMark, FileMark } from '@/components/icons'

const HOME_ENTRIES = 5

export default function Home() {
  const posts = getPosts()
  type SiteLink = { label: string; href: string; icon: React.ReactElement }
  const candidates: (SiteLink | null)[] = [
    site.links.github ? { label: 'GitHub', href: site.links.github, icon: <GitHubMark /> } : null,
    site.links.linkedin ? { label: 'LinkedIn', href: site.links.linkedin, icon: <LinkedInMark /> } : null,
    site.links.email ? { label: 'Email', href: `mailto:${site.links.email}`, icon: <MailMark /> } : null,
    site.links.resume ? { label: 'Resume', href: site.links.resume, icon: <FileMark /> } : null,
  ]
  const links = candidates.filter((l): l is SiteLink => l !== null)

  const projectCards = [
    ...projects.map((p) => (
      <Card key={p.name} title={p.name} meta={p.stack?.join(' · ')} image={p.image} href={p.href} />
    )),
    <a key="gh" href={`https://github.com/${GITHUB_LOGIN}`} target="_blank" rel="noopener noreferrer" className="sc sc-center">
      <p className="sn">More on GitHub</p>
      <p className="ss">@{GITHUB_LOGIN}</p>
    </a>,
  ]

  const postCards = posts.map((post) => (
    <Card
      key={post.slug}
      title={post.title}
      meta={`${formatShortDate(post.date)} · ${post.readingTime} min`}
      image={post.cover}
      href={`/mindspace/${post.slug}`}
    />
  ))

  return (
    <div className="page page-home">
      <div className="frame">
        <div className="bento">
          <div className="bento-l">
            <section className="tile hero fade-up" style={{ '--i': 0 } as React.CSSProperties} aria-label="About">
              <h1>{site.name}</h1>
              <p className="role">{site.role}</p>
              <div className="bio">
                {site.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {links.length > 0 && (
                <nav aria-label="Links">
                  {links.map((l, i) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className={i === 0 ? 'pill pill-primary' : 'pill pill-glass'}
                      {...(l.href.startsWith('mailto:') || l.href.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {l.icon}
                      {l.label}
                    </a>
                  ))}
                </nav>
              )}
            </section>

            <section className="tile fade-up" style={{ '--i': 1 } as React.CSSProperties} aria-label="Experience">
              <div className="hd">
                <h2 className="h2">Experience</h2>
                <div className="ctrls">
                  <ThreadLegend />
                  {experience.length > HOME_ENTRIES && (
                    <a href="/experience" className="seeall">
                      See all
                    </a>
                  )}
                </div>
              </div>
              <Thread entries={experience.slice(0, HOME_ENTRIES)} />
            </section>

            <ActivityTile index={2} />
          </div>

          <div className="bento-r">
            <PagedTile title="Projects" seeAll="/projects" items={projectCards} prevLabel="Previous projects" nextLabel="Next projects" index={1} />
            {posts.length > 0 ? (
              <PagedTile title="Mindspace" seeAll="/mindspace" items={postCards} prevLabel="Newer posts" nextLabel="Older posts" index={2} />
            ) : (
              <section className="tile fade-up" style={{ '--i': 2 } as React.CSSProperties} aria-label="Mindspace">
                <div className="hd">
                  <h2 className="h2">Mindspace</h2>
                </div>
                <p className="meta" style={{ marginTop: 12 }}>
                  Nothing published yet.
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
