import './global.css';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Navbar from '../components/layout/navbar';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from '../components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://gaboesquivel.com'),
  title: {
    default: 'Gabo Esquivel - Engineering the Future',
    template: '%s | Engineering the Future',
  },
  description: 'Sr. full-stack engineer specializing in Web3 and AI.',
  openGraph: {
    title: 'Gabo Esquivel - Engineering the Future',
    description: 'Sr. full-stack engineer specializing in Web3 and AI.',  
    url: 'https://gaboesquivel.com',
    siteName: 'Gabo Esquivel',
    locale: 'en_US',
    type: 'website'
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
    title: 'Gabo Esquivel',
    card: 'summary_large_image',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'dark text-white bg-black font-mono font-thin',
      )}
    >
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>👩‍🚀</text></svg>" />
      </head>
      <body className="relative mb-40 antialiased">
        <div className='w-full h-0.5 bg-accent sticky top-0 z-50' />
        <main className="flex flex-col flex-auto max-w-3xl min-w-0 px-4 mt-6 lg:mx-auto md:px-0">
          <Navbar />
          {children}
          {/* <Footer /> */}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
