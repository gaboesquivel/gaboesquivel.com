import { InnerPageHero } from "components/shared/inner-page-hero";
import { proseLink, Prose } from "components/shared/page-layout";
import {
  hireContractBlogPath,
  hireTermsLanguages,
  hireTermsLocationLine,
} from "lib/hire-terms";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <section>
      <InnerPageHero
        className="mb-8 lg:mb-10 [&_h1]:text-balance"
        title="Contact Gabo Esquivel"
      />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,26rem)] lg:items-start lg:gap-x-16 xl:gap-x-20">
        <div className="min-w-0">
          <Prose className="mt-0">
            I&apos;m available for direct hire, international hire, and
            contracts through{" "}
            <Link href={hireContractBlogPath} className={proseLink}>
              Blockmatic Labs LLC
            </Link>
            . I can&apos;t work under{" "}
            <span className="whitespace-nowrap">W-2</span>.{" "}
            {hireTermsLocationLine} I speak {hireTermsLanguages}.
          </Prose>
          <Prose>
            Tell me what you&apos;re building and where it&apos;s stuck. Use the
            form, email{" "}
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
        <div className="mt-10 min-w-0 lg:mt-0">
          <ContactForm />
        </div>
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
