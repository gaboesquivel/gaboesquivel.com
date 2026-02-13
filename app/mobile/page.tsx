import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { VideoEmbed } from 'components/video-embed'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function MobileExperiencePage() {
  const type = 'mobile'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Mobile Development Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My journey into mobile development began with a simple but powerful
        realization: technology is most transformative when it fits seamlessly
        into people's everyday lives. While working on traditional web
        applications, I observed how mobile devices were becoming the primary
        way people accessed digital experiences. I still remember testing my
        first React Native prototype in 2015—watching the same code run natively
        on both iOS and Android felt like witnessing a fundamental shift in how
        we could build software. Since then, I've dedicated myself to creating
        mobile experiences that combine the accessibility of{' '}
        <Link href="/frontend" className="prose-link">
          web technologies
        </Link>{' '}
        with the performance and capabilities of native platforms, reflecting my
        belief that the best technology adapts to human behavior rather than
        forcing humans to adapt to technology.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Digital Banking & React Native Adoption
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My formal entry into mobile development came in 2015 at{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first digital neobank. As the technical lead, I made a
        critical architectural decision to use React Native for their mobile
        app—a choice that was considered bold at the time as the framework had
        only been publicly released months earlier. What convinced me was
        experiencing the efficiency of maintaining a single codebase while still
        delivering native performance. The challenge of implementing secure
        biometric authentication and banking integrations pushed me to develop
        deep expertise in React Native's bridge system and native module
        architecture. This project wasn't just technically significant—it was
        one of Latin America's first production React Native apps and taught me
        valuable lessons about balancing innovation with reliability when
        working in regulated industries.
      </p>
      <VideoEmbed videoId="rfeISMW_OVc" title="React Native Banking App Demo" />

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Encrypted Messaging & Blockchain Integration
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        By 2019, I had the opportunity to work on a very different kind of
        mobile challenge at{' '}
        <Link href="/project/make-sense-labs" className="prose-link">
          Sense Chat
        </Link>
        . The project focused on building a secure messaging platform with
        integrated crypto wallet functionality—combining privacy, communication,
        and financial transactions in a single mobile experience. I found this
        integration particularly fascinating as it required solving complex UX
        challenges around secure key management and blockchain interactions
        without overwhelming users with technical complexity. I remember the
        moment when we successfully completed our first end-to-end encrypted
        message that triggered a token transfer—it felt like we'd created a new
        kind of digital interaction that wasn't possible before. My work
        optimizing React Native components and implementing EOS blockchain
        functionality significantly improved app performance while maintaining a
        seamless user experience across cryptographic operations.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Gaming & NFT Mobile Experiences
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2022, I expanded my mobile development experience into gaming by
        creating{' '}
        <Link href="/project/fantasy-top-shots" className="prose-link">
          Fantasy Top Shots
        </Link>
        , a mobile game that integrated NBA Top Shot NFTs for the Flow
        Hackathon. This project presented unique technical challenges around
        rendering performance and blockchain integration in a game context.
        Using Expo for rapid development allowed me to focus on the core
        gameplay mechanics while still maintaining the ability to access native
        features when needed. What made this project especially satisfying was
        seeing users interact with their digital collectibles in an entirely new
        way—transforming static NFTs into dynamic game elements that responded
        to real-world basketball statistics. The experience reinforced my
        understanding of how mobile platforms can create entirely new forms of
        digital interaction beyond traditional applications.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        That same year, for{' '}
        <Link href="/project/wizard-world" className="prose-link">
          Wizard World
        </Link>
        , I built a progressive web app that connected OpenAI's models with Flow
        blockchain for AI-generated NFT creation. While not a native mobile
        application, this project taught me valuable lessons about optimizing
        complex operations for mobile browsers and creating responsive
        interfaces that work across different screen sizes. The technical
        challenge of processing AI image generation and blockchain transactions
        in a mobile context pushed me to develop better optimization strategies
        for resource-constrained environments. This experience became
        particularly valuable in my later work with native AI applications,
        where similar performance considerations would apply.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Augmented Reality & Retail Applications
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2020, while consulting for{' '}
        <Link href="/project/tractor-supply" className="prose-link">
          Tractor Supply
        </Link>
        , I tackled the challenge of integrating augmented reality into their
        mobile shopping experience. This project required pushing React Native
        beyond its typical boundaries by incorporating ViroAR to create product
        preview experiences. I still remember the first time we successfully
        rendered a 3D farm equipment model in a user's physical space—seeing the
        digital and physical worlds blend seamlessly was a powerful validation
        of AR's potential for retail. Beyond the technical implementation, I
        focused on optimizing performance and refactoring the codebase to
        improve maintainability. Introducing TypeScript across the project
        created more robust type safety that reduced runtime errors and improved
        the development experience—principles I've carried into all my
        subsequent mobile projects.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Voice & Chat AI Assistants
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My most recent and perhaps most sophisticated mobile work has been with{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>
        's AI assistant (2024-2025), where I integrated multimodal AI
        capabilities into their React Native app. This project represented a
        significant technical challenge—combining real-time voice transcription,
        natural language processing, and document retrieval in a mobile context.
        Using OpenAI's Realtime API for voice and the Vercel AI SDK for chat
        required careful optimization to maintain performance while handling
        complex AI operations. I focused on creating a seamless experience
        between voice and text interfaces, allowing lawyers to switch naturally
        between interaction modes depending on their context. The implementation
        of RAG architecture for contextual legal document retrieval was
        particularly rewarding, as it transformed how lawyers could access case
        information through natural conversation rather than manual searches.
        Seeing users interact effortlessly with complex legal information
        through voice commands reinforced my belief in the transformative
        potential of well-designed mobile AI interfaces.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Mobile Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts
        category="Mobile"
        title="Latest Mobile Development Articles"
      />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Mobile Development Experience - Gabo Esquivel',
  description:
    'React Native Developer with extensive experience building cross-platform mobile applications with Expo, TypeScript, and TanStack',
  keywords: [
    'react native developer',
    'expo',
    'mobile app development',
    'cross-platform',
    'typescript',
    'mobile UI/UX',
    'app performance',
    'native features',
    'tailwind mobile',
    'AI mobile integration',
    'web3 mobile',
    'mobile banking',
  ],
  openGraph: {
    title: 'Mobile Development Experience - Gabo Esquivel',
    description:
      'React Native Developer with extensive experience building cross-platform mobile applications with Expo, TypeScript, and TanStack',
    type: 'profile',
  },
}
