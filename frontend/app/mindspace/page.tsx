import type { Metadata } from 'next'
import { getPosts, formatShortDate } from '@/lib/posts'
import { Card } from '@/components/card'
import { ListPage } from '@/components/list-page'

export const metadata: Metadata = { title: 'Mindspace', description: 'Notes on what Kyle is building and learning.' }

export default function MindspacePage() {
  const posts = getPosts()
  return (
    <ListPage title="Mindspace" subtitle="Notes on what I'm building and learning.">
      {posts.length === 0 ? (
        <p className="meta" style={{ marginTop: 16 }}>
          Nothing published yet.
        </p>
      ) : (
        <ul className="cards-flow">
          {posts.map((post) => (
            <li key={post.slug}>
              <Card
                title={post.title}
                description={post.summary}
                meta={`${formatShortDate(post.date)} · ${post.readingTime} min`}
                image={post.cover}
                href={`/mindspace/${post.slug}`}
              />
            </li>
          ))}
        </ul>
      )}
    </ListPage>
  )
}
