type BlogPost = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  slug: string
}

export const blogJsonLd = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.publishedAt,
  dateModified: post.publishedAt,
  description: post.summary,
  image: post.image
    ? `https://gaboesquivel.com${post.image}`
    : `https://gaboesquivel.com/og?title=${post.title}`,
  url: `https://gaboesquivel.com/blog/${post.slug}`,
  author: {
    '@type': 'Person',
    name: 'Gabo Esquivel',
  },
})
