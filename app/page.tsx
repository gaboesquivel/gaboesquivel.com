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
import { getImageProps } from "next/image";
import Link from "next/link";
import { preload } from "react-dom";

const homeHeroAlt = "Gabo Esquivel — Agentic Product Engineer";

const homeHeroMobile = {
  height: 687,
  src: "/images/gaboesquivel-homepage-mobile.webp",
  width: 896,
} as const;

const homeHeroDesktop = {
  height: 536,
  src: "/images/gaboesquivel-homepage-desktop.webp",
  width: 700,
} as const;

const homeHeroMobileSizes =
  "(max-width: 639px) calc(100vw - 2rem), calc(100vw - 3rem)";

const homeHeroDesktopSizes =
  "(min-width: 768px) calc((min(100vw, 56rem) - 3rem) * 0.47)";

const defaultOgImage = {
  alt: homeHeroAlt,
  height: 630,
  url: "/og",
  width: 1200,
} as const;

const selectedProjectSlugs = ["legal-agent", "wink", "ztx", "bitlauncher"];
const selectedProjects = selectedProjectSlugs.flatMap((slug) => {
  const project = getProjectBySlug(slug);
  return project ? [project] : [];
});

const homeHero = () => {
  const {
    props: { src: desktopSrc, srcSet: desktopSrcSet },
  } = getImageProps({
    alt: "",
    fetchPriority: "high",
    height: homeHeroDesktop.height,
    loading: "eager",
    sizes: homeHeroDesktopSizes,
    src: homeHeroDesktop.src,
    width: homeHeroDesktop.width,
  });
  const { props: mobile } = getImageProps({
    alt: homeHeroAlt,
    fetchPriority: "high",
    height: homeHeroMobile.height,
    loading: "eager",
    sizes: homeHeroMobileSizes,
    src: homeHeroMobile.src,
    width: homeHeroMobile.width,
  });
  return { desktopSrc, desktopSrcSet, mobile };
};

export default function HomePage() {
  const { desktopSrc, desktopSrcSet, mobile } = homeHero();
  preload(mobile.src, {
    as: "image",
    fetchPriority: "high",
    imageSizes: mobile.sizes,
    imageSrcSet: mobile.srcSet,
    media: "(max-width: 767px)",
  });
  preload(desktopSrc, {
    as: "image",
    fetchPriority: "high",
    imageSizes: homeHeroDesktopSizes,
    imageSrcSet: desktopSrcSet,
    media: "(min-width: 768px)",
  });

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <PageTitle
        className={cn("relative z-[1] w-full max-w-none", "leading-normal")}
      >
        Gabo Esquivel
        <br className="md:hidden" />
        <span className="max-md:hidden"> — </span>
        Agentic Product Engineer
      </PageTitle>
      <div className="relative overflow-x-clip">
        <picture>
          <source
            media="(min-width: 768px)"
            sizes={homeHeroDesktopSizes}
            srcSet={desktopSrcSet}
          />
          <img
            {...mobile}
            alt={homeHeroAlt}
            className="block h-auto w-full md:pointer-events-none md:absolute md:top-0 md:right-0 md:h-auto md:w-[47%] md:max-w-none"
          />
        </picture>
        <div className="relative md:pr-[45%]">
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
  images: [defaultOgImage],
  path: "/",
  title: "Gabo Esquivel | Agentic Product Engineer",
});
