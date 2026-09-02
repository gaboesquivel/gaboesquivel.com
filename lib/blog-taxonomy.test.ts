import { describe, expect, test } from 'bun:test'
import { techStack } from 'gaboesquivel'
import { getRelatedPosts } from './blog-related'
import {
  browseCategories,
  isArchivePost,
  isBrowseCategory,
  isKnownCategory,
  toBrowseSlug,
} from './blog-taxonomy'

describe('blog taxonomy', () => {
  test('browse categories keep nav order', () => {
    expect(browseCategories).toEqual([
      'engineering',
      'ai',
      'ux',
      'web3',
      'defi',
      'community',
    ])
  })

  test('maps AI aliases to ai browse slug', () => {
    expect(toBrowseSlug('Artificial Intelligence')).toBe('ai')
    expect(toBrowseSlug('AI')).toBe('ai')
    expect(toBrowseSlug('ai')).toBe('ai')
  })

  test('finance is known but not a browse category', () => {
    expect(isKnownCategory('Finance')).toBe(true)
    expect(toBrowseSlug('Finance')).toBeNull()
    expect(browseCategories.includes('finance' as never)).toBe(false)
  })

  test('isBrowseCategory accepts only browse slugs', () => {
    expect(isBrowseCategory('web3')).toBe(true)
    expect(isBrowseCategory('finance')).toBe(false)
    expect(isBrowseCategory('foobar')).toBe(false)
  })

  test('isArchivePost uses publishedAt year before 2020', () => {
    expect(isArchivePost('2019-03-01')).toBe(true)
    expect(isArchivePost('2020-01-01')).toBe(false)
  })

  test('rejects unknown categories in allowlist', () => {
    expect(isKnownCategory('Not A Category')).toBe(false)
  })
})

describe('blog related posts', () => {
  test('prefers shared browse category and tech overlap', () => {
    const post = {
      slug: 'current',
      title: 'Current',
      publishedAt: '2026-01-01',
      summary: 'Current post',
      category: ['Web3', 'DeFi'],
      tech: ['Ethereum'],
      body: '',
    }
    const related = getRelatedPosts({
      post,
      allPosts: [
        post,
        {
          slug: 'shared-topic',
          title: 'Shared',
          publishedAt: '2025-12-01',
          summary: 'Shared topic',
          category: ['Web3'],
          tech: ['Ethereum'],
          body: '',
        },
        {
          slug: 'unrelated',
          title: 'Unrelated',
          publishedAt: '2026-02-01',
          summary: 'Unrelated',
          category: ['Community'],
          tech: ['Docker'],
          body: '',
        },
      ],
    })

    expect(related.map((item) => item.slug)).toEqual(['shared-topic'])
  })
})

describe('blog tech redirects', () => {
  test('maps tags and slugs to tech pages', () => {
    const react = techStack.find((item) => item.slug === 'reactjs')
    const aiSdk = techStack.find((item) => item.tag === 'AI SDK')
    expect(react?.tag).toBe('ReactJS')
    expect(aiSdk?.slug).toBe('ai-sdk')
  })
})
