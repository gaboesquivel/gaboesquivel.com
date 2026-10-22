import { LatestPosts } from "components/blog/latest-posts";
import { sectionAction } from "components/shared/spacing";
import { Projects } from "components/work/projects";
import { getProjectBySlug } from "gaboesquivel";
import { pageMetadata } from "lib/page-metadata";
import { featuredProjectSlugs } from "lib/work-types";
import Link from "next/link";

const workIntro =
  "Selected products and systems across AI, banking, Web3, and infrastructure.";

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
        preserveOrder={true}
        layout="featured-gallery"
        hero={{
          trail: [{ label: "work" }, { label: "selected projects" }],
          title: "Software that ships.",
          description: workIntro,
        }}
      />
      <LatestPosts
        limit={3}
        title="Writing"
        variant="editorial"
        action={
          <Link href="/blog" className={sectionAction}>
            More writing
          </Link>
        }
      />
    </>
  );
}

export const metadata = pageMetadata({
  description:
    "Explore software projects across AI assistants, mobile banking, trading interfaces, wallets, and blockchain infrastructure, with implementation details for each.",
  path: "/work",
  title: "Selected Software Projects | Gabo Esquivel",
});
