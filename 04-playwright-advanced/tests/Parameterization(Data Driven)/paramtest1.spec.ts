import { test, expect } from "@playwright/test";

const searchItems: string[] = ["laptop", "Gift Card", "smartphone", "monitor"];

//searching for single item
/*
test("search test", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  await page.locator("#small-searchterms").fill("laptop");
  await page.locator("input[value='Search']").click();
  await expect
    .soft(page.locator("h2 a").nth(0))
    .toContainText("laptop", { ignoreCase: true });
});



//testing multiple search items using for of
for (const item of searchItems) {
  test(`search test of ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("#small-searchterms").fill(item);
    await page.locator("input[value='Search']").click();
    await expect
      .soft(page.locator("h2 a").nth(0))
      .toContainText(item, { ignoreCase: true });
  });
}

//using forEach function
searchItems.forEach((item)=>{
   test(`search test of ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("#small-searchterms").fill(item);
    await page.locator("input[value='Search']").click();
    await expect
      .soft(page.locator("h2 a").nth(0))
      .toContainText(item, { ignoreCase: true });
  }); 
})*/

//test.describe
test.describe(async ()=>{
    searchItems.forEach((item)=>{
   test(`search test of ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("#small-searchterms").fill(item);
    await page.locator("input[value='Search']").click();
    await expect
      .soft(page.locator("h2 a").nth(0))
      .toContainText(item, { ignoreCase: true });
  }); 
    })})
