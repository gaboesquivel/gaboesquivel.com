import type { SearchRecord } from "components/search/types";
import { projects } from "gaboesquivel";
import { allBlogs } from "lib/blog";

const staticRecords: SearchRecord[] = [
  {
    title: "Career story",
    description: "Gabo's background and experience",
    href: "/bio",
  },
  {
    title: "Résumé / CV",
    description: "Roles, experience and CV downloads",
    href: "/cv",
  },
  {
    title: "Work together",
    description: "Contact Gabo about hiring or a project",
    href: "/contact",
  },
];

export const getSiteSearchRecords = (): SearchRecord[] => [
  ...projects.map((project) => ({
    title: project.title,
    description: project.description,
    href: `/project/${project.slug}`,
  })),
  ...allBlogs.map((post) => ({
    title: post.title,
    description: post.summary || "",
    href: `/blog/${post.slug}`,
  })),
  ...staticRecords,
];
