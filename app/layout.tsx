import './global.css';
import clsx from 'clsx';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from './components/navbar';
import { Analytics } from '@vercel/analytics/react';

const graphik = localFont({
  src: [
    {
      path: '../public/fonts/Graphik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Graphik-Medium.ttf',
      weight: '600',
      style: 'bold',
    },
  ],
  variable: '--font-graphik',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gaboesquivel.com'),
  title: {
    default: 'Gabo Esquivel',
    template: '%s | Gabo Esquivel',
  },
  description: 'Software Engineer | 15+ Years in Tech | Web3 Advocate',
  openGraph: {
    title: 'Gabo Esquivel',
    description: 'Software Engineer | 15+ Years in Tech | Web3 Advocate',
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
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        graphik.variable
      )}
    >
      <body className="flex flex-col max-w-2xl mx-4 mt-8 mb-40 antialiased md:flex-row lg:mx-auto">
        <main className="flex flex-col flex-auto min-w-0 px-2 mt-6 md:px-0">
          <Navbar />
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
