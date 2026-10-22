import { Prose } from "components/shared/page-layout";
import { ctaLink, proseLink } from "components/shared/spacing";
import { hireContractBlogPath, hireTermsLocationLine } from "lib/hire-terms";
import Link from "next/link";

export function LetsConnect() {
  return (
    <>
      <Prose className="max-w-none print:hidden">
        Open to direct hire, international hire, or{" "}
        <Link href={hireContractBlogPath} className={proseLink}>
          contracting through Blockmatic Labs LLC
        </Link>
        . Cannot work under W-2. {hireTermsLocationLine}
      </Prose>
      <Prose className="max-w-none print:hidden">
        Have a project in mind? Let’s talk about how I can help.{" "}
        <Link href="/contact" className={ctaLink}>
          Start a conversation
        </Link>
        .
      </Prose>
    </>
  );
}
