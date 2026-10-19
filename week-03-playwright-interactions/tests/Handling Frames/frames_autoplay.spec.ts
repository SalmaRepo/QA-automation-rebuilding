import { test, expect } from "@playwright/test";

test("Nested frames", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay");
  //await page.frameLocator('iframe').nth(0)- deprectaed
  const outerFrame = page.locator("iframe").first().contentFrame();
  //outer frame=>inner frame=>input element
  const inputBox = outerFrame.frameLocator("iframe").locator("#innerInput");
  await inputBox.fill("Welcome");
  await expect(inputBox).toHaveValue("Welcome");
});

test("external iframe loads the expected url", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay");
  //get the second iframe on page index1
  let pwiframe = page.locator("iframe").nth(1);
  await pwiframe.scrollIntoViewIfNeeded();
  //verify
  await expect(pwiframe).toHaveAttribute("src", "https://playwright.dev/");
  let innerFrame = pwiframe.contentFrame();
  await expect(
    innerFrame.getByAltText("Playwright logo").first(),
  ).toBeVisible();
});
