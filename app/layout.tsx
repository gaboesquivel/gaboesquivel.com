import './global.css';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Navbar from './components/navbar';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from './components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://gaboesquivel.com'),
  title: {
    default: 'Gabo Esquivel - Web3, AI',
    template: '%s | Gabo Esquivel - Web3, AI',
  },
  description: 'Full-stack software engineer with over 15+ years of experience, specializing in Web3 and AI.',
  openGraph: {
    title: 'Gabo Esquivel - Web3, AI',
    description: 'Full-stack software engineer with over 15 years of experience, specializing in Web3 and AI.',  
    url: 'https://gaboesquivel.com',
    siteName: 'Gabo Esquivel',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://gaboesquivel.com/images/default-og.webp',
        width: 1200,
        height: 630,
        alt: 'Gabo Esquivel - Web3, AI',
      },
    ],
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
        'text-black bg-white dark:text-white dark:bg-black font-mono font-thin',
      )}
    >
      <body className="relative mb-40 antialiased">
        <div className='w-full h-0.5 bg-accent sticky top-0 z-50' />
        <main className="flex flex-col flex-auto max-w-2xl min-w-0 px-4 mt-6 lg:mx-auto md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
