import { InnerPageHero } from "components/shared/inner-page-hero";
import {
  blockSpacing,
  proseLink,
  Prose,
  readingMeasure,
} from "components/shared/page-layout";
import {
  hireContractBlogPath,
  hireTermsLanguages,
  hireTermsLocationLine,
} from "lib/hire-terms";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import Link from "next/link";

import { LazyContactForm } from "./lazy-contact-form";

export default function ContactPage() {
  return (
    <section>
      <InnerPageHero className="mb-0" title="Contact Gabo Esquivel" />
      <Prose>
        I&apos;m available for direct hire, international hire, and contracts
        through{" "}
        <Link href={hireContractBlogPath} className={proseLink}>
          Blockmatic Labs LLC
        </Link>
        . I can&apos;t work under W-2. {hireTermsLocationLine} I speak{" "}
        {hireTermsLanguages}.
      </Prose>
      <Prose>
        Tell me what you&apos;re building, the challenge you&apos;re working
        through, and how you&apos;d like to collaborate — direct hire,
        international hire, or a contract through Blockmatic Labs LLC. Use the
        form below, email{" "}
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
        </Link>{" "}
        or read the{" "}
        <Link href="/bio" className={proseLink}>
          career story
        </Link>
        .
      </Prose>

      <div className={cn(blockSpacing, readingMeasure)}>
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
