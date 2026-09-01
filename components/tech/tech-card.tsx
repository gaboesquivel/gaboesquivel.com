import { cardLink, proseClass } from 'components/shared/spacing'
import type { TechStackItem } from 'gaboesquivel'
import { getProjectsByTechnologySlug } from 'gaboesquivel'
import { cn } from 'lib/utils'
import Link from 'next/link'

export function TechCard({ tech }: TechCardProps) {
  const projects = getProjectsByTechnologySlug(tech.slug)
  const projectCount = projects.length

  return (
    <Link href={`/tech/${tech.slug}`} className={cn(cardLink, 'h-full')}>
      <h3 className="mb-1 font-medium">
        {tech.name}
        <span className="text-xs text-neutral-400 ml-1">
          - {projectCount} {projectCount === 1 ? 'project' : 'projects'}
        </span>
      </h3>
      <p className={cn(proseClass, 'line-clamp-2 flex-grow text-sm')}>
        {tech.description}
      </p>
    </Link>
  )
}

interface TechCardProps {
  tech: TechStackItem
}
