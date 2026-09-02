import type { Project, TechStackItem } from 'gaboesquivel'
import {
  experience,
  getTechStackBySlug,
  projects,
  techStack,
} from 'gaboesquivel'
import {
  absoluteUrl,
  blogSlugFromRelatedUrl,
  isValidProjectLink,
} from './format'
import { displayTagName, displayTechList } from './names'

const featuredProjectSlugs = ['legal-agent', 'wink', 'ztx', 'bitlauncher']

const indexEvidenceSlugs = [
  'legal-agent',
  'wink',
  'ztx',
  'bitlauncher',
  'bitcashbank',
  'opyn',
  'masterbots',
  'eos-costa-rica',
]

type ProjectWithExperience = Project & { experienceCompany?: string }

const experienceByCompany = new Map(
  experience.map((entry) => [entry.company, entry]),
)

const genericExperiencePattern =
  /aligning with the principle of user experience first|user experience first/i

export const sortProjects = () => {
  const featured = featuredProjectSlugs.flatMap((slug) =>
    projects.filter((project) => project.slug === slug),
  )
  const rest = projects
    .filter((project) => !featuredProjectSlugs.includes(project.slug))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))

  return [...featured, ...rest]
}

export const sortTech = () =>
  [...techStack].sort((a, b) => {
    const aOrder = (a as TechStackItem & { featuredOrder?: number })
      .featuredOrder
    const bOrder = (b as TechStackItem & { featuredOrder?: number })
      .featuredOrder
    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder
    if (aOrder !== undefined) return -1
    if (bOrder !== undefined) return 1
    return a.name.localeCompare(b.name)
  })

export const renderProjectMarkdown = (project: ProjectWithExperience) => {
  const employment = project.experienceCompany
    ? experienceByCompany.get(project.experienceCompany)
    : undefined

  const lines = [
    project.description,
    '',
    `**Role:** ${project.role ?? 'Software Engineer'}`,
    employment
      ? `**Employment:** ${employment.duration} (${employment.title}, ${employment.company})`
      : `**Primary year:** ${project.year} (sort/display year, not employment dates)`,
    `**Types:** ${project.type.join(', ')}`,
    `**Technologies:** ${displayTechList(project.tech)}`,
  ]

  if (isValidProjectLink(project.link)) lines.push(`**Link:** ${project.link}`)
  if (project.repo) lines.push(`**Repository:** ${project.repo}`)

  if (project.story.length) {
    lines.push('', '## Story', '', ...project.story)
  }

  if (project.achievements.length) {
    lines.push('', '## Achievements', '')
    lines.push(...project.achievements.map((item) => `- ${item}`))
  }

  if (project.related?.length) {
    lines.push('', '## Related writing', '')
    lines.push(
      ...project.related.map((item) => {
        const slug = blogSlugFromRelatedUrl(item.url)
        return `- [${item.title}](${absoluteUrl(`/blog/${slug}`)}) (${item.publishedAt})`
      }),
    )
  }

  return lines.join('\n').trim()
}

const evidenceBullets = (tech: TechStackItem) =>
  tech.experience.filter((item) => !genericExperiencePattern.test(item))

export const renderTechMarkdown = (tech: TechStackItem) => {
  const withProjects = getTechStackBySlug(tech.slug)
  const bullets = evidenceBullets(tech)
  const lines = [`**Technology:** ${displayTagName(tech.tag)}`, '']

  if (withProjects?.projects.length) {
    lines.push('## Project evidence', '')
    lines.push(
      ...withProjects.projects.map(
        (project) =>
          `- [${project.title}](${absoluteUrl(`/project/${project.slug}`)}) (${project.year})`,
      ),
    )
    lines.push('')
  }

  if (bullets.length) {
    lines.push('## Experience', '')
    lines.push(...bullets.map((item) => `- ${item}`))
  }

  return lines.join('\n').trim()
}

export { featuredProjectSlugs, indexEvidenceSlugs, projects, techStack }
