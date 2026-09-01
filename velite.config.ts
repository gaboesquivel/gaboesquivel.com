import { techStack } from 'gaboesquivel'
import { rehypePlugins, remarkPlugins } from 'lib/velite-mdx-plugins'
import { defineCollection, defineConfig, s } from 'velite'

const validTags = new Set<string>(techStack.map((t) => t.tag))

const blogs = defineCollection({
  name: 'Blog',
  pattern: '**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      category: s.array(s.string()).optional(),
      tech: s.array(s.string()).optional(),
      publishedAt: s.string(),
      summary: s.string(),
      image: s.string().optional(),
      slug: s.path(),
      body: s.mdx(),
    })
    .transform((data, { meta }) => {
      if (data.tech?.length) {
        const invalid = data.tech.filter((tag) => !validTags.has(tag))
        if (invalid.length)
          throw new Error(
            `Invalid tech tags in ${meta.path}: ${invalid.join(', ')}\n` +
              `Valid tags: ${[...validTags].sort().join(', ')}`,
          )
      }
      return data
    }),
})

export default defineConfig({
  root: 'content',
  output: { data: '.velite', clean: true },
  collections: { blogs },
  mdx: {
    remarkPlugins,
    rehypePlugins: rehypePlugins as never[],
  },
})
