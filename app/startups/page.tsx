import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import winkImg from 'public/images/work/wink.png'
import ztxImg from 'public/images/work/ztx.png'
import { ContactInfo } from '../../components/shared/contact-info'

export default function StartupsExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Startup Engineering Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My fascination with startups began with a profound appreciation for the
        creative energy of early-stage companies—the unique moment when vision
        transforms into reality through technical execution. Growing up in Costa
        Rica, where innovation ecosystems were still developing, I witnessed how
        difficult it was for great ideas to become viable products without
        proper technical foundations. This perspective shaped my approach to
        startup engineering—I'm drawn to the "0 to 1" phase because it combines
        technical challenges with tangible human impact. I still remember the
        exhilaration of my first startup launch, watching real users engage with
        something that had previously existed only as sketches and code.
        Throughout my career, I've approached startup development as a balance
        of speed and sustainability—moving quickly to validate assumptions while
        building foundations that can support growth. This philosophy reflects
        my belief that the best startup technologies create value immediately
        while enabling future possibilities that might not be visible at the
        outset.
      </p>

      <div className="gap-4 my-8 grid grid-cols-1 md:grid-cols-2 print:hidden">
        <div className="relative mb-4 h-[300px]">
          <Image
            alt="Wink - Costa Rica's First Digital Bank"
            src={winkImg}
            fill
            sizes="(max-width: 768px) 500px, 50vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
        <div className="relative mb-4 h-[300px]">
          <Image
            alt="ZTX - Web3 Metaverse Platform"
            src={ztxImg}
            fill
            sizes="(max-width: 768px) 500px, 50vw"
            className="object-cover rounded-lg"
          />
        </div>

      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Wink: Pioneering Digital Banking in Costa Rica
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey with startup engineering began in earnest in 2015 when I
        joined{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first digital neobank. As Software Architect, I faced the
        significant challenge of creating a completely new financial experience
        in a traditionally conservative market. What made this startup
        particularly exciting was the opportunity to transform how people in my
        home country interacted with financial services—moving from
        branch-dependent banking to digital-first experiences. I remember the
        pivotal moment when we decided to build a React Native mobile app rather
        than a hybrid solution, prioritizing user experience despite the
        additional technical complexity. This decision taught me a crucial
        startup lesson: when creating new categories, user experience can't be
        compromised, even if it means more challenging engineering work.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The technical execution required integrating biometric authentication
        with partner bank APIs while maintaining strict security standards—a
        complex challenge in the regulated banking industry. I developed the
        first version of both the mobile app and AWS backend services,
        establishing technical architecture while simultaneously building and
        training a development team. This experience showed me how startup
        engineering differs fundamentally from enterprise work; we needed to
        create systems that could evolve rapidly while maintaining the security
        and reliability expected in financial services. The tension between
        innovation speed and compliance requirements became a formative
        influence on my approach to startup engineering—teaching me to design
        architectures that enable rapid iteration within appropriately
        constrained boundaries.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        ZTX: Web3 Metaverse Innovation
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>{' '}
        (2022), a Web3 metaverse platform backed by Jump Crypto and ZEPETO, I
        tackled the exciting challenge of building immersive digital experiences
        integrated with blockchain functionality. This early-stage startup
        required establishing foundational architecture that could blend gaming
        experiences with secure digital asset management. I developed the
        initial React architecture and built a custom WebGL EVM wallet
        connector, enabling users to interact with digital assets seamlessly
        within virtual environments.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        What made this project particularly challenging was creating interfaces
        that felt natural for gaming experiences while maintaining the security
        required for blockchain transactions. I remember the breakthrough moment
        when we successfully integrated our custom wallet solution with the
        WebGL rendering pipeline—allowing users to manage their digital assets
        without ever leaving the immersive environment. This experience taught
        me how startup engineering often requires creative solutions that bridge
        seemingly disparate technologies, creating new possibilities that
        established platforms simply cannot offer. The success of ZTX
        demonstrated how thoughtful technical architecture can create entirely
        new user experiences at the intersection of gaming, social interaction,
        and digital ownership.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        EOS Costa Rica/Edenia: Blockchain Infrastructure Pioneers
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>{' '}
        (later rebranded as Edenia), I led the creation of essential
        infrastructure for enterprise blockchain adoption. This startup journey
        was particularly meaningful as it represented building truly innovative
        technology from Latin America for global impact. As CTO, I established
        the engineering team and technical foundation for developing tools,
        applications, and infrastructure that powered the EOS ecosystem.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        We created flagship projects like{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOSRate
        </Link>
        , a community-driven rating platform for block producers, and developed
        custom private blockchain implementations for institutions like Grant
        Thornton. What made this startup experience unique was balancing
        open-source community contributions with enterprise client
        solutions—demonstrating how blockchain technology could serve both
        public networks and private business needs. The technical challenges
        included implementing Terraform-based infrastructure automation for
        blockchain deployments and developing tools that simplified complex
        blockchain interactions for everyday users. This experience shaped my
        understanding of how startup engineering can create entirely new
        technological ecosystems, not just isolated products.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Other Notable Startup Experiences
      </h2>

      <h3 className="mt-6 mb-3 text-lg font-medium tracking-tight">
        Crypto Banking & P2P Exchange
      </h3>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitcashBank
        </Link>{' '}
        (2020), I applied my experience with traditional fintech to the emerging
        world of cryptocurrency, developing a banking platform serving over
        50,000 users across Latin America. This project represented a startup
        challenge at significantly larger scale, requiring infrastructure that
        could handle millions in transaction volume while maintaining
        flexibility in a rapidly evolving market. The technical innovations
        included implementing WebAuthn-based key management for direct
        in-browser transaction signing and building a real-time EOS indexer with
        Node.js worker threads for efficient transaction processing—making
        cryptocurrency accessible to everyday users in Latin America who weren't
        blockchain experts.
      </p>

      <h3 className="mt-6 mb-3 text-lg font-medium tracking-tight">
        NFT Collectibles Platform
      </h3>
      <p className="prose prose-neutral dark:prose-invert">
        In 2021, I joined{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>
        , a startup creating a bridge between physical sports memorabilia and
        digital NFT ownership. As Technical Lead, I balanced blockchain
        capabilities with familiar e-commerce experiences, creating a platform
        that didn't feel intimidating to users new to digital collectibles. The
        technical execution included building a specialized EVM NFT data indexer
        using Moralis streams and refactoring the marketplace with Next.js SSR—significantly improving performance for NFT
        browsing and trading.
      </p>

      <h3 className="mt-6 mb-3 text-lg font-medium tracking-tight">
        AI & Crypto Launchpad Platform
      </h3>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2022-2023), I integrated my{' '}
        <Link href="/web3" className="prose-link">
          Web3 expertise
        </Link>{' '}
        with emerging{' '}
        <Link href="/ai" className="prose-link">
          AI capabilities
        </Link>
        . As Tech Lead, I architected a platform that helps AI startups raise
        capital through token auctions—creating infrastructure that serves both
        technical blockchain operations and user experience requirements for
        investors and founders. The technical implementation included building a
        custom token bridge for cross-chain transactions, implementing Gnosis
        auction contracts, and developing a sophisticated indexing system for
        real-time transaction monitoring and analytics.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        I established AI-assisted development workflows for the team using tools
        including Claude for automation scripts and Cursor IDE, which improved
        velocity on tasks like internationalization and documentation.
      </p>

      <h3 className="mt-6 mb-3 text-lg font-medium tracking-tight">
        AI Assistants for Professional Domains
      </h3>
      <p className="prose prose-neutral dark:prose-invert">
        Building on the AI capabilities developed at BitLauncher, I helped
        create{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>{' '}
        (2023-2024), a platform for domain-specific AI assistants capable of
        performing advanced tasks beyond basic information retrieval. I
        architected a system using Next.js with vector search capabilities,
        enabling natural language interactions with complex domain knowledge.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Most recently, at{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        (2024-2025), I've applied AI to professional workflows in the legal
        field, creating an assistant that combines voice and chat interfaces to
        help lawyers navigate case information. The technical implementation
        required sophisticated RAG architecture with careful attention to data
        security and privacy, balancing powerful AI capabilities with the strict
        confidentiality requirements of legal work.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Startup Projects"
          projects={projects.filter((project) =>
            project.type.includes('startup'),
          )}
        />

        <LatestPosts category="Startups" title="Latest Startup Articles" />
      </div>
      <ContactInfo />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Startup Engineering Experience - Gabo Esquivel',
  description:
    'Full-stack engineer specializing in taking startups from 0 to 1, with extensive experience in Web3, AI, and fintech ventures.',
  keywords: [
    'startup engineering',
    'startup 0 to 1',
    'product development',
    'technical co-founder',
    'MVP development',
    'startup architecture',
    'lean startup',
    'continuous delivery',
    'web3 startup',
    'AI startup',
    'fintech startup',
  ],
  openGraph: {
    title: 'Startup Engineering Experience - Gabo Esquivel',
    description:
      'Full-stack engineer specializing in taking startups from 0 to 1, with extensive experience in Web3, AI, and fintech ventures.',
    type: 'profile',
  },
}
