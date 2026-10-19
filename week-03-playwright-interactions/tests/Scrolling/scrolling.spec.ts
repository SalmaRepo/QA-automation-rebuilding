/*
Most of the time,plazwright will automatically scroll for zou before doing anz actions
Therefore, zou dont need to scroll explicitily(excluding infinite scrolling page)
ways to scrolling thr page:
1.scroll by pixel values
  moves the window by a specified number of pixels relative to its current position
2.scroll to specific element
  brings a target element directly into browser viewport
3.scroll to bottom of the document
  moves to view directly to the top or the very bottom of the document
4.Scroll continuosly(infinte scroll)
*/

import { test, expect } from "@playwright/test";

const url = "https://www.worldometers.info/geography/flags-of-the-world/";
test("Automatic scrolling", async ({ page }) => {
  await page.goto(url);
  const usFlag = page.getByAltText("Flag of United States");
  await expect(usFlag).toBeVisible();
});

test("Scroll by pixel Values", async ({ page }) => {
  await page.goto(url);
  await page.evaluate(() => window.scrollBy(0, 2000));
  const scrollPosition = await page.evaluate(() => window.scrollY);
  expect(scrollPosition).toBe(2000);
});

test('Scroll to a specific element',async ({page})=>{
  await page.goto(url);
  const indianFlag=page.getByAltText('Flag of India');
  //scroll until Indian flag is visible
  await indianFlag.scrollIntoViewIfNeeded()
  await expect(indianFlag).toBeVisible()
})

test("Scroll to bottom of the doc", async ({ page }) => {
  await page.goto(url);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  //await page.keyboard.press('End');
  await expect(page.locator(".text-zinc-200")).toBeVisible();
});

test("Scroll to the bottom then top", async ({ page }) => {
  await page.goto(url);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  //await page.waitForTimeout(3000)
  //await page.evaluate(()=>window.scrollTo(0,0));
  await page.evaluate(() => window.scrollTo(0, -document.body.scrollHeight));
});
