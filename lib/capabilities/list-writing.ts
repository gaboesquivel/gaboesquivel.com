import { allBlogs } from "lib/blog";
import { siteOrigin } from "lib/site-path";
import { isWorkType } from "lib/work-types";

import { paginate } from "./pagination";
import { readResult } from "./result";
import { listWritingInput } from "./schemas";
import type { CapabilityContext } from "./types";

const categoryForDomain = (domain: string) => {
  if (domain === "ai") return "ai";
  if (domain === "web3") return "web3";
  return null;
};

export const listWriting = ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = listWritingInput.safeParse(input ?? {});
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid writing filters.",
      operation: "list_writing",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const { cursor, domain, limit } = parsed.data;
  if (domain && !isWorkType(domain)) {
    return readResult({
      data: null,
      message: "Unknown writing domain.",
      operation: "list_writing",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const category = domain ? categoryForDomain(domain) : null;
  const posts = allBlogs
    .filter((post) => post.publishedAt >= "2020")
    .filter((post) =>
      category
        ? (post.category ?? []).some((item) => item.toLowerCase() === category)
        : true
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const page = paginate({ cursor, items: posts, limit });
  if ("error" in page) {
    return readResult({
      data: null,
      message: page.error ?? "Invalid cursor.",
      operation: "list_writing",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const records = page.items.map((post) => ({
    excerpt: post.summary ?? "",
    publishedAt: post.publishedAt,
    slug: post.slug,
    title: post.title,
    url: `${siteOrigin}/blog/${post.slug}`,
  }));
  return readResult({
    data: { nextCursor: page.nextCursor, posts: records },
    message: records.length ? "Writing listed." : "No posts matched.",
    operation: "list_writing",
    requestId: context.correlationId,
    status: records.length ? "ok" : "empty",
  });
};
