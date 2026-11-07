import { LatestPosts } from "components/blog/latest-posts";
import { HomepageGenUiShell } from "components/genui/homepage-shell";
import { FeaturedWork } from "components/home/featured-work";
import { FocusRow } from "components/home/focus-row";
import { PortraitMedia } from "components/home/portrait-media";
import { PageEyebrow, PageTitle } from "components/shared/page-layout";
import { narrativeIntroGap, sectionAction } from "components/shared/spacing";
import { homeJsonLd } from "lib/home-json-ld";
import { personalOgImage } from "lib/og/constants";
import { pageMetadata } from "lib/page-metadata";
import {
  siteBrandRole,
  siteMetadataTitle,
  sitePublicDescription,
} from "lib/site-identity";
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
      <div className="grid items-start gap-6 lg:mt-6 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-0">
        <div className="relative z-10 pb-6 lg:pb-0">
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
        </div>
        <PortraitMedia />
      </div>
      <HomepageGenUiShell>
        <div className={narrativeIntroGap}>
          <FeaturedWork projects={selectedProjects} />
          <FocusRow />
        </div>
        <LatestPosts
          limit={4}
          title="Writing"
          action={
            <Link href="/blog" className={sectionAction}>
              More writing <span aria-hidden="true">↗</span>
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
