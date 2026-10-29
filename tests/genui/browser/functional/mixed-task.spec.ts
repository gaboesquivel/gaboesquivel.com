import { expect, test } from "@playwright/test";

test("mixed task stays readable on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/__genui__/fixtures/mixed-task");
  const container = page.locator("[data-fixture-id]");
  await expect(container).toBeVisible();
  expect(
    await container.evaluate((node) => node.scrollWidth > node.clientWidth + 1)
  ).toBe(false);
  await expect(page.locator("[data-comparison-row='role']")).toBeVisible();
  await expect(page.locator('a[href="/project/wink"]').first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Download PDF" })).toBeVisible();
});

test("comparison rows are visible without disclosure and CV download is keyboard reachable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/__genui__/fixtures/mixed-task");
  await expect(page.locator("details[data-comparison-details]")).toHaveCount(0);
  const role = page.locator("[data-comparison-row='role']");
  await expect(role).toBeVisible();
  await expect(role.getByText("Not recorded")).toBeVisible();
  const download = page.getByRole("link", { name: "Download PDF" });
  await download.focus();
  await expect(download).toBeFocused();
  await expect(download).toHaveAttribute("href", /pdf/i);
});
