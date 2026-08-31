import { allBlogs } from 'contentlayer/generated'
import { projects } from 'gaboesquivel'
import type { MetadataRoute } from 'next'

const blogCategorySlugs = [
  'engineering',
  'web3',
  'defi',
  'ai',
  'ux',
  'finance',
  'community',
]

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
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const categoryUrls = blogCategorySlugs.map((category) => ({
    url: `${baseUrl}/blog/category/${category}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...primaryRoutes,
    ...secondaryRoutes,
    ...tertiaryRoutes,
    ...blogs,
    ...categoryUrls,
    ...projectUrls,
  ]
}
