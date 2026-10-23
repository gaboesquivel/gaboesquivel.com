import { expect, test } from "@playwright/test";
import { genuiFixtures } from "lib/genui/fixtures/registry";

test.describe.configure({ mode: "serial" });

test.describe("homepage GenUI shell", () => {
  test("prompt is full-width search without submit button", async ({
    page,
  }) => {
    await page.goto("/");
    const input = page.locator("#homepage-genui-search");
    await input.scrollIntoViewIfNeeded();
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("type", "search");
    await expect(page.getByLabel("Beta")).toBeVisible();
    const form = page.locator("form").filter({ has: input });
    await expect(
      form.getByRole("button", { name: /submit|search/i })
    ).toHaveCount(0);
    await expect(input).toHaveCSS("width", /px/);
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
    const input = page.locator("#homepage-genui-search");
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
    const input = page.locator("#homepage-genui-search");
    await input.scrollIntoViewIfNeeded();
    await input.fill("Show me your AI projects");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 15_000,
    });
    await expect(page.getByText("SELECTED AI WORK")).toBeVisible();
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

  test("mocked compose replaces homepage sections", async ({ page }) => {
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
    const input = page.locator("#homepage-genui-search");
    await input.scrollIntoViewIfNeeded();
    await input.fill("explore my work");
    await input.press("Enter");
    await expect(page.getByRole("status")).toContainText("Results ready.", {
      timeout: 15_000,
    });
    await expect(page.getByText("Selected work")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Back to homepage" })
    ).toBeVisible();
  });

  test("live compose routes CV without mocking", async ({ page }) => {
    await page.goto("/");
    const input = page.locator("#homepage-genui-search");
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
    const input = page.locator("#homepage-genui-search");
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
