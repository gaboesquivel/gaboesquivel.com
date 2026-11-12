import { projects } from "gaboesquivel";

import { postRecord, publishedPosts } from "../content-records";

const projectsById = new Map(
  projects.map((project) => [`/project/${project.slug}`, project])
);
const postsById = new Map(
  publishedPosts().map((post) => [postRecord(post).id, post])
);

/**
 * The published text a record's excerpt fields quote. The executor builds
 * excerpts from it and the compiler re-reads it to prove each excerpt is a
 * substring, so a cell can never say more than the source does.
 */
export const sourceUnits = ({
  field,
  recordId,
}: {
  field: string;
  recordId: string;
}): string[] => {
  if (recordId.startsWith("/project/")) {
    const project = projectsById.get(recordId);
    if (!project) return [];
    if (field === "story") return [...project.story];
    if (field === "achievements") return [...project.achievements];
    return [];
  }
  if (recordId.startsWith("/blog/") && field === "summary") {
    const post = postsById.get(recordId);
    return post?.summary ? [post.summary] : [];
  }
  return [];
};
