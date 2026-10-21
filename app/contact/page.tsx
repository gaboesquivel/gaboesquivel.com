import {
  blockSpacing,
  PageTitle,
  proseLink,
  Prose,
} from "components/shared/page-layout";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

import { LazyContactForm } from "./lazy-contact-form";

export default function ContactPage() {
  return (
    <section>
      <PageTitle>Contact Gabo Esquivel</PageTitle>
      <Prose>
        I&apos;m available for direct hire, international hire, and contracts
        through{" "}
        <Link href="/blog/2025-11-1099-contracting" className={proseLink}>
          Blockmatic Labs LLC
        </Link>
        . I can&apos;t work under W-2. I&apos;m based in Costa Rica and work on
        US Mountain Time. I speak English, Spanish, Portuguese, and Italian.
      </Prose>
      <Prose>
        Tell me what you&apos;re building, the challenge you&apos;re working
        through, and how you&apos;d like to collaborate. Use the form below,
        email{" "}
        <Link href="mailto:contact@gaboesquivel.com" className={proseLink}>
          contact@gaboesquivel.com
        </Link>
        , or{" "}
        <Link href="/cal" className={proseLink}>
          book a call
        </Link>
        . If you&apos;d like to see examples first, browse my{" "}
        <Link href="/work" className={proseLink}>
          selected work
        </Link>
        .
      </Prose>

      <div className={blockSpacing}>
        <LazyContactForm />
      </div>
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "Contact Gabo Esquivel about AI, Web3, or full-stack product engineering. Direct and international hiring or contracting through Blockmatic Labs LLC.",
  path: "/contact",
  title: "Contact Gabo Esquivel",
});
