"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then(({ Analytics }) => Analytics),
  { ssr: false }
);

export function DeferredAnalytics() {
  return <Analytics />;
}
