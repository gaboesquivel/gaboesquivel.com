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

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["gaboesquivel.localhost", "*.gaboesquivel.localhost"],
  ...(isGaboesquivelLinked && {
    outputFileTracingRoot: path.join(__dirname, ".."),
    transpilePackages: ["gaboesquivel"],
  }),
  async redirects() {
    const calRedirect = {
      destination: "https://calendly.com/gaboesquivel/30min",
      permanent: true,
      source: "/cal",
    };
    const askRedirects = [
      { destination: "/ask", permanent: true, source: "/connect" },
    ];
    const mcpDocsRedirects = [
      { destination: "/docs", permanent: true, source: "/developers" },
      { destination: "/docs", permanent: true, source: "/developer" },
      { destination: "/docs", permanent: true, source: "/mcp/docs" },
      { destination: "/docs", permanent: true, source: "/docs/mcp" },
    ];
    try {
      const edgeRedirects = await get("redirects");
      return [
        calRedirect,
        ...askRedirects,
        ...mcpDocsRedirects,
        ...blogTechRedirects,
        ...(edgeRedirects ?? []),
      ];
    } catch {
      return [
        calRedirect,
        ...askRedirects,
        ...mcpDocsRedirects,
        ...blogTechRedirects,
      ];
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
    "/api/v1/pages": ["./generated/markdown-routes.json"],
    "/api/v1/pages/[...path]": ["./generated/markdown-routes.json"],
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

const appendMcp = (rules) => {
  if (!Array.isArray(rules)) return rules;
  const eve = rules.find(
    (rule) =>
      typeof rule?.source === "string" && rule.source.includes("/eve/v1")
  );
  if (!eve?.destination) return rules;
  const destination = String(eve.destination).replace(
    /\/eve\/v1\/:path\+\/?$/,
    "/mcp"
  );
  if (
    destination === String(eve.destination) ||
    rules.some((rule) => rule.source === "/mcp")
  ) {
    return rules;
  }
  return [...rules, { destination, source: "/mcp" }];
};

const withMcpRewrite = (config) => {
  const previous = config.rewrites;
  config.rewrites = async (...args) => {
    const existing =
      typeof previous === "function"
        ? await previous(...args)
        : (previous ?? []);
    if (Array.isArray(existing)) return appendMcp(existing);
    return {
      ...existing,
      afterFiles: appendMcp(existing.afterFiles ?? []),
      beforeFiles: appendMcp(existing.beforeFiles ?? []),
      fallback: appendMcp(existing.fallback ?? []),
    };
  };
  return config;
};

const patchVercelMcp = () => {
  const file = path.join(__dirname, ".vercel/output/config.json");
  if (!fs.existsSync(file)) return;
  try {
    const output = JSON.parse(fs.readFileSync(file, "utf-8"));
    const routes = Array.isArray(output.routes) ? output.routes : [];
    if (!routes.some((route) => route.src === "^/mcp$")) {
      const route = {
        destination: { service: "eve", type: "service" },
        src: "^/mcp$",
      };
      const index = routes.findIndex((item) => item.handle === "filesystem");
      if (index === -1) routes.unshift(route);
      else routes.splice(index, 0, route);
      output.routes = routes;
    }
    const eve = output.services?.eve;
    if (
      eve &&
      Array.isArray(eve.routes) &&
      !eve.routes.some((route) => route.src === "^/mcp$")
    ) {
      eve.routes.unshift({
        src: "^/mcp$",
        transforms: [{ args: "/mcp", op: "set", type: "request.path" }],
      });
    }
    fs.writeFileSync(file, `${JSON.stringify(output, null, 2)}\n`);
  } catch {
    // The eve service route is attached when the Vercel output config exists.
  }
};

const eveNextConfig = async (phase, context) => {
  const { withEve } = await import("eve/next");
  const resolved = await withEve(nextConfig)(phase, context);
  if (process.env.VERCEL || fs.existsSync(path.join(__dirname, ".vercel"))) {
    patchVercelMcp();
  }
  return withMcpRewrite(resolved);
};

module.exports = eveNextConfig;
