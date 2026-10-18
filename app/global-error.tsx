"use client";

import "./global.css";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "components/layout/footer";
import Navbar from "components/layout/navbar";
import { RecoveryPage } from "components/shared/recovery-page";
import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark bg-black font-mono font-normal text-white">
      <head>
        <title>This page didn't load | Gabo Esquivel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>👩‍🚀</text></svg>"
        />
      </head>
      <body className="relative mb-12 max-w-full min-w-0 antialiased sm:mb-40">
        <div className="sticky top-0 z-50 h-0.5 w-full bg-accent" />
        <main className="mx-auto mt-8 flex max-w-4xl min-w-0 flex-auto flex-col px-4 sm:px-6">
          <Navbar />
          <RecoveryPage title="This page didn't load" onRetry={retry}>
            This page failed while loading. Try again, or go to home or explore.
          </RecoveryPage>
          <Footer />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
