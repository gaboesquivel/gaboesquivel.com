#!/usr/bin/env node
/**
 * Fetches and builds the official ext-apps basic-host example (pinned to ext-apps 2.0.3).
 * Output: tests/genui/mcp-apps/vendor/basic-host/dist
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../..", import.meta.url).pathname;
const vendorRoot = join(root, "tests/genui/mcp-apps/vendor");
const basicHostDir = join(vendorRoot, "basic-host");
const distIndex = join(basicHostDir, "dist", "index.html");
const tag = "v2.0.3";

if (existsSync(distIndex)) {
  console.log("basic-host already built:", distIndex);
  process.exit(0);
}

execSync(`mkdir -p "${vendorRoot}"`, { stdio: "inherit" });
if (!existsSync(join(vendorRoot, "ext-apps"))) {
  execSync(
    `git clone --depth 1 --branch ${tag} https://github.com/modelcontextprotocol/ext-apps.git "${join(vendorRoot, "ext-apps")}"`,
    { stdio: "inherit" }
  );
}

execSync("npm install", {
  cwd: join(vendorRoot, "ext-apps"),
  stdio: "inherit",
});
execSync("npm install", {
  cwd: join(vendorRoot, "ext-apps", "examples", "basic-host"),
  stdio: "inherit",
});
execSync("npm run build", {
  cwd: join(vendorRoot, "ext-apps", "examples", "basic-host"),
  stdio: "inherit",
});
execSync(
  `rm -rf "${basicHostDir}" && cp -R "${join(vendorRoot, "ext-apps/examples/basic-host")}" "${basicHostDir}"`,
  {
    stdio: "inherit",
  }
);

console.log("basic-host ready at", basicHostDir);
