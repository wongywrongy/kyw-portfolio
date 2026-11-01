import { prng, hash } from '@/lib/prng'

const ALPHAS = ['25%', '45%', '70%', '100%']

/**
 * A post's image. With a `cover` it shows that image (toned down to sit in the
 * page); without one it draws the band's lit-square pattern, seeded by the slug
 * so each post keeps the same art across builds.
 */
export function PostArt({
  slug,
  cover,
  cols,
  rows,
  count,
  className,
}: {
  slug: string
  cover: string
  cols: number
  rows: number
  count: number
  className: string
}) {
  if (cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized anyway
      <img src={cover} alt="" loading="lazy" className={`art art-img ${className}`} />
    )
  }

  const rand = prng(hash(slug))
  const taken = new Set<number>()
  const squares = []
  while (squares.length < Math.min(count, cols * rows)) {
    const col = Math.floor(rand() * cols)
    const row = Math.floor(rand() * rows)
    if (taken.has(row * cols + col)) continue
    taken.add(row * cols + col)
    squares.push({
      left: col * 10 + 6,
      top: row * 10 + 6,
      warm: rand() < 0.2,
      alpha: ALPHAS[Math.floor(rand() * ALPHAS.length)],
    })
  }

  return (
    <span className={`art ${className}`} aria-hidden="true">
      {squares.map((s) => (
        <i
          key={`${s.left}-${s.top}`}
          className={s.warm ? 'sq-warm' : 'sq-accent'}
          style={{ left: s.left, top: s.top, '--a': s.alpha } as React.CSSProperties}
        />
      ))}
    </span>
  )
}
