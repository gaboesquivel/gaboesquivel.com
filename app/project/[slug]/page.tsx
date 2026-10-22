import { ProjectDetails } from "components/work/project";
import { getProjectBySlug, projects } from "gaboesquivel";
import { projectOgMetadataImages } from "lib/og/resolve";
import { pageMetadata } from "lib/page-metadata";
import { siteOrigin } from "lib/site-path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} full={true} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const images = projectOgMetadataImages({
    image: project.image,
    siteOrigin,
    slug: project.slug,
  }).map((img) => ({ ...img, alt: project.title }));

  return pageMetadata({
    description: project.description,
    images,
    path: `/project/${slug}`,
    title: `${project.title} | Gabo Esquivel`,
  });
}
