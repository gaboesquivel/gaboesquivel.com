import type { Project } from "gaboesquivel";

export const aiBrowsePrioritySlugs = [
  "legal-agent",
  "masterbots",
  "bitlauncher",
  "wizard-world",
] as const;

export const orderBrowseProjects = ({
  domain,
  projects,
}: {
  domain: "ai" | "web3" | "all";
  projects: Project[];
}) => {
  const priority =
    domain === "ai"
      ? aiBrowsePrioritySlugs
      : domain === "web3"
        ? (["wink", "ztx", "opyn", "eos-costa-rica"] as const)
        : ([] as const);
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const ordered: Project[] = [];
  for (const slug of priority) {
    const project = bySlug.get(slug);
    if (project) {
      ordered.push(project);
      bySlug.delete(slug);
    }
  }
  for (const project of projects) {
    if (bySlug.has(project.slug)) ordered.push(project);
  }
  return ordered;
};
