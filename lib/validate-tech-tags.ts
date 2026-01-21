import { techStack } from 'gaboesquivel'

const VALID_TECH_TAGS = new Set(techStack.map((t) => String(t.tag)))

export function validateBlogPostTechTags(
  blogPosts: Array<{
    tech?: string[]
    _raw: { sourceFilePath: string }
    slug: string
  }>,
) {
  const errors: Array<{
    file: string
    invalidTags: string[]
    validTags: string[]
  }> = []

  for (const post of blogPosts) {
    if (!post.tech || post.tech.length === 0) {
      continue // Empty tech arrays are allowed
    }

    const invalidTags = post.tech.filter(
      (tag) => !VALID_TECH_TAGS.has(String(tag)),
    )

    if (invalidTags.length > 0) {
      const validTags = post.tech.filter((tag) =>
        VALID_TECH_TAGS.has(String(tag)),
      )
      errors.push({
        file: post._raw.sourceFilePath || post.slug,
        invalidTags,
        validTags,
      })
    }
  }

  if (errors.length > 0) {
    const errorMessages = errors
      .map(
        (err) =>
          `  - ${err.file}:\n` +
          `    Invalid tags: ${err.invalidTags.join(', ')}\n` +
          `    Valid tags found: ${err.validTags.join(', ') || 'none'}`,
      )
      .join('\n\n')

    throw new Error(
      `❌ Build failed: Found ${errors.length} blog post(s) with invalid tech tags.\n\n` +
        `Invalid tags must match valid tech tags from gaboesquivel package.\n\n` +
        `Errors:\n${errorMessages}\n\n` +
        `Valid tech tags: ${Array.from(VALID_TECH_TAGS).sort().join(', ')}`,
    )
  }
}
