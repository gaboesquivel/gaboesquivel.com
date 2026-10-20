import { FilterNav, IndexHeading, Prose } from "components/shared/page-layout";
import { ProjectsMasonry } from "components/work/projects-masonry";
import type { Project } from "gaboesquivel";
import {
  isWorkType,
  workTypeCopy,
  workTypeHref,
  workTypeOptions,
} from "lib/work-types";

export function Projects({
  projects,
  type,
  heading,
  intro,
  preserveOrder = false,
}: {
  projects: Project[];
  type?: string;
  heading?: string;
  intro?: string;
  preserveOrder?: boolean;
}) {
  return (
    <section>
      {type || heading ? (
        <IndexHeading>
          {heading ||
            (type && isWorkType(type)
              ? workTypeCopy[type].heading
              : `Projects: ${type}`)}
        </IndexHeading>
      ) : null}

      {intro ? <Prose>{intro}</Prose> : null}

      {type ? (
        <FilterNav
          label="Work types"
          current={type}
          items={workTypeOptions.map((option) => ({
            href: workTypeHref({ type: option }),
            id: option,
            label: option,
          }))}
        />
      ) : null}

      <ProjectsMasonry
        projects={projects}
        identifier={type}
        preserveOrder={preserveOrder}
      />
    </section>
  );
}
