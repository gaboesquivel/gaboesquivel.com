import { BioChapter } from "components/bio/bio-chapter";
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
import {
  EditorialWorkCard,
  ProjectCover,
} from "components/work/editorial-work-card";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import { editorialCoverSizes, workCoverSizes } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";
import gabocoding from "public/images/bio/gabo-coding.jpg";
import nodeschool from "public/images/bio/nodeschool-costa-rica.jpg";

const actionLink = cn(ctaLink, editorialLink, "text-sm");

export default function BioPage() {
  return (
    <InteriorPageShell>
      <PageIntro
        narrative
        description="I started building web interfaces in 2010. Over time, that work grew into complete products, financial and blockchain systems, and now intelligent interfaces."
        title="Career story"
      >
        <p>
          The common thread has always been making complex technology
          understandable and useful. Each stage changed how I approach design,
          engineering, and the work of bringing a product to life.
        </p>
      </PageIntro>

      <BioChapter className={narrativeIntroGap}>
        <div className={editorialMeasure}>
          <p className="text-sm text-neutral-400">2010 — Interfaces</p>
          <h2 className={cn(sectionTitle, "mt-3 text-balance")}>
            Interfaces and a JavaScript community
          </h2>
          <p className={cn(narrativeCopy, "mt-6")}>
            At American Express, I worked on credit-card interfaces from 2010 to
            2012, building interactive comparison tools and responsive landing
            pages, working with analytics and A/B testing, and helping move an
            older frontend toward modern JavaScript.
          </p>
          <p className={cn(narrativeCopy, "mt-5")}>
            From 2012, I also helped organize{" "}
            <Link className={proseLink} href="/project/costa-rica-js">
              Costa Rica JS
            </Link>
            . Through meetups, NodeSchool, and Front End Day, it grew into a
            community of more than 2,000 developers. Building that community
            mattered as much as the software. We were learning together, sharing
            what we knew, and helping modern web development take root in Costa
            Rica.
          </p>
          <p className={cn(narrativeCopy, "mt-5")}>
            Later, at AMC Networks, I led frontend engineering for YEAH!, an
            interactive streaming movie service launched at SXSW in 2013. Around
            that period, I also worked on a fantasy-tennis strategy game and a
            realtime flight-information display for ARINC.
          </p>
        </div>
        <figure className="mt-10 lg:mt-12">
          <Image
            alt="Developers at a NodeSchool Costa Rica workshop"
            className="h-auto w-full rounded-lg"
            fetchPriority="high"
            preload
            sizes={workCoverSizes}
            src={nodeschool}
          />
          <figcaption className="mt-3 max-w-[72ch]">
            <p className="m-0 text-sm text-neutral-400">
              Learning together at NodeSchool Costa Rica.
            </p>
          </figcaption>
        </figure>
      </BioChapter>

      <BioChapter>
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-12">
          <ProjectCover
            className="aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[440px]"
            sizes="(max-width: 1023px) calc(100vw - 2rem), calc((min(100vw, 72rem) - 4rem) * 0.58)"
            slug="wink"
          />
          <div className="flex min-w-0 flex-col justify-center lg:py-6">
            <p className="text-sm text-neutral-400">2015 — Product</p>
            <h2 className={cn(sectionTitle, "mt-3 text-balance")}>
              From interfaces to a banking product
            </h2>
            <p className={cn(narrativeCopy, "mt-6")}>
              Wink changed the scale of my work. Costa Rica&apos;s first neobank
              was designed to make banking accessible from a phone, without
              visiting a branch. I joined as Lead Engineer in 2015 and built the
              first React Native application and AWS backend, integrated
              partner-bank APIs, and implemented biometric authentication
              through a native bridge.
            </p>
            <p className={cn(narrativeCopy, "mt-5")}>
              Bringing Wink to launch meant more than writing code. I helped
              choose the technology, coordinate partners and vendors, plan
              delivery, and build the engineering team.
            </p>
            <p className={cn(narrativeCopy, "mt-5")}>
              The experience reinforced a principle I still believe in:
              technology should expand access rather than create new
              gatekeepers.
            </p>
            <p className="m-0 mt-6">
              <Link className={actionLink} href="/project/wink">
                View Wink →
              </Link>
            </p>
          </div>
        </div>
      </BioChapter>

      <BioChapter>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-x-12">
          <div className="min-w-0">
            <p className="text-sm text-neutral-400">2017 — Systems</p>
            <h2 className={cn(sectionTitle, "mt-3 text-balance")}>
              Financial products and blockchain systems
            </h2>
            <p className={cn(narrativeCopy, "mt-6")}>
              Building financial products led me toward blockchain
              infrastructure and the interfaces around it. From 2017 onward, I
              worked on tokens, marketplaces, and networks, including
              Knowledge&apos;s ERC-20 token, AsoBlockchain, which I co-founded,
              and EOS Costa Rica, where I helped launch the EOS mainnet and
              worked on a private chain for the innovation labs of a global
              accounting and consulting firm.
            </p>
            <p className={cn(narrativeCopy, "mt-5")}>
              The work later moved closer to everyday product experiences:
              Bitcash&apos;s exchange and browser signing, ChainGraph&apos;s
              blockchain data tools, RareMint&apos;s marketplace, ZTX&apos;s
              in-world wallet, Bitlauncher&apos;s auctions, and Opyn&apos;s
              trading interface.
            </p>
            <p className={cn(narrativeCopy, "mt-5")}>
              These projects worked at different layers of the stack, but they
              shared one challenge: making complex, often unfamiliar systems
              understandable to the people using them.
            </p>
            <p className="m-0 mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link className={actionLink} href="/project/eos-costa-rica">
                EOS Costa Rica →
              </Link>
              <Link className={actionLink} href="/project/ztx">
                ZTX →
              </Link>
              <Link className={actionLink} href="/web3">
                Explore Web3 work →
              </Link>
            </p>
          </div>
          <figure className="min-w-0">
            <Image
              alt="Gabo Esquivel coding"
              className="h-auto w-full rounded-lg"
              sizes={editorialCoverSizes}
              src={gabocoding}
            />
          </figure>
        </div>
      </BioChapter>

      <BioChapter>
        <div className={editorialMeasure}>
          <p className="text-sm text-neutral-400">2024 — AI</p>
          <h2 className={cn(sectionTitle, "mt-3 text-balance")}>
            Intelligent interfaces
          </h2>
          <p className={cn(narrativeCopy, "mt-6")}>
            By 2024, I was building specialized AI assistants at Masterbots and
            Bitlauncher. In 2025, I worked on LegalAgent, combining bilingual
            voice and chat, retrieval, and the operational controls needed to
            manage an AI product.
          </p>
          <p className={cn(narrativeCopy, "mt-5")}>
            The tools have changed considerably since I started building web
            interfaces, but my interest remains the same: the point where
            complex technology becomes useful to people.
          </p>
        </div>
        <div className="mt-10 lg:mt-12">
          <EditorialWorkCard
            action="View LegalAgent"
            layout="banner"
            slug="legal-agent"
            title="LegalAgent"
          />
        </div>
      </BioChapter>

      <LatestPosts
        arrow
        className={narrativeSectionGap}
        limit={4}
        title="Selected writing"
        variant="editorial"
      />

      <section className={narrativeSectionGap}>
        <div className={editorialMeasure}>
          <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>
            What I&apos;m focused on
          </h2>
          <p className={narrativeCopy}>
            Today, I work at the intersection of agentic AI, product
            engineering, and onchain finance. I help teams move from early ideas
            to working products, from the experience people interact with to the
            systems behind it.
          </p>
          <p className={cn(narrativeCopy, "mt-5")}>
            I work remotely from Costa Rica and collaborate in English, Spanish,
            Portuguese, and Italian.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="m-0">
            <Link className={actionLink} href="/cv">
              View my résumé / CV →
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
    "From Costa Rica JS and Wink to Web3 products and AI assistants, explore the career and product engineering approach of Gabo Esquivel.",
  images: [
    {
      url: "/images/bio/gabo-coding.jpg",
      alt: "Gabo Esquivel coding",
    },
  ],
  path: "/bio",
  title: "Gabo Esquivel | Career Story",
});
