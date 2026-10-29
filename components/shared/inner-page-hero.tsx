import { PageTitle } from "components/shared/page-layout";
import { PageTrail } from "components/shared/page-trail";
import type { PageTrailSegment } from "components/shared/page-trail";
import {
  heroPitch,
  heroTitle,
  pageTitle,
  proseClass,
} from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function InnerPageHero({
  trail,
  title,
  description,
  compact = false,
  density = "default",
  className,
  meta,
  children,
}: {
  trail?: PageTrailSegment[];
  title: ReactNode;
  description?: string;
  compact?: boolean;
  /** Tighter intro for in-panel GenUI results; only applies with `compact`. */
  density?: "default" | "panel";
  className?: string;
  /** Short facts (role, year) rendered between the title and description. */
  meta?: ReactNode;
  children?: ReactNode;
}) {
  const hasTrail = Boolean(trail?.length);
  const panel = compact && density === "panel";

  return (
    <header
      className={cn(
        panel ? "mb-4" : compact ? "mb-8" : "mb-12 lg:mb-16",
        className
      )}
    >
      {hasTrail ? <PageTrail segments={trail ?? []} /> : null}
      <PageTitle
        className={cn(
          compact
            ? cn(pageTitle, "mb-0 max-w-none")
            : cn(heroTitle, "mb-0 max-w-none"),
          hasTrail && (panel ? "mt-2" : "mt-4")
        )}
      >
        {title}
      </PageTitle>
      {meta ? <div className={panel ? "mt-2" : "mt-3"}>{meta}</div> : null}
      {description ? (
        <p
          className={
            compact
              ? panel
                ? "mt-3 max-w-[55ch] text-base leading-relaxed text-neutral-300"
                : cn(proseClass, "mt-4 max-w-[55ch] text-neutral-300")
              : heroPitch
          }
        >
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}
