const fs = require("node:fs");
const path = require("node:path");
const { get } = require("@vercel/edge-config");
const { techStack } = require("gaboesquivel");

const isGaboesquivelLinked = (() => {
  try {
    return fs
      .lstatSync(path.join(__dirname, "node_modules/gaboesquivel"))
      .isSymbolicLink();
  } catch {
    return false;
  }
})();

const blogTechRedirects = techStack.flatMap((tech) => [
  {
    destination: `/tech/${tech.slug}`,
    permanent: true,
    source: `/blog/tech/${encodeURIComponent(tech.slug)}`,
  },
  {
    destination: `/tech/${tech.slug}`,
    permanent: true,
    source: `/blog/tech/${encodeURIComponent(tech.tag)}`,
  },
]);

const genuiFixtureRewrites =
  process.env.GENUI_FIXTURE_LAB === "1"
    ? [
        {
          destination: "/genui-lab/fixtures/:fixtureId",
          source: "/__genui__/fixtures/:fixtureId",
        },
      ]
    : [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The GenUI fixture lab runs beside `bun run dev` with its own build dir.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  allowedDevOrigins: [
    "gaboesquivel.localhost",
    "*.gaboesquivel.localhost",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 448, 512],
  },
  transpilePackages: [
    "@modelcontextprotocol/client",
    "@modelcontextprotocol/core",
    "@modelcontextprotocol/ext-apps",
    ...(isGaboesquivelLinked ? ["gaboesquivel"] : []),
  ],
  ...(isGaboesquivelLinked && {
    outputFileTracingRoot: path.join(__dirname, ".."),
  }),
  async rewrites() {
    return genuiFixtureRewrites;
  },
  async redirects() {
    const baseRedirects = [
      {
        destination: "https://calendly.com/gaboesquivel/30min",
        permanent: true,
        source: "/cal",
      },
      { destination: "/contact", permanent: true, source: "/connect" },
      {
        destination: "/images/gaboesquivel-homepage-mobile.webp",
        permanent: true,
        source: "/images/gaboesquivel-homepage.webp",
      },
      { destination: "/docs", permanent: true, source: "/developers" },
      { destination: "/docs", permanent: true, source: "/developer" },
      { destination: "/docs", permanent: true, source: "/mcp/docs" },
      { destination: "/docs", permanent: true, source: "/docs/mcp" },
      { destination: "/", permanent: false, source: "/ask" },
      ...blogTechRedirects,
    ];
    try {
      const edgeRedirects = await get("redirects");
      return [...baseRedirects, ...(edgeRedirects ?? [])];
    } catch {
      return baseRedirects;
    }
  },
  headers() {
    return [
      {
        headers: [
          ...securityHeaders,
          {
            key: "Vary",
            value:
              "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept",
          },
        ],
        source: "/(.*)",
      },
    ];
  },
  outputFileTracingIncludes: {
    "/api/markdown": ["./generated/markdown-routes.json"],
    "/api/markdown/[[...slug]]": ["./generated/markdown-routes.json"],
    "/api/v1/pages": [
      "./generated/markdown-routes.json",
      "./generated/api/pages.json",
    ],
    "/api/v1/pages/[...path]": ["./generated/markdown-routes.json"],
    "/api/v1/profile": ["./generated/api/profile.json"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@tanstack/react-form"],
  },
};

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live;
    style-src 'self' 'unsafe-inline';
    frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com data:;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self' data:;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replaceAll("\n", ""),
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const eveNextConfig = async (phase, context) => {
  const { withEve } = await import("eve/next");
  return withEve(nextConfig)(phase, context);
};

module.exports = eveNextConfig;
