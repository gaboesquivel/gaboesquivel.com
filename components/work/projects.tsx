import { InnerPageHero } from "components/shared/inner-page-hero";
import { FilterNav } from "components/shared/page-layout";
import type { PageTrailSegment } from "components/shared/page-trail";
import { blockSpacing } from "components/shared/spacing";
import { ProjectsMasonry } from "components/work/projects-masonry";
import { WorkProjectGallery } from "components/work/work-project-gallery";
import type { Project } from "gaboesquivel";
import {
  isWorkType,
  workTypeCopy,
  workTypeHref,
  workTypeOptions,
} from "lib/work-types";
import type { ReactNode } from "react";

export function Projects({
  projects,
  type,
  heading,
  intro,
  preserveOrder = false,
  hero,
  layout = "grid",
}: {
  projects: Project[];
  type?: string;
  heading?: string;
  intro?: string;
  preserveOrder?: boolean;
  hero?: {
    trail?: PageTrailSegment[];
    title: ReactNode;
    description?: string;
    compact?: boolean;
  };
  layout?: "grid" | "featured-gallery";
}) {
  const resolvedHeading =
    heading ||
    (type && isWorkType(type) ? workTypeCopy[type].heading : undefined);
  const resolvedIntro =
    intro ||
    (type && isWorkType(type) && !hero?.description
      ? workTypeCopy[type].description
      : undefined);

  const filteredTrail =
    hero?.trail ??
    (type && isWorkType(type) && type !== "featured"
      ? [{ label: "work", href: "/work" }, { label: type }]
      : undefined);

  const showHero =
    hero ||
    (layout !== "featured-gallery" && (resolvedHeading || resolvedIntro));

  return (
    <section>
      {showHero ? (
        <InnerPageHero
          trail={filteredTrail}
          title={hero?.title ?? resolvedHeading ?? "Projects"}
          description={hero?.description ?? resolvedIntro}
          compact={hero?.compact ?? layout !== "featured-gallery"}
        />
      ) : null}

      {type ? (
        <FilterNav
          label="Work types"
          current={type}
          className={showHero ? undefined : blockSpacing}
          items={workTypeOptions.map((option) => ({
            href: workTypeHref({ type: option }),
            id: option,
            label: option,
          }))}
        />
      ) : null}

      {layout === "featured-gallery" ? (
        <WorkProjectGallery projects={projects} />
      ) : (
        <ProjectsMasonry
          projects={projects}
          identifier={type}
          preserveOrder={preserveOrder}
          variant="editorial"
        />
      )}
    </section>
  );
}
