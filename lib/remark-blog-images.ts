import type { Image, Parent, Root } from 'mdast'
import { visit } from 'unist-util-visit'

export const remarkBlogImages = () => {
  let firstImage = true

  return (tree: Root) => {
    visit(tree, 'image', (node: Image, index, parent: Parent | undefined) => {
      if (index === undefined || !parent) return

      const attributes = [
        { type: 'mdxJsxAttribute', name: 'src', value: node.url },
        { type: 'mdxJsxAttribute', name: 'alt', value: node.alt ?? '' },
      ]

      if (firstImage) {
        firstImage = false
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'priority',
          value: null,
        })
      }

      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'BlogImage',
        attributes,
        children: [],
      }
    })
  }
}
