/** Lit squares in the band. Positions come from a fixed seed, so every build is identical. */
const COUNT = 255 // 120 per 150 columns, scaled to 320
const COLS = 320 // up to 3200px wide; the band clips the rest
const ROWS = 24
const SEED = 0x6b7977
const ALPHAS = ['20%', '33.3%', '53.3%', '73.3%'] // 0x33, 0x55, 0x88, 0xbb

// mulberry32: tiny seeded PRNG, uniform in [0, 1).
function prng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function squares() {
  const rand = prng(SEED)
  const taken = new Set<number>()
  const out = []
  while (out.length < COUNT) {
    const col = Math.floor(rand() * COLS)
    const row = Math.floor(rand() * ROWS)
    if (taken.has(row * COLS + col)) continue
    taken.add(row * COLS + col)
    out.push({
      left: col * 10 + 6,
      top: row * 10 + 6,
      warm: rand() < 0.18,
      alpha: ALPHAS[Math.floor(rand() * ALPHAS.length)],
      duration: (2 + rand() * 4).toFixed(2),
      delay: (rand() * 5).toFixed(2),
    })
  }
  return out
}

export function FlickerBand() {
  return (
    <div className="band" aria-hidden="true">
      {squares().map((s) => (
        <span
          key={`${s.left}-${s.top}`}
          className={`sq ${s.warm ? 'sq-warm' : 'sq-accent'}`}
          style={
            {
              left: s.left,
              top: s.top,
              '--a': s.alpha,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
