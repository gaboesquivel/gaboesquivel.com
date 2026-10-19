import { pageMetadata } from "lib/page-metadata";
import type { Viewport } from "next";

import { ConnectPageContent } from "../connect/connect-page-content";

export const viewport: Viewport = {
  initialScale: 1,
  interactiveWidget: "resizes-content",
  width: "device-width",
};

export default function AskPage() {
  return <ConnectPageContent />;
}

export const metadata = pageMetadata({
  description:
    "A site agent for a note or a 15- or 30-minute call. Direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2.",
  path: "/ask",
  title: "Work with Gabo Esquivel",
});
