import type { Image, Parent, Root } from 'mdast'
import { visit } from 'unist-util-visit'

export const remarkBlogImages = () => {
  let firstImage = true

  return (tree: Root) => {
    // unist-util-visit pulls a second @types/unist copy; mdast Root is fine at runtime.
    visit(tree as never, 'image', (node, index, parent) => {
      const image = node as Image
      const container = parent as Parent | undefined
      if (index === undefined || !container) return

      const attributes: Array<{
        type: 'mdxJsxAttribute'
        name: string
        value: string | null
      }> = [
        { type: 'mdxJsxAttribute', name: 'src', value: image.url },
        { type: 'mdxJsxAttribute', name: 'alt', value: image.alt ?? '' },
      ]

      if (firstImage) {
        firstImage = false
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'priority',
          value: null,
        })
      }

      container.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'BlogImage',
        attributes,
        children: [],
      }
    })
  }
}
