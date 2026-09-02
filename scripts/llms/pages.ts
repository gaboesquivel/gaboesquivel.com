import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  getProjectBySlug,
  getProjectsByTechnology,
  techStack,
} from 'gaboesquivel'
import ts from 'typescript'
import { absoluteUrl, rewriteLinks } from './format'

const APP_DIR = join(import.meta.dir, '../../app')

const SKIP_COMPONENTS = new Set([
  'PageImage',
  'LatestPosts',
  'ContactForm',
  'PrintButton',
  'FilterNav',
  'ContactInfo',
  'CapabilityPage',
  'ProjectCard',
])

const LETS_CONNECT_MARKDOWN = `Open to direct hire, international hire, or [contracting through Blockmatic Labs LLC](${absoluteUrl('/blog/2025-11-1099-contracting')}). Based in [Costa Rica](${absoluteUrl('/blog/2014-01-developing-software-in-costa-rica')}), working US Mountain Time.

Tell me what you're building and where it's stuck. [Start a conversation](${absoluteUrl('/connect')}).`

export type PageExport = {
  path: string
  title: string
  body: string
}

const narrativePages: Array<{ file: string; path: string }> = [
  { file: 'page.tsx', path: '/' },
  { file: 'bio/page.tsx', path: '/bio' },
  { file: 'ai/page.tsx', path: '/ai' },
  { file: 'web3/page.tsx', path: '/web3' },
  { file: 'connect/page.tsx', path: '/connect' },
  { file: 'tech/page.tsx', path: '/tech' },
  { file: 'fullstack/page.tsx', path: '/fullstack' },
  { file: 'frontend/page.tsx', path: '/frontend' },
  { file: 'backend/page.tsx', path: '/backend' },
  { file: 'mobile/page.tsx', path: '/mobile' },
  { file: 'startups/page.tsx', path: '/startups' },
  { file: 'institutions/page.tsx', path: '/institutions' },
  { file: 'lead/page.tsx', path: '/lead' },
]

const decodeText = (value: string) =>
  value
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

const getPropName = (name: ts.JsxAttributeName) =>
  ts.isIdentifier(name) ? name.text : name.getText()

const literalValue = (node: ts.Expression | undefined): unknown => {
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node))
    return node.elements.flatMap((element) => {
      if (ts.isSpreadElement(element)) return []
      return [literalValue(element)]
    })
  if (ts.isObjectLiteralExpression(node))
    return Object.fromEntries(
      node.properties.flatMap((property) => {
        if (!ts.isPropertyAssignment(property)) return []
        const key = ts.isIdentifier(property.name)
          ? property.name.text
          : property.name.getText().replace(/['"]/g, '')
        return [[key, literalValue(property.initializer)]]
      }),
    )
  if (ts.isIdentifier(node) && node.text === 'sections') return 'sections-ref'
  return undefined
}

const getJsxAttributeValue = (
  attributes: ts.JsxAttributes,
  name: string,
  variables: Map<string, unknown>,
) => {
  for (const attr of attributes.properties) {
    if (!ts.isJsxAttribute(attr) || getPropName(attr.name) !== name) continue
    if (!attr.initializer) return true
    if (ts.isStringLiteral(attr.initializer)) return attr.initializer.text
    if (ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
      const expression = attr.initializer.expression
      if (ts.isIdentifier(expression) && variables.has(expression.text))
        return variables.get(expression.text)
      return literalValue(expression)
    }
  }
  return undefined
}

const collectVariables = (sourceFile: ts.SourceFile) => {
  const variables = new Map<string, unknown>()

  const visit = (node: ts.Node) => {
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.flags & ts.NodeFlags.Const
    ) {
      for (const declaration of node.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer)
          continue
        const value = literalValue(declaration.initializer)
        if (value !== undefined) variables.set(declaration.name.text, value)
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return variables
}

const renderProjectLinks = (slugs: string[]) =>
  slugs
    .flatMap((slug) => {
      const project = getProjectBySlug(slug)
      return project
        ? [`- [${project.title}](${absoluteUrl(`/project/${slug}`)})`]
        : []
    })
    .join('\n')

const renderFeaturedTechLinks = () => {
  const featured = [...techStack]
    .filter((tech) => tech.featuredOrder !== undefined)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))

  return featured
    .map(
      (tech) =>
        `- [${tech.name}](${absoluteUrl(`/tech/${tech.slug}`)}) (${getProjectsByTechnology(tech.tag).length} projects)`,
    )
    .join('\n')
}

let sourceFile: ts.SourceFile

const jsxChildrenToText = (
  children: ts.JsxChild[],
  variables: Map<string, unknown>,
): string => {
  const parts: string[] = []

  for (const child of children) {
    if (ts.isJsxText(child)) {
      const text = decodeText(child.getText(sourceFile))
      if (text) parts.push(text)
      continue
    }

    if (!ts.isJsxElement(child) && !ts.isJsxSelfClosingElement(child)) continue

    const tagName = ts.isJsxElement(child)
      ? child.openingElement.tagName.getText(sourceFile)
      : child.tagName.getText(sourceFile)

    if (SKIP_COMPONENTS.has(tagName)) continue

    if (tagName === 'Link') {
      const attributes = ts.isJsxElement(child)
        ? child.openingElement.attributes
        : child.attributes
      const href = String(getJsxAttributeValue(attributes, 'href', variables))
      const label = ts.isJsxElement(child)
        ? jsxChildrenToText(child.children, variables)
        : ''
      parts.push(`[${label.trim()}](${absoluteUrl(href)})`)
      continue
    }

    if (ts.isJsxElement(child)) {
      parts.push(jsxChildrenToText(child.children, variables))
    }
  }

  return parts
    .join(' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

const jsxNodesToMarkdown = (
  nodes: ts.NodeArray<ts.JsxChild> | ts.Node[],
  variables: Map<string, unknown>,
  lines: string[],
  pagePath = '',
) => {
  for (const node of nodes) jsxNodeToMarkdown(node, variables, lines, pagePath)
}

const jsxNodeToMarkdown = (
  node: ts.Node,
  variables: Map<string, unknown>,
  lines: string[],
  pagePath = '',
) => {
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
    const tagName = ts.isJsxElement(node)
      ? node.openingElement.tagName.getText(sourceFile)
      : node.tagName.getText(sourceFile)

    if (SKIP_COMPONENTS.has(tagName)) return

    const attributes = ts.isJsxElement(node)
      ? node.openingElement.attributes
      : node.attributes

    if (tagName === 'LetsConnect') {
      lines.push(LETS_CONNECT_MARKDOWN, '')
      return
    }

    if (tagName === 'ProjectEvidence') {
      const slugs = (getJsxAttributeValue(attributes, 'slugs', variables) ??
        []) as string[]
      const links = renderProjectLinks(slugs)
      if (links) lines.push(links, '')
      return
    }

    if (tagName === 'TechList') {
      const heading = String(
        getJsxAttributeValue(attributes, 'heading', variables) ?? '',
      )
      if (heading) lines.push(`## ${heading}`, '')
      const links = renderFeaturedTechLinks()
      if (links) lines.push(links, '')
      return
    }

    if (tagName === 'PageTitle' && ts.isJsxElement(node)) {
      lines.push(`# ${jsxChildrenToText(node.children, variables)}`, '')
      return
    }

    if (tagName === 'PageSection' && ts.isJsxElement(node)) {
      const title = String(
        getJsxAttributeValue(attributes, 'title', variables) ?? '',
      )
      if (title === 'Browse by area' && pagePath === '/tech') return

      if (title) lines.push(`## ${title}`, '')
      jsxNodesToMarkdown(node.children, variables, lines, pagePath)

      if (title === 'Selected work') {
        const slugs = variables.get('selectedProjectSlugs') as
          | string[]
          | undefined
        if (slugs?.length) {
          const links = renderProjectLinks(slugs)
          if (links) lines.push(links, '')
        }
      }

      return
    }

    if (tagName === 'Prose' && ts.isJsxElement(node)) {
      const text = jsxChildrenToText(node.children, variables)
      if (text) lines.push(text, '')
      return
    }

    if (tagName === 'h3' && ts.isJsxElement(node)) {
      const text = jsxChildrenToText(node.children, variables)
      if (text) lines.push(`### ${text}`, '')
      return
    }

    if (tagName === 'p' && ts.isJsxElement(node)) {
      const text = jsxChildrenToText(node.children, variables)
      if (text) lines.push(text, '')
      return
    }

    if (ts.isJsxElement(node)) {
      jsxNodesToMarkdown(node.children, variables, lines, pagePath)
      return
    }
  }

  ts.forEachChild(node, (child) =>
    jsxNodeToMarkdown(child, variables, lines, pagePath),
  )
}

type CapabilitySection = {
  heading: string
  paragraphs: string[]
  projectSlugs?: string[]
}

const renderCapabilityPage = ({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string[]
  sections: CapabilitySection[]
}) => {
  const lines = [
    `# ${title}`,
    '',
    ...intro.flatMap((paragraph) => [paragraph, '']),
  ]

  for (const section of sections) {
    lines.push(`## ${section.heading}`, '')
    lines.push(...section.paragraphs.flatMap((paragraph) => [paragraph, '']))
    if (section.projectSlugs?.length) {
      lines.push(renderProjectLinks(section.projectSlugs), '')
    }
  }

  lines.push(
    `Explore the [project portfolio](${absoluteUrl('/work')}) for implementation details, systems, and technology.`,
    '',
  )

  return lines.join('\n').trim()
}

const renderCategoryGroups = (
  groups: Array<{ href: string; name: string; description: string }>,
) => {
  const lines = ['## Browse by area', '']
  for (const group of groups)
    lines.push(
      `- [${group.name}](${absoluteUrl(group.href)}): ${group.description}`,
    )
  lines.push('')
  return lines.join('\n')
}

const parseCapabilityPage = (
  source: ts.SourceFile,
  variables: Map<string, unknown>,
) => {
  let title = ''
  let intro: string[] = []
  let sections: CapabilitySection[] = []

  const visit = (node: ts.Node) => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tagName = node.tagName.getText(source)
      if (tagName !== 'CapabilityPage') return

      title = String(getJsxAttributeValue(node.attributes, 'title', variables))
      intro = (getJsxAttributeValue(node.attributes, 'intro', variables) ??
        []) as string[]
      sections = (getJsxAttributeValue(
        node.attributes,
        'sections',
        variables,
      ) ?? []) as CapabilitySection[]
    }

    ts.forEachChild(node, visit)
  }

  visit(source)

  if (!title) return null
  return renderCapabilityPage({ title, intro, sections })
}

const parsePageFile = ({ file, path }: { file: string; path: string }) => {
  const filePath = join(APP_DIR, file)
  const content = readFileSync(filePath, 'utf8')
  sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )

  const variables = collectVariables(sourceFile)
  const capability = parseCapabilityPage(sourceFile, variables)
  if (capability)
    return {
      path,
      title: capability.match(/^# (.+)/m)?.[1] ?? path,
      body: rewriteLinks(capability.replace(/^# .+\n\n?/, '')),
    }

  const lines: string[] = []
  jsxNodeToMarkdown(sourceFile, variables, lines, path)

  if (path === '/tech') {
    const categoryGroups = variables.get('categoryGroups') as
      | Array<{ href: string; name: string; description: string }>
      | undefined
    if (categoryGroups?.length) lines.push(renderCategoryGroups(categoryGroups))
  }

  const fullText = lines.join('\n').trim()
  const titleMatch = fullText.match(/^# (.+)/m)
  const title = titleMatch?.[1] ?? path

  return {
    path,
    title,
    body: rewriteLinks(fullText.replace(/^# .+\n\n?/, '')),
  }
}

export const loadNarrativePages = (): PageExport[] =>
  narrativePages.map((page) => parsePageFile(page))
