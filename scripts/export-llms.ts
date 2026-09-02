import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { LLMS_PREAMBLE_FULL, LLMS_PREAMBLE_INDEX } from './llms/authority'
import {
  isArchivePostFromBlog,
  loadBlogPosts,
  renderBlogMarkdown,
} from './llms/blog'
import { cvExports, renderCvMarkdown } from './llms/cv'
import {
  BASE_URL,
  estimateTokens,
  joinSections,
  llmsListItem,
  wrapSection,
} from './llms/format'
import { loadNarrativePages } from './llms/pages'
import {
  indexEvidenceSlugs,
  renderProjectMarkdown,
  renderTechMarkdown,
  sortProjects,
  sortTech,
} from './llms/projects'
import { buildRouteManifest, rewriteInternalPaths } from './llms/routes'
import { validateCorpus } from './llms/validate'

const PUBLIC_DIR = join(import.meta.dir, '../public')
const INDEX_TOKEN_BUDGET = 8000

const canonicalRoutes = [
  { path: '/', label: 'Home' },
  { path: '/bio', label: 'Career story' },
  { path: '/ai', label: 'AI product engineering' },
  { path: '/web3', label: 'Web3 product engineering' },
  { path: '/fullstack', label: 'Full-stack product engineering' },
  { path: '/frontend', label: 'Frontend engineering' },
  { path: '/backend', label: 'Backend engineering' },
  { path: '/mobile', label: 'Mobile engineering' },
  { path: '/startups', label: 'Startup product engineering' },
  { path: '/institutions', label: 'Institutional software engineering' },
  { path: '/lead', label: 'Technical leadership' },
  { path: '/cv', label: 'Curriculum vitae' },
  { path: '/connect', label: 'Connect' },
  { path: '/work', label: 'Work portfolio' },
  { path: '/tech', label: 'Technology stack' },
  { path: '/blog', label: 'Writing' },
]

const buildLlmsIndex = ({
  projects,
  currentPosts,
}: {
  projects: ReturnType<typeof sortProjects>
  currentPosts: ReturnType<typeof loadBlogPosts>
}) => {
  const evidenceLines = indexEvidenceSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug)
    return project
      ? [
          llmsListItem({
            name: project.title,
            url: `${BASE_URL}/project/${project.slug}`,
            note: project.description.split('\n')[0],
          }),
        ]
      : []
  })

  const routeLines = canonicalRoutes.map((route) =>
    llmsListItem({
      name: route.label,
      url: `${BASE_URL}${route.path}`,
    }),
  )

  const writingLines = currentPosts.slice(0, 12).map((post) =>
    llmsListItem({
      name: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      note: post.summary,
    }),
  )

  return [
    '# Gabo Esquivel',
    '',
    '> I build useful and delightful software products. Product engineer based in Costa Rica, working US Mountain Time.',
    '',
    'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Fluent in English, Spanish, Portuguese, and Italian.',
    '',
    LLMS_PREAMBLE_INDEX,
    '',
    `Full corpus: [llms-full.txt](${BASE_URL}/llms-full.txt)`,
    '',
    '## Canonical routes',
    ...routeLines,
    '',
    '## Strongest evidence',
    ...evidenceLines,
    '',
    '## Recent writing',
    ...writingLines,
    '',
  ].join('\n')
}

const buildLlmsFull = ({
  pages,
  projects,
  tech,
  currentPosts,
  manifest,
}: {
  pages: ReturnType<typeof loadNarrativePages>
  projects: ReturnType<typeof sortProjects>
  tech: ReturnType<typeof sortTech>
  currentPosts: ReturnType<typeof loadBlogPosts>
  manifest: Set<string>
}) => {
  const header = [
    '# Gabo Esquivel',
    '',
    '> I build useful and delightful software products. Product engineer based in Costa Rica, working US Mountain Time.',
    '',
    `Canonical index: ${BASE_URL}/llms.txt`,
    '',
    LLMS_PREAMBLE_FULL,
    '',
  ].join('\n')

  const rewrite = (body: string) => rewriteInternalPaths(body, manifest)

  const pageSections = pages.map((page) =>
    wrapSection({
      title: page.title,
      path: page.path,
      body: rewrite(page.body),
    }),
  )

  pageSections.push(
    ...cvExports().map((cv) =>
      wrapSection({
        title: cv.title,
        path: cv.path,
        body: rewrite(renderCvMarkdown({ focus: cv.focus })),
      }),
    ),
  )

  const projectSections = projects.map((project) =>
    wrapSection({
      title: project.title,
      path: `/project/${project.slug}`,
      body: rewrite(renderProjectMarkdown(project)),
    }),
  )

  const techSections = tech.map((item) =>
    wrapSection({
      title: item.name,
      path: `/tech/${item.slug}`,
      body: rewrite(renderTechMarkdown(item)),
    }),
  )

  const currentBlogSections = currentPosts.map((post) =>
    wrapSection({
      title: post.title,
      path: `/blog/${post.slug}`,
      body: rewrite(renderBlogMarkdown(post)),
    }),
  )

  return joinSections([
    header,
    ...pageSections,
    ...projectSections,
    ...techSections,
    ...currentBlogSections,
  ])
}

const posts = loadBlogPosts()
const currentPosts = posts.filter((post) => !isArchivePostFromBlog(post))
const pages = loadNarrativePages()
const projects = sortProjects()
const tech = sortTech()
const manifest = buildRouteManifest()

const llmsIndex = buildLlmsIndex({ projects, currentPosts })
const llmsFull = buildLlmsFull({
  pages,
  projects,
  tech,
  currentPosts,
  manifest,
})

const sectionsForValidation = [
  { title: 'Index', body: llmsIndex },
  ...pages.map((page) => ({ title: page.title, body: page.body })),
  ...cvExports().map((cv) => ({
    title: cv.title,
    body: renderCvMarkdown({ focus: cv.focus }),
  })),
  ...projects.map((project) => ({
    title: project.title,
    body: renderProjectMarkdown(project),
  })),
  ...tech.map((item) => ({
    title: item.name,
    body: renderTechMarkdown(item),
  })),
  ...currentPosts.map((post) => ({
    title: post.title,
    body: renderBlogMarkdown(post),
  })),
]

validateCorpus(sectionsForValidation)

mkdirSync(PUBLIC_DIR, { recursive: true })

const indexPath = join(PUBLIC_DIR, 'llms.txt')
const fullPath = join(PUBLIC_DIR, 'llms-full.txt')

writeFileSync(indexPath, llmsIndex, 'utf8')
writeFileSync(fullPath, llmsFull, 'utf8')

const indexTokens = estimateTokens(llmsIndex)

console.log(`Wrote ${indexPath} (${llmsIndex.length} bytes)`)
console.log(`Wrote ${fullPath} (${llmsFull.length} bytes)`)
console.log(
  `Estimated tokens — index: ~${indexTokens}, full: ~${estimateTokens(llmsFull)}`,
)
console.log(
  `Sections — pages: ${pages.length + cvExports().length}, projects: ${projects.length}, tech: ${tech.length}, blog: ${currentPosts.length}`,
)

if (indexTokens > INDEX_TOKEN_BUDGET)
  console.warn(
    `Warning: llms.txt exceeds token budget (~${INDEX_TOKEN_BUDGET}): ~${indexTokens}`,
  )
