/**
 * The fluid colour field behind each card: three blurred blobs placed by a
 * PRNG seeded from the card's title, so the same title always gets the same
 * pattern and nobody has to make artwork. Rendered as inline styles at build.
 */
export type Blob = { style: React.CSSProperties }

export const WARM = ['var(--warm)', 'var(--rose)', 'var(--violet)']
export const COOL = ['var(--accent)', 'var(--violet)', 'var(--teal)']

function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function blobs(key: string, palette: string[]): Blob[] {
  let s = hash(key)
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
  const start = Math.floor(rnd() * palette.length)
  const out: Blob[] = []
  for (let i = 0; i < 3; i++) {
    const size = 55 + Math.round(rnd() * 45)
    const x = 35 + Math.round(rnd() * 70)
    const y = -30 + Math.round(rnd() * 70)
    const c = palette[(start + i) % palette.length]
    out.push({
      style: {
        width: `${size}%`,
        height: `${Math.round(size * 1.3)}%`,
        left: `${x - size / 2}%`,
        top: `${y}%`,
        background: `radial-gradient(closest-side, ${c}, transparent)`,
      },
    })
  }
  return out
}
