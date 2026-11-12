'use client'

import { useEffect } from 'react'

// The browser chrome / status bar colour follows the page background.
const THEME_COLOR = { dark: '#0a0a0a', light: '#ffffff' }

function syncThemeColor() {
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

export function ThemeToggle() {
  // The meta tag is rendered for dark; fix it up if the visitor saved light.
  useEffect(syncThemeColor, [])

  function toggle() {
    const root = document.documentElement
    const next = root.classList.contains('dark') ? 'light' : 'dark'
    // Switch everything in one frame: transitions off, flip, flush, back on.
    root.classList.add('theme-switching')
    root.classList.toggle('dark', next === 'dark')
    syncThemeColor()
    void window.getComputedStyle(root).opacity
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')))
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  // Icons switch on the `dark` class in CSS, so server and client markup match
  // and there is no state to hydrate.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="theme-toggle"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="dark:hidden">
        <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
      </svg>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="hidden dark:block">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  )
}
