import { ProjectsMasonry } from "components/work/projects-masonry";
import { WorkLatestWriting } from "components/work/work-latest-writing";
import { projects } from "gaboesquivel";
import { pageMetadata } from "lib/page-metadata";
import {
  isWorkType,
  workTypeCopy,
  workTypeHref,
  workTypeOptions,
} from "lib/work-types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

const workTypeFromParams = async (params: Promise<{ type: string }>) => {
  const { type } = await params;
  if (!isWorkType(type)) notFound();
  return type;
};

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
  const type = await workTypeFromParams(params);

  const filteredProjects =
    type === "all"
      ? projects
      : projects.filter((project) => project.type.includes(type));

  return (
    <>
      <ProjectsMasonry
        projects={filteredProjects}
        identifier={type}
        preserveOrder={false}
        variant="editorial"
      />
      <WorkLatestWriting />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const type = await workTypeFromParams(params);
  const copy = workTypeCopy[type];

  return pageMetadata({
    description: copy.description,
    path: workTypeHref({ type }),
    title: `${copy.heading} | Gabo Esquivel`,
  });
}
