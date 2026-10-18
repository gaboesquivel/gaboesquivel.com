import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects, techStack } from 'gaboesquivel'
import { techCategoryIds } from '../../components/tech/categories'
import { browseCategories } from '../../lib/blog-taxonomy'
import { canonicalizePath } from '../../lib/canonical-path'
import { visibleTechStack } from '../../lib/tech-evidence'
import { workTypeOptions } from '../../lib/work-types'

export { canonicalizePath }

const CONTENT_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../content',
)

export const buildRouteManifest = () => {
  const paths = new Set<string>([
    '/',
    '/bio',
    '/ai',
    '/web3',
    '/fullstack',
    '/frontend',
    '/backend',
    '/mobile',
    '/startups',
    '/institutions',
    '/lead',
    '/connect',
    '/cv',
    '/cv?focus=ai',
    '/cv?focus=web3',
    '/cv?focus=fullstack',
    '/work',
    '/tech',
    '/blog',
    '/explore',
    '/about',
    '/contact',
    '/privacy',
  ])

  for (const project of projects) paths.add(`/project/${project.slug}`)
  for (const tech of visibleTechStack(techStack))
    paths.add(`/tech/${tech.slug}`)

  for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx')))
    paths.add(`/blog/${file.replace(/\.mdx$/, '')}`)

  for (const category of browseCategories)
    paths.add(`/blog/category/${category}`)

  for (const type of workTypeOptions)
    paths.add(type === 'featured' ? '/work' : `/work/${type}`)

  for (const id of techCategoryIds)
    if (id !== 'featured') paths.add(`/tech/${id}`)

  return paths
}

export const rewriteInternalPaths = (text: string, manifest: Set<string>) =>
  text.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (match, label, path) => {
    const canonical = canonicalizePath(path)
    if (!canonical) return label
    if (!manifest.has(canonical)) return match
    const url = `https://gaboesquivel.com${canonical}`
    return `[${label}](${url})`
  })
