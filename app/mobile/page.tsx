import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function MobileExperiencePage() {
  const type = 'mobile'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. React Native Engineer
        </span>
        <span className="print:hidden">Mobile Development Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        I specialize in React Native and Expo for cross-platform mobile
        development, combining native performance with{' '}
        <Link href="/frontend" className="prose-link">
          React
        </Link>
        's component architecture. Using an{' '}
        <Link href="/fullstack" className="prose-link">
          end-to-end approach
        </Link>
        , I've built secure messaging platforms, banking applications, and
        AI-powered legal assistants with optimized performance and consistent
        cross-device experiences.
      </p>

      <h2 className="text-xl font-bold mb-4">AI Engineering Experience</h2>
      <p className="prose prose-neutral dark:prose-invert">
        I built my first React Native production app at{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>{' '}
        (2015), Costa Rica's first neo-bank. As founder of{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>{' '}
        (2010) and early Node.js adopter, I recognized React Native's potential
        for JavaScript unification across platforms. The implementation included
        secure biometric authentication and banking API integrations—one of
        Latin America's first production React Native apps. This established my
        technical approach of maintaining native performance while leveraging
        cross-platform efficiencies.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        LegalAgent: AI for Legal Operations
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        (2024-2025), I integrated a sophisticated AI assistant with both voice
        and chat capabilities into their React Native (Expo) mobile app. The
        assistant empowers lawyers to swiftly access case information, providing
        contextual legal support, document summaries, and procedural guidance.
        Using the Vercel AI SDK for chat and OpenAI's Realtime API for voice
        features, I developed a seamless multimodal interface styled with
        Tailwind CSS, supporting both Spanish and English.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Secure Messaging & Web3 Integration
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        While working at{' '}
        <Link href="/project/make-sense-labs" className="prose-link">
          Sense Chat
        </Link>{' '}
        (2019-2020), I enhanced their React Native app's performance and
        integrated it with the EOS mainnet for token functionality. The app
        focused on user data privacy and featured a built-in wallet with token
        incentives for communities. I optimized React Native components for
        better performance and reduced load times, while implementing secure
        blockchain-based transactions and enhanced security features for better
        user protection.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">Financial Applications</h2>
      <p className="prose prose-neutral dark:prose-invert">
        For{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>{' '}
        (2015), Costa Rica's first neo-bank, I developed the first version of
        their mobile app and backend services within AWS. The app eliminated the
        need for physical branch visits, providing a complete online banking
        experience. My responsibilities included API integration with partner
        banks, implementing biometric authentication for enhanced security, and
        forming a dedicated development team focused on innovation and
        user-centric design. This project was a pioneering effort in the
        region's fintech space, bringing modern banking to mobile users.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Wizard World: NFT Generation
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        I've also developed mobile gaming experiences, including{' '}
        <Link href="/project/fantasy-top-shots" className="prose-link">
          Fantasy Top Shots
        </Link>
        —a mobile app game based on NBA Top Shot NFTs for the 2022 Flow
        Hackathon. The app leverages the popularity of NBA Top Shot NFTs to
        create an engaging gaming experience, allowing users to utilize their
        NFTs in a fantasy sports setting. I implemented responsive UI and smooth
        gameplay mechanics using React Native and Expo, while integrating Flow
        blockchain technology for secure NFT transactions.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Masterbots: Specialized AI Bots
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        While consulting for{' '}
        <Link href="/project/tractor-supply" className="prose-link">
          Tractor Supply
        </Link>{' '}
        (2021), I enhanced their mobile app by developing an augmented reality
        feature for product previews. This integration allowed customers to
        visualize products in their own space before purchasing. I also improved
        the app's performance and code quality, implementing TypeScript for
        better maintainability and scalability.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Bitlauncher: AI Crypto Launchpad
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        For{' '}
        <Link href="/project/wizard-world" className="prose-link">
          Wizard World
        </Link>{' '}
        (2022), I built a progressive web app that connects to OpenAI's LLM
        models to generate AI images and mint them on the Flow blockchain. This
        app integrates AI with blockchain technology, enabling users to create
        and own unique digital art pieces. The project showcases how mobile
        interfaces can bridge creative expression with on-chain ownership.
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
