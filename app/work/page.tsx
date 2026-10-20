import { LatestPosts } from "components/blog/latest-posts";
import { Projects } from "components/work/projects";
import { getProjectBySlug } from "gaboesquivel";
import { pageMetadata } from "lib/page-metadata";

const featuredProjectSlugs = [
  "legal-agent",
  "wink",
  "ztx",
  "bitlauncher",
  "opyn",
  "eos-costa-rica",
] as const;

const workIntro =
  "A selection of products and systems I've built, from AI assistants and mobile banking to wallets, trading interfaces, and blockchain infrastructure.";

export default function WorkPage() {
  const type = "featured";
  const filteredProjects = featuredProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> =>
      Boolean(project)
    );

  return (
    <>
      <Projects
        projects={filteredProjects}
        type={type}
        intro={workIntro}
        preserveOrder={true}
      />
      <LatestPosts />
    </>
  );
}

export const metadata = pageMetadata({
  description:
    "Explore software projects across AI assistants, mobile banking, trading interfaces, wallets, and blockchain infrastructure, with implementation details for each.",
  path: "/work",
  title: "Selected Software Projects | Gabo Esquivel",
});
