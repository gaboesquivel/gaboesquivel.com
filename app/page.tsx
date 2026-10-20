import { LatestPosts } from "components/blog/latest-posts";
import { LetsConnect } from "components/shared/lets-connect";
import {
  blockGrid,
  PageSection,
  PageTitle,
  Prose,
  sectionAction,
  twoColGrid,
} from "components/shared/page-layout";
import { PathLink } from "components/shared/path-link";
import { ProjectCard } from "components/work/project-card";
import { projects } from "gaboesquivel";
import { homeJsonLd } from "lib/home-json-ld";
import { cn } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

const selectedProjectSlugs = ["legal-agent", "wink", "ztx", "bitlauncher"];
const selectedProjects = selectedProjectSlugs.flatMap((slug) =>
  projects.filter((project) => project.slug === slug)
);

export default function HomePage() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <PageTitle className="leading-tight">
        Gabo Esquivel
        <span className="max-md:hidden"> — </span>
        <br className="md:hidden" />
        Agentic Product Engineer
      </PageTitle>
      <Prose>
        I build useful and delightful software products, designed for humans and
        agents alike. I work across product, design, and architecture to create
        intuitive human experiences, agent-friendly interfaces, and efficient
        operational workflows.
      </Prose>

      <Prose>
        15+ years of shipping software, including 12+ years building 0→1
        products for startups and growth-stage teams across FinTech, Web3, and
        AI.
      </Prose>

      <PageSection
        title="Selected work"
        action={
          <Link href="/work" className={sectionAction}>
            More work
          </Link>
        }
      >
        <ul className={blockGrid}>
          {selectedProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} showRole />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection title="Focus">
        <ul className={blockGrid}>
          <li className="h-full">
            <PathLink
              href="/ai"
              title="Agentic AI products"
              note="AI agents and generative interfaces that help people get things done, with tools and workflows your team can refine as the product evolves."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/web3"
              title="Onchain finance"
              note="Wallets, stablecoin payments, and trading products that make complex financial interactions intuitive, with clear information about what people are signing."
            />
          </li>
        </ul>
      </PageSection>

      <PageSection title="Career">
        <ul className={cn(twoColGrid, "[&_a]:h-full!")}>
          <li className="h-full">
            <PathLink
              href="/bio"
              title="Career story"
              note="The experiences, decisions, and lessons that shaped how I approach building software."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/cv"
              title="Résumé / CV"
              note="My professional history, roles, responsibilities, and selected achievements."
            />
          </li>
        </ul>
      </PageSection>

      <LatestPosts
        limit={4}
        title="Writing"
        action={
          <Link href="/blog" className={sectionAction}>
            More writing
          </Link>
        }
      />

      <PageSection title="Work together">
        <LetsConnect />
      </PageSection>
    </section>
  );
}

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/index.md" },
  },
  description:
    "I build useful and delightful software products across AI, Web3, and full-stack applications.",
  openGraph: {
    description:
      "I build useful and delightful software products across AI, Web3, and full-stack applications.",
    title: "Gabo Esquivel | Agentic Product Engineer",
    type: "website",
  },
  title: "Gabo Esquivel | Agentic Product Engineer",
};
