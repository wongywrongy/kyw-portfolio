/**
 * GitHub contribution levels for the activity card, fetched once at build time.
 * Needs GITHUB_TOKEN (a fine-grained token with no extra permissions is enough
 * for public contributions). Without it, or if the request fails, the build
 * still succeeds with an all-zero graph.
 */
export const GITHUB_LOGIN = 'wongywrongy'

const WEEKS = 52

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionLevel } }
      }
    }
  }
}`

type Calendar = {
  totalContributions: number
  weeks: { contributionDays: { date: string; contributionLevel: string }[] }[]
}

export type Activity = {
  total: number | null // null when the graph is the fallback
  weeks: number[][] // oldest first, Sun–Sat, levels 0–4
}

function empty(reason: string): Activity {
  console.warn(`GitHub activity: ${reason}; rendering an empty graph.`)
  return { total: null, weeks: Array.from({ length: WEEKS }, () => Array(7).fill(0)) }
}

export async function getActivity(): Promise<Activity> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return empty('GITHUB_TOKEN is not set')
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_LOGIN } }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) return empty(`request failed with HTTP ${res.status}`)
    const json = await res.json()
    const cal: Calendar | undefined = json.data?.user?.contributionsCollection?.contributionCalendar
    if (!cal) return empty(json.errors?.[0]?.message ?? 'unexpected response')
    return {
      total: cal.totalContributions,
      weeks: cal.weeks
        .slice(-WEEKS)
        .map((w) => w.contributionDays.map((d) => LEVELS[d.contributionLevel] ?? 0)),
    }
  } catch (e) {
    return empty(`request failed (${e instanceof Error ? e.message : String(e)})`)
  }
}
