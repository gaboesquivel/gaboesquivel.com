import type { Project, TechStackItem } from 'gaboesquivel'
import { getProjectsByTechnology } from 'gaboesquivel'

const normalizeForMatch = (value: string) =>
  value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export const isEmptyTech = (tech: TechStackItem) =>
  tech.experience.length === 0 && getProjectsByTechnology(tech.tag).length === 0

export const visibleTechStack = (stack: TechStackItem[]) =>
  stack.filter((tech) => !isEmptyTech(tech))

export const sortProjectsForTech = ({
  projects,
  experience,
  cap = 6,
}: {
  projects: Project[]
  experience: string[]
  cap?: number
}) => {
  const named: Project[] = []
  const seen = new Set<string>()
  const byTitleLength = [...projects].sort(
    (a, b) => b.title.length - a.title.length,
  )

  for (const bullet of experience) {
    const normalizedBullet = normalizeForMatch(bullet)
    const match = byTitleLength.find(
      (project) =>
        !seen.has(project.slug) &&
        normalizedBullet.includes(normalizeForMatch(project.title)),
    )
    if (!match) continue
    named.push(match)
    seen.add(match.slug)
  }

  const remaining = projects
    .filter((project) => !seen.has(project.slug))
    .sort(
      (a, b) =>
        (a.order ?? Number.POSITIVE_INFINITY) -
        (b.order ?? Number.POSITIVE_INFINITY),
    )
    .slice(0, cap)

  return [...named, ...remaining]
}
