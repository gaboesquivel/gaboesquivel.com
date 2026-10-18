import "./global.css";
import type { Metadata } from "next";

import { DeferredAnalytics } from "../components/layout/deferred-analytics";
import { Footer } from "../components/layout/footer";
import Navbar from "../components/layout/navbar";

export const metadata: Metadata = {
  description:
    "I build useful and delightful software products across AI, Web3, and full-stack applications.",
  metadataBase: new URL("https://gaboesquivel.com"),
  openGraph: {
    description:
      "I build useful and delightful software products across AI, Web3, and full-stack applications.",
    locale: "en_US",
    siteName: "Gabo Esquivel",
    title: "Gabo Esquivel | Agentic Product Engineer",
    type: "website",
    url: "https://gaboesquivel.com",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "Gabo Esquivel | Agentic Product Engineer",
    template: "%s",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    yandex: "14d2e73487fa6c71",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-black font-mono font-normal text-white">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="is-agentic-site-type" content="content" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>👩‍🚀</text></svg>"
        />
      </head>
      <body className="relative mb-12 max-w-full min-w-0 antialiased sm:mb-40">
        <div className="sticky top-0 z-50 h-0.5 w-full bg-accent print:hidden preview-print:hidden" />
        <main className="mx-auto mt-8 flex max-w-4xl min-w-0 flex-auto flex-col px-4 sm:px-6 print:mt-0 print:max-w-none print:px-0 preview-print:mt-0 preview-print:max-w-none preview-print:px-0">
          <Navbar />
          {children}
          <Footer />
          <DeferredAnalytics />
        </main>
      </body>
    </html>
  );
}
