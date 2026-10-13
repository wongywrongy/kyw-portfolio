/**
 * The generated band behind a card with no image: three blurred blobs placed by
 * a PRNG seeded from the card's title, so the same title always gets the same
 * pattern and nobody has to make artwork. Rendered as inline styles at build.
 */
import type { CSSProperties } from 'react'

const RAMP = ['var(--blue)', 'var(--cyan)', 'var(--purple)']

function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function blobs(key: string): CSSProperties[] {
  let s = hash(key)
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
  const start = Math.floor(rnd() * RAMP.length)
  const out: CSSProperties[] = []
  for (let i = 0; i < 3; i++) {
    const size = 60 + Math.round(rnd() * 40)
    const x = 40 + Math.round(rnd() * 65)
    const y = -30 + Math.round(rnd() * 60)
    out.push({
      width: `${size}%`,
      height: `${Math.round(size * 1.3)}%`,
      left: `${x - size / 2}%`,
      top: `${y}%`,
      background: `radial-gradient(closest-side, ${RAMP[(start + i) % RAMP.length]}, transparent)`,
    })
  }
  return out
}
