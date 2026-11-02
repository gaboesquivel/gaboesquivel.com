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
  surface === "home" ? "#homepage-genui-search" : "#site-search-dialog";

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
  if (surface === "dialog") {
    await page.getByRole("button", { name: searchCopy.accessibleName }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  }
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
      if (surface === "dialog") {
        await expect(page.getByRole("dialog")).toBeVisible();
        await input.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await expect(
          page.getByRole("button", { name: searchCopy.accessibleName })
        ).toBeFocused();
      } else {
        await input.press("Escape");
        await expect(input).toHaveValue("agentic");
        await expect(input).toBeFocused();
      }
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
      const gate = Promise.withResolvers<undefined>();
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
      gate.resolve();
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

test("homepage ⌘K hint shows only when idle and empty", async ({ page }) => {
  await page.goto("/");
  const hint = page.locator("[data-search-shortcut-hint]");
  await expect(hint).toBeVisible();
  const input = page.locator("#homepage-genui-search");
  await input.fill("a");
  await expect(hint).toHaveCount(0);
});
