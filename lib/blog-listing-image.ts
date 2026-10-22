import type { Blog } from "lib/blog";
import { blogOgImagePath } from "lib/og/resolve";

/** Hero frontmatter when set; otherwise the generated editorial OG asset. */
export const blogListingImageSrc = (post: Pick<Blog, "image" | "slug">) =>
  post.image ?? blogOgImagePath(post.slug);
