import { FilterNav, IndexHeading } from 'components/shared/page-layout'
import { ProjectsMasonry } from 'components/work/projects-masonry'
import type { Project } from 'gaboesquivel'
import {
  isWorkType,
  workTypeCopy,
  workTypeHref,
  workTypeOptions,
} from 'lib/work-types'

export function Projects({
  projects,
  type,
  heading,
}: {
  projects: Project[]
  type?: string
  heading?: string
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

      {type ? (
        <FilterNav
          label="Work types"
          current={type}
          items={workTypeOptions.map((option) => ({
            id: option,
            href: workTypeHref({ type: option }),
            label: option,
          }))}
        />
      ) : null}

      <ProjectsMasonry projects={projects} identifier={type} />
    </section>
  )
}
