import type { Metadata } from "next";

import { ConnectPageContent } from "../connect/connect-page-content";

export default function ContactPage() {
  return <ConnectPageContent />;
}

export const metadata: Metadata = {
  alternates: {
    canonical: "/connect",
    types: { "text/markdown": "/contact.md" },
  },
  description:
    "Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.",
  openGraph: {
    description:
      "Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.",
    title: "Work with Gabo Esquivel",
    type: "website",
  },
  title: "Work with Gabo Esquivel",
  twitter: {
    card: "summary_large_image",
    description:
      "Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.",
    title: "Work with Gabo Esquivel",
  },
};
