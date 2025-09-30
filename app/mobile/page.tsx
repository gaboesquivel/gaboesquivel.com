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
          Gabo Esquivel - Mobile Developer
        </span>
        <span className="print:hidden">Mobile Development Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert print:block hidden">
        With over 15 years in full-stack software engineering, I help
        organizations turn initial ideas into market-ready software products,
        ensuring concepts reach their full potential. I work as a product
        engineer, bridging technical execution with user experience and business
        strategy.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        My mobile development journey has focused on creating cross-platform
        applications with React Native. I'm passionate about mobile-first
        experiences that feel native while leveraging the efficiency of
        cross-platform development. My approach emphasizes performance
        optimization, intuitive interfaces, and seamless integration with device
        capabilities and backend services.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Banking & Fintech Mobile (2015-2018)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey into mobile development began with Wink, Costa Rica's first
        mobile neobank. I implemented React Native bridges for biometric
        authentication, creating a secure yet user-friendly banking experience.
        This project required deep integration with native device capabilities
        for secure biometric verification while maintaining a seamless
        cross-platform experience. The application enabled users to complete
        banking tasks entirely from their mobile devices, eliminating
        traditional branch visits.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Secure Messaging: Sense Chat (2019)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At Sense Chat, I helped develop a secure React Native messaging
        application with integrated EOS wallet functionality and token-based
        incentives. This app combined encrypted communication channels with
        blockchain wallet capabilities, allowing users to exchange messages and
        cryptocurrency in a single interface. The implementation required
        careful attention to security, offline capabilities, and seamless wallet
        integration—all while maintaining a clean, intuitive UI that made
        complex blockchain interactions accessible to mainstream users.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Augmented Reality: Tractor Supply (2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        For Tractor Supply, I worked on augmented reality product previews in
        React Native. This feature allowed customers to visualize products in
        their real-world environment before purchasing, significantly enhancing
        the shopping experience for large outdoor equipment. The implementation
        used React Native's AR capabilities combined with 3D product models and
        real-time rendering, optimized for performance across device types. This
        project demonstrated how mobile applications can bridge digital commerce
        with physical reality through immersive experiences.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Blockchain Gaming: Fantasy Top Shots (2021)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        With Fantasy Top Shots, I built an Expo-based mobile game that
        integrates Flow blockchain NFTs into a fantasy sports experience. The
        application combines real-time sports data with blockchain collectibles,
        allowing users to build lineups with their owned NFTs. The
        implementation used Expo for rapid cross-platform deployment while
        integrating Flow blockchain for secure NFT ownership verification. This
        project explored new gaming models at the intersection of mobile,
        blockchain, and fantasy sports.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        AI Assistant: Sfera Legal (2023-Present)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Most recently, at Sfera Legal, I developed a React Native application
        featuring an advanced AI assistant with voice and chat capabilities.
        This mobile app helps legal professionals access and understand complex
        documentation through natural language interactions. The implementation
        combines React Native's cross-platform efficiency with cutting-edge AI
        technologies, including voice recognition, natural language processing,
        and retrieval-augmented generation. The result is a powerful mobile tool
        that accelerates legal work by reducing research friction and providing
        contextual insights.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        This project represents the exciting future of mobile development—where
        intelligent interfaces adapt to user needs and provide contextual
        assistance through natural interactions. The combination of voice, chat,
        and AI capabilities creates a more intuitive mobile experience that
        feels less like using technology and more like collaborating with an
        intelligent assistant.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
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
    'Mobile Developer with extensive experience in React Native, cross-platform development, wallet integrations, and AI assistants',
  keywords: [
    'mobile app development',
    'cross-platform mobile',
    'react native',
    'wallet integrations',
    'AI assistants',
    'mobile-first design',
    'Expo',
    'biometric authentication',
    'augmented reality',
    'voice interfaces',
    'blockchain mobile',
    'React Native bridges',
  ],
  openGraph: {
    title: 'Mobile Development Experience - Gabo Esquivel',
    description:
      'Mobile Developer with extensive experience in React Native, cross-platform development, wallet integrations, and AI assistants',
    type: 'profile',
  },
}
