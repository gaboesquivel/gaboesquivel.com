import { getMarkdownForPath } from './markdown-route'
import { buildRouteManifest } from './routes'

export const buildMarkdownCorpus = () => {
  const manifest = buildRouteManifest()
  const corpus: Record<string, string> = {}

  for (const routeKey of manifest) {
    const qIndex = routeKey.indexOf('?')
    const pathname = qIndex === -1 ? routeKey : routeKey.slice(0, qIndex)
    const search = qIndex === -1 ? '' : routeKey.slice(qIndex + 1)
    const body = getMarkdownForPath({ pathname, search })
    if (body) corpus[routeKey] = body
  }

  return corpus
}
