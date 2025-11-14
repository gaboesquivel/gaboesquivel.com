'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogPostCard } from 'components/blog/blog-post-card'
import type { Blog } from 'contentlayer/generated'

interface BlogPostsMasonryProps {
  posts: Blog[]
  identifier?: string
}

export function BlogPostsMasonry({
  posts,
  identifier = 'posts',
}: BlogPostsMasonryProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={identifier}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full items-stretch"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            className="w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

