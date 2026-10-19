/*
Shadow DOM is a technique used by web components to hide internal 
HTML Structure from the main page DOM
-elements inside shadow dom are encapsulated(isolated)
-Normal locators may not directly access them in many automation tools
-we cannot access these shadow DOM elements through xpath and cssin selectors hub,we can get it via playwright

HTML
===============
<book-app>
#shadow_root
<input placeholder='SearchBook'>
</book-app>
=================
PLAYWRIGHT
await page.locator('input[placeholder='search-box']).fill('playwirght)
=================
we have open shadow dom and closed shadow dom
*/

import { test, expect } from "@playwright/test";

test("shadow DOM", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay");
  //Heading
  const shadowHeading = page.locator("h3", { hasText: " Shadow DOM" });
  await shadowHeading.scrollIntoViewIfNeeded();
  await expect(shadowHeading).toBeVisible();

  const shadowHost = page.locator("#shadow_host");
  await expect(shadowHost).toBeVisible();

  await expect(shadowHost.getByText("Mobiles")).toBeVisible();

  await expect(shadowHost.getByText("Laptops")).toBeVisible();

  const textInput = shadowHost.locator("input[type='text']");
  const checkBox = shadowHost.locator("input[type='checkbox']");
  await textInput.fill("Welcome");
  await expect(textInput).toHaveValue("Welcome");
  await checkBox.check();
  await expect(checkBox).toBeChecked();
  const youtubeLink = page.getByRole("link", { name: "Youtube" });
  await expect(youtubeLink).toBeVisible();
  await expect(youtubeLink).toHaveAttribute("href", "https://www.youtube.com/@sdetpavan/videos");
  const blogLink = shadowHost.getByRole("link", { name: "Blog" });
  await expect(blogLink).toBeVisible();
  await expect(blogLink).toHaveAttribute(
    "href",
    "https://www.pavantestingtools.com/",
  );
});
