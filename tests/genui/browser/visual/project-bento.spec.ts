import { expect, test } from "@playwright/test";

const viewports = [
  { height: 900, label: "desktop", width: 1440 },
  { height: 1024, label: "tablet", width: 768 },
  { height: 844, label: "mobile", width: 390 },
] as const;

for (const viewport of viewports) {
  test(`project-bento fixture ${viewport.label}`, async ({ page }) => {
    await page.setViewportSize({
      height: viewport.height,
      width: viewport.width,
    });
    await page.goto("/__genui__/fixtures/project-bento");
    await expect(page.locator("[data-fixture-id]")).toBeVisible();
    await expect(page.locator('a[href^="/project/"]')).toHaveCount(4);
    await expect(page.getByText("Composing results")).toHaveCount(0);
    await expect(page).toHaveScreenshot(`project-bento-${viewport.label}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}
