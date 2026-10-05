import { Card } from '@/components/card'

export type Item = {
  title: string
  href?: string
  meta?: string
  sub: string[]
}

/** A homepage section: square, heading and fading rule, then one card per item. */
export function Section({
  title,
  tone,
  index,
  items,
}: {
  title: string
  tone: 'accent' | 'warm'
  index: number
  items: Item[]
}) {
  return (
    <section className="fade-up" style={{ '--i': index } as React.CSSProperties}>
      <div className="section-head">
        <span className="section-mark" style={{ background: `var(--${tone})` }} />
        <h2>{title}</h2>
        <span className="section-rule" />
      </div>
      <ul className="cards">
        {items.map((item) => (
          <li key={item.title}>
            <Card href={item.href} tone={tone}>
              <p className="card-title">
                <span>{item.title}</span>
                {item.href && (
                  <span aria-hidden="true" className="card-arrow">
                    ↗
                  </span>
                )}
              </p>
              {item.meta && <p className="card-meta">{item.meta}</p>}
              {item.sub.map((s) => (
                <p key={s} className="card-sub">
                  {s}
                </p>
              ))}
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
