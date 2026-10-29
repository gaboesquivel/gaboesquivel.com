import { InnerPageHero } from "components/shared/inner-page-hero";
import { PageTitle } from "components/shared/page-layout";
import type { PageTrailSegment } from "components/shared/page-trail";
import {
  editorialMeasure,
  heroTitle,
  narrativeLead,
} from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function PageIntro({
  title,
  description,
  className,
  titleClassName,
  trail,
  compact,
  density = "default",
  narrative = false,
  meta,
  children,
}: {
  title: ReactNode;
  description?: string;
  className?: string;
  titleClassName?: string;
  trail?: PageTrailSegment[];
  compact?: boolean;
  density?: "default" | "panel";
  /** One left-aligned reading block. No second column and no intro image. */
  narrative?: boolean;
  /** Short facts (role, year) between the title and description. */
  meta?: ReactNode;
  children?: ReactNode;
}) {
  if (narrative) {
    return (
      <header className={cn(editorialMeasure, className)}>
        <PageTitle className={cn(heroTitle, "mb-0 max-w-none", titleClassName)}>
          {title}
        </PageTitle>
        {description ? <p className={narrativeLead}>{description}</p> : null}
        {children ? (
          <div className="mt-4 space-y-5 text-base leading-[1.75] text-neutral-300 lg:mt-5 [&_p]:m-0">
            {children}
          </div>
        ) : null}
      </header>
    );
  }

  return (
    <div className={cn("max-w-4xl lg:max-w-5xl", className)}>
      <InnerPageHero
        className={titleClassName}
        compact={compact}
        density={density}
        description={description}
        meta={meta}
        title={title}
        trail={trail}
      >
        {children}
      </InnerPageHero>
    </div>
  );
}
