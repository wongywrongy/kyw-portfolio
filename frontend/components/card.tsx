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
 * the tab, full URLs open a new one. Without one it is a plain block.
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
  const props = { className: `card card-${tone}`, onPointerMove }
  if (!href) return <div {...props}>{children}</div>
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
