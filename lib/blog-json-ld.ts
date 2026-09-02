type BlogPost = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  slug: string
  category?: string[]
  tech?: string[]
}

const siteUrl = 'https://gaboesquivel.com'

export const blogJsonLd = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.publishedAt,
  dateModified: post.publishedAt,
  description: post.summary,
  ...(post.image ? { image: `${siteUrl}${post.image}` } : {}),
  url: `${siteUrl}/blog/${post.slug}`,
  author: {
    '@type': 'Person',
    name: 'Gabo Esquivel',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Person',
    name: 'Gabo Esquivel',
    url: siteUrl,
  },
  keywords: [...(post.category ?? []), ...(post.tech ?? [])].join(', '),
})
