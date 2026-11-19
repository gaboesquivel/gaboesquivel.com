"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then(({ Analytics }) => Analytics),
  { ssr: false }
);

const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then(
      ({ SpeedInsights }) => SpeedInsights
    ),
  { ssr: false }
);

// Free analytics stack: docs/decisions/0009-free-analytics-stack.md.
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
const SCROLL_MARKS = [25, 50, 75, 100] as const;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: Record<string, unknown>) => void };
  }
}

// Clarity's default consent mode limits collection for EEA, UK, and CH visitors
// until they consent; the site sends no consent signal of its own.
const clarityBootstrap = (projectId: string) =>
  `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(projectId)});`;

/** One Umami event per depth mark per page view. */
function useScrollDepth(pathname: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const sent = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const depth = scrollable <= 0 ? 100 : (window.scrollY / scrollable) * 100;
      for (const mark of SCROLL_MARKS) {
        if (depth >= mark && !sent.has(mark)) {
          sent.add(mark);
          window.umami?.track("scroll_depth", { depth: mark, path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, pathname]);
}

export function DeferredAnalytics() {
  const pathname = usePathname();
  // The owner dashboard is not a visitor page; keep it out of visitor analytics.
  const visitorPage = !pathname.startsWith("/analytics");
  const umami = Boolean(UMAMI_WEBSITE_ID) && visitorPage;
  const clarity =
    Boolean(CLARITY_PROJECT_ID) &&
    /^[a-z0-9]+$/i.test(CLARITY_PROJECT_ID ?? "") &&
    visitorPage;
  useScrollDepth(pathname, umami);

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {umami ? (
        <Script
          data-website-id={UMAMI_WEBSITE_ID}
          src="https://cloud.umami.is/script.js"
          strategy="lazyOnload"
        />
      ) : null}
      {clarity && CLARITY_PROJECT_ID ? (
        <Script id="clarity" strategy="lazyOnload">
          {clarityBootstrap(CLARITY_PROJECT_ID)}
        </Script>
      ) : null}
    </>
  );
}
