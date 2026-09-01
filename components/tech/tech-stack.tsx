'use client'
import { IndexHeading, Prose, subHeading } from 'components/shared/page-layout'
import { ProjectsMasonry } from 'components/work/projects-masonry'
import type { TechStackItemWithProjects } from 'gaboesquivel'
import { LatestPosts } from '../blog/latest-posts'

export default function TechStack({
  tech,
}: {
  tech: TechStackItemWithProjects
}) {
  return (
    <div>
      <IndexHeading>{tech.name}</IndexHeading>
      <Prose>{tech.description}</Prose>
      {tech.intro.map((intro) => (
        <Prose key={intro}>{intro}</Prose>
      ))}
      <h3 className={subHeading}>Experience:</h3>
      {tech.experience.map((experience) => (
        <Prose key={experience}>{experience}</Prose>
      ))}
      <ProjectsMasonry projects={tech.projects} identifier={tech.name} />

      <LatestPosts title="Related Posts" tech={tech.tag} />
    </div>
  )
}
