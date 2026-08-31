import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
} from 'components/shared/page-layout'
import { ProjectEvidence } from 'components/work/project-evidence'
import type { Metadata } from 'next'
import Link from 'next/link'
import gabocoding from 'public/images/bio/gabo-coding.jpg'

export default function BioPage() {
  return (
    <section>
      <PageTitle>Career story</PageTitle>

      <Prose>
        My work has moved from web interfaces to complete products, then into
        financial and blockchain systems, and now into intelligent interfaces.
        Each move happened for the same reason: the product I was building
        needed something I had not done before, so I went and learned it.
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
          At American Express, where I worked as a UI Engineer from 2010 to
          2012, I built credit-card marketing interfaces and helped move a large
          frontend from Dojo to jQuery. The work included responsive layouts,
          A/B testing, analytics, and reusable components inside an established
          financial organization.
        </Prose>
        <Prose>
          I also founded{' '}
          <Link href="/project/costa-rica-js" className="prose-link">
            Costa Rica JS
          </Link>{' '}
          in 2010. It grew into Central America&apos;s largest JavaScript
          community, with more than 2,000 developers. I organized meetups,
          workshops, NodeSchool events, and JSConf Costa Rica as Node.js and
          modern web frameworks changed the kinds of products teams in the
          region could build.
        </Prose>
        <Prose>
          From 2012 to 2014, I was Lead UI Engineer at AMC Networks. I worked on
          the YEAH! interactive streaming experience, including its Facebook
          application and Brightcove integration for the SXSW 2013 launch.
          Alongside full-time roles, I shipped focused products such as a
          tournament system for Fantasy Tennis and a flight-display application
          for ARINC. Those products required different interface, data-flow, and
          delivery choices.
        </Prose>

        <ProjectEvidence slugs={['costa-rica-js']} columns={1} />
      </PageSection>

      <PageSection title="From interfaces to a banking product">
        <Prose>
          Wink changed the scale of my responsibility. I joined as Lead Engineer
          in 2015 and stayed through 2018. Wink was Costa Rica&apos;s first
          neo-bank. I built the first version of its React Native application
          and AWS backend, integrated partner-bank APIs, and implemented
          biometric authentication through a native bridge.
        </Prose>
        <Prose>
          The work also included technology selection, project planning, partner
          and vendor coordination, security, recruiting, and team formation.
          None of that sat next to the product. A bank on a phone is only as
          good as the integrations, identity checks, and operations behind the
          screen.
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
          My Web3 work started at Knowledge in 2017. I developed its ERC-20
          token on Ethereum, supported the ICO platform, and built a React and
          Web3.js marketplace with a wallet dashboard. I also co-founded
          AsoBlockchain in 2017. These projects moved financial state and
          product rules into public infrastructure, where contract behavior,
          wallet interactions, and interface clarity had to agree.
        </Prose>
        <Prose>
          At EOS Costa Rica, from 2018 to 2020, I worked as Lead Engineer. I
          participated in the EOS mainnet launch, operated EOSIO validators, and
          helped establish the development services team. For Grant Thornton
          Labs, I led the architecture of a private EOSIO chain and React
          application on Azure and Terraform. The implementation used a
          stablecoin, hashing, and IPFS to support intercompany transactions,
          tax workflows, and immutable records.
        </Prose>
        <Prose>
          At Bitcash, where I worked from 2020 to 2021, the product problem
          combined a peer-to-peer exchange, realtime chat, a matching engine,
          browser-based WebAuthn signing, QR-based signature requests, and
          blockchain indexing. ChainGraph grew from that infrastructure work
          into an open-source GraphQL toolkit for realtime EOSIO and Antelope
          data.
        </Prose>
        <Prose>
          The next products pushed the same system-to-interface problem across
          different environments. At RareMint, I built a Moralis-streams
          indexer, worked on marketplace performance, integrated WalletConnect,
          and supported Pokémon card auctions on Polygon. At ZTX, from 2022 to
          2023, I owned the early Next.js architecture and built a WebGL EVM
          wallet connector with Ethers.js for its virtual world.
        </Prose>

        <PageImage
          alt="Gabo Esquivel coding"
          src={gabocoding}
          objectClassName="object-top"
        />

        <ProjectEvidence slugs={['eos-costa-rica', 'ztx']} />

        <Prose>
          Bitlauncher and Opyn brought that experience into more recent trading
          systems. At Bitlauncher, from 2023 to 2025, I architected a Next.js,
          Supabase, viem, and wagmi platform around batch auctions. I built
          token bridge and wallet flows, deployed Gnosis auction contracts, and
          indexed EVM and EOS activity. At Opyn, from late 2024 into 2025, I
          architected the Next.js application structure, built its
          perpetual-options trading interface on Arbitrum, and indexed onchain
          data with Ponder, PostgreSQL, and Supabase.
        </Prose>
      </PageSection>

      <PageSection title="Intelligent interfaces">
        <Prose>
          The AI work continues the same product discipline. At Masterbots in
          2024, I worked on specialized chatbot interfaces and AI SDK tooling;
          Bitlauncher added retrieval, tools, and AI-assisted
          internationalization. In 2025, I built LegalAgent&apos;s React Native
          voice and chat assistant, RAG pipeline, bilingual realtime audio, and
          Microsoft SSO administration. These systems made probabilistic
          behavior another product constraint: the interface still needs clear
          states, retrieval needs operational controls, and the team needs a
          complete product rather than a model demo.
        </Prose>

        <ProjectEvidence slugs={['legal-agent']} columns={1} />
      </PageSection>

      <LatestPosts title="Writing" />

      <PageSection title="The work now">
        <Prose>
          I work as a product engineer across AI, full-stack applications,
          financial systems, and Web3. The part I still like best is the early
          stretch, when the architecture is unsettled and the product is still
          an argument. I work in English, Spanish, Portuguese, and Italian.
        </Prose>

        <LetsConnect />
      </PageSection>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Career Story | Gabo Esquivel',
  description:
    'Gabo Esquivel’s product engineering career from Costa Rica JS and Wink through Web3 financial systems and production AI.',
  openGraph: {
    title: 'Career Story | Gabo Esquivel',
    description:
      'From JavaScript community building and neobank products to blockchain financial systems and AI product engineering.',
    images: [
      {
        url: '/images/bio/gabo-coding.jpg',
        width: 1200,
        height: 630,
        alt: 'Gabo Esquivel coding',
      },
    ],
  },
}
