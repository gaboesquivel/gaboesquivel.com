import { loadBlogPosts, renderBlogMarkdown } from './blog'
import { cvExports, renderCvMarkdown } from './cv'
import { BASE_URL, wrapSection } from './format'
import { loadNarrativePages } from './pages'
import {
  renderProjectMarkdown,
  renderTechMarkdown,
  sortProjects,
  sortTech,
} from './projects'
import {
  buildRouteManifest,
  canonicalizePath,
  rewriteInternalPaths,
} from './routes'

export const markdownNotFoundBody = `# Page not found

This address isn't a page on the site. Home is the overview, and explore is the directory of every page.

- [Home](${BASE_URL}/)
- [Explore](${BASE_URL}/explore)
- [llms.txt](${BASE_URL}/llms.txt)
- [Sitemap](${BASE_URL}/sitemap.xml)
`

const resolveCvMarkdown = (search: string) => {
  const focus = new URLSearchParams(search).get('focus')
  const routeKey = focus && focus !== 'full' ? `/cv?focus=${focus}` : '/cv'
  const cv = cvExports().find((item) => item.path === routeKey)
  if (!cv) return null
  const manifest = buildRouteManifest()
  const body = rewriteInternalPaths(
    renderCvMarkdown({ focus: cv.focus }),
    manifest,
  )
  return wrapSection({ title: cv.title, path: cv.path, body })
}

export const getMarkdownForPath = ({
  pathname,
  search = '',
}: {
  pathname: string
  search?: string
}) => {
  const path = pathname === '' ? '/' : canonicalizePath(pathname)
  const manifest = buildRouteManifest()
  const routeKey = search
    ? `${path}?${new URLSearchParams(search).toString()}`
    : path

  if (path === '/cv') return resolveCvMarkdown(search)

  if (!manifest.has(path) && !manifest.has(routeKey)) return null

  if (path.startsWith('/project/')) {
    const slug = path.slice('/project/'.length)
    const project = sortProjects().find((item) => item.slug === slug)
    if (!project) return null
    const body = rewriteInternalPaths(renderProjectMarkdown(project), manifest)
    return wrapSection({
      title: project.title,
      path: `/project/${project.slug}`,
      body,
    })
  }

  if (path.startsWith('/tech/')) {
    const slug = path.slice('/tech/'.length)
    const tech = sortTech().find((item) => item.slug === slug)
    if (!tech) return null
    const body = rewriteInternalPaths(renderTechMarkdown(tech), manifest)
    return wrapSection({ title: tech.name, path: `/tech/${tech.slug}`, body })
  }

  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length)
    if (slug.startsWith('category/')) return null
    const post = loadBlogPosts().find((item) => item.slug === slug)
    if (!post) return null
    const body = rewriteInternalPaths(renderBlogMarkdown(post), manifest)
    return wrapSection({
      title: post.title,
      path: `/blog/${post.slug}`,
      body,
    })
  }

  const page = loadNarrativePages().find((item) => item.path === path)
  if (!page) return null
  const body = rewriteInternalPaths(page.body, manifest)
  return wrapSection({ title: page.title, path: page.path, body })
}
