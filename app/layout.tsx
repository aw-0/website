import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Andrew Wolf | Computer Engineering & Software',
  description: 'Computer engineering student at UW-Madison building web applications, embedded video systems, and makerspace automation.',
  metadataBase: new URL('https://andreww.co'),
  openGraph: {
    title: 'Andrew Wolf | Computer Engineering & Software',
    description: 'Computer engineering student at UW-Madison building web applications, embedded video systems, and makerspace automation.',
    url: 'https://andreww.co',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://science.andreww.co" />
      </head>
      <body className="antialiased">
        <Script
          src="https://science.andreww.co/script.js"
          data-site="INUIAYEG"
          strategy="afterInteractive"
        />
        <div className="film-grain" />
        {children}
      </body>
    </html>
  )
}
