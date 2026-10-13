import type { Entry } from '@/content/experience'
import { range } from '@/lib/dates'

/** The experience thread: entries newest-first on one vertical line. */
export function Thread({ entries, full }: { entries: Entry[]; full?: boolean }) {
  return (
    <ol className={full ? 'thread thread-full' : 'thread'}>
      {entries.map((e) => {
        const inner = (
          <>
            <span className="pin" aria-hidden="true" />
            <div className="row">
              <div className="who">
                <b>{e.org}</b>
                <span className="role">{e.role}</span>
              </div>
              <span className="meta">{range(e.start, e.end)}</span>
            </div>
            {e.description && <span className="what">{e.description}</span>}
          </>
        )
        const cls = `sc ent ent-${e.kind}`
        return (
          <li key={`${e.org}-${e.start}`}>
            {e.href ? (
              <a href={e.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export function ThreadLegend() {
  return (
    <div className="legend" aria-hidden="true">
      <span className="ent-work">
        <i />
        Work
      </span>
      <span className="ent-education">
        <i />
        Education
      </span>
    </div>
  )
}
