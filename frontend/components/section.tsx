import type { Sprite } from '@/lib/sprites'
import { PixelSprite, SCALE } from '@/components/pixel-sprite'

export function Section({
  label,
  index,
  count,
  dot,
  sprite,
  gap,
  children,
}: {
  label: string
  index: number
  count: number
  dot: 'accent' | 'warm'
  sprite: Sprite
  gap: 8 | 16
  children: React.ReactNode
}) {
  // Keep the tab clear of the sprite: its width plus its 4px inset and a gap.
  const spriteWidth = (sprite.grid[0]?.length ?? 0) * SCALE
  return (
    <section className="fade-up mt-14" style={{ '--i': index } as React.CSSProperties}>
      <div className="shelf" style={{ marginBottom: gap, paddingRight: spriteWidth + 4 + 8 }}>
        <div className="shelf-tab">
          <span className="shelf-dot" style={{ background: `var(--px-${dot})` }} />
          <h2 className="shelf-label">{label}</h2>
          <span className="shelf-count">{String(count).padStart(2, '0')}</span>
        </div>
        <div className="shelf-sprite" aria-hidden="true">
          <PixelSprite {...sprite} />
        </div>
      </div>
      {children}
    </section>
  )
}
