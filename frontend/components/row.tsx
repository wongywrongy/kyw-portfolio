import Link from 'next/link'

const rowBase = '-mx-3 block rounded-lg px-3 py-2'
const rowHover = 'group transition-colors hover:bg-surface focus-visible:bg-surface'

/**
 * A list row. With `href` it becomes a link with a hover surface and a ↗ that
 * fades in; without one it is plain text with no hover state.
 */
export function Row({
  href,
  internal,
  children,
}: {
  href?: string
  internal?: boolean
  children: React.ReactNode
}) {
  if (!href) return <div className={rowBase}>{children}</div>
  const cls = `${rowBase} ${rowHover}`
  if (internal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  )
}

export function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block text-tertiary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      ↗
    </span>
  )
}
