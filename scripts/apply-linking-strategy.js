#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// Domain specializations (highest priority)
const DOMAIN_SPECIALIZATIONS = {
  // DeFi concepts → /web3
  web3: [
    'defi',
    'blockchain',
    'crypto',
    'ethereum',
    'token',
    'smart contract',
    'decentralized finance',
    'dao',
    'nft',
    'web3',
    'onchain',
    'on-chain',
    'dapp',
    'wallet',
  ],

  // AI concepts → /ai
  ai: [
    'ai',
    'artificial intelligence',
    'machine learning',
    'llm',
    'gpt',
    'large language model',
    'rag',
    'retrieval augmented',
    'vector database',
    'embedding',
    'prompt',
    'agent',
    'agentic',
  ],

  // Frontend patterns → /frontend
  frontend: [
    'frontend',
    'ui',
    'user interface',
    'interface design',
    'component',
    'responsive design',
    'spa',
    'single page application',
    'ui/ux',
    'css',
    'html',
  ],

  // Backend architecture → /backend
  backend: [
    'backend',
    'server',
    'api',
    'database',
    'cloud',
    'infrastructure',
    'devops',
    'microservice',
    'serverless',
    'indexer',
    'indexing',
    'rest api',
  ],

  // Mobile development → /react-native
  'react-native': [
    'mobile app',
    'mobile development',
    'ios app',
    'android app',
    'react native',
    'expo',
    'mobile ui',
    'mobile interface',
  ],

  // Technical leadership → /lead
  lead: [
    'technical leadership',
    'tech lead',
    'engineering lead',
    'team lead',
    'leadership',
    'mentorship',
    'engineering management',
    'technical strategy',
  ],
}

// Project implementations (medium priority)
const PROJECT_IMPLEMENTATIONS = {
  // Specific project names and variants
  bitlauncher: ['bitlauncher', 'bit launcher'],
  opyn: ['opyn', 'opyn protocol'],
  masterbots: ['masterbots', 'master bots'],
  raremint: ['raremint', 'rare mint'],
  ztx: ['ztx'],
  knowledge: ['knowledge.io'],
  emanate: ['emanate'],
  'sfera-legal': ['sfera legal', 'sfera', 'legal assistant'],
  'sense-chat': ['sense chat'],
  wink: ['wink'],
  chaingraph: ['chaingraph'],
  'eos-costa-rica': ['eos costa rica'],
  'american-express': ['american express', 'amex'],
  'amc-networks': ['amc networks'],
  'tractor-supply': ['tractor supply'],
  'fantasy-top-shots': ['fantasy top shots', 'top shots'],
  'eat-arcade': ['eat arcade'],
}

// Technology mentions (lower priority)
const TECHNOLOGY_MENTIONS = {
  react: ['react', 'reactjs', 'react.js'],
  'next-js': ['next.js', 'nextjs', 'next js', 'app router'],
  'node-js': ['node.js', 'nodejs', 'node js'],
  typescript: ['typescript', 'ts'],
  javascript: ['javascript', 'js', 'es6'],
  graphql: ['graphql', 'graph ql'],
  postgresql: ['postgresql', 'postgres'],
  supabase: ['supabase'],
  tailwind: ['tailwind', 'tailwindcss', 'tailwind css'],
  'shadcn-ui': ['shadcn/ui', 'shadcn ui'],
  solidity: ['solidity'],
  remix: ['remix'],
  walletconnect: ['walletconnect', 'wallet connect'],
  webgl: ['webgl'],
  aws: ['aws', 'amazon web services'],
  gcp: ['gcp', 'google cloud', 'google cloud platform'],
  terraform: ['terraform'],
  azure: ['azure', 'microsoft azure'],
  docker: ['docker', 'containerized', 'containerization'],
  serverless: ['serverless'],
  'web-authn': ['webauthn', 'web authn'],
  openai: ['openai', 'open ai', 'gpt-4'],
  kubernetes: ['kubernetes', 'k8s'],
  eos: ['eos blockchain', 'eosio'],
  ethereum: ['ethereum'],
  polygon: ['polygon'],
  flow: ['flow blockchain'],
  evm: ['evm', 'ethereum virtual machine'],
  twilio: ['twilio'],
  stripe: ['stripe'],
  webassembly: ['webassembly', 'wasm'],
  rust: ['rust'],
  go: ['golang', 'go language'],
  python: ['python'],
  redis: ['redis'],
  mongodb: ['mongodb', 'mongo'],
  mysql: ['mysql'],
  nextauth: ['nextauth', 'next auth'],
}

// Read all blog posts
const contentDir = path.join(process.cwd(), 'content')
const blogPosts = glob.sync(path.join(contentDir, '*.mdx'))

// Extracts year from filename like '2025-01-math-js-defi.mdx'
function extractYear(filename) {
  const match = path.basename(filename).match(/^(\d{4})/)
  return match ? Number.parseInt(match[1], 10) : 0
}

// Sort blog posts by year (newest first)
blogPosts.sort((a, b) => extractYear(b) - extractYear(a))

// Function to check for domain specialization matches
function findDomainSpecializationMatches(content, doNotLinkAgain = []) {
  const matches = []

  Object.entries(DOMAIN_SPECIALIZATIONS).forEach(([domain, keywords]) => {
    // Skip if we already have a link to this domain
    if (doNotLinkAgain.includes(`/${domain}`)) return

    // Check for keywords, excluding those that are already linked
    keywords.forEach((keyword) => {
      const keywordPattern = new RegExp(`\\b${keyword}\\b(?![^<>]*>)`, 'gi')
      const matches1 = [...content.matchAll(keywordPattern)]

      matches1.forEach((match) => {
        // Make sure the match is not already part of a markdown link
        const start = match.index
        const backwardSearch = content.substring(Math.max(0, start - 30), start)

        // Only add if not already part of a markdown link or HTML tag
        if (!backwardSearch.includes('[') && !backwardSearch.includes('<a')) {
          matches.push({
            domain,
            keyword: match[0],
            index: match.index,
            type: 'domain',
          })
        }
      })
    })
  })

  return matches
}

// Function to check for project implementation matches
function findProjectMatches(content, doNotLinkAgain = [], publicationYear) {
  const matches = []

  // Only link to projects that existed at publication time
  // This is a simplified approach - in a real implementation, you would check actual project dates
  const projectYears = {
    bitlauncher: 2023,
    opyn: 2022,
    masterbots: 2024,
    raremint: 2021,
    ztx: 2022,
    knowledge: 2018,
    emanate: 2019,
    'sfera-legal': 2024,
    'sense-chat': 2019,
    wink: 2020,
    chaingraph: 2021,
    'eos-costa-rica': 2018,
    'american-express': 2016,
    'amc-networks': 2018,
    'tractor-supply': 2022,
    'fantasy-top-shots': 2022,
    'eat-arcade': 2017,
  }

  Object.entries(PROJECT_IMPLEMENTATIONS).forEach(([project, keywords]) => {
    // Skip if we already have a link to this project
    if (doNotLinkAgain.includes(`/project/${project}`)) return

    // Skip if the project didn't exist at publication time
    if (publicationYear < projectYears[project]) return

    keywords.forEach((keyword) => {
      const keywordPattern = new RegExp(`\\b${keyword}\\b(?![^<>]*>)`, 'gi')
      const matches1 = [...content.matchAll(keywordPattern)]

      matches1.forEach((match) => {
        // Make sure the match is not already part of a markdown link
        const start = match.index
        const backwardSearch = content.substring(Math.max(0, start - 30), start)

        if (!backwardSearch.includes('[') && !backwardSearch.includes('<a')) {
          matches.push({
            project,
            keyword: match[0],
            index: match.index,
            type: 'project',
          })
        }
      })
    })
  })

  return matches
}

// Function to check for technology mentions
function findTechMatches(content, doNotLinkAgain = []) {
  const matches = []

  Object.entries(TECHNOLOGY_MENTIONS).forEach(([tech, keywords]) => {
    // Skip if we already have a link to this tech
    if (doNotLinkAgain.includes(`/tech/${tech}`)) return

    keywords.forEach((keyword) => {
      const keywordPattern = new RegExp(`\\b${keyword}\\b(?![^<>]*>)`, 'gi')
      const matches1 = [...content.matchAll(keywordPattern)]

      matches1.forEach((match) => {
        // Make sure the match is not already part of a markdown link
        const start = match.index
        const backwardSearch = content.substring(Math.max(0, start - 30), start)

        if (!backwardSearch.includes('[') && !backwardSearch.includes('<a')) {
          matches.push({
            tech,
            keyword: match[0],
            index: match.index,
            type: 'tech',
          })
        }
      })
    })
  })

  return matches
}

// Function to check existing links in the content
function extractExistingLinks(content) {
  const linkPattern = /\[.*?\]\((\/[a-zA-Z0-9\-_/]+)\)/g
  const existingLinks = []

  let match
  while ((match = linkPattern.exec(content)) !== null) {
    existingLinks.push(match[1])
  }

  return existingLinks
}

// Function to apply the linking strategy to a blog post
function applyLinkingStrategy(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const fileName = path.basename(filePath)

  // Extract publication year from the filename
  const publicationYear = extractYear(fileName)

  // Split front matter and content
  const parts = content.split('---')
  if (parts.length < 3) {
    console.log(`Invalid MDX format in ${fileName}`)
    return
  }

  const frontMatter = parts[1]
  const mainContent = parts.slice(2).join('---')

  // Extract existing links to avoid duplication
  const existingLinks = extractExistingLinks(mainContent)

  // Find potential matches
  const domainMatches = findDomainSpecializationMatches(
    mainContent,
    existingLinks,
  )
  const projectMatches = findProjectMatches(
    mainContent,
    existingLinks,
    publicationYear,
  )
  const techMatches = findTechMatches(mainContent, existingLinks)

  // Sort matches by index (position in document)
  const allMatches = [...domainMatches, ...projectMatches, ...techMatches].sort(
    (a, b) => a.index - b.index,
  )

  // Apply linking strategy based on priority
  // 1. Domain specialization (1-2 links)
  // 2. Project implementations (0-1 links)
  // 3. Technology mentions (0-2 links)

  // Keep track of applied links by category
  const appliedLinks = {
    domain: [],
    project: [],
    tech: [],
  }

  // Maximum links per category
  const maxLinks = {
    domain: 2,
    project: 1,
    tech: 2,
  }

  // Maximum total links
  const MAX_TOTAL_LINKS = 5
  let totalAppliedLinks = 0

  // Clone content for modifications (to handle offset changes)
  let modifiedContent = mainContent
  let offset = 0

  // Process matches
  allMatches.forEach((match) => {
    if (totalAppliedLinks >= MAX_TOTAL_LINKS) return
    if (appliedLinks[match.type].length >= maxLinks[match.type]) return

    // Skip if link type already has enough links

    let linkUrl = ''
    switch (match.type) {
      case 'domain':
        linkUrl = `/${match.domain}`
        break
      case 'project':
        linkUrl = `/project/${match.project}`
        break
      case 'tech':
        linkUrl = `/tech/${match.tech}`
        break
    }

    // Apply the link
    const linkText = `[${match.keyword}](${linkUrl})`

    // Apply the replacement with adjusted index
    const adjustedIndex = match.index + offset
    modifiedContent =
      modifiedContent.substring(0, adjustedIndex) +
      linkText +
      modifiedContent.substring(adjustedIndex + match.keyword.length)

    // Update offset for future replacements
    offset += linkText.length - match.keyword.length

    // Track the applied link
    appliedLinks[match.type].push(linkUrl)
    totalAppliedLinks++
  })

  // If content changed, write back to file
  if (mainContent !== modifiedContent) {
    const newContent = `---${frontMatter}---${modifiedContent}`
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(`Applied linking strategy to ${fileName}`)
    console.log(`  - Domain links: ${appliedLinks.domain.length}`)
    console.log(`  - Project links: ${appliedLinks.project.length}`)
    console.log(`  - Tech links: ${appliedLinks.tech.length}`)
  } else {
    console.log(`No changes made to ${fileName}`)
  }
}

// Process all blog posts
console.log(`Found ${blogPosts.length} blog posts to process`)

blogPosts.forEach((post) => {
  console.log(`Processing: ${path.basename(post)}`)
  applyLinkingStrategy(post)
})

console.log('Done applying linking strategy.')
