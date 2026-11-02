import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Image, Parent, Root } from "mdast";
import { visit } from "unist-util-visit";

const diagramSize = ({ src }: { src: string }) => {
  if (!src.startsWith("/images/diagrams/") || !src.endsWith(".svg"))
    return null;
  const svg = readFileSync(join(process.cwd(), "public", src), "utf-8");
  const viewBox = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!viewBox) return null;
  return { height: viewBox[2], width: viewBox[1] };
};

const isWhitespace = (node: { type: string; value?: string }) =>
  node.type === "text" && !node.value?.trim();

/** Hoist images out of image-only paragraphs so `<figure>` never renders inside `<p>`. */
const unwrapImageParagraphs = (tree: Root) => {
  visit(tree as never, "paragraph", (node, index, parent) => {
    const paragraph = node as Parent;
    const container = parent as Parent | undefined;
    if (index === undefined || !container) return;
    const images = paragraph.children.filter((child) => !isWhitespace(child));
    if (images.length === 0 || images.some((child) => child.type !== "image"))
      return;
    container.children.splice(index, 1, ...images);
    return index + images.length;
  });
};

export const remarkBlogImages = () => {
  let firstImage = true;

  return (tree: Root) => {
    unwrapImageParagraphs(tree);
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

      const size = diagramSize({ src: image.url });
      if (size) {
        attributes.push(
          { name: "width", type: "mdxJsxAttribute", value: size.width },
          { name: "height", type: "mdxJsxAttribute", value: size.height }
        );
      }

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
