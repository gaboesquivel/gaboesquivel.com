import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1152]) {
  test(`career timeline at ${width}px: navigation, details and evidence`, async ({
    page,
  }) => {
    await page.goto("/__genui__/fixtures/career-timeline");
    const container = page.locator("[data-fixture-id]");
    await container.evaluate((node, w) => {
      (node as HTMLElement).style.maxWidth = `${w}px`;
    }, width);
    const timeline = page.locator("[data-career-timeline]");
    await expect(
      timeline.getByRole("heading", { name: "My journey" })
    ).toBeVisible();
    await expect(timeline.locator("article")).toHaveCount(4);
    expect(
      await container.evaluate(
        (node) => node.scrollWidth > node.clientWidth + 1
      )
    ).toBe(false);
    await timeline.getByRole("link", { name: "2024 AI & agents" }).click();
    const productChapter = timeline.locator("article", {
      has: page.getByRole("heading", {
        name: "From interfaces to a banking product",
      }),
    });
    await productChapter.scrollIntoViewIfNeeded();
    await expect(productChapter).toBeInViewport();
    const summary = productChapter.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(productChapter.locator("details")).toHaveAttribute("open", "");
    await expect(productChapter).toContainText(/built the first React Native/);
    await expect(
      productChapter.getByRole("link", { name: "Wink →", exact: true })
    ).toHaveAttribute("href", "/project/wink");
    await page.keyboard.press("Enter");
    await expect(productChapter.locator("details")).not.toHaveAttribute(
      "open",
      ""
    );
    for (const image of await timeline.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((node) => (node as HTMLImageElement).naturalWidth)
        )
        .toBeGreaterThan(0);
    }
  });
}

test("homepage career prompt renders the real composition endpoint", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.locator("#homepage-genui-search");
  await input.fill("Show me your career timeline");
  await input.press("Enter");
  await expect(page.locator("[data-career-timeline]")).toBeVisible();
  await expect(page.getByRole("heading", { name: "My journey" })).toBeVisible();
});
