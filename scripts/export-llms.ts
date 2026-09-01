import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { featuredLandingPages, landingPageGroups } from '../lib/landing-pages'
import { isArchivePost, loadBlogPosts, renderBlogMarkdown } from './llms/blog'
import { renderCvMarkdown } from './llms/cv'
import {
  BASE_URL,
  estimateTokens,
  joinSections,
  llmsListItem,
  wrapSection,
} from './llms/format'
import { loadNarrativePages } from './llms/pages'
import {
  featuredProjectSlugs,
  renderProjectMarkdown,
  renderTechMarkdown,
  sortProjects,
  sortTech,
} from './llms/projects'

const PUBLIC_DIR = join(import.meta.dir, '../public')

const blogCategorySlugs = [
  'engineering',
  'web3',
  'defi',
  'ai',
  'ux',
  'finance',
  'community',
]

const workTypeSlugs = [
  'featured',
  'ai',
  'web3',
  'mobile',
  'fullstack',
  'startup',
  'institution',
  'all',
]

const techCategorySlugs = [
  'web3',
  'ai',
  'frontend',
  'backend',
  'cloud-devops',
  'all',
]

const buildLlmsIndex = ({
  projects,
  currentPosts,
  archivePosts,
}: {
  projects: ReturnType<typeof sortProjects>
  currentPosts: ReturnType<typeof loadBlogPosts>
  archivePosts: ReturnType<typeof loadBlogPosts>
}) => {
  const landingPages = [
    ...featuredLandingPages,
    ...landingPageGroups.flatMap((group) => group.pages),
  ]

  const uniquePages = [
    ...new Map(landingPages.map((page) => [page.href, page])).values(),
  ]

  const pageLines = uniquePages.map((page) =>
    llmsListItem({
      name: page.title,
      url: `${BASE_URL}${page.href === '/' ? '' : page.href}`,
      note: page.description,
    }),
  )

  const featured = projects.filter((project) =>
    featuredProjectSlugs.includes(project.slug),
  )
  const rest = projects.filter(
    (project) => !featuredProjectSlugs.includes(project.slug),
  )

  const workLines = [
    ...featured.map((project) =>
      llmsListItem({
        name: project.title,
        url: `${BASE_URL}/project/${project.slug}`,
        note: project.description.split('\n')[0],
      }),
    ),
    ...rest.map((project) =>
      llmsListItem({
        name: project.title,
        url: `${BASE_URL}/project/${project.slug}`,
        note: project.description.split('\n')[0],
      }),
    ),
  ]

  const writingLines = currentPosts.map((post) =>
    llmsListItem({
      name: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      note: post.summary,
    }),
  )

  const optionalLines = [
    llmsListItem({
      name: 'Full site markdown',
      url: `${BASE_URL}/llms-full.txt`,
      note: 'Entire site content in one markdown file for LLM ingestion.',
    }),
    ...archivePosts.map((post) =>
      llmsListItem({
        name: post.title,
        url: `${BASE_URL}/blog/${post.slug}`,
        note: post.summary,
      }),
    ),
    ...blogCategorySlugs.map((category) =>
      llmsListItem({
        name: `Blog: ${category}`,
        url: `${BASE_URL}/blog/category/${category}`,
        note: 'Category index of blog posts.',
      }),
    ),
    ...workTypeSlugs.map((type) =>
      llmsListItem({
        name: `Work: ${type}`,
        url: `${BASE_URL}/work/${type}`,
        note: 'Filtered project index.',
      }),
    ),
    ...techCategorySlugs.map((category) =>
      llmsListItem({
        name: `Tech: ${category}`,
        url: `${BASE_URL}/tech/${category}`,
        note: 'Technology index by area.',
      }),
    ),
    llmsListItem({
      name: 'CV (AI focus)',
      url: `${BASE_URL}/cv?focus=ai`,
      note: 'Focused CV variant highlighting AI product work.',
    }),
    llmsListItem({
      name: 'CV (Web3 focus)',
      url: `${BASE_URL}/cv?focus=web3`,
      note: 'Focused CV variant highlighting Web3 and blockchain work.',
    }),
    llmsListItem({
      name: 'CV (Full-stack focus)',
      url: `${BASE_URL}/cv?focus=fullstack`,
      note: 'Focused CV variant highlighting full-stack product work.',
    }),
    llmsListItem({
      name: 'Explore',
      url: `${BASE_URL}/explore`,
      note: 'Site map grouped by domain, capability, and career context.',
    }),
  ]

  return [
    '# Gabo Esquivel',
    '',
    '> I build useful and delightful software products. Product engineer based in Costa Rica, working US Mountain Time.',
    '',
    'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W2. Fluent in English, Spanish, Portuguese, and Italian.',
    '',
    `For the complete site in one file, use [llms-full.txt](${BASE_URL}/llms-full.txt).`,
    '',
    '## Pages',
    ...pageLines,
    '',
    '## Work',
    ...workLines,
    '',
    '## Writing',
    ...writingLines,
    '',
    '## Optional',
    ...optionalLines,
    '',
  ].join('\n')
}

const buildLlmsFull = ({
  pages,
  projects,
  tech,
  currentPosts,
  archivePosts,
}: {
  pages: ReturnType<typeof loadNarrativePages>
  projects: ReturnType<typeof sortProjects>
  tech: ReturnType<typeof sortTech>
  currentPosts: ReturnType<typeof loadBlogPosts>
  archivePosts: ReturnType<typeof loadBlogPosts>
}) => {
  const header = [
    '# Gabo Esquivel',
    '',
    '> I build useful and delightful software products. Product engineer based in Costa Rica, working US Mountain Time.',
    '',
    `Canonical index: ${BASE_URL}/llms.txt`,
    '',
    'This file contains the full gaboesquivel.com content in markdown for LLM ingestion.',
    '',
  ].join('\n')

  const pageSections = pages.map((page) =>
    wrapSection({ title: page.title, path: page.path, body: page.body }),
  )

  pageSections.push(
    wrapSection({
      title: 'Curriculum Vitae',
      path: '/cv',
      body: renderCvMarkdown(),
    }),
  )

  const projectSections = projects.map((project) =>
    wrapSection({
      title: project.title,
      path: `/project/${project.slug}`,
      body: renderProjectMarkdown(project),
    }),
  )

  const techSections = tech.map((item) =>
    wrapSection({
      title: item.name,
      path: `/tech/${item.slug}`,
      body: renderTechMarkdown(item),
    }),
  )

  const currentBlogSections = currentPosts.map((post) =>
    wrapSection({
      title: post.title,
      path: `/blog/${post.slug}`,
      body: renderBlogMarkdown(post),
    }),
  )

  const archiveBlogSections = archivePosts.map((post) =>
    wrapSection({
      title: post.title,
      path: `/blog/${post.slug}`,
      body: renderBlogMarkdown(post),
    }),
  )

  return joinSections([
    header,
    ...pageSections,
    ...projectSections,
    ...techSections,
    ...currentBlogSections,
    ...archiveBlogSections,
  ])
}

const posts = loadBlogPosts()
const currentPosts = posts.filter((post) => !isArchivePost(post))
const archivePosts = posts.filter((post) => isArchivePost(post))
const pages = loadNarrativePages()
const projects = sortProjects()
const tech = sortTech()

const llmsIndex = buildLlmsIndex({ projects, currentPosts, archivePosts })
const llmsFull = buildLlmsFull({
  pages,
  projects,
  tech,
  currentPosts,
  archivePosts,
})

mkdirSync(PUBLIC_DIR, { recursive: true })

const indexPath = join(PUBLIC_DIR, 'llms.txt')
const fullPath = join(PUBLIC_DIR, 'llms-full.txt')

writeFileSync(indexPath, llmsIndex, 'utf8')
writeFileSync(fullPath, llmsFull, 'utf8')

console.log(`Wrote ${indexPath} (${llmsIndex.length} bytes)`)
console.log(`Wrote ${fullPath} (${llmsFull.length} bytes)`)
console.log(
  `Estimated tokens — index: ~${estimateTokens(llmsIndex)}, full: ~${estimateTokens(llmsFull)}`,
)
console.log(
  `Sections — pages: ${pages.length + 1}, projects: ${projects.length}, tech: ${tech.length}, blog: ${posts.length}`,
)
