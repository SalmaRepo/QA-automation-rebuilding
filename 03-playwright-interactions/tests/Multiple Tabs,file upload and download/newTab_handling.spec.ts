//New Tab,New Window - It becomes a different context when we open the incognito mode of the same browser,
//untill then although page opens in a new window, it is in the same context
//when we click on new tab or new window focus will be on the previous or the main tab from
//where we clicked the new tab

import { test, expect } from "@playwright/test";

test("new tab handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://sdetqa.vercel.app/autoplay");
  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("button", { hasText: "New Tab" }).click(),
  ]);
  console.log("Number of pages in the context", context.pages.length);
  console.log(newTab.title());
  await expect(newTab).toHaveTitle(/Playwright/);
    await expect(newTab).toHaveURL(/playwright/);
    await context.close()

})
