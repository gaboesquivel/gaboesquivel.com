import { expect, test } from "@playwright/test";
import type { Page, Route } from "@playwright/test";
import { genuiFixtures } from "lib/genui/fixtures/registry";
import {
  GENUI_LAB_CAPABILITY_PATH,
  labSlotStarts,
} from "lib/genui/fixtures/write-scenarios";

/**
 * GenUI write flows in the fixture lab. Writes never leave the browser: the
 * scripted scenarios answer in-page, and `fetch` posts to a lab-only path that
 * these tests route (abort, 502, or a canned JSON receipt).
 */

const booking = (page: Page, scenario: string) =>
  page.goto(`/__genui__/fixtures/booking-hire?writes=${scenario}`);

const contact = (page: Page, scenario: string) =>
  page.goto(`/__genui__/fixtures/contact-hire?writes=${scenario}`);

const startSelect = (page: Page) => page.locator("#genui-booking-start");

const pickFirstSlotAndReview = async (page: Page) => {
  const first = startSelect(page).locator("option").nth(1);
  await expect(first).toBeAttached();
  await startSelect(page).selectOption({
    value: (await first.getAttribute("value")) ?? "",
  });
  await page.getByLabel("Reviewed details").check();
};

const labCalls = (page: Page) =>
  page.evaluate(() => window.__genuiLabCalls ?? []);

test.describe("availability", () => {
  test("shows loading while times are checked", async ({ page }) => {
    await booking(page, "availability-loading");
    await expect(page.getByText("Checking open times…")).toBeVisible();
    await expect(startSelect(page)).toBeDisabled();
  });

  test("shows an error with retry, never a silent empty list", async ({
    page,
  }) => {
    await booking(page, "availability-error");
    const alert = page.locator("[data-genui-write-error]");
    await expect(alert).toContainText("Could not load open times");
    await expect(startSelect(page)).toBeDisabled();
    await alert.getByRole("button", { name: "Try again" }).click();
    await expect(alert).toBeVisible();
    const lists = (await labCalls(page)).filter(
      (call) => call.operation === "list_availability"
    );
    expect(lists.length).toBeGreaterThanOrEqual(2);
  });

  test("lists the next three days, then More times", async ({ page }) => {
    await booking(page, "ready");
    await expect(startSelect(page).locator("optgroup")).toHaveCount(3);
    await page.getByRole("button", { name: "More times" }).click();
    await expect(startSelect(page).locator("optgroup")).toHaveCount(5);
    await expect(page.getByRole("button", { name: "More times" })).toHaveCount(
      0
    );
  });

  test("slot labels and copy name the same zone; no context label", async ({
    page,
  }) => {
    await booking(page, "ready");
    const zoneLine = page.getByText(/^Times in /);
    await expect(zoneLine).toBeVisible();
    const short = (await zoneLine.textContent())?.match(/\(([^)]+)\)$/)?.[1];
    expect(short).toBeTruthy();
    const label = await startSelect(page)
      .locator("option")
      .nth(1)
      .textContent();
    expect(label?.endsWith(` ${short}`)).toBe(true);
    await expect(page.getByText("US Mountain Time")).toHaveCount(0);
    await expect(page.getByText(/Context:/)).toHaveCount(0);
  });
});

test.describe("booking writes", () => {
  test("pending locks the form", async ({ page }) => {
    await booking(page, "pending");
    await pickFirstSlotAndReview(page);
    await page.getByRole("button", { name: "Confirm booking" }).click();
    await expect(page.getByRole("button", { name: "Booking…" })).toBeDisabled();
    await expect(page.getByLabel("Name")).toBeDisabled();
  });

  test("network failure releases the button; retry keeps the identity and settles", async ({
    page,
  }) => {
    await booking(page, "failure");
    await pickFirstSlotAndReview(page);
    const confirm = page.getByRole("button", { name: "Confirm booking" });
    await confirm.click();
    const alert = page.locator("[data-genui-write-error]");
    await expect(alert).toContainText("Could not reach the server");
    await expect(alert).toHaveAttribute("role", "alert");
    await expect(confirm).toBeEnabled();
    await alert.getByRole("button", { name: "Try again" }).click();
    const receipt = page.locator("[data-genui-receipt]");
    await expect(receipt).toContainText("Call booked");
    await expect(receipt).toBeFocused();
    await expect(receipt).not.toContainText("evt_lab_internal");
    await expect(
      page.getByRole("button", { name: /Confirm booking/ })
    ).toHaveCount(0);
    const writes = (await labCalls(page)).filter(
      (call) => call.operation === "book_call"
    );
    expect(writes).toHaveLength(2);
    expect(writes[0].input.retryIdentity).toBe(writes[1].input.retryIdentity);
  });

  test("fetch: abort and non-JSON 502 show retry; success books once", async ({
    page,
  }) => {
    const bodies: { input: Record<string, unknown>; operation: string }[] = [];
    let mode: "abort" | "502" | "ok" = "abort";
    await page.route(`**${GENUI_LAB_CAPABILITY_PATH}`, async (route: Route) => {
      const body = route.request().postDataJSON() as (typeof bodies)[number];
      if (body.operation === "list_availability") {
        await route.fulfill({
          json: { data: { starts: labSlotStarts() }, status: "ok" },
        });
        return;
      }
      bodies.push(body);
      if (mode === "abort") {
        await route.abort("failed");
        return;
      }
      if (mode === "502") {
        await route.fulfill({ body: "<html>Bad gateway</html>", status: 502 });
        return;
      }
      await route.fulfill({
        json: { data: { eventId: "evt_internal" }, status: "confirmed" },
      });
    });
    await booking(page, "fetch");
    await pickFirstSlotAndReview(page);
    const confirm = page.getByRole("button", { name: "Confirm booking" });
    const alert = page.locator("[data-genui-write-error]");

    await confirm.click();
    await expect(alert).toContainText("Could not reach the server");
    await expect(confirm).toBeEnabled();

    mode = "502";
    await alert.getByRole("button", { name: "Try again" }).click();
    await expect(alert).toContainText("Something went wrong on our side");
    await expect(confirm).toBeEnabled();

    mode = "ok";
    await confirm.click();
    const receipt = page.locator("[data-genui-receipt]");
    await expect(receipt).toContainText("Call booked");
    await expect(receipt).not.toContainText("evt_internal");
    await expect(confirm).toHaveCount(0);

    expect(bodies).toHaveLength(3);
    const identities = new Set(bodies.map((body) => body.input.retryIdentity));
    expect(identities.size).toBe(1);
  });
});

test.describe("contact writes", () => {
  test("a double click while sending posts once; receipt replaces the form", async ({
    page,
  }) => {
    const bodies: unknown[] = [];
    const { promise: held, resolve: release } = Promise.withResolvers<null>();
    await page.route(`**${GENUI_LAB_CAPABILITY_PATH}`, async (route: Route) => {
      bodies.push(route.request().postDataJSON());
      await held;
      await route.fulfill({
        json: { data: { receiptId: "rcpt_internal" }, status: "confirmed" },
      });
    });
    await contact(page, "fetch");
    await expect(page.getByText(/Context:/)).toHaveCount(0);
    const send = page.getByRole("button", { name: "Send email" });
    await send.dblclick();
    await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
    release(null);
    const receipt = page.locator("[data-genui-receipt]");
    await expect(receipt).toContainText("Note sent");
    await expect(receipt).not.toContainText("rcpt_internal");
    await expect(page.getByRole("button", { name: /Send email/ })).toHaveCount(
      0
    );
    expect(bodies).toHaveLength(1);
  });

  test("network failure on send releases the button", async ({ page }) => {
    await page.route(`**${GENUI_LAB_CAPABILITY_PATH}`, (route) =>
      route.abort("failed")
    );
    await contact(page, "fetch");
    const send = page.getByRole("button", { name: "Send email" });
    await send.click();
    await expect(page.locator("[data-genui-write-error]")).toContainText(
      "Could not reach the server"
    );
    await expect(send).toBeEnabled();
  });
});

test.describe("rail", () => {
  test("two columns at a wide container", async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await booking(page, "ready");
    const aside = page.locator("[data-genui-rail] > aside");
    const form = page.locator("[data-genui-rail] > div");
    const asideBox = await aside.boundingBox();
    const formBox = await form.boundingBox();
    expect(asideBox && formBox).toBeTruthy();
    if (asideBox && formBox) {
      expect(asideBox.x + asideBox.width).toBeLessThanOrEqual(formBox.x);
      expect(Math.abs(asideBox.y - formBox.y)).toBeLessThan(2);
    }
  });

  test("stacks below 48rem and keeps the approval line visible", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await booking(page, "ready");
    await expect(page.locator("[data-genui-approval]")).toBeVisible();
    await expect(page.locator("[data-genui-approval]")).toContainText(
      "booking is not created until you approve"
    );
    const asideBox = await page
      .locator("[data-genui-rail] > aside")
      .boundingBox();
    const formBox = await page.locator("[data-genui-rail] > div").boundingBox();
    if (asideBox && formBox) {
      expect(formBox.y).toBeGreaterThan(asideBox.y + asideBox.height - 1);
    }
  });
});

test.describe("receipt outside the result tree", () => {
  test("a booked call stays reported after a later answer replaces the form", async ({
    page,
  }) => {
    const envelopes = [
      genuiFixtures["booking-hire"].envelope,
      genuiFixtures["project-gallery"].envelope,
    ];
    let composeCalls = 0;
    await page.route("**/api/genui/compose", async (route) => {
      const envelope = envelopes[Math.min(composeCalls, 1)];
      composeCalls += 1;
      const events = [
        { requestId: "pw", sequence: 0, type: "start" },
        { envelope, requestId: "pw", sequence: 1, type: "complete" },
      ];
      await route.fulfill({
        body: `${events.map((event) => JSON.stringify(event)).join("\n")}\n`,
        contentType: "application/x-ndjson",
        status: 200,
      });
    });
    const writes: unknown[] = [];
    await page.route("**/api/capabilities", async (route) => {
      const body = route.request().postDataJSON() as { operation: string };
      if (body.operation === "list_availability") {
        await route.fulfill({
          json: { data: { starts: labSlotStarts() }, status: "ok" },
        });
        return;
      }
      writes.push(body);
      await route.fulfill({
        json: { data: { eventId: "evt_internal" }, status: "confirmed" },
      });
    });

    await page.goto("/");
    const input = page.locator("#homepage-genui-search");
    await input.scrollIntoViewIfNeeded();
    await input.fill("I want to book a meeting.");
    await input.press("Enter");
    await page.getByLabel("Duration").selectOption("30");
    await page.getByLabel("Name").fill("Mock Visitor");
    await page.getByLabel("Email").fill("mock@example.com");
    await page.getByLabel("Agenda").fill("Mocked agenda.");
    await pickFirstSlotAndReview(page);
    await page.getByRole("button", { name: "Confirm booking" }).click();
    await expect(page.locator("[data-genui-receipt]")).toContainText(
      "Call booked"
    );
    const line = page.locator("[data-genui-receipt-line]");
    await expect(line).toContainText("Call booked: 30 min");

    await input.fill("explore my work");
    await input.press("Enter");
    await expect(page.locator("[data-genui-receipt]")).toHaveCount(0);
    await expect(page.getByLabel("Duration")).toHaveCount(0);
    await expect(line).toBeVisible();
    await expect(line).toContainText("Call booked: 30 min");
    await expect(line).not.toContainText("evt_internal");
    expect(writes).toHaveLength(1);
  });
});
