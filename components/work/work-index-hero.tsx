import { PageTrail } from "components/shared/page-trail";
import { heroPitch, heroTitle } from "components/shared/spacing";
import { cn } from "lib/utils";
import { workTypeCopy } from "lib/work-types";
import type { WorkType } from "lib/work-types";

export function WorkIndexHero({ type }: { type: WorkType }) {
  const copy = workTypeCopy[type];
  const trail = [
    type === "featured" ? { label: "work" } : { label: "work", href: "/work" },
    { label: copy.trailLabel },
  ];

  return (
    <header data-work-hero className="mb-12 lg:mb-16">
      <PageTrail segments={trail} />
      <h1 className={cn(heroTitle, "work-hero-title mt-4 mb-0 max-w-none")}>
        {copy.heroTitle}
      </h1>
      <p className={cn(heroPitch, "work-hero-lede relative")}>
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
