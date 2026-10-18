import { LatestPosts } from "components/blog/latest-posts";
import { Projects } from "components/work/projects";
import { projects } from "gaboesquivel";
import { pageMetadata } from "lib/page-metadata";
import { isWorkType, workTypeCopy, workTypeOptions } from "lib/work-types";
import type { Metadata } from "next";

export function generateStaticParams() {
  return workTypeOptions
    .filter((type) => type !== "featured")
    .map((type) => ({ type }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: rawType } = await params;
  const type = rawType || "featured";
  const filteredProjects =
    type === "all"
      ? projects
      : projects.filter((project) => project.type.includes(type));
  return (
    <>
      <Projects projects={filteredProjects} type={type} />
      <LatestPosts />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type: rawType } = await params;
  const type = rawType || "featured";
  const copy = isWorkType(type)
    ? workTypeCopy[type]
    : {
        description: `Projects tagged ${type} in the work library.`,
        heading: `${type} projects`,
      };

  return pageMetadata({
    description: copy.description,
    path: type === "featured" ? "/work" : `/work/${type}`,
    title: `${copy.heading} | Gabo Esquivel`,
  });
}
