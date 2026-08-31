import { blockSpacing, singleColGrid } from 'components/shared/spacing'
import { getProjectBySlug } from 'gaboesquivel'
import { cn } from 'lib/utils'
import { ProjectCard } from './project-card'

export function ProjectEvidence({
  slugs,
  columns = 2,
}: {
  slugs: string[]
  columns?: 1 | 2
}) {
  const evidence = slugs.flatMap((slug) => {
    const project = getProjectBySlug(slug)

    return project ? [project] : []
  })
  const twoColumn = columns === 2 && evidence.length > 1

  return (
    <ul
      className={cn(blockSpacing, singleColGrid, twoColumn && 'md:grid-cols-2')}
    >
      {evidence.map((project, index) => {
        const isLastOdd =
          index === evidence.length - 1 && evidence.length % 2 === 1
        const wide = !twoColumn || isLastOdd

        return (
          <li
            key={project.slug}
            className={cn(twoColumn && isLastOdd && 'md:col-span-2')}
          >
            <ProjectCard project={project} showRole wide={wide} />
          </li>
        )
      })}
    </ul>
  )
}
