import { techCategoryIds } from 'components/tech/categories'
import { projects, techStack } from 'gaboesquivel'
import { allBlogs } from 'lib/blog'
import { browseCategories, isArchivePost } from 'lib/blog-taxonomy'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gaboesquivel.com'

  const primaryRoutes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  const secondaryRoutes = [
    '/blog',
    '/tech',
    '/work',
    '/ai',
    '/web3',
    '/connect',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const tertiaryRoutes = [
    '/cv',
    '/bio',
    '/frontend',
    '/backend',
    '/fullstack',
    '/mobile',
    '/startups',
    '/institutions',
    '/lead',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const blogs = allBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: isArchivePost(post.publishedAt)
      ? ('yearly' as const)
      : ('monthly' as const),
    priority: isArchivePost(post.publishedAt) ? 0.3 : 0.6,
  }))

  const categoryUrls = browseCategories.map((category) => ({
    url: `${baseUrl}/blog/category/${category}`,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const techCategoryUrls = techCategoryIds
    .filter((id) => id !== 'featured')
    .map((category) => ({
      url: `${baseUrl}/tech/${category}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  const techUrls = techStack.map((tech) => ({
    url: `${baseUrl}/tech/${tech.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...primaryRoutes,
    ...secondaryRoutes,
    ...tertiaryRoutes,
    ...blogs,
    ...categoryUrls,
    ...projectUrls,
    ...techCategoryUrls,
    ...techUrls,
  ]
}
