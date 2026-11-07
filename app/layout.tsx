import "./global.css";
import { SiteChatProvider } from "components/chat/site-chat";
import { SiteSearchShell } from "components/search/site-search-shell";
import { getSiteSearchRecords } from "lib/site-search-records";
import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteWidth } from "@/components/layout/site-width";
import {
  siteMetadataTitle,
  sitePublicDescription,
  siteOgAlt,
} from "@/lib/site-identity";
import { siteOrigin } from "@/lib/site-path";

import { DeferredAnalytics } from "../components/layout/deferred-analytics";
import { Footer } from "../components/layout/footer";

const siteSearchRecords = getSiteSearchRecords();

export const metadata: Metadata = {
  description: sitePublicDescription,
  metadataBase: new URL(siteOrigin),
  openGraph: {
    description: sitePublicDescription,
    locale: "en_US",
    siteName: "Gabo Esquivel",
    title: siteMetadataTitle,
    type: "website",
    url: siteOrigin,
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
    default: siteMetadataTitle,
    template: "%s",
  },
  twitter: {
    card: "summary_large_image",
    images: {
      url: "/og",
      alt: siteOgAlt,
    },
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
    <html
      lang="en"
      className="dark bg-black font-mono font-normal text-white scheme-dark"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="is-agentic-site-type" content="content" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>👩‍🚀</text></svg>"
        />
      </head>
      <body className="relative mb-12 flex min-h-dvh max-w-full min-w-0 flex-col antialiased transition-[padding] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none sm:mb-40 [html[data-chat-open]_&]:md:pr-[28rem]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-black focus:px-4 focus:py-3 focus:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-accent print:hidden"
        >
          Skip to content
        </a>
        <SiteChatProvider>
          <SiteSearchShell records={siteSearchRecords}>
            <div className="flex min-h-0 flex-1 flex-col">
              <SiteHeader />
              <SiteWidth
                as="main"
                id="main"
                tabIndex={-1}
                className="flex min-h-0 flex-1 flex-col outline-none print:max-w-none print:px-0 preview-print:max-w-none preview-print:px-0"
              >
                {children}
              </SiteWidth>
              <Footer />
              <DeferredAnalytics />
            </div>
          </SiteSearchShell>
        </SiteChatProvider>
      </body>
    </html>
  );
}
