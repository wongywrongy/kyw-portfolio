'use client'

import { useEffect } from 'react'

/**
 * Marks the page as entered once the load animation has played, so moving
 * between pages afterwards doesn't replay it (.entered .fade-up in globals.css).
 * A full reload starts over.
 */
export function Entered() {
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add('entered'), 900)
    return () => clearTimeout(t)
  }, [])
  return null
}
