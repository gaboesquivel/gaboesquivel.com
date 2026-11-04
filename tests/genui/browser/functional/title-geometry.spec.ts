import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * Every page title shares one scale and one top edge, and the opening word
 * "Software" (home and /work) stays in place through a navigation.
 */

const ROUTES = [
  "/",
  "/work",
  "/work/ai",
  "/ai",
  "/web3",
  "/bio",
  "/blog",
  "/contact",
  "/about",
  "/explore",
  "/tech",
  "/privacy",
  "/docs",
  "/blog/2025-11-1099-contracting",
  "/project/legal-agent",
] as const;

const VIEWPORTS = [
  { height: 900, width: 1440 },
  { height: 1024, width: 768 },
  { height: 844, width: 390 },
] as const;

const readTitle = (page: Page) =>
  page.evaluate(() => {
    const h1 = document.querySelector("main h1");
    if (!h1) return null;
    const box = h1.getBoundingClientRect();
    const style = getComputedStyle(h1);
    return {
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      left: Math.round(box.left),
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
      top: Math.round(box.top + window.scrollY),
    };
  });

test.describe("title geometry", () => {
  for (const viewport of VIEWPORTS) {
    test(`all page titles share size, line height and top edge at ${viewport.width}px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      const titles: Record<string, Awaited<ReturnType<typeof readTitle>>> = {};
      for (const route of ROUTES) {
        await page.goto(route);
        titles[route] = await readTitle(page);
      }
      const reference = titles["/work"];
      expect(reference).not.toBeNull();
      for (const route of ROUTES) {
        expect(titles[route], route).toMatchObject({
          fontSize: reference?.fontSize,
          fontWeight: reference?.fontWeight,
          left: reference?.left,
          letterSpacing: reference?.letterSpacing,
          lineHeight: reference?.lineHeight,
          top: reference?.top,
        });
      }
    });
  }
});

/** The lead word is a stable box before and after navigating home <-> work. */
const readLead = (page: Page) =>
  page.evaluate(() => {
    const word = document.querySelector("main h1 span");
    const box = word?.getBoundingClientRect();
    return box
      ? {
          left: Math.round(box.left),
          top: Math.round(box.top + window.scrollY),
          width: Math.round(box.width),
        }
      : null;
  });

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test.describe(`pinned title word (${reducedMotion})`, () => {
    test.use({ reducedMotion });

    test("Software does not move, resize or fade between / and /work", async ({
      page,
    }) => {
      await page.goto("/");
      const home = await readLead(page);
      expect(home).not.toBeNull();

      // Watch every frame of the navigation: the view transition may run,
      // but nothing may animate the shared word.
      await page.evaluate(() => {
        const seen = { lead: 0, root: 0 };
        (window as unknown as { __vt: typeof seen }).__vt = seen;
        const tick = () => {
          for (const animation of document.getAnimations()) {
            const pseudo =
              (animation.effect as KeyframeEffect | null)?.pseudoElement ?? "";
            if (pseudo.includes("title-lead")) seen.lead += 1;
            if (pseudo.includes("(root)")) seen.root += 1;
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });

      await page
        .getByRole("link", { name: "work", exact: true })
        .first()
        .click();
      await expect(page).toHaveURL(/\/work$/);
      await page.waitForTimeout(600);
      const work = await readLead(page);
      expect(work).toEqual(home);

      const seen = await page.evaluate(
        () =>
          (window as unknown as { __vt: { lead: number; root: number } }).__vt
      );
      expect(seen.lead).toBe(0);
      if (reducedMotion === "no-preference") {
        // Sanity: the transition really ran, so "no lead animation" is meaningful.
        expect(seen.root).toBeGreaterThan(0);
      }

      await page
        .getByRole("link", { name: "gabo", exact: true })
        .first()
        .click();
      await expect(page).toHaveURL(/\/$/);
      await page.waitForTimeout(600);
      expect(await readLead(page)).toEqual(home);
    });
  });
}
