import { test, expect } from "@playwright/test";

test("Get item 200 from dropdown", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay.html");

  //locate the dropdown
  const dropdown = page.locator("#scrollable");

  //keep scrolling dropdown till page is visible
  await dropdown.evaluate(async (select: HTMLSelectElement) => {
    while (true) {
      const itemFound = Array.from(select.options).some(
        (option) => option.text === "Item 200",
      );
      if (itemFound) {
        break;
      }
      // Scroll to the bottom to load more
      select.scrollTop = select.scrollHeight;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });

  await dropdown.selectOption({ label: "Item 200" });
  await expect(dropdown).toHaveValue("Item 200");
  await page.waitForTimeout(5000);
  await page.close();
});
