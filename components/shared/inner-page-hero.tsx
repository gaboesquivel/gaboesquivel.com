import {
  PageEyebrow,
  PageLead,
  PageTitle,
} from "components/shared/page-layout";
import { pageTitle, proseClass } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function InnerPageHero({
  eyebrowSpace = false,
  title,
  description,
  compact = false,
  density = "default",
  className,
  meta,
  children,
}: {
  /** Compact only: the blank row above the title that detail pages keep (the h1 stays where it was). */
  eyebrowSpace?: boolean;
  title: ReactNode;
  /** The introduction. Pass every paragraph; they all render at the intro size. */
  description?: string | readonly string[];
  compact?: boolean;
  /** Tighter intro for in-panel GenUI results; only applies with `compact`. */
  density?: "default" | "panel";
  className?: string;
  /** Short facts (role, year) rendered between the title and description. */
  meta?: ReactNode;
  children?: ReactNode;
}) {
  const panel = compact && density === "panel";

  return (
    <header
      className={cn(
        panel ? "mb-4" : compact ? "mb-8" : "mb-12 lg:mb-16",
        className
      )}
    >
      {compact ? (
        <>
          {eyebrowSpace ? <div aria-hidden="true" className="h-5" /> : null}
          <PageTitle
            className={cn(
              pageTitle,
              "mb-0 max-w-none",
              eyebrowSpace && (panel ? "mt-2" : "mt-4")
            )}
            variant="document"
          >
            {title}
          </PageTitle>
        </>
      ) : (
        <>
          <PageEyebrow />
          <PageTitle>{title}</PageTitle>
        </>
      )}
      {meta ? <div className={panel ? "mt-2" : "mt-3"}>{meta}</div> : null}
      {description && compact ? (
        <p
          className={
            panel
              ? "mt-3 max-w-[55ch] text-base leading-relaxed text-neutral-300"
              : cn(proseClass, "mt-4 max-w-[55ch] text-neutral-300")
          }
        >
          {typeof description === "string"
            ? description
            : description.join(" ")}
        </p>
      ) : null}
      {description && !compact ? <PageLead paragraphs={description} /> : null}
      {children}
    </header>
  );
}
