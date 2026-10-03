import type { Sprite } from '@/lib/sprites'

/** Each grid cell is drawn as a SCALE × SCALE square of screen pixels. */
export const SCALE = 3

/**
 * Renders a sprite grid as an inline SVG, one path per colour, at exactly
 * SCALE× so the pixels stay crisp.
 */
export function PixelSprite({ grid, palette, blink = [] }: Sprite) {
  const w = grid[0]?.length ?? 0
  const h = grid.length
  const paths = new Map<string, string>()
  grid.forEach((row, y) => {
    ;[...row].forEach((ch, x) => {
      if (ch === '.' || !palette[ch]) return
      paths.set(ch, (paths.get(ch) ?? '') + `M${x} ${y}h1v1h-1z`)
    })
  })

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * SCALE}
      height={h * SCALE}
      shapeRendering="crispEdges"
      className="block"
    >
      {[...paths].map(([ch, d]) => (
        <path
          key={ch}
          d={d}
          style={{ fill: palette[ch] }}
          className={blink.includes(ch) ? 'px-blink' : undefined}
        />
      ))}
    </svg>
  )
}
