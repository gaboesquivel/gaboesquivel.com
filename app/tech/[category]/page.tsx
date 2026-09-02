import { BlogPostsMasonry } from 'components/blog/blog-posts-masonry'
import { PageSection, Prose } from 'components/shared/page-layout'
import {
  isTechCategoryId,
  techCategoryFrame,
  techCategoryIds,
  techCategoryLabels,
} from 'components/tech/categories'
import { TechList } from 'components/tech/tech-list'
import TechStack from 'components/tech/tech-stack'
import {
  filterTechByCategory,
  getTechStackBySlug,
  techStack,
} from 'gaboesquivel'
import { allBlogs } from 'lib/blog'
import { pageMetadata } from 'lib/page-metadata'
import { isEmptyTech, visibleTechStack } from 'lib/tech-evidence'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const capabilityLinkLabel: Record<string, string> = {
  frontend: 'frontend engineering',
  ai: 'AI product engineering',
  web3: 'Web3 engineering',
  backend: 'backend engineering',
}

export default async function TechCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  if (category === 'featured') redirect('/tech')

  if (isTechCategoryId(category)) {
    const categoryTech = filterTechByCategory(techStack, category)
    const categoryTagsSet = new Set(categoryTech.map((t) => String(t.tag)))

    const filteredPosts = allBlogs
      .filter((post) =>
        post.tech?.some((techTag) => categoryTagsSet.has(techTag)),
      )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )

    const frame = techCategoryFrame({ category })

    return (
      <>
        {frame ? (
          <Prose>
            {frame.line}{' '}
            <Link href={frame.capabilityHref} className="prose-link">
              {capabilityLinkLabel[category]}
            </Link>{' '}
            goes deeper on the work.
          </Prose>
        ) : null}
        <TechList
          category={category}
          heading={`${techCategoryLabels[category]} technologies`}
        />
        {filteredPosts.length > 0 ? (
          <PageSection title={`Writing about ${techCategoryLabels[category]}`}>
            <BlogPostsMasonry posts={filteredPosts} identifier={category} />
          </PageSection>
        ) : null}
      </>
    )
  }

  const tech = getTechStackBySlug(category)
  if (!tech || isEmptyTech(tech)) redirect('/tech')
  return <TechStack tech={tech} />
}

export function generateStaticParams() {
  return [
    ...techCategoryIds
      .filter((category) => category !== 'featured')
      .map((category) => ({ category })),
    ...visibleTechStack(techStack).map((tech) => ({ category: tech.slug })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params

  if (isTechCategoryId(category)) {
    const label = techCategoryLabels[category]
    const title =
      category === 'all'
        ? 'All technologies | Gabo Esquivel'
        : `${label} technologies | Gabo Esquivel`
    const description = `${label} technologies used across project work, with related evidence and writing.`

    return pageMetadata({ title, description })
  }

  const tech = getTechStackBySlug(category)
  if (!tech)
    return pageMetadata({
      title: 'Not found | Gabo Esquivel',
      description: 'Technology not found.',
    })

  return pageMetadata({
    title: `${tech.name} | Tech Stack | Gabo Esquivel`,
    description: tech.description,
  })
}
