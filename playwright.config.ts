import { defineConfig, devices } from "@playwright/test";

const testPort = process.env.PLAYWRIGHT_PORT ?? "3199";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${testPort}`;

export default defineConfig({
  expect: {
    toHaveScreenshot: { maxDiffPixels: 50 },
  },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
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
        command: `GENUI_FIXTURE_LAB=1 bun run content:build && GENUI_FIXTURE_LAB=1 bunx next dev -p ${testPort}`,
        env: { GENUI_FIXTURE_LAB: "1" },
        reuseExistingServer: false,
        timeout: 180_000,
        url: baseURL,
      },
  workers: process.env.CI ? 2 : undefined,
});
