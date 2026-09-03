import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isArchivePost } from '../../lib/blog-taxonomy'
import { absoluteUrl } from './format'
import { canonicalizePath } from './routes'

const CONTENT_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../content',
)

const CONTRACTING_SLUG = '2025-11-1099-contracting'

export type BlogPost = {
  slug: string
  title: string
  publishedAt: string
  summary: string
  category?: string[]
  tech?: string[]
  body: string
}

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null

  const [, frontmatter, body] = match
  const fields: Record<string, string | string[]> = {}

  for (const line of frontmatter.split('\n')) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/)
    if (!keyMatch) continue

    const [, key, value] = keyMatch
    if (value.startsWith('['))
      fields[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    else fields[key] = value.replace(/^['"]|['"]$/g, '')
  }

  return { fields, body }
}

const normalizeMdxBody = (body: string) =>
  body
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(
      /<div[^>]*className="[^"]*(?:image-container|min-h-\[[^\]]+\])[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/div>/g,
      '$1',
    )
    .replace(/<div className="my-4"><\/div>/g, '')
    .replace(
      /<YouTube\s+id="([^"]+)"(?:\s+title="([^"]*)")?\s*\/>/g,
      (_, id, title) =>
        `[${title || 'YouTube video'}](https://www.youtube.com/watch?v=${id})`,
    )
    .replace(
      /<Vimeo\s+id="([^"]+)"(?:\s+title="([^"]*)")?\s*\/>/g,
      (_, id, title) => `[${title || 'Vimeo video'}](https://vimeo.com/${id})`,
    )
    .replace(
      /!\[([^\]]*)\]\((\/[^)]+)\)/g,
      (_, alt, path) => `![${alt}](${absoluteUrl(path)})`,
    )
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const rewriteBlogLinks = (text: string) =>
  text.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (_match, label, path) => {
    const canonical = canonicalizePath(path)
    if (!canonical) return label
    return `[${label}](${absoluteUrl(canonical)})`
  })

export const loadBlogPosts = () => {
  const files = readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .sort((a, b) => b.localeCompare(a))

  return files.flatMap((file) => {
    const raw = readFileSync(join(CONTENT_DIR, file), 'utf8')
    const parsed = parseFrontmatter(raw)
    if (!parsed) return []

    const slug = file.replace(/\.mdx$/, '')
    const { fields, body } = parsed

    return [
      {
        slug,
        title: String(fields.title ?? slug),
        publishedAt: String(fields.publishedAt ?? ''),
        summary: String(fields.summary ?? ''),
        category: Array.isArray(fields.category) ? fields.category : undefined,
        tech: Array.isArray(fields.tech) ? fields.tech : undefined,
        body: normalizeMdxBody(body),
      },
    ]
  })
}

export const isArchivePostFromBlog = (post: BlogPost) =>
  isArchivePost(post.publishedAt)

export const renderBlogMarkdown = (post: BlogPost) => {
  const historical = isArchivePostFromBlog(post)
  const meta = [
    `**Published:** ${post.publishedAt}`,
    historical
      ? '**Status:** historical (views and technology at time of publication)'
      : '',
    post.slug === CONTRACTING_SLUG
      ? '**Content type:** personal contracting setup (not legal or tax guidance; see /connect for engagement)'
      : '',
    post.summary ? `**Summary:** ${post.summary}` : '',
    post.category?.length ? `**Categories:** ${post.category.join(', ')}` : '',
    post.tech?.length ? `**Technologies:** ${post.tech.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return rewriteBlogLinks(`${meta}\n\n${post.body}`.trim())
}
