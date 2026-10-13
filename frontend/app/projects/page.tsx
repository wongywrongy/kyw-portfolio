import type { Metadata } from 'next'
import { projects } from '@/content/projects'
import { GITHUB_LOGIN } from '@/lib/github'
import { Card } from '@/components/card'
import { ListPage } from '@/components/list-page'

export const metadata: Metadata = { title: 'Projects', description: 'Things Kyle has built.' }

export default function ProjectsPage() {
  return (
    <ListPage title="Projects" subtitle={`${projects.length} so far. More on GitHub at @${GITHUB_LOGIN}.`}>
      <ul className="cards-flow">
        {projects.map((p) => (
          <li key={p.name}>
            <Card title={p.name} description={p.description} meta={p.stack?.join(' · ')} image={p.image} href={p.href} />
          </li>
        ))}
      </ul>
    </ListPage>
  )
}
