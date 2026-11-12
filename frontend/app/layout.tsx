import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
// IBM Plex Sans for blog reading: an open, highly legible sans (no italics used).
// Self-hosted from npm; the browser only downloads it on pages that use it.
import '@fontsource-variable/ibm-plex-sans/wght.css'
import { ThemeToggle } from '@/components/theme-toggle'
import { Entered } from '@/components/entered'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s — Kyle’s Portfolio' },
  description: site.description,
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.title,
    type: 'website',
  },
  twitter: { card: 'summary', title: site.title, description: site.description },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

// Runs before first paint so the page never flashes the wrong theme. Dark
// unless the visitor picked light with the toggle.
const themeScript = `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light')document.documentElement.classList.add('dark')})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeToggle />
        <Entered />
        <main>{children}</main>
      </body>
    </html>
  )
}
