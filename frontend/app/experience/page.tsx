import type { Metadata } from 'next'
import { experience } from '@/content/experience'
import { Thread, ThreadLegend } from '@/components/thread'
import { ListPage } from '@/components/list-page'

export const metadata: Metadata = { title: 'Experience', description: 'Where Kyle has worked and studied.' }

export default function ExperiencePage() {
  return (
    <ListPage title="Experience" wide={false}>
      <div style={{ marginTop: 14 }}>
        <ThreadLegend />
      </div>
      <Thread entries={experience} full />
    </ListPage>
  )
}
