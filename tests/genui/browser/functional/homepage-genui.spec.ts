import { expect, test } from "@playwright/test";
import { genuiFixtures } from "lib/genui/fixtures/registry";
import { GENUI_SEARCH_HISTORY_KEY } from "lib/genui/search-history";

test.describe.configure({ mode: "serial" });

test.describe("homepage GenUI shell", () => {
  test("prompt is full-width search without submit button", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("type", "text");
    await expect(page.getByText("Beta", { exact: true }).first()).toBeVisible();
    const form = page.locator("form").filter({ has: input });
    await expect(
      form.getByRole("button", { name: /submit|search/i })
    ).toHaveCount(0);
    await expect(input).toHaveCSS("width", /px/);
  });

  test("typing surfaces autosuggest instead of a blank field", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    await page.evaluate((key) => {
      window.localStorage.setItem(
        key,
        JSON.stringify(["your cv", "Show me your AI projects"])
      );
    }, GENUI_SEARCH_HISTORY_KEY);
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await input.focus();
    await input.fill("your cv");
    const listbox = page.getByRole("listbox", {
      name: "Suggestions",
    });
    await expect(listbox).toBeVisible();
    await expect(
      listbox
        .getByRole("group", { name: "Recent" })
        .getByRole("option", { name: "your cv" })
    ).toBeVisible();
    await expect(
      listbox.getByRole("option", { name: "Can I see your résumé?" })
    ).toBeVisible();
    const fieldChrome = page.locator("[data-slot=input-group]").first();
    await expect(fieldChrome).toBeVisible();
  });

  test("suggestions are keyboard and pointer activatable", async ({ page }) => {
    const fixture = genuiFixtures["project-bento"];
    await page.route("**/api/genui/compose", async (route) => {
      const events = [
        { requestId: "pw-suggest", sequence: 0, type: "start" },
        {
          envelope: fixture.envelope,
          requestId: "pw-suggest",
          sequence: 1,
          type: "complete",
        },
      ];
      await route.fulfill({
        body: `${events.map((event) => JSON.stringify(event)).join("\n")}\n`,
        contentType: "application/x-ndjson",
        status: 200,
      });
    });
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await input.focus();
    // The overlay opens under the cursor; move it so hover does not pick an option.
    await page.mouse.move(0, 0);
    await expect(page.getByRole("listbox")).toBeVisible();
    await input.press("ArrowDown");
    const firstOption = page
      .locator('[id^="site-genui-search-suggestions-option-"]')
      .first();
    await expect(input).toBeFocused();
    await expect(input).toHaveAttribute(
      "aria-activedescendant",
      (await firstOption.getAttribute("id")) ?? ""
    );
    await firstOption.click();
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 15_000,
    });
  });

  test("empty submit is a no-op", async ({ page }) => {
    let composeCalls = 0;
    await page.route("**/api/genui/compose", async (route) => {
      composeCalls += 1;
      await route.fulfill({
        body: '{"message":"Query is required."}',
        status: 400,
      });
    });
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await input.fill("   ");
    await input.press("Enter");
    await expect(page.getByText("Selected work")).toBeVisible();
    expect(composeCalls).toBe(0);
  });

  test("mocked AI project bento replaces homepage sections", async ({
    page,
  }) => {
    const fixture = genuiFixtures["project-bento"];
    await page.route("**/api/genui/compose", async (route) => {
      const events = [
        { requestId: "pw-bento", sequence: 0, type: "start" },
        {
          envelope: fixture.envelope,
          requestId: "pw-bento",
          sequence: 1,
          type: "complete",
        },
      ];
      await route.fulfill({
        body: `${events.map((event) => JSON.stringify(event)).join("\n")}\n`,
        contentType: "application/x-ndjson",
        status: 200,
      });
    });
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await input.fill("Show me your AI projects");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 15_000,
    });
    // Evidence leads; no eyebrow label or section heading above it.
    await expect(page.getByText("SELECTED AI WORK")).toHaveCount(0);
    await expect(page.getByText("operate after launch")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /View project/i })).toHaveCount(
      4
    );
    await input.fill("Can I see your CV?");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 15_000,
    });
  });

  test("mocked compose renders in the overlay", async ({ page }) => {
    const fixture = genuiFixtures["project-gallery"];
    await page.route("**/api/genui/compose", async (route) => {
      const events = [
        { requestId: "pw", sequence: 0, type: "start" },
        {
          envelope: fixture.envelope,
          requestId: "pw",
          sequence: 1,
          type: "complete",
        },
      ];
      await route.fulfill({
        body: `${events.map((event) => JSON.stringify(event)).join("\n")}\n`,
        contentType: "application/x-ndjson",
        status: 200,
      });
    });
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await input.fill("explore my work");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 15_000,
    });
    await expect(
      page.getByRole("button", { name: "Clear search" })
    ).toBeVisible();
  });

  test("live compose routes CV without mocking", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await input.fill("Can I see your CV?");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 20_000,
    });
    await expect(
      page.getByRole("link", { name: "View online" }).first()
    ).toBeVisible();
  });

  test("second submission replaces the prior generated experience", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("[data-home-search-trigger]").click();
    const input = page.locator("#site-search-dialog");
    await input.scrollIntoViewIfNeeded();
    await input.fill("How can I contact you?");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 20_000,
    });
    await input.fill("I want to book a meeting.");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 20_000,
    });
    await expect(page.getByText("Duration")).toBeVisible();
  });
});
