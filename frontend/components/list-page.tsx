import Link from 'next/link'
import { ChevronLeft } from '@/components/icons'

/** Shared shell for /projects, /mindspace and /experience. */
export function ListPage({
  title,
  subtitle,
  children,
  wide = true,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div className="page">
      <div className={wide ? 'stack stack-wide' : 'stack'}>
        <nav className="crumbs fade-up" style={{ '--i': 0 } as React.CSSProperties} aria-label="Breadcrumb">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            <ChevronLeft />
            Home
          </Link>
        </nav>
        <section className="tile fade-up" style={{ '--i': 1, padding: 28 } as React.CSSProperties}>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-sub">{subtitle}</p>}
          {children}
        </section>
      </div>
    </div>
  )
}
