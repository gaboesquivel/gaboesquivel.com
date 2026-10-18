const siteUrl = 'https://gaboesquivel.com'

const description =
  'I build useful and delightful software products across AI, Web3, and full-stack applications.'

export const homeJsonLd = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gabo Esquivel',
    jobTitle: 'Agentic Product Engineer',
    description,
    url: siteUrl,
    email: 'contact@gaboesquivel.com',
    sameAs: [
      'https://github.com/gaboesquivel',
      'https://twitter.com/gaboesquivel',
      'https://linkedin.com/in/gaboesquivel',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gabo Esquivel',
    url: siteUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@gaboesquivel.com',
      contactType: 'professional inquiries',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CR',
    },
  },
]
