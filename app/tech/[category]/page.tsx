import { BlogPostsMasonry } from "components/blog/blog-posts-masonry";
import { PageSection, proseLink, Prose } from "components/shared/page-layout";
import {
  isTechCategoryId,
  techCategoryFrame,
  techCategoryIds,
  techCategoryLabels,
} from "components/tech/categories";
import { TechList } from "components/tech/tech-list";
import TechStack from "components/tech/tech-stack";
import {
  filterTechByCategory,
  getTechStackBySlug,
  techStack,
} from "gaboesquivel";
import { allBlogs } from "lib/blog";
import { comparePublishedAtDesc } from "lib/blog-order";
import { pageMetadata } from "lib/page-metadata";
import { isEmptyTech, visibleTechStack } from "lib/tech-evidence";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

const categoryDescriptions = {
  ai: "AI technologies used in shipped assistants and applications, including voice, retrieval, prompting, and tool integration.",
  all: "An index of technologies found in Gabo Esquivel's software projects, linked to implementation examples.",
  backend:
    "Backend technologies used for APIs, databases, realtime services, indexers, and application infrastructure.",
  "cloud-devops":
    "Cloud and infrastructure tools used across application hosting, backend services, blockchain systems, and deployment.",
  featured: "Selected technologies from Gabo Esquivel's software projects.",
  frontend:
    "Frontend technologies used in interactive products, trading applications, and mobile and web interfaces.",
  web3: "Web3 technologies used in software projects, from smart contracts and wallets to blockchain indexing and data access.",
} as const;

const capabilityLinkLabel: Record<string, string> = {
  ai: "AI engineering",
  backend: "backend engineering",
  frontend: "frontend engineering",
  web3: "Web3 engineering",
};

export default async function TechCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (category === "featured") {
    redirect("/tech");
  }

  if (isTechCategoryId(category)) {
    const categoryTech = filterTechByCategory(techStack, category);
    const categoryTagsSet = new Set(categoryTech.map((t) => String(t.tag)));

    const filteredPosts = allBlogs
      .filter((post) =>
        post.tech?.some((techTag) => categoryTagsSet.has(techTag))
      )
      .sort(comparePublishedAtDesc);

    const frame = techCategoryFrame({ category });

    return (
      <>
        <TechList
          category={category}
          heading={`${techCategoryLabels[category]} technologies`}
          intro={categoryDescriptions[category]}
          note={
            frame ? (
              <Prose className="mt-0">
                {frame.line}{" "}
                <Link href={frame.capabilityHref} className={proseLink}>
                  {capabilityLinkLabel[category]}
                </Link>{" "}
                goes deeper on the work.
              </Prose>
            ) : undefined
          }
          trail={[
            { label: "tech", href: "/tech" },
            { label: techCategoryLabels[category].toLowerCase() },
          ]}
        />
        {filteredPosts.length > 0 ? (
          <PageSection title={`Writing about ${techCategoryLabels[category]}`}>
            <BlogPostsMasonry
              identifier={category}
              posts={filteredPosts}
              variant="editorial"
            />
          </PageSection>
        ) : null}
      </>
    );
  }

  const tech = getTechStackBySlug(category);
  if (!tech || isEmptyTech(tech)) {
    redirect("/tech");
  }
  return <TechStack tech={tech} />;
}

export function generateStaticParams() {
  return [
    ...techCategoryIds
      .filter((category) => category !== "featured")
      .map((category) => ({ category })),
    ...visibleTechStack(techStack).map((tech) => ({ category: tech.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (isTechCategoryId(category)) {
    const label = techCategoryLabels[category];
    const title =
      category === "all"
        ? "All technologies | Gabo Esquivel"
        : `${label} technologies | Gabo Esquivel`;
    const description = categoryDescriptions[category];

    return pageMetadata({ description, path: `/tech/${category}`, title });
  }

  const tech = getTechStackBySlug(category);
  if (!tech) {
    return pageMetadata({
      title: "Not found | Gabo Esquivel",
      description: "Technology not found.",
      path: `/tech/${category}`,
    });
  }

  return pageMetadata({
    description: tech.description,
    path: `/tech/${category}`,
    title: `${tech.name} | Tech Stack | Gabo Esquivel`,
  });
}
