import { expect, test } from "@playwright/test";
import type { Page, Route } from "@playwright/test";
import { genuiFixtures } from "lib/genui/fixtures/registry";
import {
  GENUI_LAB_CAPABILITY_PATH,
  labSlotStarts,
} from "lib/genui/fixtures/write-scenarios";
import { GENUI_SEARCH_HISTORY_KEY } from "lib/genui/search-history";
import { composeStageCopy, searchCopy, sourceLine } from "lib/search/copy";

/**
 * Task 16 (S-P1, S-P2, S-P3, A-P1) and M-I from
 * docs/specs/001-site-design-ux-search.md. Compose and capabilities are
 * always mocked or routed: no model call, booking or email leaves the test.
 */

type Envelope = (typeof genuiFixtures)["project-gallery"]["envelope"];

const ndjson = (events: Record<string, unknown>[]) =>
  `${events.map((event) => JSON.stringify(event)).join("\n")}\n`;

const resultBody = (envelope: Envelope) =>
  ndjson([
    { requestId: "pw", sequence: 0, type: "start" },
    { envelope, requestId: "pw", sequence: 1, type: "complete" },
  ]);

const fulfillEnvelope = (route: Route, envelope: Envelope) =>
  route.fulfill({
    body: resultBody(envelope),
    contentType: "application/x-ndjson",
    status: 200,
  });

const gallery = genuiFixtures["project-gallery"].envelope;
const bookingEnvelope = genuiFixtures["booking-hire"].envelope;

const status = (page: Page) =>
  page.locator("[data-search-status] [role=status]");
const dialogField = (page: Page) => page.locator("#site-search-dialog");
/** The inline homepage field; Enter opens the overlay, whose field is `homeField`. */
const homeInput = (page: Page) => page.locator("#home-genui-search");
/** The overlay field a homepage search lands in. */
const homeField = (page: Page) => page.locator("#site-search-dialog");
const trigger = (page: Page) =>
  page.getByRole("button", { name: searchCopy.accessibleName });

const openDialog = async (page: Page) => {
  await trigger(page).click();
  await expect(dialogField(page)).toBeFocused();
};

const closeDialog = async (page: Page) => {
  await page.getByRole("button", { name: searchCopy.close }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
};

const composeQueries = (page: Page) => {
  const queries: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith("/api/genui/compose")) {
      queries.push(request.postDataJSON().query as string);
    }
  });
  return queries;
};

const pickFirstSlotAndReview = async (page: Page) => {
  const select = page.locator("#genui-booking-start");
  const first = select.locator("option").nth(1);
  await expect(first).toBeAttached();
  await select.selectOption({
    value: (await first.getAttribute("value")) ?? "",
  });
  await page.getByLabel("Reviewed details").check();
};

test.describe("S-P1: the dialog keeps the session across close and reopen", () => {
  test("last result and booking receipt survive; Clear search resets", async ({
    page,
  }) => {
    let calls = 0;
    await page.route("**/api/genui/compose", (route) => {
      calls += 1;
      return fulfillEnvelope(route, calls === 1 ? bookingEnvelope : gallery);
    });
    await page.route("**/api/capabilities", (route) => {
      const body = route.request().postDataJSON() as { operation: string };
      if (body.operation === "list_availability") {
        return route.fulfill({
          json: { data: { starts: labSlotStarts() }, status: "ok" },
        });
      }
      return route.fulfill({
        json: { data: { eventId: "evt_internal" }, status: "confirmed" },
      });
    });
    await page.goto("/blog");
    await openDialog(page);
    await dialogField(page).fill("I want to book a meeting.");
    await dialogField(page).press("Enter");
    await page.getByLabel("Duration").selectOption("30");
    await page.getByLabel("Name").fill("Mock Visitor");
    await closeDialog(page);

    // A draft in progress is still there after reopening.
    await openDialog(page);
    await expect(dialogField(page)).toHaveValue("I want to book a meeting.");
    await expect(page.getByLabel("Name")).toHaveValue("Mock Visitor");
    await page.getByLabel("Email").fill("mock@example.com");
    await page.getByLabel("Agenda").fill("Mocked agenda.");
    await pickFirstSlotAndReview(page);
    await page.getByRole("button", { name: "Confirm booking" }).click();
    await expect(page.locator("[data-genui-receipt]")).toContainText(
      "Call booked"
    );
    await closeDialog(page);

    await openDialog(page);
    await expect(page.locator("[data-search-status]")).toHaveAttribute(
      "data-search-status",
      "result"
    );
    await expect(page.locator("[data-genui-receipt]")).toContainText(
      "Call booked"
    );
    await expect(page.locator("[data-genui-receipt-line]")).toContainText(
      "Call booked: 30 min"
    );
    expect(calls).toBe(1);

    await page.getByRole("button", { name: searchCopy.clear }).click();
    await expect(dialogField(page)).toBeFocused();
    await expect(dialogField(page)).toHaveValue("");
    await expect(page.locator("[data-search-status]")).toHaveCount(0);
    await closeDialog(page);
    await openDialog(page);
    await expect(page.locator("[data-search-status]")).toHaveCount(0);
  });
});

test.describe("S-P2: echo the visitor's words", () => {
  for (const { field, name, path } of [
    { field: homeField, name: "home", path: "/" },
    { field: dialogField, name: "dialog", path: "/blog" },
  ]) {
    test(`${name}: field and Recent show the clicked label; compose gets the canonical query`, async ({
      page,
    }) => {
      const queries = composeQueries(page);
      await page.route("**/api/genui/compose", (route) =>
        fulfillEnvelope(route, gallery)
      );
      await page.goto(path);
      // The homepage field is inline: focusing it lists suggestions, and
      // picking one opens the overlay, whose field holds the label.
      const input = field(page);
      if (name === "dialog") {
        await openDialog(page);
        await input.scrollIntoViewIfNeeded();
        await input.focus();
      } else {
        await homeInput(page).focus();
      }
      const label = "What agentic AI products have you shipped?";
      await page.getByRole("option", { name: label }).click();
      await expect(status(page)).toHaveText(searchCopy.resultReady);
      await expect(input).toHaveValue(label);
      expect(queries).toEqual(["show me your ai projects"]);
      const history = await page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key) ?? "[]") as string[],
        GENUI_SEARCH_HISTORY_KEY
      );
      expect(history[0]).toBe(label);

      // Recent lists the label and routes on the canonical query again.
      await page.getByRole("button", { name: searchCopy.clear }).click();
      await expect(input).toBeFocused();
      await input.press("ArrowDown");
      const recent = page.getByRole("group", { name: searchCopy.recent });
      await expect(recent.getByRole("option", { name: label })).toBeVisible();
      await recent.getByRole("option", { name: label }).click();
      await expect(input).toHaveValue(label);
      await expect.poll(() => queries.length).toBe(2);
      expect(queries[1]).toBe("show me your ai projects");
    });
  }
});

test.describe("S-P3: short placeholder below 640px", () => {
  test("390px shows the short placeholder; the name is unchanged", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/");
    await expect(homeInput(page)).toHaveAttribute(
      "placeholder",
      searchCopy.placeholderShort
    );
    await expect(
      page.getByRole("combobox", { name: searchCopy.accessibleName })
    ).toBeVisible();
    await page.goto("/blog");
    await openDialog(page);
    await expect(dialogField(page)).toHaveAttribute(
      "placeholder",
      searchCopy.placeholderShort
    );
  });

  test("640px and up keep the full placeholder", async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/");
    await expect(homeInput(page)).toHaveAttribute(
      "placeholder",
      searchCopy.placeholder
    );
  });
});

/**
 * A compose response the test streams by hand: `window.__composeEmit(event)`
 * writes one NDJSON line; nothing settles until the test says so.
 */
const installStreamingCompose = (page: Page) =>
  page.addInitScript(() => {
    const realFetch = window.fetch.bind(window);
    const encoder = new TextEncoder();
    window.fetch = (input, init) => {
      const url = typeof input === "string" ? input : (input as Request).url;
      if (!url.endsWith("/api/genui/compose")) return realFetch(input, init);
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          (window as unknown as Record<string, unknown>).__composeEmit = (
            event: unknown
          ) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
          init?.signal?.addEventListener("abort", () =>
            controller.error(new DOMException("Aborted", "AbortError"))
          );
        },
      });
      return Promise.resolve(
        new Response(stream, {
          headers: { "Content-Type": "application/x-ndjson" },
          status: 200,
        })
      );
    };
  });

const emit = (page: Page, event: Record<string, unknown>) =>
  page.evaluate(
    (value) =>
      (
        window as unknown as Record<string, (event: unknown) => void>
      ).__composeEmit(value),
    event
  );

test.describe("A-P1: progress, Stop and the client timeout", () => {
  test("stage lines use human labels; the result shows its source line", async ({
    page,
  }) => {
    await installStreamingCompose(page);
    await page.goto("/");
    await homeInput(page).fill("which projects used agents");
    await homeInput(page).press("Enter");
    const progress = page.locator("[data-search-progress]");
    await expect(progress).toContainText(searchCopy.composing);
    await expect(
      progress.getByRole("button", { name: searchCopy.stop })
    ).toBeVisible();
    await emit(page, { requestId: "pw", sequence: 0, type: "start" });
    await emit(page, {
      requestId: "pw",
      sequence: 1,
      stage: "planning",
      type: "stage",
    });
    await expect(progress).toContainText(composeStageCopy.planning);
    await emit(page, {
      requestId: "pw",
      sequence: 2,
      stage: "projects",
      type: "stage",
    });
    await expect(progress).toContainText(composeStageCopy.projects);
    await expect(progress).not.toContainText(/search_site|list_projects|tool/i);
    // Stage changes are visible but announced once ("Composing results…").
    await expect(status(page)).toHaveText(searchCopy.composing);
    await emit(page, {
      envelope: gallery,
      requestId: "pw",
      sequence: 3,
      type: "complete",
    });
    await expect(status(page)).toHaveText(searchCopy.resultReady);
    await expect(progress).toHaveCount(0);
    const expected = sourceLine({
      posts: gallery?.records.filter((r) => r.kind === "post").length ?? 0,
      projects:
        gallery?.records.filter((r) => r.kind === "project").length ?? 0,
    });
    expect(expected).toMatch(/^Based on \d+ projects?/);
    await expect(page.locator("[data-search-source]")).toHaveText(
      expected ?? ""
    );
  });

  test("Stop keeps the query and drafts, shows Stopped. and Try again re-runs", async ({
    page,
  }) => {
    const queries = composeQueries(page);
    let calls = 0;
    await page.route("**/api/genui/compose", async (route) => {
      calls += 1;
      // The second request hangs until the visitor presses Stop.
      if (calls === 2) return;
      await fulfillEnvelope(route, bookingEnvelope);
    });
    await page.route("**/api/capabilities", (route) =>
      route.fulfill({
        json: { data: { starts: labSlotStarts() }, status: "ok" },
      })
    );
    await page.goto("/");
    await homeInput(page).fill("I want to book a meeting.");
    await homeInput(page).press("Enter");
    await page.getByLabel("Name").fill("Mock Visitor");

    await homeField(page).fill("book a call with Gabo");
    await homeField(page).press("Enter");
    const stop = page.getByRole("button", { name: searchCopy.stop });
    await expect(stop).toBeVisible();
    // Stop sits beside the status line, not inside the field.
    await expect(
      page.locator("[data-search-field-bar], form").getByRole("button", {
        name: searchCopy.stop,
      })
    ).toHaveCount(0);
    await stop.click();
    const stopped = page.locator("[data-search-state=stopped]");
    await expect(stopped).toContainText(searchCopy.stopped);
    await expect(status(page)).toHaveText(searchCopy.stopped);
    await expect(homeField(page)).toHaveValue("book a call with Gabo");
    const history = await page.evaluate(
      (key) => localStorage.getItem(key) ?? "",
      GENUI_SEARCH_HISTORY_KEY
    );
    expect(history).not.toContain("book a call with Gabo");

    await stopped.getByRole("button", { name: searchCopy.retry }).click();
    await expect(homeField(page)).toBeFocused();
    await expect(page.getByLabel("Name")).toHaveValue("Mock Visitor");
    expect(queries).toEqual([
      "I want to book a meeting.",
      "book a call with Gabo",
      "book a call with Gabo",
    ]);
  });

  test("a request stalled for 20s shows the timed-out error", async ({
    page,
  }) => {
    await page.clock.install();
    await page.route("**/api/genui/compose", () => {
      // Never answers: only the client timeout can end it.
    });
    await page.goto("/");
    await homeInput(page).fill("explore my work");
    await homeInput(page).press("Enter");
    await expect(page.locator("[data-search-progress]")).toBeVisible();
    await page.clock.runFor(19_000);
    await expect(page.locator("[data-search-status]")).toHaveAttribute(
      "data-search-status",
      "composing"
    );
    await page.clock.runFor(1500);
    const error = page.locator("[data-search-state=error]");
    await expect(error).toContainText(searchCopy.errorTimedOut);
    await expect(status(page)).toHaveText(searchCopy.errorTimedOut);
    await expect(
      error.getByRole("button", { name: searchCopy.retry })
    ).toBeVisible();
  });
});

const revealStyle = async (page: Page) => {
  await page.route("**/api/genui/compose", (route) =>
    fulfillEnvelope(route, gallery)
  );
  await page.goto("/");
  await homeInput(page).fill("explore my work");
  await homeInput(page).press("Enter");
  await expect(page.locator("[data-search-source]")).toBeVisible();
  // Every generated block: the stack's items, or the single experience.
  const blocks = page.locator(
    "[data-genui-reveal] [data-genui-blocks] > *, [data-genui-reveal] > * > * > :not([data-genui-blocks])"
  );
  expect(await blocks.count()).toBeGreaterThan(0);
  const styles = await blocks.evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        duration: style.transitionDuration,
        easing: style.transitionTimingFunction,
        property: style.transitionProperty,
      };
    })
  );
  // One style for all blocks.
  expect(new Set(styles.map((style) => JSON.stringify(style))).size).toBe(1);
  return styles[0];
};

test.describe("M-I: generated blocks reveal on the site curve", () => {
  test("with motion: 200ms opacity and scale on the site curve", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const style = await revealStyle(page);
    expect(style).toEqual({
      duration: "0.2s, 0.2s",
      easing: "cubic-bezier(0.23, 1, 0.32, 1), cubic-bezier(0.23, 1, 0.32, 1)",
      property: "opacity, scale",
    });
  });

  test("reduced motion: 120ms opacity only", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const style = await revealStyle(page);
    expect(style).toMatchObject({ duration: "0.12s", property: "opacity" });
  });

  test("a new query reveals again (keyed by request)", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await revealStyle(page);
    const first = await page
      .locator("[data-genui-reveal]")
      .evaluate((element) => {
        (element as HTMLElement).dataset.marker = "first";
        return true;
      });
    expect(first).toBe(true);
    await homeField(page).fill("explore my work again");
    await homeField(page).press("Enter");
    await expect(page.locator("[data-search-source]")).toBeVisible();
    await expect(page.locator("[data-genui-reveal][data-marker]")).toHaveCount(
      0
    );
  });
});

test.describe("write retry identity after a network failure", () => {
  test("booking: edits lock until the server answers; one identity throughout", async ({
    page,
  }) => {
    const bodies: { input: Record<string, unknown>; operation: string }[] = [];
    let mode: "abort" | "ok" = "abort";
    await page.route(`**${GENUI_LAB_CAPABILITY_PATH}`, async (route) => {
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
      await route.fulfill({
        json: { data: { eventId: "evt_internal" }, status: "confirmed" },
      });
    });
    await page.goto("/__genui__/fixtures/booking-hire?writes=fetch");
    await pickFirstSlotAndReview(page);
    const confirm = page.getByRole("button", { name: "Confirm booking" });
    await confirm.click();
    const alert = page.locator("[data-genui-write-error]");
    await expect(alert).toContainText("Could not reach the server");
    await expect(confirm).toBeEnabled();
    for (const label of ["Name", "Email", "Agenda", "Duration"]) {
      await expect(page.getByLabel(label)).toBeDisabled();
    }
    mode = "ok";
    await alert.getByRole("button", { name: "Try again" }).click();
    await expect(page.locator("[data-genui-receipt]")).toContainText(
      "Call booked"
    );
    expect(bodies).toHaveLength(2);
    expect(bodies[0].input).toEqual(bodies[1].input);
  });

  test("contact: a server answer unlocks edits, and only then a new identity", async ({
    page,
  }) => {
    const bodies: { input: Record<string, unknown> }[] = [];
    let mode: "abort" | "rejected" = "abort";
    await page.route(`**${GENUI_LAB_CAPABILITY_PATH}`, async (route) => {
      bodies.push(route.request().postDataJSON());
      if (mode === "abort") {
        await route.abort("failed");
        return;
      }
      await route.fulfill({
        json: { message: "Check the email address.", status: "error" },
      });
    });
    await page.goto("/__genui__/fixtures/contact-hire?writes=fetch");
    const send = page.getByRole("button", { name: "Send email" });
    await send.click();
    const alert = page.locator("[data-genui-write-error]");
    await expect(alert).toContainText("Could not reach the server");
    await expect(page.getByLabel("Name")).toBeDisabled();

    mode = "rejected";
    await alert.getByRole("button", { name: "Try again" }).click();
    await expect(alert).toContainText("Check the email address.");
    await expect(page.getByLabel("Name")).toBeEnabled();
    expect(bodies[1].input.retryIdentity).toBe(bodies[0].input.retryIdentity);

    await page.getByLabel("Name").fill("Edited Visitor");
    await send.click();
    await expect.poll(() => bodies.length).toBe(3);
    expect(bodies[2].input.retryIdentity).not.toBe(
      bodies[0].input.retryIdentity
    );
  });
});
