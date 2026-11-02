import { defaultContext, getMarkdownForPath } from "./markdown-route";

export const buildMarkdownCorpus = () => {
  const context = defaultContext();
  const corpus: Record<string, string> = {};

  for (const routeKey of context.manifest) {
    const qIndex = routeKey.indexOf("?");
    const pathname = qIndex === -1 ? routeKey : routeKey.slice(0, qIndex);
    const search = qIndex === -1 ? "" : routeKey.slice(qIndex + 1);
    const body = getMarkdownForPath({ context, pathname, search });
    if (body) {
      corpus[routeKey] = body;
    }
  }

  return corpus;
};
