'use client'

import { blockSpacing, twoColGrid } from 'components/shared/spacing'
import { cn } from 'lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'

export function CardGrid<T>({
  items,
  identifier,
  getKey,
  renderItem,
}: {
  items: T[]
  identifier: string
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={identifier}
        className={cn(
          blockSpacing,
          'w-full max-w-full items-stretch overflow-hidden',
          twoColGrid,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {items.map((item, index) => (
          <motion.li
            key={getKey(item)}
            className="flex h-full w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            {renderItem(item)}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )
}
