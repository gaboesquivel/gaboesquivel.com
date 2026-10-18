import { blockSpacing, twoColGrid } from 'components/shared/spacing'
import { cn } from 'lib/utils'
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
    <ul
      key={identifier}
      className={cn(
        blockSpacing,
        'w-full max-w-full items-stretch overflow-hidden',
        twoColGrid,
      )}
    >
      {items.map((item) => (
        <li key={getKey(item)} className="flex h-full w-full">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
