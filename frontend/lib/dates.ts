const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2024-06" → "Jun 2024" */
export function monthYear(ym: string): string {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

/**
 * A compact range for an experience entry:
 * "Jun – Aug 2024", "Aug 2025 – Mar 2026", "Aug 2025 – now".
 */
export function range(start: string, end?: string): string {
  if (!end) return `${monthYear(start)} – now`
  const [sy, sm] = start.split('-').map(Number)
  const [ey] = end.split('-').map(Number)
  if (sy === ey) return `${MONTHS[sm - 1]} – ${monthYear(end)}`
  return `${monthYear(start)} – ${monthYear(end)}`
}
