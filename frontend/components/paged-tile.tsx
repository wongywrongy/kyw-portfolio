'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from '@/components/icons'

const PER_PAGE = 6

/**
 * A homepage tile with a 3×2 grid of cards and ‹ › paging. Cards are rendered
 * on the server and passed in; this only decides which six are visible, so
 * the page ships every card in the HTML and the arrows need no data.
 *
 * On phones the grid stacks and all cards show (see .pg-hidden in globals.css).
 */
export function PagedTile({
  title,
  seeAll,
  items,
  prevLabel,
  nextLabel,
  index,
}: {
  title: string
  seeAll: string
  items: React.ReactNode[]
  prevLabel: string
  nextLabel: string
  index: number
}) {
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(items.length / PER_PAGE))
  const start = page * PER_PAGE
  const onPage = items.slice(start, start + PER_PAGE).length
  const fillers = pages > 1 || items.length < PER_PAGE ? PER_PAGE - onPage : 0

  return (
    <section className="tile fade-up" style={{ '--i': index } as React.CSSProperties} aria-label={title}>
      <div className="hd">
        <h2 className="h2">{title}</h2>
        <div className="ctrls">
          <Link href={seeAll} className="seeall">
            See all
            <ChevronRight />
          </Link>
          {pages > 1 && (
            <span className="pager">
              <button
                type="button"
                className="btn"
                aria-label={prevLabel}
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className="btn"
                aria-label={nextLabel}
                disabled={page >= pages - 1}
                onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              >
                <ChevronRight />
              </button>
            </span>
          )}
        </div>
      </div>
      <ul className="cards">
        {items.map((item, i) => (
          <li key={i} className={i >= start && i < start + PER_PAGE ? undefined : 'pg-hidden'}>
            {item}
          </li>
        ))}
        {Array.from({ length: fillers }, (_, i) => (
          <li key={`e${i}`}>
            <div className="sc sc-empty" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  )
}
