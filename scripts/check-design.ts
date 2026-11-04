import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// The DESIGN.md identity bans a script can see. The rest of DESIGN.md needs someone to look.
const root = path.join(import.meta.dir, "..");

const scanRoots = ["app", "components", "lib"] as const;

const skipDir = (name: string) =>
  name === "node_modules" || name === "ui" || name.startsWith(".");

const rules = [
  {
    name: "gradient fill",
    pattern:
      /bg-(gradient|linear|radial|conic)-|linear-gradient\(|radial-gradient\(|conic-gradient\(/,
    why: "DESIGN.md Don'ts: no gradients",
  },
  {
    name: "zinc/gray/slate class",
    pattern: /\b(zinc|gray|slate)-\d{2,3}\b/,
    why: "DESIGN.md Colors: neutral-* for new classes",
  },
  {
    name: "shadow",
    pattern: /\bshadow-(?!none\b)[a-z0-9[]/,
    why: "DESIGN.md Elevation and shapes: no shadows",
  },
  {
    name: "backdrop blur",
    pattern: /\bbackdrop-blur(?!-none\b)/,
    why: "DESIGN.md Elevation and shapes: no glass",
  },
  {
    name: "oversized radius",
    pattern: /\brounded-(xl|2xl)\b/,
    why: "DESIGN.md Elevation and shapes: rounded-lg surfaces, no rounded-2xl",
  },
  {
    name: "inline viewTransitionName",
    pattern: /viewTransitionName/,
    why: "DESIGN.md Motion: React <ViewTransition>, not raw names",
  },
  {
    name: "neutral-500 text",
    pattern: /\btext-neutral-500\b/,
    why: "DESIGN.md Accessibility: neutral-400 for text (AA on black)",
  },
  {
    name: "display serif",
    pattern: /\bfont-serif\b/,
    why: "DESIGN.md Don'ts: no display serif",
  },
  {
    name: "numbered marker",
    // A list index rendered as 01, 02, … (clock and date padding stay allowed).
    pattern:
      /\w+\s*\+\s*1\)\)?\.padStart\(2|>\s*0[1-9]\s*[.<]|["']0[1-9]\.?["']/,
    why: "DESIGN.md Don'ts: no 01/02/03 markers",
  },
  {
    name: "eyebrow label",
    pattern: /\buppercase\b|\btracking-(wider|widest)\b/,
    why: "DESIGN.md Typography: no eyebrow labels, all-caps, or wide tracking",
  },
  {
    name: "raw page title",
    // Every page h1 is `PageTitle` (display scale); only `/cv` and GenUI panels use the small `pageTitle`.
    pattern: /<h1\b|\bindexTitle\b/,
    why: "DESIGN.md Layout: use PageTitle (heroTitle), not a raw h1",
  },
  {
    name: "second accent",
    pattern:
      /\b(text|bg|border|ring|outline|fill|stroke|decoration|from|via|to)-(\[#|(orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d)/,
    why: "DESIGN.md Colors: one accent (accent token); red only for errors",
  },
];

// Existing exceptions, listed in DESIGN.md Drift. Do not add to this list to pass a new change.
const allowed: Record<string, string[]> = {
  "app/global.css": ["gradient fill", "zinc/gray/slate class", "second accent"],
  "components/tweet.css": ["gradient fill", "zinc/gray/slate class"],
  "components/shared/contact-info.tsx": ["second accent"],
  "components/work/work-filter-nav.tsx": ["gradient fill"],
  "components/shared/page-layout.tsx": ["raw page title"],
};

const walk = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (skipDir(entry.name)) continue;
      files.push(...(await walk(path.join(dir, entry.name))));
      continue;
    }
    if (/\.(ts|tsx|js|jsx|css)$/.test(entry.name)) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
};

const main = async () => {
  const violations: string[] = [];

  for (const scanRoot of scanRoots) {
    for (const file of await walk(path.join(root, scanRoot))) {
      const rel = path.relative(root, file);
      const lines = (await readFile(file, "utf-8")).split("\n");
      for (const rule of rules) {
        if (allowed[rel]?.includes(rule.name)) continue;
        for (const [i, line] of lines.entries()) {
          if (rule.pattern.test(line)) {
            violations.push(`${rel}:${i + 1}: ${rule.name} (${rule.why})`);
          }
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error("Design check failed:\n");
    for (const line of violations) console.error(`  - ${line}`);
    process.exit(1);
  }

  console.log("OK design identity bans");
};

await main();
