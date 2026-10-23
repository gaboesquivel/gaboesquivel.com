import { LatestPosts } from "components/blog/latest-posts";
import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import {
  ctaLink,
  editorialLink,
  editorialMeasure,
  narrativeCopy,
  narrativeIntroGap,
  narrativeSectionGap,
  proseLink,
  sectionHeadingSpacing,
  sectionTitle,
} from "components/shared/spacing";
import { EditorialWorkCard } from "components/work/editorial-work-card";
import { cvPath } from "lib/cv-paths";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import Link from "next/link";

const actionLink = cn(ctaLink, editorialLink, "text-sm");

export default function AIExperiencePage() {
  return (
    <InteriorPageShell>
      <PageIntro
        narrative
        description="I build AI products where the experience matters as much as the model. Voice and chat assistants, retrieval-backed workflows, and generative interfaces all serve the same goal: making intelligent systems useful and understandable."
        title="AI Engineering"
      >
        <p>
          That work spans product, design, and engineering. I shape the context
          and tools a model receives, the actions it can take, and the controls
          teams need to evaluate, adjust, and operate the system after launch.
        </p>
      </PageIntro>

      <section className={narrativeIntroGap}>
        <EditorialWorkCard
          priority
          action="View LegalAgent"
          description="For LegalAgent, I added bilingual voice and chat to a React Native app for legal professionals. I used OpenAI's Realtime API, the AI SDK, and retrieval over case context, documents, and procedures. Feedback from attorneys helped refine the assistant's behavior and tool use."
          layout="feature"
          slug="legal-agent"
          supporting="I also built a TanStack Start administration interface with Microsoft SSO, document management, prompt controls, and retrieval configuration."
          title="LegalAgent"
        />
      </section>

      <section className={narrativeSectionGap}>
        <h2 className={cn(sectionTitle, sectionHeadingSpacing, "text-balance")}>
          Domain-specific assistants
        </h2>
        <p className={cn(editorialMeasure, narrativeCopy)}>
          Different products call for different kinds of assistance. At
          Masterbots and Bitlauncher, I worked on specialized assistants
          connected to real application workflows and data.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <li className="h-full min-w-0">
            <EditorialWorkCard
              action="View Masterbots"
              description="I built interfaces for specialized AI assistants and integrated AI SDK tooling, including workflows for multilingual content."
              layout="landscape"
              objectClassName="object-top"
              slug="masterbots"
              title="Masterbots"
            />
          </li>
          <li className="h-full min-w-0">
            <EditorialWorkCard
              action="View Bitlauncher"
              description="I built a retrieval-backed assistant for project research, news, and video content, with AI-assisted internationalization. Financial and transaction data remained grounded in the application's deterministic systems."
              layout="landscape"
              slug="bitlauncher"
              title="Bitlauncher"
            />
          </li>
        </ul>
        <p className={cn(editorialMeasure, narrativeCopy, "mt-8 lg:mt-10")}>
          Earlier,{" "}
          <Link className={proseLink} href="/project/wizard-world">
            Wizard World
          </Link>{" "}
          connected OpenAI image generation with NFT minting on Flow through
          Niftory—an experiment in bringing generative experiences into
          blockchain transactions.
        </p>
      </section>

      <LatestPosts
        arrow
        category="Artificial Intelligence"
        className={narrativeSectionGap}
        limit={4}
        title="Writing about AI products"
        variant="editorial"
      />

      <section className={narrativeSectionGap}>
        <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>
          Explore more
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="m-0">
            <Link className={actionLink} href={cvPath({ key: "ai" })}>
              AI résumé / CV →
            </Link>
          </p>
          <p className="m-0">
            <Link className={actionLink} href="/contact">
              Start a conversation →
            </Link>
          </p>
        </div>
      </section>
    </InteriorPageShell>
  );
}

export const metadata = pageMetadata({
  description:
    "AI engineering by Gabo Esquivel: voice and chat assistants, retrieval, agentic workflows, and production tools built for teams to operate.",
  images: [
    {
      url: "/images/work/legalagent.png",
      alt: "LegalAgent AI assistant interface",
    },
  ],
  path: "/ai",
  title: "AI Engineering | Gabo Esquivel",
});
