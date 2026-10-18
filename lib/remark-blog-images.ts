import type { Image, Parent, Root } from "mdast";
import { visit } from "unist-util-visit";

export const remarkBlogImages = () => {
  let firstImage = true;

  return (tree: Root) => {
    // unist-util-visit pulls a second @types/unist copy; mdast Root is fine at runtime.
    visit(tree as never, "image", (node, index, parent) => {
      const image = node as Image;
      const container = parent as Parent | undefined;
      if (index === undefined || !container) {
        return;
      }

      const attributes: {
        type: "mdxJsxAttribute";
        name: string;
        value: string | null;
      }[] = [
        { name: "src", type: "mdxJsxAttribute", value: image.url },
        { name: "alt", type: "mdxJsxAttribute", value: image.alt ?? "" },
      ];

      if (firstImage) {
        firstImage = false;
        attributes.push({
          name: "priority",
          type: "mdxJsxAttribute",
          value: null,
        });
      }

      container.children[index] = {
        attributes,
        children: [],
        name: "BlogImage",
        type: "mdxJsxFlowElement",
      };
    });
  };
};
