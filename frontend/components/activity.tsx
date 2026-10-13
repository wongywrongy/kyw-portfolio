import { getActivity, GITHUB_LOGIN } from '@/lib/github'

const profile = `https://github.com/${GITHUB_LOGIN}`
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Five evenly spaced month labels for the last 52 weeks, ending this month. */
function monthLabels() {
  const now = new Date()
  const out: string[] = []
  for (let i = 4; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i * 3, 1)
    const label = i === 4 || i === 0 ? `${MONTHS[d.getMonth()]} ${d.getFullYear()}` : MONTHS[d.getMonth()]
    out.push(label)
  }
  return out
}

export async function ActivityTile({ index }: { index: number }) {
  const { total, weeks } = await getActivity()
  const label =
    total === null
      ? 'GitHub profile'
      : `GitHub activity: ${total.toLocaleString('en-US')} contributions in the last year`

  return (
    <section className="tile fade-up" style={{ '--i': index, gap: 12, padding: '16px 20px' } as React.CSSProperties} aria-label="GitHub activity">
      <div className="hd">
        <h2 className="h2">Activity</h2>
        <span className="meta key" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`cell lvl-${l}`} />
          ))}
          More
        </span>
      </div>
      <a href={profile} target="_blank" rel="noopener noreferrer" aria-label={label} className="act">
        {weeks.flatMap((days, w) => days.map((level, d) => <span key={`${w}-${d}`} className={`cell lvl-${level}`} />))}
      </a>
      <div className="meta months" aria-hidden="true">
        {monthLabels().map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </section>
  )
}
