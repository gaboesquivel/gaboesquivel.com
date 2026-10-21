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
import { getProjectBySlug } from "gaboesquivel";
import { homeJsonLd } from "lib/home-json-ld";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import Link from "next/link";

import styles from "./home-hero.module.css";

const selectedProjectSlugs = ["legal-agent", "wink", "ztx", "bitlauncher"];
const selectedProjects = selectedProjectSlugs.flatMap((slug) => {
  const project = getProjectBySlug(slug);
  return project ? [project] : [];
});

export default function HomePage() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <PageTitle className={cn(styles.heroTitle, "leading-tight")}>
        Gabo Esquivel
        <br className="md:hidden" />
        <span className="max-md:hidden"> — </span>
        Agentic Product Engineer
      </PageTitle>
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <Prose>
            I build useful and delightful software products, designed for humans
            and agents alike. I bring product thinking, careful design, and
            software architecture together to make complex systems intuitive to
            use and dependable to operate.
          </Prose>

          <Prose>
            15+ years of shipping software, including 12+ years building 0→1
            products for startups and growth-stage teams across FinTech, Web3,
            and AI.
          </Prose>

          <Link
            href="/contact"
            className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-sm text-sm text-neutral-200 underline decoration-neutral-600 underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <MessageSquare
              aria-hidden="true"
              className="size-6 text-accent"
              strokeWidth={1.5}
            />
            Contact me
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>

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
              note="Voice, chat, retrieval, and agentic interfaces designed around how people work—and the controls teams need to improve them."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/web3"
              title="Onchain finance"
              note="Wallets, onchain transactions, and trading experiences that make balances, signatures, and financial decisions understandable."
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
              note="How building web interfaces led me into banking, Web3, and AI—and shaped the way I approach products."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/cv"
              title="Résumé / CV"
              note="Roles, dates, responsibilities, and selected technical achievements."
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

export const metadata = pageMetadata({
  description:
    "Gabo Esquivel builds useful, delightful software for humans and agents, connecting product, careful design, and architecture across AI, Web3, and finance.",
  images: [
    {
      url: "/images/gaboesquivel-homepage.webp",
      width: 1433,
      height: 1098,
      alt: "Gabo Esquivel — Agentic Product Engineer",
    },
  ],
  path: "/",
  title: "Gabo Esquivel | Agentic Product Engineer",
});
