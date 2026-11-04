import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import { proseLink, Prose } from "components/shared/page-layout";
import { ctaLink, editorialLink } from "components/shared/spacing";
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
      <Prose className="mt-0 max-w-none">
        Tell me what you&apos;re building and where it&apos;s stuck. For context
        first, browse{" "}
        <Link href="/work" className={proseLink}>
          selected work
        </Link>{" "}
        or the{" "}
        <Link href="/bio" className={proseLink}>
          career story
        </Link>
        .
      </Prose>
      <div className="mt-8 min-w-0">
        <ContactForm />
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
