import { describe, expect, test } from 'bun:test'
import { newestPosts } from './blog-order'

const posts = [
  { slug: 'old', publishedAt: '2024-07-20', title: 'Old' },
  { slug: 'mid', publishedAt: '2025-02-25', title: 'Mid' },
  { slug: 'new', publishedAt: '2026-02-10', title: 'New' },
]

describe('newestPosts', () => {
  test('sorts newest first', () => {
    expect(newestPosts({ posts }).map((post) => post.slug)).toEqual([
      'new',
      'mid',
      'old',
    ])
  })

  test('keeps date order when slugs are listed oldest first', () => {
    expect(
      newestPosts({ posts, slugs: ['old', 'mid', 'new'] }).map(
        (post) => post.slug,
      ),
    ).toEqual(['new', 'mid', 'old'])
  })

  test('does not mutate the source list', () => {
    const source = [...posts]
    newestPosts({ posts: source })
    expect(source.map((post) => post.slug)).toEqual(['old', 'mid', 'new'])
  })
})
