import { LatestPosts } from 'components/blog/latest-posts'
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
      <h1 className="mb-6 text-3xl font-bold tracking-tighter">{title}</h1>
      {intro.map((paragraph) => (
        <p key={paragraph} className="prose prose-neutral dark:prose-invert">
          {paragraph}
        </p>
      ))}

      {sections.map(({ heading, paragraphs, projectSlugs }) => (
        <div key={heading}>
          <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
            {heading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="prose prose-neutral dark:prose-invert"
            >
              {paragraph}
            </p>
          ))}
          <ProjectEvidence slugs={projectSlugs} />
        </div>
      ))}

      <LatestPosts title={writingTitle} slugs={postSlugs} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        See the work
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Explore the{' '}
        <Link href="/work" className="prose-link">
          project portfolio
        </Link>{' '}
        for implementation details, systems, and technology.
      </p>
    </section>
  )
}
