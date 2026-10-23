import type { composeSearchSections } from "./compose-search";
import type { PublicRecord } from "./envelope";

export const sectionToRecord = (
  item: ReturnType<typeof composeSearchSections>[number]
): PublicRecord | null => {
  if (item.kind === "project") {
    const slug = item.id.replace("/project/", "");
    return {
      description: item.excerpt,
      id: item.id,
      kind: "project",
      slug,
      title: item.title,
      url: item.url,
    };
  }
  if (item.kind === "post") {
    const slug = item.id.replace("/blog/", "");
    return {
      excerpt: item.excerpt,
      id: item.id,
      kind: "post",
      publishedAt: item.publishedAt,
      slug,
      title: item.title,
      url: item.url,
    };
  }
  return {
    excerpt: item.excerpt,
    id: item.id,
    kind: "profile",
    title: item.title,
    url: item.url,
  };
};
