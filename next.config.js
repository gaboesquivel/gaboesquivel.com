const fs = require('node:fs')
const path = require('node:path')
const { get } = require('@vercel/edge-config')
const { techStack } = require('gaboesquivel')

const isGaboesquivelLinked = (() => {
  try {
    return fs
      .lstatSync(path.join(__dirname, 'node_modules/gaboesquivel'))
      .isSymbolicLink()
  } catch {
    return false
  }
})()

const blogTechRedirects = techStack.flatMap((tech) => [
  {
    source: `/blog/tech/${encodeURIComponent(tech.slug)}`,
    destination: `/tech/${tech.slug}`,
    permanent: true,
  },
  {
    source: `/blog/tech/${encodeURIComponent(tech.tag)}`,
    destination: `/tech/${tech.slug}`,
    permanent: true,
  },
])

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGaboesquivelLinked && {
    transpilePackages: ['gaboesquivel'],
    outputFileTracingRoot: path.join(__dirname, '..'),
  }),
  async redirects() {
    const calRedirect = {
      source: '/cal',
      destination: 'https://calendly.com/gaboesquivel/30min',
      permanent: true,
    }
    try {
      const edgeRedirects = await get('redirects')
      return [calRedirect, ...blogTechRedirects, ...(edgeRedirects ?? [])]
    } catch {
      return [calRedirect, ...blogTechRedirects]
    }
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live;
    style-src 'self' 'unsafe-inline';
    frame-src 'self' https://www.youtube.com https://player.vimeo.com data:;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self' data:;
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = nextConfig
