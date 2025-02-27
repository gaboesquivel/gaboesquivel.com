import './cv.css'
import { PrintButton } from '../components/print-button'

export default function CVPage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">Gabo Esquivel - Sr. Engineer</span>
        <span className="print:hidden ">Curriculum Vitae</span>
        <PrintButton />
      </h1>

      <div className="mb-8 print:block hidden print:text-gray-700">
        <p className="mb-4">
          I'm a full-stack software engineer with over 15 years of experience assisting organizations in crafting and evolving software products from initial concept to successful market launch, ensuring ideas are realized to their full potential.
        </p> 
        <p className="mb-4">
          My focus is emerging technologies and user-centric innovation. My expertise spans web3, cloud, and full-stack web and mobile development, complemented by ongoing explorations in artificial intelligence.
        </p>
        <p className="mb-4">
          My approach is rooted in agile methodologies, striving for parecision in technology implementation. I am fluent in English, Spanish, Portuguese, and Italian.
        </p>
      </div>


      <div className="space-y-8">
        {experiences.map((experience) => (
          <div key={experience.company} >
            <h2 className="text-xl font-semibold mb-2 print:text-black">{experience.company}</h2>
            <p className="text-sm exp-duration dark:text-gray-400 mb-2">
              {experience.location} • {experience.duration}
            </p>
            <p className="mb-4 exp-description dark:text-gray-300">
              {experience.description}
            </p>
            <h3 className="font-medium mb-2 exp-description">Key Achievements:</h3>
            <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700 dark:text-gray-300 !print:text-gray-700">
              {experience.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span key={experience.company + tech} className="rounded-md px-2 py-1 hidden print:hidden bg-neutral-200 dark:bg-neutral-800 text-xs font-medium text-gray-700 dark:text-gray-200 text-accent">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const experiences = [
  {
    "company": "Bitlauncher",
    "location": "Remote",
    "duration": "Nov 2023 - Present · 10 mos",
    "description": "Bitlauncher is an AI and crypto launchpad platform that provides early access to promising AI unicorn startups through token sales and auctions.",
    "achievements": [
      "Designed full-stack architecture using Viem, Wagmi, Alchemy, Trigger.dev, Supabase, Next.js 14, and ShadcnUI for a scalable and responsive platform",
      "Developed a custom token bridge for swapping USDT, USDC, and BITUSD to USDCred tokens, enabling seamless bidding within the platform",
      "Implemented a transaction data indexing system using Supabase for efficient querying, real-time subscriptions, and data aggregation analytics",
      "Deployed Gnosis auction Solidity contracts to EOS EVM and created a bidding interface with real-time updates via Supabase subscriptions",
      "Developed a wallet interface displaying real-time EVM balances through Wagmi token balance subscriptions and EOS token balances via RPC polling",
      "Integrated AI SDK for internationalization automation and established AI-driven development workflow using v0.dev, Anthropic Claude Sonnet, Cursor IDE, and SourceryAI",
      "Built a custom indexer for EOS EVM using Node.js, Viem EVM event subscriptions, and dFuse stream for EOS",
      "Implemented AI SDK integration and chat prompting mechanism for masterbots.ai, featuring specialized AI agents"
    ],
    "techStack": [
      "Viem", "Wagmi", "Alchemy", "Trigger.dev", "Supabase", "Next.js", "ShadcnUI", "Solidity",
      "EOS EVM", "Node.js", "AI SDK", "Claude Sonnet", "Cursor", "SourceryAI", "OpenAI"
    ]
  },

  {
    "company": "ZTX",
    "location": "Remote",
    "duration": "Aug 2022 - Aug 2023 · 1 yr 1 mo",
    "description": "ZTX is a virtual world platform integrating cryptocurrency for digital asset ownership. Users can mint, trade, and utilize blockchain-based items within the game, creating a decentralized virtual economy that enhances gameplay and user engagement.",
    "achievements": [
      "Setup the initial React frontend using Next.js, TailwindCSS and Framer Motion",
      "Implemented WebGL EVM wallet connector using MetaMask, Ethers and a custom JavaScript event system",
      "Set up advanced analytics and reporting using Google Analytics Tag Manager"
    ],
    "techStack": [
      "React", "Next.js", "TailwindCSS", "Framer Motion", "WebGL", "MetaMask", "Ethers",
      "Google Analytics Tag Manager"
    ]
  },
  {
    "company": "RareMint",
    "location": "Remote",
    "duration": "Jul 2021 - Dec 2022 · 1 yr 6 mos",
    "description": "RareMint is a platform for rare and unique digital assets. It allows users to mint, trade, and collect unique digital assets.",
    "achievements": [
      "Built an EVM NFT data indexer using Moralis streams, Node.js and PostgreSQL on Google Cloud",
      "Enhanced NFT marketplace responsiveness by refactoring the codebase to use RemixRun SSR, TailwindCSS and GraphQL queries, paying special attention to web vitals and best practices for filtering and sorting data on the frontend",
      "Integrated Wallet Connect for secure wallet connections and transactions",
      "Assisted the launch of the first auctions Pokemon cards on Polygon network"
    ],
    "techStack": [
      "Moralis", "Ethers", "Node.js", "PostgreSQL", "Google Cloud", "Remix", "TailwindCSS", "GraphQL", "TypeScript",
      "WalletConnect", "Polygon"
    ]
  },
  {
    "company": "Bitcash",
    "location": "Remote - Part-time",
    "duration": "Jan 2020 - Jul 2021 · 1 yr 7 mos",
    "description": "Bitcash app allows you to exchange your money for local currency stablecoins or bitUSD, which you can then use to buy cryptocurrencies.",
    "achievements": [
      "Designed and developed a full-stack architecture using React, Vite, Node.js, PostgreSQL, Hasura GraphQL and Google Cloud",
      "Developed p2p exchange system, internal realtime chat and backend matching engine",
      "Implemented realtime indexer for EOS that deserialize EOS binary data using Node.js worker threads and stores data in a PostgreSQL database in Google Cloud",
      "Developed webauthn key management allowing to sign transactions directly on the browser without requiring any wallet app bypassing the appstores restrictions",
      "Developed QR request for signature allowing user login to other apps like Bitlauncher.ai and sign transactions securely by scanning a QR code, using Supabase subscriptions and webhooks",
      "Setup initial multisig on EOS contracts while the DAO voting tools are still under development",
      "Transitioned to a consultant role for technical decisions in July 2021, providing architectural guidance and expertise while focusing on EVM NFT development at RareMint"
    ],
    "techStack": [
      "React", "Vite", "Node.js", "PostgreSQL", "Hasura GraphQL", "Google Cloud", "EOS", "WebAuthn", "Supabase", "TypeScript"
    ]
  },
  // {
  //   "company": "Tractor Supply",
  //   "location": "Remote - Contract",
  //   "duration": "Jul 2020 - Dec 2020 · 6 mos",
  //   "description": "Tractor Supply is a leading global supplier of agricultural equipment and supplies.",
  //   "achievements": [
  //     "Evaluated and provided improvement feedback to inhouse team on React Native architecture, such as removing unnecessary abstractions, code duplication and OO patterns in favor of a more functional approach",
  //     "Developed augmented reality feature to allow users to scan and visualize tents and storage units in their field using ViroReact"
  //   ],
  //   "techStack": ["React Native", "ViroReact", "TypeScript"]
  // },
  {
    "company": "Emanate",
    "location": "Remote - Contract",
    "duration": "Dec 2019 - Jul 2020 · 8 mos",
    "description": "Emanate is a social media platform for artists to share their work and connect with other artists.",
    "achievements": [
      "Maintained and improved the streaming web app",
      "Developed a back office for artists' token payments",
      "Integration with the EOS blockchain and AWS backend services"
    ],
    "techStack": ["EOS", "AWS", "React", "Styled Components"]
  },
  {
    "company": "EOS Costa Rica",
    "location": "Hybrid",
    "duration": "Mar 2018 - Jan 2020 · 1 yr 11 mos",
    "description": "EOS Costa Rica is an independently-owned, self-funded, bare-metal Genesis block producer that provides stable and secure infrastructure for the EOS mainnet. They also offer custom blockchain development services for enterprises and organizations.",
    "achievements": [
      "Participated in the EOS Mainnet launch and managed other EOSIO based blockchain validators",
      "Configured private EOSIO blockchain for Grant Thorton Labs and a application MVP that allows efficient intercompany transactions and tax management using a stable coin, as well as providing unmutable records trail using hashing mechanism and IPFS",
      "Developed EOS Rate frontend using React and Styled components",
      "Assisted in recruiting and onboarding new team members, public speaking, workshops, training and community engagement. Eg TicoBlockchain.cr and CryptoCantina Meetups"
    ],
    "techStack": ["EOSIO", "React", "Styled Components", "IPFS"]
  },
  {
    "company": "Knowledge",
    "location": "Remote",
    "duration": "Sep 2017 - May 2018 · 9 mos",
    "description": "Knowledge.io was a blockchain-based platform launched in 2017 aimed at revolutionizing how knowledge is valued and shared. It sought to create a decentralized ecosystem where individuals could earn tokens by sharing their knowledge, thereby monetizing their expertise.",
    "achievements": [
      "Deployed ERC20 token for ICO on Ethereum mainnet using Truffle",
      "Developed marketplace and wallet dashboard using React and Web3.js",
      "Helped maintain a mobile trivia game that allowed users to earn tokens by answering questions"
    ],
    "techStack": ["Ethereum", "Truffle", "React", "Web3.js"]
  },
  {
    "company": "Wink",
    "location": "On-site",
    "duration": "Apr 2015 - Mar 2018 · 3 yrs",
    "description": "Wink (holawink.com) is Costa Rica's first neobank and a fintech company that provides digital banking solutions and financial services to underserved populations in Latin America. Their platform offers mobile banking, digital wallets, and innovative financial products.",
    "achievements": [
      "Software architecture, technical leadership I was responsible for the entire backend architecture, integrations and security",
      "Technical recruiting and coordination with the partner banks' department and vendors",
      "Developed KYC features with biometrics using a third party service and React Native bridge components",
      "Integration with the partner banks API"
    ],
    "techStack": ["React Native", "React", "Node.js", "AWS"]
  },
  {
    "company": "AMC Networks",
    "location": "Hybrid",
    "duration": "Nov 2012 - Apr 2014 · 1 yr 6 mos",
    "description": "YEAH! was a streaming movie service launched by AMC Networks on March 12, 2013, during the South by Southwest (SXSW) festival. It aimed to provide a unique viewing experience by curating classic genre films—such as horror, sci-fi, and action-adventure—while enhancing them with interactive bonus content.",
    "achievements": [
      "Led a frontend team of 5 developers, coordinating efforts between AMC's creative team and backend developers to deliver a seamless user experience",
      "Developed an interactive video streaming frontend for the Facebook app, leveraging the platform's social features to enhance user engagement",
      "Architected and implemented a comprehensive back-office system, integrating Brightcove for efficient video content management and delivery",
      "Enhanced the viewing experience by integrating interactive elements such as minute-by-minute trivia, exclusive interviews, and quizzes into the video player, allowing users to engage with content without interrupting playback",
      "Optimized the platform to support a curated selection of iconic films, each featuring 400-500 pieces of original, interactive content"
    ],
    "techStack": ["JavaScript", "Brightcove", "Facebook API"]
  },
  {
    "company": "American Express (AMEX)",
    "location": "On-site",
    "duration": "Apr 2010 - Nov 2012 · 2 yrs 8 mos",
    "description": "American Express (AMEX) is a multinational financial services corporation headquartered in New York City. Founded in 1850, it has become one of the world's most recognizable and prestigious brands in the financial industry. AMEX is best known for its credit card, charge card, and traveler's cheque businesses.",
    "achievements": [
      "Contributed to the migration from DoJo to jQuery",
      "Implemented responsive layouts, A/B testing and analytics",
      "Developed credit card marketing components for comparison and comparison sliders as well as dedicated marketing landing pages"
    ],
    "techStack": ["JavaScript", "jQuery", "A/B testing tools", "Analytics platforms"]
  },
  {
    "company": "InterGraphicDESIGNS",
    "location": "On-site",
    "duration": "Jul 2008 - Apr 2010 · 1 yr 10 mos",
    "description": "InterGraphicDESIGNS is a web design and development company specializing in creating custom WordPress solutions for businesses. They focus on delivering tailored websites and web applications that combine aesthetic appeal with functional efficiency.",
    "achievements": [
      "Crafted custom sites and modules using WordPress, PHP, CSS and JavaScript",
      "Developed custom WordPress plugins for custom post types, taxonomies and admin dashboards",
      "Integrated third party services like Google Maps with custom pointer and interactive content for our db",
      "Built a newsletter for Scotiabank using WordPress"
    ],
    "techStack": ["WordPress", "PHP", "CSS", "JavaScript", "Google Maps API"]
  }
]