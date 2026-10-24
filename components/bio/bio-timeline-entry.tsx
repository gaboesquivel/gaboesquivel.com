import { BioChapterMediaBlock } from "components/bio/bio-chapter-media";
import { BioNarrativeParagraph } from "components/bio/bio-paragraph";
import { BioStoryDisclosure } from "components/bio/bio-story-disclosure";
import { sectionTitle } from "components/shared/spacing";
import type { BioChapter } from "lib/bio/chapters";
import { cn } from "lib/utils";

export function BioTimelineEntry({
  chapter,
  entryId,
  groundedProjectIds,
  priorityImage = false,
  isLast = false,
}: {
  chapter: BioChapter;
  entryId: string;
  groundedProjectIds?: readonly string[];
  priorityImage?: boolean;
  isLast?: boolean;
}) {
  return (
    <li
      className={cn(
        "relative grid min-w-0 grid-cols-1 gap-8 border-t border-hairline py-12 first:border-t-0 first:pt-0 lg:grid-cols-[7.5rem_minmax(0,1fr)_minmax(0,38%)] lg:gap-x-10 lg:py-16",
        !isLast && "lg:pb-16"
      )}
    >
      <div className="relative flex gap-4 lg:block lg:pt-1">
        <div
          aria-hidden="true"
          className="flex w-5 shrink-0 justify-center pt-1"
        >
          <span className="size-2.5 rounded-full border-2 border-accent bg-black" />
        </div>
        <div className="min-w-0 lg:pr-4">
          <p className="m-0 text-lg font-semibold text-white">
            {chapter.startYear}
          </p>
          <p className="mt-1 text-xs tracking-wide text-neutral-400 uppercase">
            {chapter.category}
          </p>
        </div>
      </div>

      <article
        aria-labelledby={`${entryId}-title`}
        className="min-w-0 scroll-mt-28"
        id={entryId}
        tabIndex={-1}
      >
        <p className="m-0 text-sm text-accent">{chapter.period}</p>
        <h2
          className={cn(sectionTitle, "mt-3 text-balance")}
          id={`${entryId}-title`}
        >
          {chapter.title}
        </h2>
        <div className="mt-5 space-y-5">
          {chapter.summaryParagraphs.map((paragraph, index) => (
            <BioNarrativeParagraph
              key={`${chapter.id}-summary-${index}`}
              paragraph={paragraph}
            />
          ))}
        </div>
        <BioStoryDisclosure
          chapter={chapter}
          groundedProjectIds={groundedProjectIds}
        />
      </article>

      <BioChapterMediaBlock
        className="lg:pt-1"
        media={chapter.primaryMedia}
        priority={priorityImage}
      />
    </li>
  );
}
