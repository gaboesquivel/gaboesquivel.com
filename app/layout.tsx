import "./global.css";
import type { Metadata } from "next";

import { headerColumnPadding, siteColumn } from "@/components/shared/spacing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { DeferredAnalytics } from "../components/layout/deferred-analytics";
import { Footer } from "../components/layout/footer";
import Navbar from "../components/layout/navbar";

export const metadata: Metadata = {
  description:
    "Gabo Esquivel builds useful, delightful software for humans and agents, connecting product, careful design, and architecture across AI, Web3, and finance.",
  metadataBase: new URL("https://gaboesquivel.com"),
  openGraph: {
    description:
      "Gabo Esquivel builds useful, delightful software for humans and agents, connecting product, careful design, and architecture across AI, Web3, and finance.",
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
      <body className="relative mb-12 flex min-h-dvh max-w-full min-w-0 flex-col antialiased sm:mb-40">
        <TooltipProvider>
          <div className="flex min-h-0 flex-1 flex-col">
            <header className="bg-black print:hidden preview-print:hidden">
              <div className="h-0.5 w-full bg-accent" />
              <div className={cn(siteColumn, headerColumnPadding)}>
                <Navbar />
              </div>
            </header>
            <main
              className={cn(
                siteColumn,
                "flex min-h-0 flex-1 flex-col print:max-w-none print:px-0 preview-print:max-w-none preview-print:px-0"
              )}
            >
              {children}
              <Footer />
              <DeferredAnalytics />
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
