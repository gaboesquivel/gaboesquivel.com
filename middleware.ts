import {
  appendVaryAccept,
  markdownAlternateLinkHeader,
  preferredContentType,
} from "lib/accept-markdown";
import {
  markdownApiRewritePath,
  skipMarkdownNegotiation,
} from "lib/markdown-api-path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  if (skipMarkdownNegotiation(pathname)) {
    return NextResponse.next();
  }

  if (pathname.endsWith(".md")) {
    const url = req.nextUrl.clone();
    url.pathname = markdownApiRewritePath(pathname);
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  const acceptHeader = req.headers.get("accept");
  const chosen = preferredContentType(acceptHeader);

  if (chosen === "text/markdown") {
    const url = req.nextUrl.clone();
    url.pathname = markdownApiRewritePath(pathname);
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  if (chosen === null && acceptHeader) {
    return new Response(
      "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const res = NextResponse.next();
  appendVaryAccept(res.headers);
  markdownAlternateLinkHeader(res.headers, pathname);
  return res;
};

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
};
