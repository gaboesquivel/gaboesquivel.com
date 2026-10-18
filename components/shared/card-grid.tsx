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
  renderItem: (item: T, index: number) => ReactNode
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
      {items.map((item, index) => (
        <li
          key={getKey(item)}
          className={cn(
            'flex h-full w-full',
            index >= 2 &&
              'max-md:[contain-intrinsic-size:auto_10rem] max-md:[content-visibility:auto]',
          )}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}
