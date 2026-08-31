import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import { ProjectEvidence } from 'components/work/project-evidence'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import gabocoding from 'public/images/bio/gabo-coding.jpg'

export default function BioPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold tracking-tighter">Career story</h1>

      <p className="prose prose-neutral dark:prose-invert">
        My work has moved from web interfaces to complete products, then into
        financial and blockchain systems, and now into intelligent interfaces.
        The technologies changed. The job stayed consistent: understand a
        difficult system, make the right product decisions around it, and ship
        software that people can use.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I have worked across consumer products, financial institutions,
        startups, open-source infrastructure, and technical communities since
        2010. The{' '}
        <Link href="/work" className="prose-link">
          work library
        </Link>{' '}
        and individual project pages carry the implementation details.
      </p>

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Interfaces and a JavaScript community
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At American Express, where I worked as a UI Engineer from April 2010 to
        November 2012, I built credit-card marketing interfaces and helped move
        a large frontend from Dojo to jQuery. The work included responsive
        layouts, A/B testing, analytics, and reusable components inside an
        established financial organization.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I also founded{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>{' '}
        in 2010. It grew into Central America&apos;s largest JavaScript
        community, with more than 2,000 developers. I organized meetups,
        workshops, NodeSchool events, and JSConf Costa Rica as Node.js and
        modern web frameworks changed the kinds of products teams in the region
        could build.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        From November 2012 to April 2014, I was Lead UI Engineer at AMC
        Networks. I worked on the YEAH! interactive streaming experience,
        including its Facebook application and Brightcove integration for the
        SXSW 2013 launch. Alongside full-time roles, I shipped focused products
        such as a tournament system for Fantasy Tennis and a flight-display
        application for ARINC. Those products required different interface,
        data-flow, and delivery choices.
      </p>

      <ProjectEvidence slugs={['costa-rica-js']} columns={1} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        From interfaces to a banking product
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Wink changed the scale of my responsibility. I joined as Lead Engineer
        in April 2015 and worked there through March 2018. Wink was Costa
        Rica&apos;s first neo-bank. I built the first version of its React
        Native application and AWS backend, integrated partner-bank APIs, and
        implemented biometric authentication through a native bridge.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        The work also included technology selection, project planning, partner
        and vendor coordination, security, recruiting, and team formation. A
        banking interface is only useful when the integrations, identity checks,
        operational constraints, and service behind it work together. That made
        product engineering concrete: the architecture and the user experience
        were the same delivery problem.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        Wink also grounded a principle that still matters to me: technology
        should expand access rather than create new gatekeepers. In this case,
        the work made regulated financial services usable from a phone without
        requiring a visit to a physical branch. The principle is useful only
        when it appears in a working product, so I treat it as a design
        constraint rather than a slogan.
      </p>

      <ProjectEvidence slugs={['wink']} columns={1} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Complex financial and blockchain systems
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My Web3 work started at Knowledge in September 2017. I developed its
        ERC-20 token on Ethereum, supported the ICO platform, and built a React
        and Web3.js marketplace with a wallet dashboard. I also co-founded
        AsoBlockchain in 2017. These projects moved financial state and product
        rules into public infrastructure, where contract behavior, wallet
        interactions, and interface clarity had to agree.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        At EOS Costa Rica, from March 2018 to January 2020, I worked as Lead
        Engineer. I participated in the EOS mainnet launch, operated EOSIO
        validators, and helped establish the development services team. For
        Grant Thornton Labs, I led the architecture of a private EOSIO chain and
        React application on Azure and Terraform. The implementation used a
        stablecoin, hashing, and IPFS to support intercompany transactions, tax
        workflows, and immutable records.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        At Bitcash, where I worked from January 2020 to July 2021, the product
        problem combined a peer-to-peer exchange, realtime chat, a matching
        engine, browser-based WebAuthn signing, QR-based signature requests, and
        blockchain indexing. ChainGraph grew from that infrastructure work into
        an open-source GraphQL toolkit for realtime EOSIO and Antelope data.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        The next products pushed the same system-to-interface problem across
        different environments. At RareMint, I built a Moralis-streams indexer,
        worked on marketplace performance, integrated WalletConnect, and
        supported Pokémon card auctions on Polygon. At ZTX, from August 2022 to
        August 2023, I owned the early Next.js architecture and built a WebGL
        EVM wallet connector with Ethers.js for its virtual world.
      </p>

      <div className="my-8">
        <div className="relative h-[420px]">
          <Image
            alt="Gabo Esquivel coding"
            src={gabocoding}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="rounded-lg object-cover object-top"
          />
        </div>
      </div>

      <ProjectEvidence slugs={['eos-costa-rica', 'ztx']} />

      <p className="prose prose-neutral dark:prose-invert">
        Bitlauncher and Opyn brought that experience into more recent trading
        systems. At Bitlauncher, from November 2023 to November 2025, I
        architected a Next.js, Supabase, viem, and wagmi platform around batch
        auctions. I built token bridge and wallet flows, deployed Gnosis auction
        contracts, and indexed EVM and EOS activity. At Opyn, from October 2024
        to February 2025, I architected the Next.js application structure, built
        its perpetual-options trading interface on Arbitrum, and indexed onchain
        data with Ponder, PostgreSQL, and Supabase.
      </p>

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Intelligent interfaces
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        The AI work continues the same product discipline. At Masterbots in
        2024, I worked on specialized chatbot interfaces and AI SDK tooling;
        Bitlauncher added retrieval, tools, and AI-assisted
        internationalization. In 2025, I built LegalAgent&apos;s React Native
        voice and chat assistant, RAG pipeline, bilingual realtime audio, and
        Microsoft SSO administration. These systems made probabilistic behavior
        another product constraint: the interface still needs clear states,
        retrieval needs operational controls, and the team needs a complete
        product rather than a model demo.
      </p>

      <ProjectEvidence slugs={['legal-agent']} columns={1} />

      <LatestPosts title="Writing" />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        The work now
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        I work as a product engineer across AI, full-stack applications,
        financial systems, and Web3. The useful boundary is not between product
        and engineering. It is between an idea and a system that can be
        understood, operated, and used. I help teams cross that boundary.
      </p>

      <LetsConnect />
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
