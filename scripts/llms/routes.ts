import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { projects, techStack } from 'gaboesquivel'
import { browseCategories } from '../../lib/blog-taxonomy'
import { visibleTechStack } from '../../lib/tech-evidence'

const CONTENT_DIR = join(import.meta.dir, '../../content')

const ROUTE_ALIASES: Record<string, string> = {
  '/project/legalagent': '/project/legal-agent',
  '/tech/next-js': '/tech/nextjs',
  '/tech/node-js': '/tech/nodejs',
  '/tech/react': '/tech/reactjs',
}

const UNRESOLVED_PATHS = new Set([
  '/tech/evm',
  '/tech/eos',
  '/tech/polygon',
  '/tech/walletconnect',
])

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
    '/work',
    '/tech',
    '/blog',
    '/explore',
  ])

  for (const project of projects) paths.add(`/project/${project.slug}`)
  for (const tech of visibleTechStack(techStack))
    paths.add(`/tech/${tech.slug}`)

  for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx')))
    paths.add(`/blog/${file.replace(/\.mdx$/, '')}`)

  for (const category of browseCategories)
    paths.add(`/blog/category/${category}`)

  return paths
}

export const canonicalizePath = (path: string) => {
  const normalized = path.split('?')[0]
  if (UNRESOLVED_PATHS.has(normalized)) return null
  return ROUTE_ALIASES[normalized] ?? normalized
}

export const rewriteInternalPaths = (text: string, manifest: Set<string>) =>
  text.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (match, label, path) => {
    const canonical = canonicalizePath(path)
    if (!canonical) return label
    if (!manifest.has(canonical)) return match
    const url = `https://gaboesquivel.com${canonical}`
    return `[${label}](${url})`
  })
