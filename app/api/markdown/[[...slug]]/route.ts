import { markdownResponseHeaders } from 'lib/accept-markdown'
import { canonicalizePath } from 'lib/canonical-path'
import { markdownApiRewritePath } from 'lib/markdown-api-path'
import { markdownNotFoundBody } from 'lib/markdown-not-found'
import corpus from '../../../../generated/markdown-routes.json'

export const runtime = 'nodejs'

const routes = corpus as Record<string, string>
const prefix = '/api/markdown'

const pagePathFromApiPathname = (pathname: string) =>
  pathname === prefix || pathname === `${prefix}/`
    ? '/'
    : pathname.slice(prefix.length) || '/'

const resolveRequestTarget = (req: Request) => {
  const rewrite = req.headers.get('x-middleware-rewrite')
  if (rewrite) {
    const { pathname, search } = new URL(rewrite, 'https://gaboesquivel.com')
    return {
      pagePath: pagePathFromApiPathname(pathname),
      search: search.replace(/^\?/, ''),
    }
  }

  const { pathname, search } = new URL(req.url)
  if (pathname.startsWith(prefix))
    return {
      pagePath: pagePathFromApiPathname(pathname),
      search: search.replace(/^\?/, ''),
    }

  if (pathname.endsWith('.md')) {
    const apiPath = markdownApiRewritePath(pathname)
    const { pathname: apiPathname, search: apiSearch } = new URL(
      apiPath,
      'https://gaboesquivel.com',
    )
    return {
      pagePath: pagePathFromApiPathname(apiPathname),
      search: apiSearch.replace(/^\?/, ''),
    }
  }

  return {
    pagePath: pathname === '' ? '/' : pathname,
    search: search.replace(/^\?/, ''),
  }
}

const routeKey = (pathname: string, search: string) => {
  const path = pathname === '' ? '/' : canonicalizePath(pathname)
  if (!search) return path
  return `${path}?${new URLSearchParams(search).toString()}`
}

export const GET = async (req: Request) => {
  const { pagePath, search } = resolveRequestTarget(req)
  const key = routeKey(pagePath, search)
  const body = routes[key]

  if (!body)
    return new Response(markdownNotFoundBody, {
      status: 404,
      headers: markdownResponseHeaders(),
    })

  return new Response(body, { headers: markdownResponseHeaders() })
}
