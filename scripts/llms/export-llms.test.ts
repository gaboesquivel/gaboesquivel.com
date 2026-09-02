import { describe, expect, test } from 'bun:test'
import { experience } from 'gaboesquivel'
import { renderBlogMarkdown } from './blog'
import { blogSlugFromRelatedUrl, isValidProjectLink } from './format'
import { renderProjectMarkdown, renderTechMarkdown } from './projects'
import { canonicalizePath } from './routes'
import { validateSection } from './validate'

describe('llms export helpers', () => {
  test('canonicalizePath resolves aliases', () => {
    expect(canonicalizePath('/project/legalagent')).toBe('/project/legal-agent')
    expect(canonicalizePath('/tech/next-js')).toBe('/tech/nextjs')
    expect(canonicalizePath('/tech/evm')).toBeNull()
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
    expect(markdown).toContain(`**Employment:** ${employment?.duration}`)
    expect(markdown).not.toContain('**Primary year:**')
  })
})
