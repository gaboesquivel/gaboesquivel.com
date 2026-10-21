import { Prose } from "components/shared/page-layout";
import { ctaLink, proseLink } from "components/shared/spacing";
import Link from "next/link";

export function LetsConnect() {
  return (
    <>
      <Prose className="print:hidden">
        Open to direct hire, international hire, or{" "}
        <Link href="/blog/2025-11-1099-contracting" className={proseLink}>
          contracting through Blockmatic Labs LLC
        </Link>
        . Cannot work under W-2. Based in Costa Rica, working US Mountain Time.
      </Prose>
      <Prose className="print:hidden">
        Have a project in mind? Let’s talk about how I can help.{" "}
        <Link href="/contact" className={ctaLink}>
          Start a conversation
        </Link>
        .
      </Prose>
    </>
  );
}
