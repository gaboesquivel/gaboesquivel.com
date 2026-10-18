import { describe, expect, test } from 'bun:test'
import {
  markdownApiRewritePath,
  skipMarkdownNegotiation,
} from './markdown-api-path'
import { markdownSiblingPath } from './markdown-sibling'

describe('markdown negotiation paths', () => {
  test('maps homepage to index.md sibling', () => {
    expect(markdownSiblingPath('/')).toBe('/index.md')
  })

  test('rewrites index.md to markdown API root', () => {
    expect(markdownApiRewritePath('/index.md')).toBe('/api/markdown')
  })

  test('rewrites about.md to markdown API', () => {
    expect(markdownApiRewritePath('/about.md')).toBe('/api/markdown/about')
  })

  test('skips static assets but not .md siblings', () => {
    expect(skipMarkdownNegotiation('/favicon.ico')).toBe(true)
    expect(skipMarkdownNegotiation('/about.md')).toBe(false)
  })
})
