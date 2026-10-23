import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { workTypeRoutes } from "lib/work-types";

const WORK_ROUTES = workTypeRoutes;

const VIEWPORTS = [
  { height: 900, width: 1440 },
  { height: 768, width: 1024 },
  { height: 1024, width: 768 },
  { height: 844, width: 390 },
  { height: 812, width: 320 },
] as const;

const geometryTolerance = 1;

const workFilterLink = (page: Page, label: string) =>
  page
    .getByRole("navigation", { name: "Work types" })
    .getByRole("link", { name: label, exact: true });

interface Box {
  height: number;
  width: number;
  x: number;
  y: number;
}

const readBox = async (page: Page, selector: string): Promise<Box | null> => {
  const locator = page.locator(selector).first();
  if ((await locator.count()) === 0) return null;
  const box = await locator.boundingBox();
  if (!box) return null;
  return {
    height: box.height,
    width: box.width,
    x: box.x,
    y: box.y,
  };
};

const waitForWorkStable = async (page: Page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("[data-work-hero]").waitFor({ state: "visible" });
};

const collectWorkGeometry = async (page: Page) => {
  const hero = await readBox(page, "[data-work-hero]");
  const h1 = await readBox(page, "[data-work-hero] h1");
  const lede = await readBox(page, "[data-work-hero] .work-hero-lede");
  const filter = await readBox(page, "[data-work-filter]");
  const results = await readBox(page, "[data-work-results]");
  return { filter, hero, h1, lede, results };
};

const boxesMatch = (a: Box, b: Box, keys: (keyof Box)[]) => {
  for (const key of keys) {
    expect(Math.abs(a[key] - b[key])).toBeLessThanOrEqual(geometryTolerance);
  }
};

test.describe.configure({ mode: "serial" });

test.describe("Work index navigation", () => {
  for (const viewport of VIEWPORTS) {
    test(`identical header geometry at ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      const snapshots: Awaited<ReturnType<typeof collectWorkGeometry>>[] = [];

      for (const route of WORK_ROUTES) {
        await page.goto(route);
        await waitForWorkStable(page);
        snapshots.push(await collectWorkGeometry(page));
      }

      const reference = snapshots[0];
      expect(reference.hero).not.toBeNull();
      expect(reference.filter).not.toBeNull();

      for (let index = 1; index < snapshots.length; index += 1) {
        const current = snapshots[index];
        expect(current.hero).not.toBeNull();
        expect(current.filter).not.toBeNull();
        if (
          !reference.hero ||
          !current.hero ||
          !reference.filter ||
          !current.filter
        )
          continue;
        boxesMatch(reference.hero, current.hero, ["height", "y"]);
        boxesMatch(reference.filter, current.filter, [
          "height",
          "width",
          "y",
          "x",
        ]);
        if (reference.h1 && current.h1) {
          boxesMatch(reference.h1, current.h1, ["height", "y"]);
        }
        if (reference.lede && current.lede) {
          boxesMatch(reference.lede, current.lede, ["height", "y"]);
        }
      }
    });
  }

  test("editorial line count and no horizontal overflow at 320px", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 812, width: 320 });
    for (const route of WORK_ROUTES) {
      await page.goto(route);
      await waitForWorkStable(page);
      await expect(page.locator("[data-work-hero] h1")).toHaveCount(1);
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

      const lineMetrics = await page.evaluate(() => {
        const lede = document.querySelector(".work-hero-lede");
        const h1 = document.querySelector(".work-hero-title");
        if (!lede || !h1) return null;
        const ledeLines = [...lede.querySelectorAll("span[aria-hidden] span")]
          .filter((node) => node.checkVisibility())
          .map((line) => {
            const rect = line.getBoundingClientRect();
            return { bottom: rect.bottom, height: rect.height, top: rect.top };
          });
        const h1Rect = h1.getBoundingClientRect();
        return { h1Height: h1Rect.height, ledeLines };
      });
      expect(lineMetrics?.ledeLines).toHaveLength(2);
      for (const line of lineMetrics?.ledeLines ?? []) {
        expect(line.height).toBeGreaterThan(0);
      }
    }
  });

  test("sticky Work filter and scrolling global navbar", async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/work/all");
    await waitForWorkStable(page);
    await page.evaluate(() => window.scrollBy(0, 2000));
    await page.waitForFunction(() => window.scrollY > 400);
    const filterBox = await readBox(page, "[data-work-filter]");
    expect(filterBox?.y).toBeLessThanOrEqual(geometryTolerance);
    const navBox = await readBox(
      page,
      'header nav[aria-label="Primary navigation"]'
    );
    expect(navBox).not.toBeNull();
    if (navBox) {
      expect(navBox.y + navBox.height).toBeLessThanOrEqual(geometryTolerance);
    }

    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/work/all");
    await waitForWorkStable(page);
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForFunction(() => window.scrollY > 300);
    const mobileFilter = await readBox(page, "[data-work-filter]");
    expect(mobileFilter?.y).toBeLessThanOrEqual(geometryTolerance);
  });

  test("filter navigation, scroll to top, and history", async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/work/all");
    await waitForWorkStable(page);
    await page.locator("[data-work-results] a").last().scrollIntoViewIfNeeded();
    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore).toBeGreaterThan(100);

    const beforeGeometry = await collectWorkGeometry(page);
    await workFilterLink(page, "ai").click();
    await expect(page).toHaveURL(/\/work\/ai$/);
    await expect(workFilterLink(page, "ai")).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(
      page
        .getByRole("navigation", { name: "Work types" })
        .locator('[aria-current="page"]')
    ).toHaveCount(1);

    await page.waitForFunction(() => window.scrollY <= 2, undefined, {
      timeout: 10_000,
    });

    const afterGeometry = await collectWorkGeometry(page);
    if (beforeGeometry.filter && afterGeometry.filter) {
      boxesMatch(beforeGeometry.filter, afterGeometry.filter, [
        "height",
        "width",
      ]);
    }

    const sequence = ["web3", "contract", "featured", "all"] as const;
    for (const label of sequence) {
      await workFilterLink(page, label).click();
      await page.waitForFunction(() => window.scrollY <= 2, undefined, {
        timeout: 10_000,
      });
    }

    await workFilterLink(page, "contract").click();
    await expect(page).toHaveURL(/\/work\/contract$/);
    await workFilterLink(page, "ai").click();
    await expect(page).toHaveURL(/\/work\/ai$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/work\/contract$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/work\/ai$/);
  });

  test("keyboard navigation and axe on Work chrome", async ({ page }) => {
    await page.goto("/work");
    await waitForWorkStable(page);
    await page.keyboard.press("Tab");
    const workNav = page.getByRole("navigation", { name: "Work types" });
    await workNav.getByRole("link", { name: "oss", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/work\/oss$/);

    await page.goto("/work");
    await waitForWorkStable(page);
    const results = await new AxeBuilder({ page })
      .include("[data-work-shell]")
      .disableRules(["color-contrast"])
      .analyze();
    const serious = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical"
    );
    expect(serious).toEqual([]);
  });

  test("reduced motion uses instant scroll and zero indicator duration", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/all");
    await waitForWorkStable(page);
    await page.locator("[data-work-results] a").last().scrollIntoViewIfNeeded();
    await workFilterLink(page, "ai").click();
    await expect(page).toHaveURL(/\/work\/ai$/);
    const reducedIndicatorDuration = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (
              rule instanceof CSSMediaRule &&
              rule.conditionText.includes("reduce")
            ) {
              for (const inner of rule.cssRules) {
                if (
                  inner instanceof CSSStyleRule &&
                  inner.cssText.includes("work-filter-indicator") &&
                  inner.cssText.includes("animation-duration")
                ) {
                  return inner.style.animationDuration;
                }
              }
            }
          }
        } catch {
          continue;
        }
      }
      return "";
    });
    expect(reducedIndicatorDuration).toBe("0s");
  });

  test("visual baselines for featured, ai, and all", async ({ page }) => {
    const shots = [
      { route: "/work", name: "work-featured-desktop.png" },
      { route: "/work/ai", name: "work-ai-desktop.png" },
      { route: "/work/all", name: "work-all-desktop.png" },
    ];
    await page.setViewportSize({ height: 900, width: 1440 });
    for (const shot of shots) {
      await page.goto(shot.route);
      await waitForWorkStable(page);
      await expect(page).toHaveScreenshot(shot.name, {
        fullPage: false,
        mask: [page.locator("[data-work-results]")],
      });
    }

    await page.setViewportSize({ height: 844, width: 390 });
    for (const shot of shots) {
      await page.goto(shot.route);
      await waitForWorkStable(page);
      await expect(page).toHaveScreenshot(`mobile-${shot.name}`, {
        fullPage: false,
        mask: [page.locator("[data-work-results]")],
      });
    }
  });

  test("navigation works when View Transitions API is unavailable", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      // @ts-expect-error test shim
      delete document.startViewTransition;
    });
    await page.goto("/work");
    await waitForWorkStable(page);
    await workFilterLink(page, "lead").click();
    await expect(page).toHaveURL(/\/work\/lead$/);
    await expect(workFilterLink(page, "lead")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
