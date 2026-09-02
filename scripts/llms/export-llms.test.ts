import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { experience, projects, techStack } from 'gaboesquivel'
import { renderBlogMarkdown } from './blog'
import { cvExports, renderCvMarkdown } from './cv'
import { blogSlugFromRelatedUrl, isValidProjectLink } from './format'
import { loadNarrativePages } from './pages'
import {
  featuredProjectSlugs,
  indexEvidenceSlugs,
  renderProjectMarkdown,
  renderTechMarkdown,
} from './projects'
import { canonicalizePath } from './routes'
import { validateSection } from './validate'

const PUBLIC_DIR = join(import.meta.dir, '../../public')

describe('llms export helpers', () => {
  test('canonicalizePath resolves aliases', () => {
    expect(canonicalizePath('/project/legalagent')).toBe('/project/legal-agent')
    expect(canonicalizePath('/tech/next-js')).toBe('/tech/nextjs')
    expect(canonicalizePath('/tech/evm')).toBe('/tech/evm')
  })

  test('isValidProjectLink rejects placeholders', () => {
    expect(isValidProjectLink('#')).toBe(false)
    expect(isValidProjectLink('https://example.com/foo')).toBe(false)
    expect(isValidProjectLink('https://bitlauncher.ai')).toBe(true)
  })

  test('blogSlugFromRelatedUrl strips absolute blog URLs', () => {
    expect(
      blogSlugFromRelatedUrl(
        'https://gaboesquivel.com/blog/2018-07-costa-rica-crypto-cantina',
      ),
    ).toBe('2018-07-costa-rica-crypto-cantina')
  })

  test('renderTechMarkdown omits encyclopedia fields', () => {
    const markdown = renderTechMarkdown({
      name: 'JavaScript',
      slug: 'javascript',
      tag: 'JavaScript',
      image: '/images/tech/javascript.png',
      description: 'Generic definition',
      link: 'https://developer.mozilla.org',
      since: '2009',
      experience: [
        'Used JavaScript in Staples and Gridium for building interactive web applications.',
      ],
    })
    expect(markdown).not.toContain('Since:')
    expect(markdown).not.toContain('versatile programming language')
    expect(markdown).toContain('## Implementation')
  })

  test('validateSection catches unbalanced fences', () => {
    const errors = validateSection({
      title: 'Broken',
      body: '```js\nconst x = 1',
    })
    expect(errors.some((error) => error.includes('unbalanced'))).toBe(true)
  })

  test('renderBlogMarkdown labels contracting post', () => {
    const markdown = renderBlogMarkdown({
      slug: '2025-11-1099-contracting',
      title: 'Why I Prefer 1099 Contracting',
      publishedAt: '2025-11-10',
      summary: 'Personal setup',
      body: 'Not legal advice in body.',
    })
    expect(markdown).toContain('personal contracting setup')
  })

  test('renderProjectMarkdown emits employment from experienceCompany', () => {
    const employment = experience.find((entry) => entry.company === 'Wink')
    const markdown = renderProjectMarkdown({
      title: 'Wink',
      slug: 'wink',
      description: 'Neobank app',
      role: 'Lead Engineer',
      tech: ['React Native'],
      type: ['mobile'],
      image: '/images/wink.png',
      achievements: [],
      story: [],
      order: 1,
      year: 2015,
      experienceCompany: 'Wink',
    })
    expect(employment).toBeDefined()
    expect(markdown).toContain('**Role:** Lead Engineer')
    expect(markdown).toContain(`**Employment:** ${employment?.duration}`)
    expect(markdown).not.toContain('**Primary year:**')
  })

  test('renderProjectMarkdown omits Role when the field is missing', () => {
    const project = projects.find((item) => !item.role)
    expect(project).toBeDefined()
    if (!project) return
    const markdown = renderProjectMarkdown(project)
    expect(markdown).not.toContain('**Role:**')
  })

  test('renderTechMarkdown includes description before evidence', () => {
    const ponder = techStack.find((item) => item.slug === 'ponder')
    expect(ponder?.description).toBeTruthy()
    if (!ponder?.description) return
    const markdown = renderTechMarkdown(ponder)
    expect(markdown).toContain(ponder.description)
    expect(markdown.indexOf(ponder.description)).toBeLessThan(
      markdown.indexOf('## Project evidence'),
    )
  })

  test('renderCvMarkdown omits unsupported Python from default CV', () => {
    const markdown = renderCvMarkdown()
    expect(markdown).not.toMatch(/\bPython\b/)
  })

  test('cvExports renders four CV sections', () => {
    expect(cvExports()).toHaveLength(4)
    expect(cvExports().map((item) => item.path)).toEqual([
      '/cv',
      '/cv?focus=ai',
      '/cv?focus=web3',
      '/cv?focus=fullstack',
    ])
  })

  test('indexEvidenceSlugs lists six featured projects', () => {
    const featured = projects
      .filter((project) => project.type.includes('featured'))
      .map((project) => project.slug)
      .sort()
    expect(indexEvidenceSlugs).toHaveLength(6)
    expect(indexEvidenceSlugs).toEqual([
      'legal-agent',
      'wink',
      'ztx',
      'bitlauncher',
      'opyn',
      'eos-costa-rica',
    ])
    expect(indexEvidenceSlugs).toEqual(featuredProjectSlugs)
    expect([...featuredProjectSlugs].sort()).toEqual(featured)
  })

  test('loadNarrativePages exports CapabilityPage related writing', () => {
    const fullstack = loadNarrativePages().find(
      (page) => page.path === '/fullstack',
    )
    expect(fullstack?.body).toContain('## Writing about product systems')
    expect(fullstack?.body).toContain('/blog/2024-07-viem-wagmi-ethers')
    expect(fullstack?.body).toContain('/cv?focus=fullstack')
  })

  test('loadNarrativePages emits W-2 hire copy only on /connect', () => {
    const connect = loadNarrativePages().find(
      (page) => page.path === '/connect',
    )
    const ai = loadNarrativePages().find((page) => page.path === '/ai')
    expect(connect?.body).toContain('Cannot work under W-2')
    expect(ai?.body).not.toContain('Cannot work under W-2')
  })

  test('homepage corpus includes focus and bio preview', () => {
    const home = loadNarrativePages().find((page) => page.path === '/')
    expect(home?.body).toContain('/startups')
    expect(home?.body).toContain('/institutions')
    expect(home?.body).toContain('/ai')
    expect(home?.body).toContain('/web3')
    expect(home?.body).toContain('/bio')
    expect(home?.body).toContain('/cv')
  })

  test('llms-full.txt omits archive blog post sections', () => {
    const full = readFileSync(join(PUBLIC_DIR, 'llms-full.txt'), 'utf8')
    expect(full).not.toContain(
      'Canonical: https://gaboesquivel.com/blog/2014-01-developing-software-in-costa-rica',
    )
    expect(full).not.toContain(
      'Canonical: https://gaboesquivel.com/blog/2019-03-ticoblockchain-2019-recap',
    )
    expect(full).not.toContain('50,000')
    expect(full).not.toContain('Series A')
    expect(full).not.toContain('RemixRun')
    expect(full).not.toContain('empowers lawyers')
  })
})
