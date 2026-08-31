import { FilterNav, IndexHeading } from 'components/shared/page-layout'
import { ProjectsMasonry } from 'components/work/projects-masonry'
import type { Project } from 'gaboesquivel'

const options = [
  'featured',
  'full-time',
  'contract',
  'web3',
  'ai',
  'lead',
  'oss',
  'all',
]

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
        <IndexHeading>{heading || `My Portfolio - ${type}`}</IndexHeading>
      ) : null}

      {type ? (
        <FilterNav
          label="Work types"
          current={type}
          items={options.map((option) => ({
            id: option,
            href: `/work/${option !== 'featured' ? option : ''}`,
            label: option,
          }))}
        />
      ) : null}

      <ProjectsMasonry projects={projects} identifier={type} />
    </section>
  )
}
