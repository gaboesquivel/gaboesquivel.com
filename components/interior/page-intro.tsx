import { InnerPageHero } from "components/shared/inner-page-hero";
import { PageEyebrow, PageTitle } from "components/shared/page-layout";
import { editorialMeasure, narrativeLead } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function PageIntro({
  title,
  description,
  className,
  titleClassName,
  compact,
  eyebrowSpace,
  density = "default",
  narrative = false,
  meta,
  children,
}: {
  title: ReactNode;
  description?: string;
  className?: string;
  titleClassName?: string;
  compact?: boolean;
  /** Compact only: keep the blank row above the title. */
  eyebrowSpace?: boolean;
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
        <PageEyebrow />
        <PageTitle className={titleClassName}>{title}</PageTitle>
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
        eyebrowSpace={eyebrowSpace}
        description={description}
        meta={meta}
        title={title}
      >
        {children}
      </InnerPageHero>
    </div>
  );
}
