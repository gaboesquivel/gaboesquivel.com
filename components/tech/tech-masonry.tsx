'use client'
import { CardGrid } from 'components/shared/card-grid'
import { TechCard } from 'components/tech/tech-card'
import type { TechStackItem } from 'gaboesquivel'

export function TechMasonry({
  techStack,
  identifier = 'tech',
}: {
  techStack: TechStackItem[]
  identifier?: string
}) {
  return (
    <CardGrid
      items={techStack}
      identifier={identifier}
      getKey={(tech) => tech.slug}
      renderItem={(tech) => <TechCard tech={tech} />}
    />
  )
}
