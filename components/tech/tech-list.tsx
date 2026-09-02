import { FilterNav, IndexHeading } from 'components/shared/page-layout'
import {
  techCategoryHref,
  techCategoryIds,
  techCategoryLabels,
} from 'components/tech/categories'
import { TechMasonry } from 'components/tech/tech-masonry'
import {
  filterTechByCategory,
  getProjectsByTechnology,
  techStack,
} from 'gaboesquivel'
import { isEmptyTech } from 'lib/tech-evidence'
import { cn } from 'lib/utils'

export function TechList({
  category,
  heading,
  showNavigation = true,
  className,
}: {
  category?: string
  heading?: string
  showNavigation?: boolean
  className?: string
}) {
  const currentCategory = category ?? 'featured'
  const filteredTech = filterTechByCategory(techStack, currentCategory).filter(
    (tech) => !isEmptyTech(tech),
  )

  const sortedTech = [...filteredTech].sort((a, b) => {
    const aProjects = getProjectsByTechnology(a.tag).length
    const bProjects = getProjectsByTechnology(b.tag).length

    if (currentCategory === 'featured') {
      const aOrder = a.featuredOrder ?? Number.POSITIVE_INFINITY
      const bOrder = b.featuredOrder ?? Number.POSITIVE_INFINITY

      if (aOrder !== bOrder) return aOrder - bOrder

      return bProjects - aProjects
    }

    return bProjects - aProjects
  })

  return (
    <section className={cn(className)}>
      {heading ? <IndexHeading>{heading}</IndexHeading> : null}

      {showNavigation ? (
        <FilterNav
          label="Technology categories"
          current={currentCategory}
          items={techCategoryIds.map((id) => ({
            id,
            href: techCategoryHref(id),
            label: techCategoryLabels[id],
          }))}
        />
      ) : null}

      <TechMasonry techStack={sortedTech} identifier={currentCategory} />
    </section>
  )
}
