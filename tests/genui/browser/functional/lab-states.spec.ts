import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { LAB_RATE_LIMIT_MESSAGE } from "lib/genui/fixtures/registry";
import { searchCopy } from "lib/search/copy";

/**
 * Every state of the shared search and agent-surface contracts, reached in
 * the fixture lab without model calls: copy, live-region announcement (once)
 * and the focus target after the action. Live-surface flows stay in
 * search-contract.spec.ts and genui-writes.spec.ts.
 */

declare global {
  interface Window {
    __announcements?: string[];
  }
}

/** Records each change of the region's status text and every role=alert. */
const recordAnnouncements = (page: Page) =>
  page.addInitScript(() => {
    window.__announcements = [];
    const seen = new WeakMap<Element, string>();
    const read = () => {
      for (const node of document.querySelectorAll(
        "[data-fixture-id] [data-search-status] [role=status], [data-fixture-id] [role=alert]"
      )) {
        const text = node.textContent?.trim() ?? "";
        if (text && seen.get(node) !== text) {
          seen.set(node, text);
          window.__announcements?.push(text);
        }
      }
    };
    new MutationObserver(read).observe(document, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  });

const announcements = (page: Page) =>
  page.evaluate(() => window.__announcements ?? []);

/** The live region said exactly `expected`, and nothing re-announced it. */
const expectAnnouncedOnce = async (page: Page, expected: string[]) => {
  await expect.poll(() => announcements(page)).toEqual(expected);
  // Past the 300ms shimmer swap: the status text must not be re-written.
  await page.waitForTimeout(500);
  expect(await announcements(page)).toEqual(expected);
};

const lab = async (page: Page, fixtureId: string) => {
  await recordAnnouncements(page);
  await page.goto(`/__genui__/fixtures/${fixtureId}`);
};

const region = (page: Page) =>
  page.locator("[data-fixture-id] [data-search-status]");
const field = (page: Page) => page.locator("#genui-lab-search");
/** The "Or browse" line, apart from keyword matches that may share hrefs. */
const browseLine = (panel: Locator) =>
  panel.locator("p", { hasText: searchCopy.browse });

const labSearches = (page: Page) =>
  page.evaluate(() => window.__genuiLabSearches ?? []);

test.describe("search states in the fixture lab", () => {
  test("composing: static line, busy region, one announcement", async ({
    page,
  }) => {
    await lab(page, "search-composing");
    await expect(region(page)).toHaveAttribute(
      "data-search-status",
      "composing"
    );
    await expect(region(page)).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("[data-search-composing]")).toContainText(
      searchCopy.composing
    );
    await expectAnnouncedOnce(page, [searchCopy.composing]);
  });

  test("streaming: a partial result renders while the region stays busy", async ({
    page,
  }) => {
    await lab(page, "search-streaming");
    await expect(region(page)).toHaveAttribute("aria-busy", "true");
    await expect(page.locator('a[href="/project/wink"]').first()).toBeVisible();
    await expect(page.locator("[data-search-composing]")).toHaveCount(0);
    await expectAnnouncedOnce(page, [searchCopy.composing]);
  });

  test("empty: sentence, examples and browse links; never ready", async ({
    page,
  }) => {
    await lab(page, "search-empty");
    const empty = page.locator("[data-search-state=empty]");
    await expect(empty).toContainText(searchCopy.empty);
    await expect(empty).toContainText(searchCopy.emptyExamples);
    for (const href of ["/work", "/cv", "/contact"]) {
      await expect(browseLine(empty).locator(`a[href="${href}"]`)).toHaveCount(
        1
      );
    }
    const chips = empty.getByRole("listitem").getByRole("button");
    await expect(chips).toHaveCount(3);
    await expectAnnouncedOnce(page, [searchCopy.empty]);
    expect(await announcements(page)).not.toContain(searchCopy.resultReady);

    await chips.first().click();
    await expect(field(page)).toBeFocused();
    expect(await labSearches(page)).toHaveLength(1);
  });

  for (const { copy, fixtureId, name } of [
    { copy: searchCopy.errorFailed, fixtureId: "search-error", name: "failed" },
    {
      copy: searchCopy.errorTimedOut,
      fixtureId: "search-timed-out",
      name: "timed out",
    },
    {
      copy: LAB_RATE_LIMIT_MESSAGE,
      fixtureId: "search-rate-limited",
      name: "rate limited (server message)",
    },
  ]) {
    test(`error ${name}: copy, matches, browse links; Try again refocuses the field`, async ({
      page,
    }) => {
      await lab(page, fixtureId);
      const error = page.locator("[data-search-state=error]");
      await expect(error).toContainText(copy);
      await expect(error).not.toContainText(searchCopy.serverFailed);
      await expect(error).not.toContainText(searchCopy.serverTimedOut);
      for (const href of ["/work", "/cv", "/contact"]) {
        await expect(
          browseLine(error).locator(`a[href="${href}"]`)
        ).toHaveCount(1);
      }
      await expectAnnouncedOnce(page, [copy]);

      const submitted = await field(page).inputValue();
      await field(page).fill("an edited query that was never submitted");
      await error.getByRole("button", { name: searchCopy.retry }).click();
      await expect(field(page)).toBeFocused();
      expect(await labSearches(page)).toEqual([submitted]);
      await expect(region(page)).toHaveAttribute(
        "data-search-status",
        "composing"
      );
      await expect
        .poll(() => announcements(page))
        .toEqual([copy, searchCopy.composing]);
    });
  }

  test("failed search shows keyword matches for the submitted text", async ({
    page,
  }) => {
    await lab(page, "search-error");
    const error = page.locator("[data-search-state=error]");
    await expect(
      error.getByRole("heading", { name: searchCopy.keywordMatches })
    ).toBeVisible();
    await expect(
      error.getByRole("link", { name: /web3/i }).first()
    ).toBeVisible();
  });
});

test.describe("write failure in the fixture lab", () => {
  test("contact send fails once: alert announced once, button released; retry settles and focuses the receipt", async ({
    page,
  }) => {
    await lab(page, "contact-hire?writes=failure");
    const send = page.getByRole("button", { name: "Send email" });
    await send.click();
    const alert = page.locator("[data-genui-write-error]");
    await expect(alert).toHaveAttribute("role", "alert");
    await expect(alert).toContainText("Could not reach the server");
    await expect(send).toBeEnabled();
    // The fixture's settled result, then the alert, each said once.
    await expectAnnouncedOnce(page, [
      searchCopy.resultReady,
      (await alert.textContent())?.trim() ?? "",
    ]);
    await alert.getByRole("button", { name: "Try again" }).click();
    const receipt = page.locator("[data-genui-receipt]");
    await expect(receipt).toContainText("Note sent");
    await expect(receipt).toBeFocused();
    await expect(page.getByRole("button", { name: /Send email/ })).toHaveCount(
      0
    );
    const writes = await page.evaluate(() =>
      (window.__genuiLabCalls ?? []).filter(
        (call) => call.operation !== "list_availability"
      )
    );
    expect(writes).toHaveLength(2);
    expect(writes[0].input.retryIdentity).toBe(writes[1].input.retryIdentity);
  });
});
