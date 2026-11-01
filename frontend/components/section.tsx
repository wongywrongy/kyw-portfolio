import { Card } from '@/components/card'

export type Item = {
  title: string
  href?: string
  meta?: string
  sub: string[]
  logo?: string
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
              {item.logo ? (
                <div className="card-row">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized anyway */}
                  <img src={item.logo} alt="" width={40} height={40} loading="lazy" className="card-logo" />
                  <div className="card-body">
                    <CardBody item={item} />
                  </div>
                </div>
              ) : (
                <CardBody item={item} />
              )}
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CardBody({ item }: { item: Item }) {
  return (
    <>
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
    </>
  )
}
