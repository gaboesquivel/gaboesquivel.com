import { cn } from 'lib/utils'

export const proseClass = 'prose prose-neutral dark:prose-invert'

export const blockSpacing = 'mt-8'
export const sectionSpacing = 'mt-12'
export const titleSpacing = 'mb-6'
export const headingSpacing = 'mb-4'

export const pageTitle = cn(
  titleSpacing,
  'text-2xl font-bold tracking-tighter sm:text-3xl',
)

export const indexTitle = cn(pageTitle, 'max-w-[650px]')

export const sectionTitle = 'text-2xl font-semibold tracking-tight'

export const writingTitle = cn(headingSpacing, sectionTitle)

export const subHeading = cn(headingSpacing, blockSpacing, 'font-bold text-xl')

export const subHeadingSm = cn(
  headingSpacing,
  blockSpacing,
  'font-bold text-base tracking-tighter',
)

export const twoColGrid = 'grid grid-cols-1 gap-4 md:grid-cols-2'

export const singleColGrid = 'grid grid-cols-1 gap-4'

export const blockGrid = cn(blockSpacing, twoColGrid)

export const cardLink =
  'flex h-full w-full flex-col rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800'

export const projectMedia =
  'relative mb-6 aspect-[16/9] h-auto w-full max-h-[400px]'
