'use client'

import Link from 'next/link'

/** Tracks the pointer so the CSS spotlight (.card:hover in globals.css) follows it. */
function onPointerMove(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

/**
 * A work or project card. With `href` the whole card is a link; paths stay in
 * the tab, full URLs open a new one. Without one it is a plain block with no
 * hover or press response, so it doesn't look clickable.
 */
export function Card({
  href,
  tone,
  children,
}: {
  href?: string
  tone: 'accent' | 'warm'
  children: React.ReactNode
}) {
  const className = `card card-${tone}`
  if (!href) return <div className={className}>{children}</div>
  const props = { className, onPointerMove }
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
