import { describe, expect, test } from 'bun:test'
import {
  assertPrintBlocksFit,
  choosePageBreaks,
  countPdfPages,
  serializeCvPageBreaks,
  USABLE_PAGE_HEIGHT_PX,
} from './cv-page-breaks'

const block = ({
  id,
  height,
  marginBefore = 16,
}: {
  id: string
  height: number
  marginBefore?: number
}) => ({ id, height, marginBefore })

describe('choosePageBreaks', () => {
  test('keeps a short CV on one page', () => {
    const result = choosePageBreaks({
      usableHeight: 900,
      blocks: [
        block({ id: 'intro', height: 200, marginBefore: 0 }),
        block({ id: 'LegalAgent', height: 180 }),
        block({ id: 'skills', height: 120 }),
        block({ id: 'contact', height: 160 }),
      ],
    })
    expect(result).toEqual({ breakIds: [], pageCount: 1 })
  })

  test('breaks before the first overflowing entry', () => {
    const result = choosePageBreaks({
      usableHeight: 500,
      blocks: [
        block({ id: 'intro', height: 300, marginBefore: 0 }),
        block({ id: 'LegalAgent', height: 180 }),
        block({ id: 'Bitlauncher', height: 200 }),
        block({ id: 'skills', height: 80 }),
        block({ id: 'contact', height: 80 }),
      ],
    })
    expect(result.breakIds).toContain('Bitlauncher')
    expect(result.pageCount).toBe(2)
    assertPrintBlocksFit({
      blocks: [
        block({ id: 'intro', height: 300, marginBefore: 0 }),
        block({ id: 'LegalAgent', height: 180 }),
        block({ id: 'Bitlauncher', height: 200 }),
        block({ id: 'skills', height: 80 }),
        block({ id: 'contact', height: 80 }),
      ],
      breakIds: result.breakIds,
      usableHeight: 500,
    })
  })

  test('pulls the previous block onto the last page instead of leaving contact alone', () => {
    const blocks = [
      block({ id: 'intro', height: 100, marginBefore: 0 }),
      block({ id: 'LegalAgent', height: 150 }),
      block({ id: 'Bitlauncher', height: 150 }),
      block({ id: 'contact', height: 200 }),
    ]
    const result = choosePageBreaks({
      usableHeight: 500,
      blocks,
    })
    expect(result.breakIds).not.toContain('contact')
    expect(result.breakIds).toContain('Bitlauncher')
    expect(result.pageCount).toBe(2)
  })

  test('throws when a block is taller than the page', () => {
    expect(() =>
      choosePageBreaks({
        usableHeight: 400,
        blocks: [block({ id: 'intro', height: 500, marginBefore: 0 })],
      }),
    ).toThrow(/taller than the 400px printable page/)
  })

  test('usable height matches A4 minus 0.75in margins and pack safety', () => {
    expect(Math.round(USABLE_PAGE_HEIGHT_PX)).toBe(967)
  })

  test('serializeCvPageBreaks writes every variant key', () => {
    const source = serializeCvPageBreaks({
      breaks: {
        full: ['Bitlauncher'],
        ai: [],
        web3: ['skills'],
        fullstack: ['contact'],
      },
    })
    expect(source).toContain("full: ['Bitlauncher']")
    expect(source).toContain("web3: ['skills']")
  })

  test('countPdfPages prefers the Pages Count', () => {
    const pdf = Buffer.from('/Type /Pages /Count 3 /Kids [1 0 R 2 0 R 3 0 R]')
    expect(countPdfPages({ pdf })).toBe(3)
  })
})
