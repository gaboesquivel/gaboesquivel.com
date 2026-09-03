import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { type Subprocess, spawn } from 'bun'
import { type CvKey, cvKeys } from 'gaboesquivel'
import { chromium, type Page } from 'playwright-core'
import { cvPath, cvPdfFile } from '../app/cv/variants'
import {
  A4_CONTENT_WIDTH_PX,
  assertPrintBlocksFit,
  choosePageBreaks,
  countPdfPages,
  type PrintBlock,
  USABLE_PAGE_HEIGHT_PX,
  writeCvPageBreaks,
} from './cv-page-breaks'

const ORIGIN = process.env.CV_ORIGIN ?? 'http://localhost:3099'
const PUBLIC_DIR = join(import.meta.dir, '../public')
const PREVIEW_DIR = join(import.meta.dir, '../__dev/cv-print')
const POLL_MS = 500
const TIMEOUT_MS = 90_000

const probeServer = async () => {
  try {
    const response = await fetch(`${ORIGIN}/cv`, {
      signal: AbortSignal.timeout(2000),
    })
    return response.ok
  } catch {
    return false
  }
}

const waitForServer = async () => {
  const deadline = Date.now() + TIMEOUT_MS
  while (Date.now() < deadline) {
    if (await probeServer()) return
    await Bun.sleep(POLL_MS)
  }
  throw new Error(
    `Server at ${ORIGIN} did not respond within ${TIMEOUT_MS / 1000}s`,
  )
}

const startServer = async () => {
  console.log('Running content:build…')
  const content = spawn(['bun', 'run', 'content:build'], {
    cwd: join(import.meta.dir, '..'),
    stdout: 'inherit',
    stderr: 'inherit',
  })
  if ((await content.exited) !== 0) throw new Error('content:build failed')

  console.log('Starting next dev on port 3099…')
  const server = spawn(['bunx', 'next', 'dev', '-p', '3099'], {
    cwd: join(import.meta.dir, '..'),
    stdout: 'pipe',
    stderr: 'pipe',
  })

  await waitForServer()
  return server
}

const stopServer = async (server: Subprocess) => {
  server.kill()
  await server.exited.catch(() => undefined)
}

const measurePrintBlocks = (page: Page) =>
  page.evaluate(() => {
    for (const node of document.querySelectorAll('.page-break-before'))
      node.classList.remove('page-break-before')

    const nodes = [...document.querySelectorAll('[data-cv-block]')]
    return nodes.map((node, index) => {
      const rect = node.getBoundingClientRect()
      const previous = nodes[index - 1]?.getBoundingClientRect()
      return {
        id: node.getAttribute('data-cv-block') ?? '',
        height: rect.height,
        marginBefore: previous ? rect.top - previous.bottom : 0,
      }
    })
  }) as Promise<PrintBlock[]>

const applyPageBreaks = ({
  page,
  breakIds,
}: {
  page: Page
  breakIds: readonly string[]
}) =>
  page.evaluate((ids) => {
    for (const node of document.querySelectorAll('.page-break-before'))
      node.classList.remove('page-break-before')
    for (const id of ids) {
      const node = document.querySelector(`[data-cv-block="${CSS.escape(id)}"]`)
      node?.classList.add('page-break-before')
    }
  }, breakIds)

const VIEWPORT = {
  width: Math.round(A4_CONTENT_WIDTH_PX),
  height: 4000,
}

const rasterizePdf = async ({
  pdfPath,
  key,
  pageCount,
}: {
  pdfPath: string
  key: CvKey
  pageCount: number
}) => {
  mkdirSync(PREVIEW_DIR, { recursive: true })
  const proc = spawn(
    [
      'swift',
      join(import.meta.dir, 'rasterize-pdf.swift'),
      pdfPath,
      join(PREVIEW_DIR, key),
    ],
    { stdout: 'pipe', stderr: 'pipe' },
  )
  const code = await proc.exited
  const stderr = await new Response(proc.stderr).text()
  if (code !== 0)
    throw new Error(`Failed to rasterize ${pdfPath}: ${stderr || code}`)
  const stdout = await new Response(proc.stdout).text()
  const rasterPages = Number(stdout.trim())
  if (rasterPages && rasterPages !== pageCount)
    console.log(
      `Rasterized ${rasterPages} pages for ${key} (pdf count ${pageCount})`,
    )
}

const exportVariant = async ({ page, key }: { page: Page; key: CvKey }) => {
  const path = cvPath({ key })
  const file = cvPdfFile({ key })
  const output = join(PUBLIC_DIR, file)

  await page.setViewportSize(VIEWPORT)
  await page.goto(`${ORIGIN}${path}`, { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print', colorScheme: 'light' })
  await page.evaluate(() => document.fonts.ready)

  const blocks = (await measurePrintBlocks(page)).filter((block) => block.id)
  const { breakIds, pageCount } = choosePageBreaks({
    blocks,
    usableHeight: USABLE_PAGE_HEIGHT_PX,
  })

  assertPrintBlocksFit({
    blocks,
    breakIds,
    usableHeight: USABLE_PAGE_HEIGHT_PX,
  })

  const lastPage = (() => {
    const breaks = new Set(breakIds)
    const pages: string[][] = [[]]
    for (const [index, block] of blocks.entries()) {
      if (index > 0 && breaks.has(block.id)) pages.push([])
      pages[pages.length - 1].push(block.id)
    }
    return pages.at(-1) ?? []
  })()

  if (lastPage.length === 1 && lastPage[0] === 'contact')
    throw new Error(`${key} PDF last page is Connect-only`)

  await applyPageBreaks({ page, breakIds })

  const pdf = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  })
  const pdfPages = countPdfPages({ pdf: Buffer.from(pdf) })
  if (pdfPages < 1) throw new Error(`${key} PDF has no pages`)
  if (pdfPages !== pageCount)
    throw new Error(
      `${key} PDF page count ${pdfPages} diverged from measured ${pageCount}`,
    )

  writeFileSync(output, pdf)
  if (process.env.CV_PRINT_PREVIEW)
    await rasterizePdf({ pdfPath: output, key, pageCount: pdfPages })

  console.log(
    `Wrote ${output} (${pdfPages} pages; breaks: ${breakIds.join(', ') || 'none'})`,
  )

  return { key, breakIds }
}

const exportPdfs = async () => {
  mkdirSync(PUBLIC_DIR, { recursive: true })

  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined
  try {
    browser = await chromium.launch({ channel: 'chrome' })
  } catch {
    throw new Error(
      'Google Chrome is required for CV PDF export. Install Chrome and retry.',
    )
  }

  const page = await browser.newPage()
  await page.setViewportSize(VIEWPORT)
  const breaks = {} as Record<CvKey, string[]>

  for (const key of cvKeys) {
    const result = await exportVariant({ page, key })
    breaks[result.key] = result.breakIds
  }

  writeCvPageBreaks({ breaks })
  await browser.close()
}

const main = async () => {
  const alreadyUp = await probeServer()
  let server: Subprocess | undefined

  if (!alreadyUp) server = await startServer()
  else console.log(`Using existing server at ${ORIGIN}`)

  const cleanup = async () => {
    if (server) await stopServer(server)
  }

  process.on('SIGINT', () => {
    cleanup().finally(() => process.exit(130))
  })

  try {
    await exportPdfs()
  } finally {
    await cleanup()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
