import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getLlmsFull, getLlmsIndex } from './llms/corpus'
import { estimateTokens } from './llms/format'

const PUBLIC_DIR = join(import.meta.dir, '../public')
const INDEX_TOKEN_BUDGET = 8000

const llmsIndex = getLlmsIndex()
const llmsFull = getLlmsFull()

mkdirSync(PUBLIC_DIR, { recursive: true })

const indexPath = join(PUBLIC_DIR, 'llms.txt')
const fullPath = join(PUBLIC_DIR, 'llms-full.txt')

writeFileSync(indexPath, llmsIndex, 'utf8')
writeFileSync(fullPath, llmsFull, 'utf8')

const indexTokens = estimateTokens(llmsIndex)

console.log(`Wrote ${indexPath} (${llmsIndex.length} bytes)`)
console.log(`Wrote ${fullPath} (${llmsFull.length} bytes)`)
console.log(
  `Estimated tokens — index: ~${indexTokens}, full: ~${estimateTokens(llmsFull)}`,
)

if (indexTokens > INDEX_TOKEN_BUDGET)
  console.warn(
    `Warning: llms.txt exceeds token budget (~${INDEX_TOKEN_BUDGET}): ~${indexTokens}`,
  )
