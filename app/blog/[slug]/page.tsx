import { Mdx } from 'components/mdx'
import { indexTitle } from 'components/shared/page-layout'
import { allBlogs } from 'contentlayer/generated'
import { formatDate } from 'lib/utils'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { LatestPosts } from '../../../components/blog/latest-posts'

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug)
  if (!post) redirect('/blog')

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
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
      url: `https://gaboesquivel.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from generated post data.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      />
      <h1 className={indexTitle}>
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-2 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <Mdx code={post.body.code} />

      <LatestPosts title="More Articles" excludeSlug={post.slug} />
    </section>
  )
}
