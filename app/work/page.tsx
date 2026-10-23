import { LatestPosts } from "components/blog/latest-posts";
import { sectionAction } from "components/shared/spacing";
import { WorkProjectGallery } from "components/work/work-project-gallery";
import { getProjectBySlug } from "gaboesquivel";
import { pageMetadata } from "lib/page-metadata";
import { featuredProjectSlugs } from "lib/work-types";
import Link from "next/link";

export default function WorkPage() {
  const filteredProjects = featuredProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> =>
      Boolean(project)
    );

  return (
    <>
      <WorkProjectGallery projects={filteredProjects} />
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
