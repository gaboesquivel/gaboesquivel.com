import { expect, test } from "@playwright/test";

const widths = [360, 640, 768, 1024, 1440, 2000] as const;

for (const fixtureId of [
  "project-asymmetric-closing",
  "project-asymmetric-closing-eight",
] as const) {
  for (const width of widths) {
    test(`${fixtureId} fills every row at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ height: 900, width });
      await page.goto(`/__genui__/fixtures/${fixtureId}`);
      await expect(page.locator("[data-showcase-card]").first()).toBeVisible();

      // Cards rise in with a stagger; measure once they have settled.
      await page.evaluate(() =>
        Promise.all(document.getAnimations().map((a) => a.finished))
      );

      const layout = await page.evaluate(() => {
        const root = document.querySelector(
          ".\\@container\\/project-showcase"
        ) as HTMLElement;
        const box = root.getBoundingClientRect();
        const rects = [
          ...document.querySelectorAll("[data-showcase-card]"),
        ].map((card) => card.getBoundingClientRect());
        const rows = new Map<number, DOMRect[]>();
        for (const rect of rects) {
          const key = Math.round(rect.top / 8);
          rows.set(key, [...(rows.get(key) ?? []), rect]);
        }
        return {
          overflow:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
          rows: [...rows.values()].map((row) => ({
            left: Math.min(...row.map((r) => r.left)) - box.left,
            right: box.right - Math.max(...row.map((r) => r.right)),
          })),
        };
      });

      expect(layout.overflow, JSON.stringify(layout.rows)).toBeLessThanOrEqual(
        0
      );
      for (const row of layout.rows) {
        expect(Math.abs(row.left)).toBeLessThan(2);
        expect(Math.abs(row.right)).toBeLessThan(2);
      }
    });
  }
}
