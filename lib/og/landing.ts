import {
  techCategoryIds,
  techCategoryLabels,
} from "components/tech/categories";
import { techStack } from "gaboesquivel";
import { browseCategories, categoryDisplayNames } from "lib/blog-taxonomy";
import { visibleTechStack } from "lib/tech-evidence";
import { workTypeCopy, workTypeOptions } from "lib/work-types";

import { ogHeight, ogWidth } from "./constants";

/**
 * Pages that get a generated landing OG card: the homepage layout with the
 * page's own headline. Blog posts and projects have their own cards; the
 * homepage uses `/og`.
 */
const staticPages: Record<string, string> = {
  "/blog": "Blog",
  "/work": workTypeCopy.featured.heroTitle,
  "/ai": "AI Engineering",
  "/web3": "Web3 Engineering",
  "/bio": "My journey",
  "/tech": "Technology stack",
  "/explore": "Explore",
  "/about": "About",
  "/contact": "Contact",
  "/cv": "CV",
  "/docs": "Developer docs",
  "/privacy": "Privacy",
  "/backend": "Backend engineering",
  "/frontend": "Frontend engineering",
  "/fullstack": "Full-stack product engineering",
  "/mobile": "Mobile engineering",
  "/lead": "Technical leadership",
  "/startups": "Startup product engineering",
  "/institutions": "Institutional software engineering",
};

let cached: Map<string, string> | undefined;

/** Every landing path mapped to its card headline. */
export const landingOgPages = () => {
  if (cached) return cached;
  cached = new Map([
    ...Object.entries(staticPages),
    ...workTypeOptions
      .filter((type) => type !== "featured")
      .map((type) => [`/work/${type}`, workTypeCopy[type].heroTitle] as const),
    ...browseCategories.map(
      (category) =>
        [
          `/blog/category/${category}`,
          `${categoryDisplayNames[category]} writing`,
        ] as const
    ),
    ...techCategoryIds
      .filter((category) => category !== "featured")
      .map(
        (category) =>
          [
            `/tech/${category}`,
            category === "all"
              ? "All technologies"
              : `${techCategoryLabels[category]} technologies`,
          ] as const
      ),
    ...visibleTechStack(techStack).map(
      (tech) => [`/tech/${tech.slug}`, tech.name] as const
    ),
  ]);
  return cached;
};

export const landingOgFile = (path: string) =>
  `${path.slice(1).replaceAll("/", "-")}.png`;

export const landingOgDir = "/images/og/pages";

/** Metadata image for a landing path, or undefined when it has no card. */
export const landingOgImages = (path: string) => {
  const headline = landingOgPages().get(path);
  if (!headline) return;
  return [
    {
      url: `${landingOgDir}/${landingOgFile(path)}`,
      width: ogWidth,
      height: ogHeight,
      alt: `${headline} — Gabo Esquivel`,
    },
  ];
};
