import { LatestPosts } from 'components/blog/latest-posts'
import { PageSection, PageTitle, Prose } from 'components/shared/page-layout'
import { ProjectsMasonry } from 'components/work/projects-masonry'
import type { TechStackItemWithProjects } from 'gaboesquivel'
import { sortProjectsForTech } from 'lib/tech-evidence'
import Link from 'next/link'

const officialLinkLabel = (url: string) =>
  url.replace(/^https?:\/\//, '').replace(/\/$/, '')

export default function TechStack({
  tech,
}: {
  tech: TechStackItemWithProjects
}) {
  const projects = sortProjectsForTech({
    projects: tech.projects,
    experience: tech.experience,
  })

  return (
    <section>
      <PageTitle>{tech.name}</PageTitle>
      <Prose>{tech.description}</Prose>

      {tech.experience.length > 0 ? (
        <PageSection title="Implementation">
          {tech.experience.map((item) => (
            <Prose key={item}>{item}</Prose>
          ))}
        </PageSection>
      ) : null}

      <ProjectsMasonry
        projects={projects}
        identifier={tech.slug}
        preserveOrder
      />

      <LatestPosts title="Related posts" tech={tech.tag} />

      {tech.link ? (
        <p className="mt-6 text-sm text-neutral-500">
          <a
            href={tech.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {officialLinkLabel(tech.link)}
          </a>
        </p>
      ) : null}

      <PageSection title="See the work">
        <Prose>
          Explore the{' '}
          <Link href="/work" className="prose-link">
            project portfolio
          </Link>{' '}
          for implementation details, systems, and technology.
        </Prose>
      </PageSection>
    </section>
  )
}
