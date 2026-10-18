import { markdownResponseHeaders } from 'lib/accept-markdown'
import {
  getMarkdownForPath,
  markdownNotFoundBody,
} from 'scripts/llms/markdown-route'

export const runtime = 'nodejs'

export const GET = async (req: Request) => {
  const { pathname, search } = new URL(req.url)
  const prefix = '/api/markdown'
  const pagePath =
    pathname === prefix || pathname === `${prefix}/`
      ? '/'
      : pathname.slice(prefix.length) || '/'

  const body = getMarkdownForPath({
    pathname: pagePath,
    search: search.replace(/^\?/, ''),
  })

  if (!body)
    return new Response(markdownNotFoundBody, {
      status: 404,
      headers: markdownResponseHeaders(),
    })

  return new Response(body, { headers: markdownResponseHeaders() })
}
