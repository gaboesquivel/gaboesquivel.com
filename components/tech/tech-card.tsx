import Link from 'next/link'
import { getProjectsByTechnologySlug } from 'gaboesquivel'
import type { TechStackItem } from 'gaboesquivel'

export function TechCard({ tech }: TechCardProps) {
  const projects = getProjectsByTechnologySlug(tech.slug)
  const projectCount = projects.length

  return (
    <Link
      href={`/tech/${tech.slug}`}
      className="w-full h-full rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 flex flex-col"
    >
      <h3 className="mb-1 font-medium">
        {tech.name}
        <span className="text-xs text-neutral-400 ml-1">
          - {projectCount} {projectCount === 1 ? 'project' : 'projects'}
        </span>
      </h3>
      <p className="prose prose-neutral dark:prose-invert text-sm line-clamp-2 flex-grow">
        {tech.description}
      </p>
    </Link>
  )
}

interface TechCardProps {
  tech: TechStackItem
}
