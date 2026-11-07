import { InnerPageHero } from "components/shared/inner-page-hero";
import {
  FilterNav,
  Prose,
  sectionHeadingSpacing,
  sectionTitle,
} from "components/shared/page-layout";
import {
  techCategoryHref,
  techCategoryIds,
  techCategoryLabels,
} from "components/tech/categories";
import { TechMasonry } from "components/tech/tech-masonry";
import {
  filterTechByCategory,
  getProjectsByTechnology,
  techStack,
} from "gaboesquivel";
import { isEmptyTech } from "lib/tech-evidence";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function TechList({
  category,
  heading,
  intro,
  note,
  hero = false,
  showNavigation = true,
  className,
}: {
  category?: string;
  heading?: string;
  intro?: string;
  note?: ReactNode;
  /** Render the heading as the page hero (category pages) instead of a section heading. */
  hero?: boolean;
  showNavigation?: boolean;
  className?: string;
}) {
  const currentCategory = category ?? "featured";
  const filteredTech = filterTechByCategory(techStack, currentCategory).filter(
    (tech) => !isEmptyTech(tech)
  );

  const sortedTech = [...filteredTech].sort((a, b) => {
    const aProjects = getProjectsByTechnology(a.tag).length;
    const bProjects = getProjectsByTechnology(b.tag).length;

    if (currentCategory === "featured") {
      const aOrder = a.featuredOrder ?? Number.POSITIVE_INFINITY;
      const bOrder = b.featuredOrder ?? Number.POSITIVE_INFINITY;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
    }

    return bProjects - aProjects;
  });

  return (
    <section className={cn(className)}>
      {hero ? (
        <InnerPageHero description={intro} title={heading ?? "Technologies"} />
      ) : (
        <>
          {heading ? (
            <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>
              {heading}
            </h2>
          ) : null}
          {intro ? <Prose className="mt-0">{intro}</Prose> : null}
        </>
      )}
      {note}

      {showNavigation ? (
        <FilterNav
          label="Technology categories"
          current={currentCategory}
          items={techCategoryIds.map((id) => ({
            href: techCategoryHref(id),
            id,
            label: techCategoryLabels[id],
          }))}
        />
      ) : null}

      {hero ? <h2 className="sr-only">Technologies</h2> : null}
      <TechMasonry techStack={sortedTech} identifier={currentCategory} />
    </section>
  );
}
