import { getLlmsIndex } from '../../scripts/llms/corpus'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

export async function GET() {
  return new Response(getLlmsIndex(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
