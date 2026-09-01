import { Mdx } from 'components/mdx'
import { indexTitle } from 'components/shared/page-layout'
import { allBlogs } from 'lib/blog'
import { blogJsonLd } from 'lib/blog-json-ld'
import { formatDate } from 'lib/utils'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { LatestPosts } from '../../../components/blog/latest-posts'

export function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const { slug } = await params
  const post = allBlogs.find((post) => post.slug === slug)
  if (!post) redirect('/blog')

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug: postSlug,
  } = post
  const ogImage = image
    ? `https://gaboesquivel.com${image}`
    : `https://gaboesquivel.com/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://gaboesquivel.com/blog/${postSlug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allBlogs.find((post) => post.slug === slug)

  if (!post) notFound()

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from generated post data.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd(post)),
        }}
      />
      <h1 className={`${indexTitle} text-balance`}>{post.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-2 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <Mdx code={post.body} />

      <LatestPosts title="More Articles" excludeSlug={post.slug} />
    </section>
  )
}
