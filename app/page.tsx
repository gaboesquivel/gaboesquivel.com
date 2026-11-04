import { LatestPosts } from "components/blog/latest-posts";
import { HomepageGenUiShell } from "components/genui/homepage-shell";
import { PortraitMedia } from "components/home/portrait-media";
import { LetsConnect } from "components/shared/lets-connect";
import {
  PageEyebrow,
  PageTitle,
  PageSection,
} from "components/shared/page-layout";
import {
  editorialLink,
  heroTitle,
  heroPitch,
  sectionGap,
  sectionAction,
} from "components/shared/spacing";
import { EditorialProjectList } from "components/work/editorial-project-list";
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
import { projectsFromSlugs } from "lib/work/projects-from-slugs";
import Link from "next/link";

const selectedProjects = projectsFromSlugs(homepageEditorialSlugs);

export default function HomePage() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.08fr_1fr] lg:gap-0">
        <div className="relative z-10 pb-6 lg:pb-12">
          <PageEyebrow />
          <PageTitle>
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
          className={sectionGap}
          action={
            <Link href="/work" className={sectionAction}>
              View all work
            </Link>
          }
        >
          <EditorialProjectList projects={selectedProjects} />
        </PageSection>
        <PageSection title="Focus" className={sectionGap}>
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
        <PageSection title="Connect" className={sectionGap}>
          <LetsConnect />
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
