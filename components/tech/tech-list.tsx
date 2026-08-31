import { TechMasonry } from 'components/tech/tech-masonry'
import {
  filterTechByCategory,
  getProjectsByTechnology,
  techStack,
} from 'gaboesquivel'
import { cn } from 'lib/utils'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

const categories = [
  'featured',
  'web3',
  'ai',
  'frontend',
  'backend',
  'cloud-devops',
  'all',
]

export function TechList({
  category,
  heading,
  showNavigation = true,
}: {
  category?: string
  heading?: string
  showNavigation?: boolean
}) {
  const currentCategory = category ?? 'featured'
  const filteredTech = filterTechByCategory(techStack, currentCategory)

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
    <section>
      {heading ? (
        <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
          <Balancer>{heading}</Balancer>
        </h2>
      ) : null}

      {showNavigation ? (
        <nav
          aria-label="Technology categories"
          className="mb-8 flex flex-wrap gap-2 md:gap-4"
        >
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'featured' ? '/tech' : `/tech/${cat}`}
              aria-current={currentCategory === cat ? 'page' : undefined}
              className={cn(
                'rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800',
                currentCategory === cat ? 'text-accent' : '',
              )}
            >
              {cat}
            </Link>
          ))}
        </nav>
      ) : null}

      <TechMasonry techStack={sortedTech} identifier={currentCategory} />
    </section>
  )
}
