import { expect, test } from "@playwright/test";
import type { Page, Route } from "@playwright/test";
import { genuiFixtures } from "lib/genui/fixtures/registry";
import { GENUI_SEARCH_HISTORY_KEY } from "lib/genui/search-history";
import { searchCopy } from "lib/search/copy";

/**
 * The shared search contract (docs/specs/001-site-design-ux-search.md) on
 * both presentations: the inline homepage prompt and the dialog elsewhere.
 * Compose is always mocked, so no model is called.
 */

type Surface = "home" | "dialog";

const surfaces: { name: Surface; path: string }[] = [
  { name: "home", path: "/" },
  { name: "dialog", path: "/blog" },
];

const fieldId = (surface: Surface) =>
  surface === "home" ? "#site-search-dialog" : "#site-search-dialog";

const ndjson = (events: Record<string, unknown>[]) =>
  `${events.map((event) => JSON.stringify(event)).join("\n")}\n`;

const resultBody = () =>
  ndjson([
    { requestId: "pw", sequence: 0, type: "start" },
    {
      envelope: genuiFixtures["project-gallery"].envelope,
      requestId: "pw",
      sequence: 1,
      type: "complete",
    },
  ]);

const fulfillResult = (route: Route) =>
  route.fulfill({
    body: resultBody(),
    contentType: "application/x-ndjson",
    status: 200,
  });

const openField = async (page: Page, surface: Surface, path: string) => {
  await page.goto(path);
  await page
    .locator(
      surface === "dialog"
        ? "[data-site-search-trigger]"
        : "[data-home-search-trigger]"
    )
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const input = page.locator(fieldId(surface));
  await input.scrollIntoViewIfNeeded();
  await input.focus();
  return input;
};

const status = (page: Page) =>
  page.locator("[data-search-status] [role=status]");

for (const { name: surface, path } of surfaces) {
  test.describe(`search contract on ${surface}`, () => {
    test("field is a text combobox named with beta", async ({ page }) => {
      const input = await openField(page, surface, path);
      await expect(input).toHaveAttribute("type", "text");
      await expect(input).toHaveAttribute("role", "combobox");
      await expect(
        page.getByRole("combobox", { name: searchCopy.accessibleName })
      ).toBeVisible();
      await expect(page.getByLabel("Beta", { exact: true })).toHaveCount(0);
    });

    test("suggestions are grouped and keep focus in the field", async ({
      page,
    }) => {
      await page.goto(path);
      await page.evaluate(
        (key) => localStorage.setItem(key, JSON.stringify(["your cv"])),
        GENUI_SEARCH_HISTORY_KEY
      );
      const input = await openField(page, surface, path);
      const listbox = page.getByRole("listbox", {
        name: searchCopy.suggestions,
      });
      await expect(listbox).toBeVisible();
      await expect(
        listbox.getByRole("group", { name: searchCopy.recent })
      ).toBeVisible();
      await expect(
        listbox.getByRole("group", { name: searchCopy.examples })
      ).toBeVisible();
      await input.press("ArrowDown");
      await expect(input).toBeFocused();
      const active = await input.getAttribute("aria-activedescendant");
      expect(active).toBeTruthy();
      await expect(page.locator(`[id="${active}"]`)).toHaveAttribute(
        "aria-selected",
        "true"
      );
    });

    test("Escape closes suggestions first and never clears text", async ({
      page,
    }) => {
      const input = await openField(page, surface, path);
      await input.fill("agentic");
      const listbox = page.getByRole("listbox", {
        name: searchCopy.suggestions,
      });
      await expect(listbox).toBeVisible();
      await input.press("Escape");
      await expect(listbox).toHaveCount(0);
      await expect(input).toHaveValue("agentic");
      await expect(page.getByRole("dialog")).toBeVisible();
      await input.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(
        page.locator(
          surface === "dialog"
            ? "[data-site-search-trigger]"
            : "[data-home-search-trigger]"
        )
      ).toBeFocused();
    });

    test("result announces once and stores Recent; Clear search refocuses", async ({
      page,
    }) => {
      await page.route("**/api/genui/compose", fulfillResult);
      const input = await openField(page, surface, path);
      await input.fill("explore my work");
      await input.press("Enter");
      await expect(status(page)).toHaveText(searchCopy.resultReady);
      const history = await page.evaluate(
        (key) => localStorage.getItem(key),
        GENUI_SEARCH_HISTORY_KEY
      );
      expect(history).toContain("explore my work");
      // Emptying the field does not reset results.
      await input.fill("");
      await expect(status(page)).toHaveText(searchCopy.resultReady);
      await page.getByRole("button", { name: searchCopy.clear }).click();
      await expect(input).toBeFocused();
      await expect(input).toHaveValue("");
      await expect(page.locator("[data-search-status]")).toHaveCount(0);
    });

    test("composing line shows at once; shimmer only after 300ms", async ({
      page,
    }) => {
      const gate = Promise.withResolvers<boolean>();
      await page.route("**/api/genui/compose", async (route) => {
        await gate.promise;
        await fulfillResult(route);
      });
      const input = await openField(page, surface, path);
      await input.fill("explore my work");
      await input.press("Enter");
      const line = page.locator("[data-search-composing]");
      await expect(line).toBeVisible({ timeout: 100 });
      await expect(line.locator(".text-shimmer")).toHaveCount(0);
      await expect(status(page)).toHaveText(searchCopy.composing);
      await expect(page.locator("[data-search-status]")).toHaveAttribute(
        "aria-busy",
        "true"
      );
      await expect(line.locator(".text-shimmer")).toHaveCount(1);
      gate.resolve(true);
      await expect(status(page)).toHaveText(searchCopy.resultReady);
    });

    test("empty state never announces ready and offers three examples", async ({
      page,
    }) => {
      await page.route("**/api/genui/compose", (route) =>
        route.fulfill({
          body: ndjson([
            { requestId: "pw", sequence: 0, type: "start" },
            {
              message: "No matching experience.",
              requestId: "pw",
              sequence: 1,
              type: "empty",
            },
          ]),
          contentType: "application/x-ndjson",
          status: 200,
        })
      );
      const input = await openField(page, surface, path);
      await input.fill("best pizza in Denver");
      await input.press("Enter");
      const empty = page.locator("[data-search-state=empty]");
      await expect(empty).toContainText(searchCopy.empty);
      await expect(status(page)).toHaveText(searchCopy.empty);
      await expect(status(page)).not.toHaveText(searchCopy.resultReady);
      await expect(empty.getByRole("listitem").getByRole("button")).toHaveCount(
        3
      );
      const history = await page.evaluate(
        (key) => localStorage.getItem(key),
        GENUI_SEARCH_HISTORY_KEY
      );
      expect(history ?? "").not.toContain("pizza");
    });

    test("blocked compose shows the shared error block; Try again re-runs the submitted query", async ({
      page,
    }) => {
      const bodies: string[] = [];
      await page.route("**/api/genui/compose", (route) => {
        bodies.push(route.request().postDataJSON().query as string);
        return route.abort();
      });
      const input = await openField(page, surface, path);
      await input.fill("show me web3 work");
      await input.press("Enter");
      const error = page.locator("[data-search-state=error]");
      await expect(error).toContainText(searchCopy.errorFailed);
      await expect(status(page)).toHaveText(searchCopy.errorFailed);
      await expect(
        error.getByRole("heading", { name: searchCopy.keywordMatches })
      ).toBeVisible();
      await expect(
        error.getByRole("link", { name: /web3/i }).first()
      ).toBeVisible();
      for (const href of ["/work", "/cv", "/contact"]) {
        await expect(error.locator(`a[href="${href}"]`)).toHaveCount(1);
      }
      await input.fill("an edited query that was never submitted");
      await error.getByRole("button", { name: searchCopy.retry }).click();
      await expect(input).toBeFocused();
      await expect.poll(() => bodies.length).toBe(2);
      expect(bodies[1]).toBe("show me web3 work");
      const history = await page.evaluate(
        (key) => localStorage.getItem(key),
        GENUI_SEARCH_HISTORY_KEY
      );
      expect(history ?? "").not.toContain("web3");
    });

    test("429 shows the server message", async ({ page }) => {
      await page.route("**/api/genui/compose", (route) =>
        route.fulfill({
          body: JSON.stringify({ message: "Daily search limit reached." }),
          contentType: "application/json",
          status: 429,
        })
      );
      const input = await openField(page, surface, path);
      await input.fill("explore my work");
      await input.press("Enter");
      await expect(page.locator("[data-search-state=error]")).toContainText(
        "Daily search limit reached."
      );
      await expect(status(page)).toHaveText("Daily search limit reached.");
    });

    test("the server deadline shows the timed-out copy", async ({ page }) => {
      await page.route("**/api/genui/compose", (route) =>
        route.fulfill({
          body: ndjson([
            { requestId: "pw", sequence: 0, type: "start" },
            {
              code: "timed_out",
              message: "Composition timed out.",
              requestId: "pw",
              sequence: 0,
              type: "error",
            },
          ]),
          contentType: "application/x-ndjson",
          status: 200,
        })
      );
      const input = await openField(page, surface, path);
      await input.fill("explore my work");
      await input.press("Enter");
      await expect(page.locator("[data-search-state=error]")).toContainText(
        searchCopy.errorTimedOut
      );
      await expect(status(page)).toHaveText(searchCopy.errorTimedOut);
    });
  });
}

test("Cmd/Ctrl+K toggles the dialog closed from inside its field", async ({
  page,
}) => {
  await page.goto("/blog");
  await page.locator("body").press("ControlOrMeta+k");
  const input = page.locator("#site-search-dialog");
  await expect(input).toBeFocused();
  await input.fill("kept");
  await input.press("ControlOrMeta+k");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("the homepage trigger shows the ⌘K hint; the overlay does not", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.locator("[data-home-search-trigger]");
  await expect(trigger.locator("kbd").first()).toBeVisible();
  await trigger.click();
  await expect(page.locator("[data-search-shortcut-hint]")).toHaveCount(0);
});

const dialogPanel = (page: Page) => page.locator("[data-slot=dialog-content]");
const dialogOverlay = (page: Page) =>
  page.locator("[data-slot=dialog-overlay]");

const openDialog = async (page: Page) => {
  await page.goto("/blog");
  await page.getByRole("button", { name: searchCopy.accessibleName }).click();
  await expect(page.locator("#site-search-dialog")).toBeFocused();
  // Measure the settled panel, not a frame of its open animation.
  await dialogPanel(page).evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished))
  );
};

const runningOpenCloseKeyframes = (page: Page) =>
  page.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => animation instanceof CSSAnimation)
      .map((animation) => (animation as CSSAnimation).animationName)
      .filter((name) => name === "enter" || name === "exit")
  );

test.describe("search dialog surface", () => {
  test("desktop panel is full screen, solid, with no glass", async ({
    page,
  }) => {
    await openDialog(page);
    const box = await dialogPanel(page).boundingBox();
    const viewport = page.viewportSize();
    expect(box).toMatchObject({
      height: viewport?.height,
      width: viewport?.width,
      x: 0,
      y: 0,
    });
    const panelStyle = await dialogPanel(page).evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        background: style.backgroundColor,
        radius: style.borderTopLeftRadius,
      };
    });
    expect(panelStyle.radius).toBe("0px");
    expect(panelStyle.background).toBe("rgb(0, 0, 0)");
    const overlayStyle = await dialogOverlay(page).evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        background: style.backgroundColor,
        filter: style.backdropFilter,
      };
    });
    expect(["none", ""]).toContain(overlayStyle.filter);
    expect(overlayStyle.background).toMatch(/0\.6\)$/);
  });

  test("suggestions stay inside the panel", async ({ page }) => {
    await openDialog(page);
    const listbox = page.getByRole("listbox", { name: searchCopy.suggestions });
    await expect(listbox).toBeVisible();
    const list = await listbox.boundingBox();
    const box = await dialogPanel(page).boundingBox();
    expect((list?.y ?? 0) + (list?.height ?? 0)).toBeLessThanOrEqual(
      (box?.y ?? 0) + (box?.height ?? 0) + 1
    );
  });

  test("reduced motion runs no keyframes on open or close", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openDialog(page);
    expect(await runningOpenCloseKeyframes(page)).toEqual([]);
    // The first Escape closes the open suggestions, the second the dialog.
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    expect(await runningOpenCloseKeyframes(page)).toEqual([]);
    await expect(dialogPanel(page)).toHaveCount(0);
  });

  test("with motion, the panel fades in over 200ms", async ({ page }) => {
    await openDialog(page);
    const style = await dialogPanel(page).evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        duration: computed.animationDuration,
        easing: computed.animationTimingFunction,
      };
    });
    expect(style.duration).toBe("0.2s");
    expect(style.easing).toBe("cubic-bezier(0.23, 1, 0.32, 1)");
  });
});

test.describe("search surfaces at 390px", () => {
  test.use({ viewport: { height: 844, width: 390 } });

  test("the dialog is full height with a sticky field", async ({ page }) => {
    await openDialog(page);
    const box = await dialogPanel(page).boundingBox();
    expect(box).toMatchObject({ height: 844, width: 390, x: 0, y: 0 });
    const position = await page
      .locator("[data-search-field-bar]")
      .evaluate((bar) => getComputedStyle(bar).position);
    expect(position).toBe("sticky");
  });

  test("the homepage field shows at least 20 characters", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.fill("abcdefghijklmnopqrst");
    const fits = await input.evaluate(
      (element: HTMLInputElement) => element.scrollWidth <= element.clientWidth
    );
    expect(fits).toBe(true);
    await input.fill("");
    await expect(page.locator("[data-search-shortcut-hint]")).toBeHidden();
  });
});
