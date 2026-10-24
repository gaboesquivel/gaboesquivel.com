import { BioTimelineEntry } from "components/bio/bio-timeline-entry";
import { ctaLink, editorialLink } from "components/shared/spacing";
import type { BioChapter } from "lib/bio/chapters";
import { bioChapters } from "lib/bio/chapters";
import { cn } from "lib/utils";
import Link from "next/link";

const footerLink = cn(ctaLink, editorialLink, "text-sm");

export function BioTimeline({
  chapters = bioChapters,
  idPrefix = "",
  showChapterNav = false,
  showFooter = false,
  groundedProjectIds,
  className,
}: {
  chapters?: readonly BioChapter[];
  idPrefix?: string;
  showChapterNav?: boolean;
  showFooter?: boolean;
  groundedProjectIds?: readonly string[];
  className?: string;
}) {
  return (
    <section
      aria-label="Career timeline"
      className={cn("@container min-w-0", className)}
      data-bio-timeline
    >
      {showChapterNav ? (
        <nav aria-label="Career chapters" className="mb-10">
          <ol className="grid grid-cols-2 gap-x-4 gap-y-6 @min-[36rem]:grid-cols-4">
            {chapters.map((chapter) => {
              const entryId = `${idPrefix}${chapter.id}`;
              return (
                <li key={chapter.id} className="border-t border-hairline pt-3">
                  <a
                    className="block rounded-sm py-1 text-sm text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    href={`#${entryId}`}
                  >
                    <span className="mb-2 block text-lg text-accent">
                      {chapter.startYear}
                    </span>
                    {chapter.navLabel}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}

      <ol className="m-0 list-none p-0">
        {chapters.map((chapter, index) => (
          <BioTimelineEntry
            key={chapter.id}
            chapter={chapter}
            entryId={`${idPrefix}${chapter.id}`}
            groundedProjectIds={groundedProjectIds}
            isLast={index === chapters.length - 1}
            priorityImage={index === 0}
          />
        ))}
      </ol>

      {showFooter ? (
        <footer className="mt-10 flex flex-wrap gap-6">
          <Link className={footerLink} href="/bio">
            Read my career story →
          </Link>
          <Link className={footerLink} href="/cv">
            View résumé / CV →
          </Link>
        </footer>
      ) : null}
    </section>
  );
}
