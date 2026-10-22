import { techStack } from "gaboesquivel";
import { isKnownCategory, knownCategories } from "lib/blog-taxonomy";
import { rehypePlugins, remarkPlugins } from "lib/velite-mdx-plugins";
import { defineCollection, defineConfig, s } from "velite";

const validTags = new Set<string>(techStack.map((t) => t.tag));

const blogs = defineCollection({
  name: "Blog",
  pattern: "**/*.mdx",
  schema: s
    .object({
      body: s.mdx(),
      category: s.array(s.string()).optional(),
      image: s.string().optional(),
      ogImage: s.string().optional(),
      publishedAt: s.string(),
      slug: s.path(),
      summary: s.string(),
      tech: s.array(s.string()).optional(),
      title: s.string(),
    })
    .transform((data, { meta }) => {
      if (data.tech?.length) {
        const invalid = data.tech.filter((tag) => !validTags.has(tag));
        if (invalid.length) {
          throw new Error(
            `Invalid tech tags in ${meta.path}: ${invalid.join(", ")}\n` +
              `Valid tags: ${[...validTags].sort().join(", ")}`
          );
        }
      }
      if (data.category?.length) {
        const invalid = data.category.filter(
          (category) => !isKnownCategory(category)
        );
        if (invalid.length) {
          throw new Error(
            `Invalid categories in ${meta.path}: ${invalid.join(", ")}\n` +
              `Valid categories: ${[...knownCategories].sort().join(", ")}`
          );
        }
      }
      return data;
    }),
});

export default defineConfig({
  collections: { blogs },
  mdx: {
    rehypePlugins: rehypePlugins as never[],
    remarkPlugins,
  },
  output: { clean: true, data: ".velite" },
  root: "content",
});
