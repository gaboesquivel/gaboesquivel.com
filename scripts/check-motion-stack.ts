import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(import.meta.dir, "..");

const scanRoots = ["app", "components", "lib"] as const;

const skipDir = (name: string) =>
  name === "node_modules" || name === "ui" || name.startsWith(".");

const forbidden = [
  /from\s+["']motion\/react["']/,
  /from\s+["']motion["']/,
  /from\s+["']framer-motion["']/,
  /from\s+["']gsap["']/,
];

const walk = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (skipDir(entry.name)) continue;
      files.push(...(await walk(path.join(dir, entry.name))));
      continue;
    }
    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
};

const main = async () => {
  const violations: string[] = [];

  for (const scanRoot of scanRoots) {
    const base = path.join(root, scanRoot);
    const files = await walk(base);
    for (const file of files) {
      const text = await readFile(file, "utf-8");
      for (const pattern of forbidden) {
        if (pattern.test(text)) {
          violations.push(`${path.relative(root, file)}: ${pattern}`);
        }
      }
    }
  }

  const pkg = await readFile(path.join(root, "package.json"), "utf-8");
  const pkgJson = JSON.parse(pkg) as {
    dependencies?: Record<string, string>;
  };
  if (pkgJson.dependencies?.motion) {
    violations.push("package.json: remove motion dependency");
  }

  if (violations.length > 0) {
    console.error("Motion stack check failed:\n");
    for (const line of violations) console.error(`  - ${line}`);
    process.exit(1);
  }

  console.log("OK motion stack (native CSS / View Transitions only)");
};

await main();
