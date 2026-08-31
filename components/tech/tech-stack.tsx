'use client'
import { ProjectsMasonry } from 'components/work/projects-masonry'
import type { TechStackItemWithProjects } from 'gaboesquivel'
import Balancer from 'react-wrap-balancer'
import { LatestPosts } from '../blog/latest-posts'

export default function TechStack({
  tech,
}: { tech: TechStackItemWithProjects }) {
  return (
    <div>
      <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
        <Balancer>{tech.name}</Balancer>
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        {tech.description}
      </p>
      {tech.intro.map((intro) => (
        <p className="prose prose-neutral dark:prose-invert" key={intro}>
          {intro}
        </p>
      ))}
      <h3 className="mb-4 font-bold text-xl">Experience:</h3>
      {tech.experience.map((experience) => (
        <p className="prose prose-neutral dark:prose-invert" key={experience}>
          {experience}
        </p>
      ))}
      <ProjectsMasonry projects={tech.projects} identifier={tech.name} />

      <LatestPosts title="Related Posts" tech={tech.tag} />
    </div>
  )
}
