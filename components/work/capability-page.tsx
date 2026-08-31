import { LatestPosts } from 'components/blog/latest-posts'
import { PageSection, PageTitle, Prose } from 'components/shared/page-layout'
import Link from 'next/link'
import { ProjectEvidence } from './project-evidence'

export function CapabilityPage({
  title,
  intro,
  sections,
  postSlugs,
  writingTitle,
}: {
  title: string
  intro: string[]
  sections: Array<{
    heading: string
    paragraphs: string[]
    projectSlugs: string[]
  }>
  postSlugs: string[]
  writingTitle: string
}) {
  return (
    <section>
      <PageTitle>{title}</PageTitle>
      {intro.map((paragraph) => (
        <Prose key={paragraph}>{paragraph}</Prose>
      ))}

      {sections.map(({ heading, paragraphs, projectSlugs }) => (
        <PageSection key={heading} title={heading}>
          {paragraphs.map((paragraph) => (
            <Prose key={paragraph}>{paragraph}</Prose>
          ))}
          <ProjectEvidence slugs={projectSlugs} />
        </PageSection>
      ))}

      <LatestPosts title={writingTitle} slugs={postSlugs} />

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
