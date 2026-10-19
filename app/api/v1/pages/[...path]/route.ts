import {
  getPublishedPageMarkdown,
  resolvePageRouteKey,
} from "lib/api/markdown-corpus";
import { apiNotFound, jsonResponse, methodNotAllowed } from "lib/api/problem";

export const runtime = "nodejs";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) => {
  const { path: segments } = await params;
  const { search } = new URL(req.url);
  const routeKey = resolvePageRouteKey({
    search: search.replace(/^\?/, ""),
    segments,
  });
  const page = getPublishedPageMarkdown(routeKey);

  if (!page) {
    return apiNotFound(`No Markdown export for path ${routeKey}.`);
  }

  return jsonResponse(page);
};

export const POST = () => methodNotAllowed();
export const PUT = () => methodNotAllowed();
export const PATCH = () => methodNotAllowed();
export const DELETE = () => methodNotAllowed();
