import type { Project, TechStackItem } from 'gaboesquivel'
import { projects, techStack } from 'gaboesquivel'
import { absoluteUrl } from './format'

const featuredProjectSlugs = ['legal-agent', 'wink', 'ztx', 'bitlauncher']

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

export const renderProjectMarkdown = (project: Project) => {
  const lines = [
    project.description,
    '',
    `**Role:** ${project.role ?? 'Software Engineer'}`,
    `**Year:** ${project.year}`,
    `**Types:** ${project.type.join(', ')}`,
    `**Technologies:** ${project.tech.join(', ')}`,
  ]

  if (project.link) lines.push(`**Link:** ${project.link}`)
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
      ...project.related.map(
        (item) =>
          `- [${item.title}](${absoluteUrl(`/blog/${item.url}`)}) (${item.publishedAt})`,
      ),
    )
  }

  return lines.join('\n').trim()
}

export const renderTechMarkdown = (tech: TechStackItem) => {
  const lines = [
    tech.description,
    '',
    `**Since:** ${tech.since}`,
    `**Link:** ${tech.link}`,
  ]

  if (tech.intro.length) {
    lines.push('', '## Overview', '', ...tech.intro)
  }

  if (tech.experience.length) {
    lines.push('', '## Project experience', '')
    lines.push(...tech.experience.map((item) => `- ${item}`))
  }

  return lines.join('\n').trim()
}

export { featuredProjectSlugs, projects, techStack }
