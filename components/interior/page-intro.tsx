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

import { SectionLabel } from "./section-label";

export function PageIntro({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  trail,
  compact,
  narrative = false,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  titleClassName?: string;
  trail?: PageTrailSegment[];
  compact?: boolean;
  /** One left-aligned reading block. No second column and no intro image. */
  narrative?: boolean;
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
      {eyebrow && !trail?.length ? (
        <SectionLabel className="mb-4">{eyebrow}</SectionLabel>
      ) : null}
      <InnerPageHero
        className={titleClassName}
        compact={compact}
        description={description}
        title={title}
        trail={trail}
      />
    </div>
  );
}
