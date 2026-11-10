import { PageEyebrow, PageTitle } from "components/shared/page-layout";
import { introText } from "components/shared/spacing";
import { cn } from "lib/utils";
import { workTypeCopy } from "lib/work-types";
import type { WorkType } from "lib/work-types";

export function WorkIndexHero({ type }: { type: WorkType }) {
  const copy = workTypeCopy[type];

  return (
    <header className="mb-12 lg:mb-16">
      <PageEyebrow />
      <PageTitle className="work-hero-title">{copy.heroTitle}</PageTitle>
      <p className={cn(introText, "work-hero-lede relative mt-6")}>
        <span className="sr-only">{copy.description}</span>
        <span aria-hidden className="sm:hidden">
          <span className="block">{copy.mobileLines[0]}</span>
          <span className="block">{copy.mobileLines[1]}</span>
        </span>
        <span aria-hidden className="hidden sm:block">
          <span className="block">{copy.desktopLines[0]}</span>
          <span className="block">{copy.desktopLines[1]}</span>
        </span>
      </p>
    </header>
  );
}
