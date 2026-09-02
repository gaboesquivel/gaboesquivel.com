import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const processor = unified().use(remarkParse).use(remarkGfm)

const parseMarkdown = (content: string) => {
  try {
    processor.parse(content)
    return null
  } catch (error) {
    return error instanceof Error ? error.message : String(error)
  }
}

const countFences = (content: string) => {
  const matches = content.match(/```/g)
  return matches?.length ?? 0
}

export const validateSection = ({
  title,
  body,
}: {
  title: string
  body: string
}) => {
  const errors: string[] = []
  const full = `# ${title}\n\n${body}`

  const astError = parseMarkdown(full)
  if (astError) errors.push(`invalid markdown AST in "${title}": ${astError}`)

  if (countFences(body) % 2 !== 0)
    errors.push(`unbalanced code fences in "${title}"`)

  for (const line of body.split('\n')) {
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading && !heading[2]?.trim())
      errors.push(`empty heading in "${title}": ${line}`)
  }

  if (/\*\*Link:\*\* #/.test(body))
    errors.push(`placeholder link in "${title}"`)

  if (/example\.com/.test(body) && /\*\*Link:\*\*/.test(body))
    errors.push(`example.com project link in "${title}"`)

  if (/gaboesquivel\.com\/blog\/https:\/\//.test(body))
    errors.push(`doubled blog URL in "${title}"`)

  return errors
}

export const validateCorpus = (
  sections: Array<{ title: string; body: string }>,
) => {
  const errors = sections.flatMap((section) => validateSection(section))
  if (errors.length)
    throw new Error(
      `LLM corpus validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`,
    )
}
