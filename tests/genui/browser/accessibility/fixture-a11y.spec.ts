import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("cv fixture has no serious axe violations", async ({ page }) => {
  await page.goto("/__genui__/fixtures/cv-full");
  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();
  const serious = results.violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical"
  );
  expect(serious).toEqual([]);
});
