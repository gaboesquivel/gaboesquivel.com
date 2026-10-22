import { SectionLabel } from "components/interior/section-label";
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from "components/interior/split-section";
import {
  sectionHeadingSpacing,
  sectionSpacing,
  sectionTitle,
} from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export type BioChapterLayout =
  | "sidebar"
  | "split-media-right"
  | "split-media-left"
  | "wide";

export function BioChapter({
  year,
  title,
  children,
  className,
  layout = "sidebar",
  media,
  textSpan = 5,
  mediaSpan = 6,
}: {
  year: string;
  title: string;
  children: ReactNode;
  className?: string;
  layout?: BioChapterLayout;
  media?: ReactNode;
  textSpan?: 4 | 5 | 6 | 7 | 8;
  mediaSpan?: 4 | 5 | 6 | 7 | 8;
}) {
  if (layout === "wide") {
    return (
      <section
        className={cn(
          sectionSpacing,
          "border-t border-hairline pt-12 first:border-t-0 first:pt-0",
          className
        )}
      >
        <SectionLabel className="mb-3">{year}</SectionLabel>
        <h2 className={cn(sectionTitle, sectionHeadingSpacing, "max-w-5xl")}>
          {title}
        </h2>
        <div className="max-w-3xl">{children}</div>
      </section>
    );
  }

  if (layout === "split-media-right" || layout === "split-media-left") {
    const mediaPosition = layout === "split-media-right" ? "right" : "left";

    return (
      <section
        className={cn(
          sectionSpacing,
          "border-t border-hairline pt-12 first:border-t-0 first:pt-0",
          className
        )}
      >
        <SplitSection>
          <SplitSectionContent mediaPosition={mediaPosition} span={textSpan}>
            <SectionLabel className="mb-3">{year}</SectionLabel>
            <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>{title}</h2>
            {children}
          </SplitSectionContent>
          {media ? (
            <SplitSectionMedia mediaPosition={mediaPosition} span={mediaSpan}>
              {media}
            </SplitSectionMedia>
          ) : null}
        </SplitSection>
      </section>
    );
  }

  return (
    <section
      className={cn(
        sectionSpacing,
        "border-t border-hairline pt-12 first:border-t-0 first:pt-0",
        className
      )}
    >
      <div className="grid gap-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-10 lg:gap-x-12">
        <p className="text-sm text-accent md:pt-1">{year}</p>
        <div className="min-w-0">
          <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
