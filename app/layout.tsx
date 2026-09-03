import './global.css'
import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Footer } from '../components/layout/footer'
import Navbar from '../components/layout/navbar'

export const metadata: Metadata = {
  metadataBase: new URL('https://gaboesquivel.com'),
  title: {
    default: 'Gabo Esquivel | Product Engineer',
    template: '%s',
  },
  description:
    'I build useful and delightful software products across AI, Web3, and full-stack applications.',
  openGraph: {
    title: 'Gabo Esquivel | Product Engineer',
    description:
      'I build useful and delightful software products across AI, Web3, and full-stack applications.',
    url: 'https://gaboesquivel.com',
    siteName: 'Gabo Esquivel',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('dark text-white bg-black font-mono font-thin')}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>👩‍🚀</text></svg>"
        />
      </head>
      <body className="relative mb-40 antialiased max-w-full min-w-0">
        <div className="w-full h-0.5 bg-accent sticky top-0 z-50 print:hidden" />
        <main className="mx-auto mt-8 flex min-w-0 max-w-4xl flex-auto flex-col px-4 sm:px-6 print:mt-0 print:max-w-none print:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </main>
      </body>
    </html>
  )
}
