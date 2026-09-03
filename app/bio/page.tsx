import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
} from 'components/shared/page-layout'
import { ProjectEvidence } from 'components/work/project-evidence'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'
import gabocoding from 'public/images/bio/gabo-coding.jpg'

export default function BioPage() {
  return (
    <section>
      <PageTitle>Career story</PageTitle>

      <Prose>
        My work has moved from web interfaces to complete products, then into
        financial and blockchain systems, and now into intelligent interfaces.
      </Prose>
      <Prose>
        That has covered consumer products, financial institutions, startups,
        open-source infrastructure, and technical communities since 2010. The{' '}
        <Link href="/work" className="prose-link">
          work library
        </Link>{' '}
        and individual project pages carry the implementation details.
      </Prose>

      <PageSection title="Interfaces and a JavaScript community">
        <Prose>
          American Express needed credit-card marketing screens that could be
          tested and measured inside an established financial organization. As
          UI Engineer from 2010 to 2012 I built comparison sliders and landing
          pages, wired responsive layouts, A/B testing, and analytics, and
          helped move a large frontend from Dojo to jQuery.
        </Prose>
        <Prose>
          I also founded{' '}
          <Link href="/project/costa-rica-js" className="prose-link">
            Costa Rica JS
          </Link>{' '}
          in 2010. It grew past 2,000 developers through meetups, workshops,
          NodeSchool, and JSConf Costa Rica as Node.js and modern web frameworks
          arrived in the region.
        </Prose>
        <Prose>
          AMC&apos;s YEAH! interactive streaming experience had to launch at
          SXSW 2013 with extras inside the film. As Lead UI Engineer from 2012
          to 2014 I owned the frontend: the Facebook application, Brightcove
          streaming, and the back-office editing path. Alongside full-time roles
          I shipped a fantasy-tennis strategy game and a realtime
          flight-information display for ARINC.
        </Prose>

        <ProjectEvidence slugs={['costa-rica-js']} columns={1} />
      </PageSection>

      <PageSection title="From interfaces to a banking product">
        <Prose>
          Wink was Costa Rica&apos;s first neobank: banking on a phone, without
          a branch visit. I joined as Lead Engineer in 2015 and stayed through
          2018. I built the first version of the React Native application and
          AWS backend, integrated partner-bank APIs, and implemented biometric
          authentication through a native bridge.
        </Prose>
        <Prose>
          Technology selection, project planning, partner and vendor
          coordination, security, recruiting, and team formation sat inside that
          product. A bank on a phone is only as good as the integrations,
          identity checks, and operations behind the screen.
        </Prose>
        <Prose>
          Wink is also where I settled on something I still hold: technology
          should expand access rather than create new gatekeepers. Here that was
          literal. Opening a bank account stopped requiring a trip to a branch.
        </Prose>

        <ProjectEvidence slugs={['wink']} columns={1} />
      </PageSection>

      <PageSection title="Complex financial and blockchain systems">
        <Prose>
          The next stretch was the system-to-interface problem: token state,
          private chains, exchanges, and wallets that people actually use. The
          implementations are on{' '}
          <Link href="/web3" className="prose-link">
            /web3
          </Link>{' '}
          and the project pages.
        </Prose>
        <Prose>
          Tokens and protocol infrastructure came first. At Knowledge, from 2017
          to 2018, I deployed an ERC-20 token for a mainnet ICO and built the
          marketplace and wallet around it. I also co-founded AsoBlockchain in
          2017. At EOS Costa Rica, from 2018 to 2020, I helped launch the EOS
          mainnet, operated validators, and built a private EOSIO chain for
          Grant Thornton Labs.
        </Prose>
        <Prose>
          Then exchanges and indexed chain data. Bitcash, from 2020 to 2021, was
          a peer-to-peer exchange whose product depended on a matching engine,
          browser signing, and a realtime EOS indexer. ChainGraph grew from that
          work into an open-source GraphQL toolkit for EOSIO and Antelope data.
        </Prose>
        <Prose>
          RareMint, ZTX, Bitlauncher, and Opyn pushed the same problem into
          collectible auctions, a virtual-world wallet, a token launchpad, and
          an options trading interface.
        </Prose>

        <PageImage
          alt="Gabo Esquivel coding"
          src={gabocoding}
          objectClassName="object-top"
        />

        <ProjectEvidence slugs={['eos-costa-rica', 'ztx']} />
      </PageSection>

      <PageSection title="Intelligent interfaces">
        <Prose>
          Intelligent interfaces, in this work, means voice and chat, retrieval
          that decides what the model sees, and admin controls so a team can run
          the assistant after launch. Specialized assistants showed up inside
          Masterbots and Bitlauncher; in 2025 LegalAgent became the main
          evidence. That work sits on{' '}
          <Link href="/ai" className="prose-link">
            /ai
          </Link>
          .
        </Prose>

        <ProjectEvidence slugs={['legal-agent']} columns={1} />
      </PageSection>

      <LatestPosts title="Writing" />

      <PageSection title="The work now">
        <Prose>
          I work as a product engineer across AI, full-stack applications,
          financial systems, and Web3. I work in English, Spanish, Portuguese,
          and Italian.
        </Prose>

        <LetsConnect />
      </PageSection>
    </section>
  )
}

export const metadata = pageMetadata({
  title: 'Career Story | Gabo Esquivel',
  description:
    'Gabo Esquivel’s product engineering career from Costa Rica JS and Wink through Web3 financial systems and production AI.',
  images: [
    {
      url: '/images/bio/gabo-coding.jpg',
      width: 1200,
      height: 630,
      alt: 'Gabo Esquivel coding',
    },
  ],
})
