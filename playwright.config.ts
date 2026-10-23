import { defineConfig, devices } from "@playwright/test";

const testPort = process.env.PLAYWRIGHT_PORT ?? "3199";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${testPort}`;
const webServerCommand =
  process.env.PLAYWRIGHT_USE_START === "1"
    ? `GENUI_FIXTURE_LAB=1 bun run content:build && bunx eve build && GENUI_FIXTURE_LAB=1 bun run build && GENUI_FIXTURE_LAB=1 bunx next start -p ${testPort}`
    : `bash scripts/genui-playwright-webserver.sh`;

export default defineConfig({
  expect: {
    toHaveScreenshot: { maxDiffPixels: 50 },
  },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: process.env.CI === "true",
  outputDir: "tests/genui/browser/test-results",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "tests/genui/browser/report" }],
    ["json", { outputFile: "tests/genui/browser/report/results.json" }],
  ],
  retries: process.env.CI ? 1 : 0,
  testDir: "tests/genui",
  timeout: 60_000,
  use: {
    baseURL,
    colorScheme: "dark",
    locale: "en-US",
    screenshot: "only-on-failure",
    timezoneId: "America/Denver",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    viewport: { height: 900, width: 1440 },
  },
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: webServerCommand,
        env: { GENUI_FIXTURE_LAB: "1" },
        reuseExistingServer:
          Boolean(process.env.PLAYWRIGHT_BASE_URL) || process.env.CI !== "true",
        stdout: "pipe",
        timeout: 300_000,
        url: `${baseURL}/`,
      },
  workers: process.env.CI ? 2 : 1,
});
