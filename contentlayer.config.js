import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
// import remarkOembed from '@agentofuser/remark-oembed'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { techStack } from 'gaboesquivel';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  tweetIds: {
    type: 'array',
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
    },
  },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `https://gaboesquivel.com${doc.image}`
        : `https://gaboesquivel.com/og?title=${doc.title}`,
      url: `https://gaboesquivel.com/blog/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: 'Gabo Esquivel',
      },
    }),
  },
  techValidation: {
    type: 'string',
    resolve: (doc) => {
      // Ensure tech is an array
      if (!doc.tech) {
        return 'valid' // Missing tech field is allowed
      }

      // Convert to array if it's not already
      let techArray
      if (Array.isArray(doc.tech)) {
        techArray = doc.tech
      } else if (typeof doc.tech === 'string') {
        techArray = [doc.tech]
      } else if (typeof doc.tech === 'object' && doc.tech !== null) {
        // Handle case where contentlayer might wrap arrays in objects
        // Try to extract array from object (e.g., if it's { items: [...] } or similar)
        if (Array.isArray(doc.tech.items)) {
          techArray = doc.tech.items
        } else if (Array.isArray(doc.tech.data)) {
          techArray = doc.tech.data
        } else {
          // Try to convert object values to array
          techArray = Object.values(doc.tech).filter(
            (v) => typeof v === 'string',
          )
        }
      } else {
        // If it's an unexpected type, skip validation for this doc
        return 'valid'
      }

      if (!Array.isArray(techArray) || techArray.length === 0) {
        return 'valid' // Empty arrays are allowed
      }

      const validTags = new Set(techStack.map((t) => t.tag))
      const invalidTags = techArray.filter((tag) => !validTags.has(tag))

      if (invalidTags.length > 0) {
        throw new Error(
          `Invalid tech tags in ${doc._raw.sourceFilePath}: ${invalidTags.join(', ')}\n` +
            `Valid tags: ${Array.from(validTags).sort().join(', ')}`,
        )
      }

      return 'valid'
    },
  },
};

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    tech: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
