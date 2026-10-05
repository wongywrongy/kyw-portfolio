import { getActivity, GITHUB_LOGIN } from '@/lib/github'

const profile = `https://github.com/${GITHUB_LOGIN}`

export async function ActivityCard() {
  const { total, weeks } = await getActivity()
  const label =
    total === null
      ? 'GitHub profile'
      : `GitHub activity: ${total.toLocaleString('en-US')} contributions in the last year`

  return (
    <div className="card activity">
      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="activity-grid"
      >
        {weeks.flatMap((days, w) =>
          days.map((level, d) => <span key={`${w}-${d}`} className={`cell lvl-${level}`} />),
        )}
      </a>
      <div className="activity-foot">
        <a href={profile} target="_blank" rel="noopener noreferrer" className="hover:text-text-2">
          github.com/{GITHUB_LOGIN}
        </a>
        <span className="activity-key" aria-hidden="true">
          less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`cell lvl-${l}`} />
          ))}
          more
        </span>
      </div>
    </div>
  )
}
