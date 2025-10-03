import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import frontendCoding from 'public/images/work/gaboesquivel-presentation.jpg'

export default function FrontendExperiencePage() {
  const type = 'frontend'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Frontend Development Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My passion for frontend engineering began with a simple realization in
        college: technology is only valuable when people can actually use it
        effectively. From my early days with jQuery to my current work with
        React and modern frameworks, I've been fascinated by the human side of
        technology—how interfaces shape people's experiences and either empower
        or frustrate them. I still remember the satisfaction of my first
        responsive design that adapted perfectly to different screen sizes, and
        the user feedback that confirmed it made a real difference in
        accessibility. This core focus on creating intuitive, performant
        experiences has guided my journey through evolving technologies,
        reflecting my belief that good engineering should enhance human
        capabilities without drawing attention to itself.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        First Interfaces & WordPress Customization
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My frontend journey began at InterGraphicDESIGNS in 2008, where I built
        custom WordPress solutions for local businesses. I'll never forget my
        first client meeting—a small restaurant owner who wasn't tech-savvy but
        needed a website that would bring in customers. Understanding her
        perspective taught me that technical solutions are meaningless unless
        they solve real human problems. That early experience of translating
        someone's business needs into functional interfaces shaped my approach
        to development far more than any particular technology. I discovered
        that I loved the blend of technical problem-solving and human-centered
        design that frontend development requires.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        In 2010, joining{' '}
        <Link href="/project/american-express" className="prose-link">
          American Express
        </Link>{' '}
        as a UI Engineer marked a significant shift in my career. Suddenly I was
        working on systems used by millions of cardholders worldwide, where even
        minor interface improvements could significantly impact how people
        managed their finances. I remember the intimidating responsibility of my
        first major update to the account interface—knowing that any confusion
        could result in thousands of customer service calls. This experience
        taught me the importance of meticulous testing and performance
        optimization. Working with their data analytics team showed me how A/B
        testing could transform interface design from subjective opinions to
        measurable outcomes. These lessons in data-driven design continue to
        influence how I approach frontend development, always balancing
        creativity with concrete metrics of user success.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Frontend Development"
            src={frontendCoding}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Gaming & Interactive Media UIs
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        The period from 2012-2014 marked a special chapter in my career where I
        could explore how interfaces create emotional connections between
        people. Working on the{' '}
        <Link href="/project/elder-scrolls-online" className="prose-link">
          Elder Scrolls Online
        </Link>{' '}
        community platform was particularly meaningful as I'd been a gamer since
        childhood. I still remember the excitement of seeing forum posts appear
        in real-time during launch day, with thousands of players from different
        countries connecting through interfaces I had built. This project taught
        me that good frontend work isn't just about usability—it's about
        creating spaces where meaningful human interactions can flourish. The
        community features we designed didn't just support the game; they became
        an integral part of many players' experiences, showing me how powerful
        thoughtfully designed digital spaces could be.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/amc-yeah-tv-facebook-app" className="prose-link">
          AMC Networks
        </Link>
        , I had the opportunity to rethink how people experience television
        through social interfaces. What excited me was the challenge of turning
        traditionally passive viewing into something interactive and shared. I
        remember watching user testing sessions where friends who weren't in the
        same location could comment on shows together, creating a sense of
        connection that traditional TV couldn't provide. Similarly, at{' '}
        <Link href="/project/bureau-of-trade-beta" className="prose-link">
          Bureau of Trade
        </Link>
        , we created shopping experiences that felt like exploring a carefully
        curated collection rather than browsing a catalog. These projects
        expanded my view of what interfaces could accomplish—moving beyond mere
        functionality to create genuine emotional responses and connections
        between people.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The most technically innovative project during this period was{' '}
        <Link href="/project/tikr" className="prose-link">
          Tikr
        </Link>
        , where we created dynamic, real-time price fluctuations for an online
        store. The technical challenge of updating prices in response to market
        conditions was fascinating, but what truly captivated me was observing
        how it transformed user behavior. Shoppers became more engaged, timing
        their purchases strategically and returning more frequently to check
        prices. This project demonstrated how interfaces could create entirely
        new experiences rather than simply digitizing existing ones—a principle
        that continues to guide my approach to frontend innovation.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        React & Component Architecture
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2015, I embarked on a significant technical transition by
        implementing my first production React application for{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>{' '}
        , Costa Rica's first neobank. This represented a pivotal moment in my
        career as I shifted from earlier paradigms to component-based
        architecture. My early adoption of Node.js through founding Costa Rica
        JS in 2010 had already oriented me toward JavaScript innovation, but
        React fundamentally changed how I thought about structuring interfaces.
        Creating reusable, stateful components for financial interfaces felt
        revolutionary, offering both technical benefits and a more coherent
        mental model for building complex UIs.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This excitement about component architecture led me to share this
        knowledge through{' '}
        <Link
          href="/blog/2016-06-nodeschool-international-day"
          className="prose-link"
        >
          NodeSchool workshops
        </Link>{' '}
        , where I helped other developers in the region adopt these new
        approaches. The period from 2015-2019 saw me deepening my expertise with
        Redux for state management, building comprehensive design systems, and
        implementing advanced performance optimizations—experiences that shaped
        my understanding of what makes frontend applications both maintainable
        and performant.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Throughout this period, I was fortunate to grow alongside Next.js,
        watching and participating as it evolved from early server-rendered
        applications to the current server components architecture. This journey
        has been particularly rewarding as each project taught me new
        optimization techniques—from code splitting to lazy loading and advanced
        image optimization. These technical approaches became part of my
        standard toolkit, allowing me to consistently deliver fast, responsive
        experiences even as user expectations and application complexity
        increased over time.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Modern Frontend Stack
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Since 2020, I've focused on refining my frontend toolset to balance
        developer experience with user outcomes. The adoption of Tailwind CSS
        was particularly transformative for me—I was initially skeptical about
        utility-first approaches, but quickly found it accelerated my
        development process while encouraging consistent design patterns.
        Similarly, integrating component libraries like ShadcnUI has allowed me
        to focus more on solving unique product challenges rather than
        rebuilding common interface elements. These tooling choices reflect my
        philosophy that good frontend development should minimize repetitive
        work while maximizing creativity where it truly matters.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The evolution of my toolkit reflects my growing emphasis on code quality
        and developer experience. Adopting TanStack Query revolutionized how I
        approach data fetching, while Zod has transformed validation from a
        chore into a powerful safeguard. TypeScript has perhaps been the most
        significant addition, as type safety has dramatically reduced runtime
        errors in my projects while making collaboration more efficient. As a{' '}
        <Link href="/fullstack" className="prose-link">
          fullstack developer
        </Link>
        , I've found particular value in creating consistency between frontend
        interfaces and{' '}
        <Link href="/backend" className="prose-link">
          backend systems
        </Link>
        , establishing patterns that work across the entire application
        lifecycle and accelerate development without sacrificing quality.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Web3 UI/UX Development
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey into Web3 frontend development began in 2017 at{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        , where I faced the challenge of making blockchain concepts accessible
        through intuitive interfaces. This project taught me that successful
        Web3 experiences need to abstract away technical complexity while
        preserving the unique benefits of decentralization. I particularly
        enjoyed creating the knowledge graph visualization system that made
        abstract concepts like expertise tokens visually tangible to users—a
        reminder that good visualization can bridge the gap between complex
        systems and intuitive understanding.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        From 2018-2020, I deepened my blockchain interface experience through
        several projects on the EOS platform. One of the most interesting
        challenges was building{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , a community-driven rating tool for Block Producers. This project
        required me to find visual solutions for multidimensional data,
        ultimately leading to an interactive radial graph interface that made
        complex voting criteria immediately understandable. Similarly, at{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitcashBank
        </Link>{' '}
        (2020), I worked to make cryptocurrency banking accessible to
        non-technical users by focusing on familiar banking metaphors while
        introducing innovations like WebAuthN-based wallets that removed
        traditional crypto friction points. These projects reinforced my belief
        that good interfaces can make complex technologies accessible to broader
        audiences.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        DeFi & Marketplace Interfaces
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        The period from 2021-2023 allowed me to apply my accumulated experience
        to more sophisticated decentralized finance interfaces. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>{' '}
        (2021), I worked on creating an NFT marketplace that made digital
        collectibles accessible to traditional sports memorabilia enthusiasts.
        This project was particularly interesting as it required bridging two
        very different worlds—creating interfaces that would feel familiar to
        traditional collectors while incorporating the unique capabilities of
        blockchain. I focused on optimizing discovery flows and making
        transaction processes transparent, learning valuable lessons about
        designing for audiences in transition between traditional and
        decentralized models.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My experience with gaming interfaces expanded at{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>{' '}
        (2022), where I helped create a platform that connected virtual worlds
        with blockchain ownership. This project taught me how to design for
        immersive environments where traditional UI patterns needed reimagining.
        The experience influenced my later work on{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2022-2023), where I developed auction interfaces that needed to
        communicate complex token mechanics while maintaining an engaging
        real-time experience. The challenge of making financial mechanisms like
        batch auctions intuitive while conveying critical information pushed me
        to develop new patterns for data visualization and real-time feedback.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My journey through financial interfaces culminated at{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>{' '}
        (2023), where I faced perhaps my most complex interface
        challenge—creating an options trading platform that would work for both
        sophisticated traders and DeFi enthusiasts. This project pushed me to
        develop new approaches for visualizing risk, position management, and
        market data that would be both precise enough for professionals and
        accessible enough for newcomers to derivatives. Working with the latest
        Next.js app router architecture allowed me to create a more responsive,
        data-rich experience that balanced complexity with usability—reinforcing
        my belief that good financial interfaces should reveal complexity
        progressively rather than all at once.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        AI-Powered Interfaces
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My exploration of AI interfaces began in 2022 with{' '}
        <Link href="/project/wizard-world" className="prose-link">
          Wizard World
        </Link>
        , a project that combined two of my passions—creative expression and
        blockchain technology. Building this progressive web app taught me about
        the unique challenges of designing for AI interactions, particularly how
        to create interfaces that helped users craft effective prompts without
        requiring technical AI knowledge. The excitement of watching people
        generate images from simple descriptions and then preserve them as NFTs
        reinforced my belief in technology as a creative enabler. This project
        marked the beginning of my journey to understand how AI could transform
        interfaces from tools we use to partners we collaborate with.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Conversational UI & AI Assistants
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My most recent professional chapter, from 2023-2025, has been centered
        on creating conversational interfaces that feel natural and helpful
        rather than mechanical. At{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>{' '}
        (2023-2024), I had the opportunity to design interfaces for specialized
        AI assistants that needed to handle complex domain knowledge while
        remaining approachable. Implementing features like streaming responses
        transformed the user experience from a question-answer pattern to
        something that felt more like a natural conversation. These projects
        have been particularly meaningful as they represent a fundamental shift
        in how we interact with technology—moving from command-based interfaces
        to collaborative dialogue.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This exploration continued at{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2023-2024), where I integrated an AI assistant that could retrieve and
        explain complex investment documentation. Working with the experimental
        RSC AI SDK taught me about the unique challenges of building interfaces
        that adapt to different conversation contexts and how to visually
        represent when an AI is accessing different information sources. Most
        recently, my work at{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        (2024-2025) has focused on the human side of AI management—creating
        intuitive admin interfaces that allow non-technical users to shape AI
        behavior through prompt management and document organization. This
        experience has deepened my appreciation for the partnership between
        human expertise and AI capabilities, reinforcing my belief that the most
        powerful AI interfaces are those that amplify human judgment rather than
        replace it.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Frontend Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Frontend" title="Latest Frontend Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Frontend Development Experience - Gabo Esquivel',
  description:
    'Frontend Engineer with 15+ years of experience specializing in React, Next.js, TypeScript, and UI/UX optimization',
  keywords: [
    'frontend engineer',
    'react developer',
    'next.js',
    'typescript',
    'UI/UX',
    'responsive design',
    'web performance',
    'tanstack',
    'tailwind',
    'component architecture',
    'state management',
    'shadcn/ui',
  ],
  openGraph: {
    title: 'Frontend Development Experience - Gabo Esquivel',
    description:
      'Frontend Engineer with 15+ years of experience specializing in React, Next.js, TypeScript, and UI/UX optimization',
    type: 'profile',
  },
}
