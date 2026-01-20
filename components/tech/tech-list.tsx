import Balancer from 'react-wrap-balancer'
import { techStack, filterTechByCategory, getProjectsByTechnology } from 'gaboesquivel'
import { TechMasonry } from 'components/tech/tech-masonry'
import { cn } from 'lib/utils'
import Link from 'next/link'

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
}: {
  category?: string
  heading?: string
}) {
  const currentCategory = category || 'featured'
  const filteredTech = filterTechByCategory(techStack, currentCategory)
  
  // Sort tech items based on category
  const sortedTech = [...filteredTech].sort((a, b) => {
    const aProjects = getProjectsByTechnology(a.tag).length
    const bProjects = getProjectsByTechnology(b.tag).length
    
    // For featured category, use featuredOrder if available
    if (currentCategory === 'featured') {
      const aOrder = a.featuredOrder ?? Infinity
      const bOrder = b.featuredOrder ?? Infinity
      
      // First sort by featuredOrder (lower numbers first)
      if (aOrder !== bOrder) {
        return aOrder - bOrder
      }
      
      // If featuredOrder is the same or both are Infinity, sort by project count
      return bProjects - aProjects
    }
    
    // For other categories, sort by project count (descending)
    return bProjects - aProjects
  })

  return (
    <section>
      {heading ? (
        <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
          <Balancer>{heading}</Balancer>
        </h2>
      ) : null}

      <nav className="flex flex-wrap gap-2 md:gap-4 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={cat === 'featured' ? '/tech' : `/tech/${cat}`}
            className={cn(
              'rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800',
              currentCategory === cat ? 'text-accent' : '',
            )}
          >
            {cat}
          </Link>
        ))}
      </nav>

      <ul>
        <TechMasonry techStack={sortedTech} identifier={currentCategory} />
      </ul>
    </section>
  )
}
