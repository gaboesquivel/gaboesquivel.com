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
  className,
}: {
  trail?: PageTrailSegment[];
  title: ReactNode;
  description?: string;
  compact?: boolean;
  className?: string;
}) {
  const hasTrail = Boolean(trail?.length);

  return (
    <header className={cn(compact ? "mb-8" : "mb-12 lg:mb-16", className)}>
      {hasTrail ? <PageTrail segments={trail ?? []} /> : null}
      <PageTitle
        className={cn(
          compact
            ? cn(pageTitle, "mb-0 max-w-none")
            : cn(heroTitle, "mb-0 max-w-none"),
          hasTrail && "mt-4"
        )}
      >
        {title}
      </PageTitle>
      {description ? (
        <p
          className={
            compact
              ? cn(proseClass, "mt-4 max-w-[55ch] text-neutral-300")
              : heroPitch
          }
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
