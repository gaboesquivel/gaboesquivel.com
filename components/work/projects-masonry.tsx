'use client'
import { CardGrid } from 'components/shared/card-grid'
import { ProjectCard } from 'components/work/project-card'
import type { Project } from 'gaboesquivel'

export function ProjectsMasonry({
  projects,
  identifier = 'projects',
}: {
  projects: Project[]
  identifier?: string
}) {
  const sortedProjects = [...projects].sort(
    (a, b) =>
      (a.order ?? Number.POSITIVE_INFINITY) -
      (b.order ?? Number.POSITIVE_INFINITY),
  )

  return (
    <CardGrid
      items={sortedProjects}
      identifier={identifier}
      getKey={(project) => project.slug}
      renderItem={(project) => <ProjectCard project={project} />}
    />
  )
}
