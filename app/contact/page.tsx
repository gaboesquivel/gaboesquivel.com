import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import { proseLink, Prose } from "components/shared/page-layout";
import { ctaLink, editorialLink } from "components/shared/spacing";
import {
  hireContractBlogPath,
  hireTermsLanguages,
  hireTermsLocationLine,
} from "lib/hire-terms";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import Link from "next/link";

import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <InteriorPageShell>
      <PageIntro
        className="mb-8 lg:mb-10 [&_h1]:text-balance"
        title="Contact Gabo Esquivel"
      >
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <a
              className={cn(ctaLink, editorialLink)}
              href="mailto:contact@gaboesquivel.com"
            >
              contact@gaboesquivel.com
            </a>
          </li>
          <li>
            <Link className={cn(ctaLink, editorialLink)} href="/cal">
              Book a call →
            </Link>
          </li>
        </ul>
      </PageIntro>
      {/* DOM order is facts, form, context so mobile reaches the form early; from lg the form sits beside both paragraphs. */}
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,26rem)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-10 xl:gap-x-14">
        <Prose className="mt-0 lg:col-start-1 lg:row-start-1">
          I&apos;m available for direct hire, international hire, and contracts
          through{" "}
          <Link href={hireContractBlogPath} className={proseLink}>
            Blockmatic Labs LLC
          </Link>
          . I can&apos;t work under{" "}
          <span className="whitespace-nowrap">W-2</span>.{" "}
          {hireTermsLocationLine} I speak {hireTermsLanguages}.
        </Prose>
        <div className="mt-8 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <ContactForm />
        </div>
        <Prose className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-8">
          Tell me what you&apos;re building and where it&apos;s stuck. For
          context first, browse{" "}
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
    </InteriorPageShell>
  );
}

export const metadata = pageMetadata({
  description:
    "Contact Gabo Esquivel about AI, Web3, or full-stack product engineering. Direct and international hiring or contracting through Blockmatic Labs LLC.",
  path: "/contact",
  title: "Contact Gabo Esquivel",
});
