import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { absoluteUrl, rewriteLinks } from './format'

const CONTENT_DIR = join(import.meta.dir, '../../content')

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

export const isArchivePost = (post: BlogPost) => {
  const year = Number.parseInt(post.publishedAt.slice(0, 4), 10)
  return year < 2020
}

export const renderBlogMarkdown = (post: BlogPost) => {
  const meta = [
    `**Published:** ${post.publishedAt}`,
    post.summary ? `**Summary:** ${post.summary}` : '',
    post.category?.length ? `**Categories:** ${post.category.join(', ')}` : '',
    post.tech?.length ? `**Technologies:** ${post.tech.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return rewriteLinks(`${meta}\n\n${post.body}`.trim())
}
