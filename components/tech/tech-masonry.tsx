'use client'
import { TechCard } from 'components/tech/tech-card'
import { AnimatePresence, motion } from 'framer-motion'
import type { TechStackItem } from 'gaboesquivel'

interface TechMasonryProps {
  techStack: TechStackItem[]
  identifier?: string
}

export function TechMasonry({
  techStack,
  identifier = 'tech',
}: TechMasonryProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={identifier}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full items-stretch"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {techStack.map((tech, index) => (
          <motion.li
            key={tech.slug}
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
            <TechCard tech={tech} />
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )
}
