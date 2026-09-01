import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { type Subprocess, spawn } from 'bun'
import { chromium } from 'playwright-core'
import { cvKeys, cvPath, cvPdfFile } from '../app/cv/variants'

const ORIGIN = process.env.CV_ORIGIN ?? 'http://localhost:3099'
const PUBLIC_DIR = join(import.meta.dir, '../public')
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

  for (const key of cvKeys) {
    const path = cvPath({ key })
    const file = cvPdfFile({ key })
    const output = join(PUBLIC_DIR, file)

    await page.goto(`${ORIGIN}${path}`, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print', colorScheme: 'light' })
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({
      path: output,
      printBackground: true,
      preferCSSPageSize: true,
    })

    console.log(`Wrote ${output}`)
  }

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
