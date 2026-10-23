import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

const widths = [320, 390, 768, 1024] as const;

for (const fixtureId of [
  "cv-full",
  "project-gallery",
  "project-case-study",
  "project-bento",
  "project-asymmetric-closing",
  "writing-dated",
  "contact-hire",
  "booking-hire",
] as const) {
  test.describe(`fixture ${fixtureId}`, () => {
    for (const width of widths) {
      test(`renders at ${width}px without horizontal overflow`, async ({
        page,
      }) => {
        await page.setViewportSize({ height: 900, width: 1440 });
        await page.goto(`/__genui__/fixtures/${fixtureId}`);
        const container = page.locator("[data-fixture-id]");
        await container.evaluate((node, w) => {
          const el = node as HTMLElement;
          el.style.maxWidth = `${w}px`;
          el.style.width = "100%";
        }, width);
        await expect(container).toBeVisible();
        const overflow = await container.evaluate((node) => {
          const el = node as HTMLElement;
          return el.scrollWidth > el.clientWidth + 1;
        });
        expect(overflow).toBe(false);
      });
    }
  });
}

test("project-bento desktop geometry", async ({ page }) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/__genui__/fixtures/project-bento");
  const container = page.locator("[data-fixture-id]");
  await container.evaluate((node) => {
    const el = node as HTMLElement;
    el.style.maxWidth = "1152px";
    el.style.width = "100%";
  });
  await expect(container).toBeVisible();
  const links = page.locator('a[href^="/project/"]');
  await expect(links).toHaveCount(4);
  await expect(page.getByText("operate after launch")).toHaveCount(0);
  const lead = links.nth(0);
  const topRight = links.nth(1);
  const leadBox = await lead.boundingBox();
  const topRightBox = await topRight.boundingBox();
  expect(leadBox).not.toBeNull();
  expect(topRightBox).not.toBeNull();
  if (leadBox && topRightBox) {
    expect(leadBox.x).toBeLessThan(topRightBox.x);
    expect(leadBox.height).toBeGreaterThan(topRightBox.height * 1.2);
    expect(topRightBox.y).toBeLessThan(leadBox.y + leadBox.height);
  }
});
