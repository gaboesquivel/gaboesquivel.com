import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

const widths = [320, 390, 768, 1024] as const;

for (const fixtureId of [
  "cv-full",
  "project-gallery",
  "project-case-study",
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
