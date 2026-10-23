import { WorkLatestWriting } from "components/work/work-latest-writing";
import { WorkProjectGallery } from "components/work/work-project-gallery";
import { pageMetadata } from "lib/page-metadata";
import {
  featuredProjectSlugs,
  workTypeCopy,
  workTypeHref,
} from "lib/work-types";
import { projectsFromSlugs } from "lib/work/projects-from-slugs";

export default function WorkPage() {
  const filteredProjects = projectsFromSlugs(featuredProjectSlugs);

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
