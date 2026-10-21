import { test, expect } from "@playwright/test";

test("count books and find one by scrolling", async ({ page }) => {
  test.setTimeout(120000);

  await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

  const cards = page.locator("#divItemCard");
  const bookToFind = "Tangled: Mother Knows Best";
  let previousCount = 0;

  while (true) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    try {
      // wait for more cards to load; give up after 5s
      await expect
        .poll(() => cards.count(), { timeout: 5000 })
        .toBeGreaterThan(previousCount);
    } catch {
      break; // count stopped growing, so we've reached the end
    }

    previousCount = await cards.count();
    console.log("Books loaded so far:", previousCount);
  }

  const titles = (await page.locator("#divItemCard h3").allTextContents()).map(
    (t) => t.trim(),
  );
  const isBookFound = titles.includes(bookToFind);

  console.log("Total books:", previousCount);
  console.log(`${bookToFind} ${isBookFound ? "is found" : "is not found"}`);

  expect(previousCount).toBeGreaterThan(0);
});