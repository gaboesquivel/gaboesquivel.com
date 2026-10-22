import { LatestPosts } from "components/blog/latest-posts";
import { HomepageGenUiShell } from "components/genui/homepage-shell";
import { PortraitMedia } from "components/home/portrait-media";
import { LetsConnect } from "components/shared/lets-connect";
import { PageTitle, PageSection } from "components/shared/page-layout";
import {
  editorialLink,
  heroTitle,
  heroPitch,
  homeSection,
  sectionAction,
} from "components/shared/spacing";
import { EditorialProjectList } from "components/work/editorial-project-list";
import { getProjectBySlug } from "gaboesquivel";
import { homeJsonLd } from "lib/home-json-ld";
import { personalOgImage } from "lib/og/constants";
import { pageMetadata } from "lib/page-metadata";
import {
  siteBrandRole,
  siteHeroPitch,
  siteMetadataTitle,
  sitePublicDescription,
} from "lib/site-identity";
import { cn } from "lib/utils";
import { homepageEditorialSlugs } from "lib/work/project-cover";
import Link from "next/link";

const selectedProjects = homepageEditorialSlugs.flatMap((slug) => {
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
      <div className="grid items-center gap-6 lg:grid-cols-[1.08fr_1fr] lg:gap-0">
        <div className="relative z-10 py-6 lg:py-12">
          <PageTitle className={cn(heroTitle, "mb-0 max-w-none")}>
            Software for
            <br />
            humans and agents.
          </PageTitle>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-sm leading-relaxed">
            <span className="text-neutral-400">GABO ESQUIVEL</span>
            <span aria-hidden="true" className="text-neutral-400">
              /
            </span>
            <span className="text-accent">{siteBrandRole}</span>
          </p>
          <p className={heroPitch}>{siteHeroPitch}</p>
        </div>
        <PortraitMedia />
      </div>
      <HomepageGenUiShell>
        <PageSection
          title="Selected work"
          className={homeSection}
          action={
            <Link href="/work" className={sectionAction}>
              View all work
            </Link>
          }
        >
          <EditorialProjectList projects={selectedProjects} />
        </PageSection>
        <PageSection title="Focus" className={homeSection}>
          <div className="grid gap-8 lg:grid-cols-2">
            <Link
              href="/ai"
              className={cn(
                editorialLink,
                "block border-t border-hairline pt-6"
              )}
            >
              <h3 className="text-xl font-semibold">Agentic AI products</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-400">
                Voice, chat, retrieval, and agentic interfaces designed around
                how people work—and the controls teams need to improve them.
              </p>
            </Link>
            <Link
              href="/web3"
              className={cn(
                editorialLink,
                "block border-t border-hairline pt-6"
              )}
            >
              <h3 className="text-xl font-semibold">Onchain finance</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-400">
                Wallets, onchain transactions, and trading experiences that make
                balances, signatures, and financial decisions understandable.
              </p>
            </Link>
          </div>
        </PageSection>
        <LatestPosts
          limit={4}
          title="Writing"
          variant="editorial"
          action={
            <Link href="/blog" className={sectionAction}>
              More writing
            </Link>
          }
        />
        <PageSection title="Career" className={homeSection}>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <Link
              href="/bio"
              className={cn(editorialLink, "inline-flex min-h-11 items-center")}
            >
              Career story
            </Link>
            <Link
              href="/cv"
              className={cn(editorialLink, "inline-flex min-h-11 items-center")}
            >
              Résumé / CV
            </Link>
          </div>
        </PageSection>
        <PageSection title="Work together" className={homeSection}>
          <LetsConnect />
        </PageSection>
      </HomepageGenUiShell>
    </section>
  );
}
export const metadata = pageMetadata({
  description: sitePublicDescription,
  images: [personalOgImage],
  path: "/",
  title: siteMetadataTitle,
});
