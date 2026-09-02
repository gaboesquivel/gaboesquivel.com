export const BASE_URL = 'https://gaboesquivel.com'

export const absoluteUrl = (href: string) => {
  if (href.startsWith('http://') || href.startsWith('https://')) return href
  if (href.startsWith('/')) return `${BASE_URL}${href}`
  return `${BASE_URL}/${href}`
}

export const rewriteLinks = (text: string) =>
  text.replace(
    /\[([^\]]+)\]\((\/[^)]+)\)/g,
    (_, label, path) => `[${label}](${absoluteUrl(path)})`,
  )

export const llmsListItem = ({
  name,
  url,
  note,
}: {
  name: string
  url: string
  note?: string
}) => (note ? `- [${name}](${url}): ${note}` : `- [${name}](${url})`)

export const wrapSection = ({
  title,
  path,
  body,
}: {
  title: string
  path: string
  body: string
}) =>
  [`# ${title}`, '', `Canonical: ${absoluteUrl(path)}`, '', body.trim()].join(
    '\n',
  )

export const joinSections = (sections: string[]) => sections.join('\n\n---\n\n')

export const estimateTokens = (text: string) => Math.ceil(text.length / 4)

export const isValidProjectLink = (link?: string) =>
  Boolean(link && link !== '#' && link !== '' && !link.includes('example.com'))

export const blogSlugFromRelatedUrl = (url: string) => {
  if (url.startsWith('http')) {
    const match = url.match(/\/blog\/([^/?#]+)/)
    return match?.[1] ?? url
  }
  return url.replace(/^\/blog\//, '').replace(/\.mdx$/, '')
}
