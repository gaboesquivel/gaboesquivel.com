import type { Root } from "hast";
import { visit } from "unist-util-visit";

export const rehypeBlogImages = () => {
  let firstImage = true;

  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img") {
        return;
      }

      const props = node.properties ?? {};
      node.properties = props;

      if (firstImage) {
        firstImage = false;
        props.loading = "eager";
        props.fetchPriority = "high";
      } else {
        props.loading = "lazy";
      }

      props.decoding = "async";
    });
  };
};
