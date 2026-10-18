import { LatestPosts } from "components/blog/latest-posts";
import { Projects } from "components/work/projects";
import { projects } from "gaboesquivel";
import type { Metadata } from "next";

export default function WorkPage() {
  const type = "featured";
  const filteredProjects = projects.filter((project) =>
    project.type.includes(type)
  );
  return (
    <>
      <Projects projects={filteredProjects} type={type} />
      <LatestPosts />
    </>
  );
}

export const metadata: Metadata = {
  alternates: {
    types: { "text/markdown": "/work.md" },
  },
  description:
    "Selected projects across AI, Web3, fintech, and full-stack product engineering.",
  openGraph: {
    description:
      "Selected projects across AI, Web3, fintech, and full-stack product engineering.",
    title: "Work & Projects | Gabo Esquivel",
    type: "website",
  },
  title: "Work & Projects | Gabo Esquivel",
};
