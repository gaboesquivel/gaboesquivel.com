import { InnerPageHero } from "components/shared/inner-page-hero";
import { proseLink, Prose } from "components/shared/page-layout";
import {
  hireContractBlogPath,
  hireTermsLanguages,
  hireTermsLocationLine,
} from "lib/hire-terms";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

import { LazyContactForm } from "./lazy-contact-form";

export default function ContactPage() {
  return (
    <section className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-x-16">
      <div className="min-w-0">
        <InnerPageHero className="mb-0" title="Contact Gabo Esquivel" />
        <div className="mt-6">
          <Prose>
            I&apos;m available for direct hire, international hire, and
            contracts through{" "}
            <Link href={hireContractBlogPath} className={proseLink}>
              Blockmatic Labs LLC
            </Link>
            . I can&apos;t work under W-2. {hireTermsLocationLine} I speak{" "}
            {hireTermsLanguages}.
          </Prose>
          <Prose>
            Tell me what you&apos;re building, the challenge you&apos;re working
            through, and how you&apos;d like to collaborate — direct hire,
            international hire, or a contract through Blockmatic Labs LLC. Use
            the form, email{" "}
            <Link href="mailto:contact@gaboesquivel.com" className={proseLink}>
              contact@gaboesquivel.com
            </Link>
            , or{" "}
            <Link href="/cal" className={proseLink}>
              book a call
            </Link>
            . For context first, browse{" "}
            <Link href="/work" className={proseLink}>
              selected work
            </Link>{" "}
            or the{" "}
            <Link href="/bio" className={proseLink}>
              career story
            </Link>
            .
          </Prose>
        </div>
      </div>

      <div className="mt-8 min-w-0 lg:mt-0 lg:pt-2">
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
