import { InnerPageHero } from "components/shared/inner-page-hero";
import type { PageTrailSegment } from "components/shared/page-trail";
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
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  titleClassName?: string;
  trail?: PageTrailSegment[];
  compact?: boolean;
}) {
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
