import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const remarkPlugins = [remarkGfm]

export const rehypePlugins = [
  rehypeSlug,
  [
    rehypePrettyCode,
    {
      theme: 'one-dark-pro',
      onVisitLine(node: { children: { type: string; value: string }[] }) {
        if (node.children.length === 0)
          node.children = [{ type: 'text', value: ' ' }]
      },
      onVisitHighlightedLine(node: {
        properties: { className?: string | string[] }
      }) {
        const cls = node.properties.className
        node.properties.className = [
          ...(Array.isArray(cls) ? cls : cls ? [cls] : []),
          'line--highlighted',
        ]
      },
      onVisitHighlightedWord(node: {
        properties: { className?: string | string[] }
      }) {
        node.properties.className = ['word--highlighted']
      },
    },
  ],
  [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
]
