import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { getHomepageData } from '@/lib/payload'
import { SITE_URL } from '@/lib/site'
import '../globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ['400', '500'],
  variable: '--font-sans',
});

const FALLBACK_TITLE = 'My Portfolio | Designer & Developer'
const FALLBACK_DESCRIPTION =
  'Personal portfolio showcasing projects, professional work, and creative insights on design and development.'

const icons: Metadata['icons'] = {
  icon: [
    {
      url: '/icon-light-32x32.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/icon-dark-32x32.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
  ],
  apple: '/apple-icon.png',
}

export async function generateMetadata(): Promise<Metadata> {
  // siteTitle/siteDescription are editable in the CMS; fall back to the static
  // copy if they are unset or the database is unreachable.
  let title = FALLBACK_TITLE
  let description = FALLBACK_DESCRIPTION

  try {
    const { siteSettings } = await getHomepageData()
    if (siteSettings?.siteTitle) title = siteSettings.siteTitle
    if (siteSettings?.siteDescription) description = siteSettings.siteDescription
  } catch (error) {
    console.error('Failed to load site settings for metadata:', error)
  }

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: title,
      type: 'website',
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    if (!theme) {
                      localStorage.setItem('theme', 'dark');
                    }
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
