import { allBlogs } from 'contentlayer/generated'
import { getTechStackBySlug } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

export default async function BlogTechPage({
  params,
}: {
  params: { tech: string }
}) {
  const tech = params.tech
  const techStack = getTechStackBySlug(tech)
  if (!techStack) redirect('/blog')
  return (
    <section>
      <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
        <Balancer>Gabo's Blog: {techStack?.name}</Balancer>
      </h2>
      {allBlogs
        .filter((post) => post.tech?.includes(techStack.tag))
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col mb-4 space-y-1"
            href={`/blog/${post.slug}`}
          >
            <ul className="flex flex-col w-full">
              <li className="tracking-tight text-neutral-900 dark:text-neutral-100 hover:text-accent">
                {post.title}{' '}
                <span className="text-xs text-neutral-400">
                  |{' '}
                  {new Date(post.publishedAt).toLocaleString('en-US', {
                    year: 'numeric',
                  })}
                </span>
              </li>
            </ul>
          </Link>
        ))}
    </section>
  )
}

export async function generateStaticParams() {
  // Get unique tech tags from all blog posts
  const techTags = new Set<string>()
  for (const post of allBlogs) {
    if (post.tech) {
      for (const tech of post.tech) {
        techTags.add(tech)
      }
    }
  }
  return Array.from(techTags).map((tech) => ({
    tech,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { tech: string }
}): Promise<Metadata> {
  const techStack = getTechStackBySlug(params.tech)

  if (!techStack)
    return {
      title: 'Blog',
      description:
        'Read my thoughts on software development, design, and more.',
    }

  return {
    title: `${techStack.name} Blog Posts - Gabo Esquivel`,
    description: `Read my articles and thoughts about ${techStack.name}. ${techStack.description}`,
  }
}
