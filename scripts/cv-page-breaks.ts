import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { CvKey } from 'gaboesquivel'
import { cvKeys } from 'gaboesquivel'

export const A4_WIDTH_PX = (210 / 25.4) * 96
export const A4_HEIGHT_PX = (297 / 25.4) * 96
export const PAGE_MARGIN_X_PX = 0.5 * 96
export const PAGE_MARGIN_Y_PX = 0.75 * 96
export const A4_CONTENT_WIDTH_PX = A4_WIDTH_PX - PAGE_MARGIN_X_PX * 2
export const USABLE_PAGE_HEIGHT_PX = A4_HEIGHT_PX - PAGE_MARGIN_Y_PX * 2

export type PrintBlock = {
  id: string
  height: number
  marginBefore: number
}

export const INTRO_BLOCK_ID = 'intro'

const isSticky = ({ id }: { id: string }) => id === INTRO_BLOCK_ID

export const choosePageBreaks = ({
  blocks,
  usableHeight,
}: {
  blocks: PrintBlock[]
  usableHeight: number
}) => {
  const tooTall = blocks.find((block) => block.height > usableHeight)
  if (tooTall)
    throw new Error(
      `CV block "${tooTall.id}" is ${tooTall.height}px, taller than the ${usableHeight}px printable page`,
    )

  const greedy = ({ extraBreaks }: { extraBreaks: ReadonlySet<string> }) => {
    const breakIds: string[] = []
    let used = 0
    let pageCount = 1
    const pages: string[][] = [[]]

    for (const [index, block] of blocks.entries()) {
      const spacing = used === 0 ? 0 : block.marginBefore
      const forceBreak = extraBreaks.has(block.id)
      const overflows = used > 0 && used + spacing + block.height > usableHeight

      if (index > 0 && !isSticky(block) && (forceBreak || overflows)) {
        breakIds.push(block.id)
        used = block.height
        pageCount += 1
        pages.push([block.id])
        continue
      }

      used += spacing + block.height
      pages[pages.length - 1].push(block.id)
    }

    return { breakIds, pageCount, pages, used }
  }

  const first = greedy({ extraBreaks: new Set() })
  const lastPage = first.pages.at(-1) ?? []
  const contactOnly =
    lastPage.length === 1 && lastPage[0] === 'contact' && blocks.length > 1

  if (!contactOnly)
    return { breakIds: first.breakIds, pageCount: first.pageCount }

  const contact = blocks.find((block) => block.id === 'contact')
  const previous = blocks[blocks.length - 2]
  if (!contact || !previous || isSticky(previous))
    return { breakIds: first.breakIds, pageCount: first.pageCount }

  const together = previous.height + contact.marginBefore + contact.height
  if (together > usableHeight)
    return { breakIds: first.breakIds, pageCount: first.pageCount }

  const extraBreaks = new Set(first.breakIds.filter((id) => id !== 'contact'))
  extraBreaks.add(previous.id)
  const pulled = greedy({ extraBreaks })
  return { breakIds: pulled.breakIds, pageCount: pulled.pageCount }
}

export const assertPrintBlocksFit = ({
  blocks,
  breakIds,
  usableHeight,
}: {
  blocks: PrintBlock[]
  breakIds: readonly string[]
  usableHeight: number
}) => {
  const breaks = new Set(breakIds)
  let used = 0
  let page = 1

  for (const [index, block] of blocks.entries()) {
    const startsPage = index > 0 && breaks.has(block.id)
    if (startsPage) {
      used = 0
      page += 1
    }

    const spacing = used === 0 ? 0 : block.marginBefore
    if (used + spacing + block.height > usableHeight + 0.5)
      throw new Error(
        `CV block "${block.id}" crosses page ${page} (${used + spacing + block.height}px into ${usableHeight}px)`,
      )

    used += spacing + block.height
  }

  return { pageCount: page }
}

export const countPdfPages = ({ pdf }: { pdf: Buffer }) => {
  const count = pdf.toString('latin1').match(/\/Count\s+(\d+)/)
  if (count) return Number(count[1])
  return (pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) ?? []).length
}

export const serializeCvPageBreaks = ({
  breaks,
}: {
  breaks: Record<CvKey, string[]>
}) => {
  const body = cvKeys
    .map((key) => {
      const ids = breaks[key].map((id) => `'${id}'`).join(', ')
      return `  ${key}: [${ids}],`
    })
    .join('\n')

  return `import type { CvKey } from 'gaboesquivel'

export const cvPageBreaks: Record<CvKey, string[]> = {
${body}
}
`
}

export const writeCvPageBreaks = ({
  breaks,
  file = join(import.meta.dir, '../app/cv/page-breaks.ts'),
}: {
  breaks: Record<CvKey, string[]>
  file?: string
}) => {
  writeFileSync(file, serializeCvPageBreaks({ breaks }))
}
