import { BioTimeline } from "components/bio/bio-timeline";
import { LatestPosts } from "components/blog/latest-posts";
import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import {
  ctaLink,
  editorialLink,
  editorialMeasure,
  narrativeCopy,
  narrativeIntroGap,
  sectionGap,
  headingSpacing,
  sectionTitle,
} from "components/shared/spacing";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import Link from "next/link";

const actionLink = cn(ctaLink, editorialLink, "text-sm");

export default function BioPage() {
  return (
    <InteriorPageShell>
      <PageIntro
        description="A 15+ year journey building products across web, fintech, Web3, and AI. Different chapters, the same interest: making complex technology useful to people."
        narrative
        title="My journey"
      />

      <BioTimeline className={narrativeIntroGap} />

      <LatestPosts className={sectionGap} limit={4} title="Selected writing" />

      <section className={sectionGap}>
        <div className={editorialMeasure}>
          <h2 className={cn(sectionTitle, headingSpacing)}>
            What I&apos;m focused on
          </h2>
          <p className={narrativeCopy}>
            Today, I work at the intersection of agentic AI, product
            engineering, and onchain finance. I help teams move from early ideas
            to working products, from the experience people interact with to the
            systems behind it.
          </p>
          <p className={cn(narrativeCopy, "mt-5")}>
            I work remotely from Costa Rica and collaborate in English, Spanish,
            Portuguese, and Italian.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="m-0">
            <Link className={actionLink} href="/cv">
              View my résumé / CV →
            </Link>
          </p>
          <p className="m-0">
            <Link className={actionLink} href="/contact">
              Start a conversation →
            </Link>
          </p>
        </div>
      </section>
    </InteriorPageShell>
  );
}

export const metadata = pageMetadata({
  description:
    "From Costa Rica JS and Wink to Web3 products and AI assistants, explore the career and product engineering approach of Gabo Esquivel.",
  path: "/bio",
  title: "Gabo Esquivel | My journey",
});
