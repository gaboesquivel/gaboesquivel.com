import { WorkLatestWriting } from "components/work/work-latest-writing";
import { WorkProjectGallery } from "components/work/work-project-gallery";
import { getProjectBySlug } from "gaboesquivel";
import { pageMetadata } from "lib/page-metadata";
import {
  featuredProjectSlugs,
  workTypeCopy,
  workTypeHref,
} from "lib/work-types";

export default function WorkPage() {
  const filteredProjects = featuredProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> =>
      Boolean(project)
    );

  return (
    <>
      <WorkProjectGallery projects={filteredProjects} />
      <WorkLatestWriting />
    </>
  );
}

const featuredCopy = workTypeCopy.featured;

export const metadata = pageMetadata({
  description: featuredCopy.description,
  path: workTypeHref({ type: "featured" }),
  title: `${featuredCopy.heading} | Gabo Esquivel`,
});
