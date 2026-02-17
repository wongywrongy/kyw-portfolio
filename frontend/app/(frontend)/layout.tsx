import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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

export const metadata: Metadata = {
  title: 'My Portfolio | Designer & Developer',
  description:
    'Personal portfolio showcasing projects, professional work, and creative insights on design and development.',
  icons: {
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
  },
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
        <Analytics />
      </body>
    </html>
  )
}
