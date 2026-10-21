import { test, expect } from "@playwright/test";

test.describe('CSS Locators',()=>{

const URL = "https:demowebshop.tricentis.com";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("CSS with Id", async ({ page }) => {
  //with id
  //const search_with_id=page.locator('input#small-searchterms')
  const search_with_id = page.locator("#small-searchterms");
  search_with_id.fill("14.1-inch Laptop");

  await page.locator('[value="Search"]').click(); //Clicking on search button

  await expect(page.locator('h2[class="product-title"] a')).toHaveText(
    "14.1-inch Laptop",
  );

  //await page.close();
});

test("CSS with class", async ({ page }) => {
  //with id
  //const search_with_id=page.locator('input#small-searchterms')
  const search_with_class = page.locator(".search-box-text");
  search_with_class.fill("14.1-inch Laptop");

  await page.locator('[value="Search"]').click(); //Clicking on search button

  await page.waitForTimeout(5000);

  await expect(page.locator('h2[class="product-title"] a')).toHaveText(
    "14.1-inch Laptop",
  );

  //await page.close();
});

test("CSS with attribute", async ({ page }) => {
  //with id
  //const search_with_id=page.locator('input#small-searchterms')
  const search_with_attreibute = page.locator('[value="Search store"]');
  search_with_attreibute.fill("14.1-inch Laptop");

  await page.locator('[value="Search"]').click(); //Clicking on search button

  await page.waitForTimeout(5000);

  await expect(page.locator('h2[class="product-title"] a')).toHaveText(
    "14.1-inch Laptop",
  );

  //await page.close();
});

test("CSS with class and attr", async ({ page }) => {
  //with id
  //const search_with_id=page.locator('input#small-searchterms')
  const search_with_classAttr = page.locator('.search-box-text[name="q"]');
  search_with_classAttr.fill("14.1-inch Laptop");

  await page.locator('[value="Search"]').click(); //Clicking on search button

  await page.waitForTimeout(5000);

  await expect(page.locator('h2[class="product-title"] a')).toHaveText(
    "14.1-inch Laptop",
  );

  //await page.close();
});



})

//[attribute*='partial'] -selects elements where attribute contains a partial value
//  const search_with_classAttr = page.locator([id*='small']);
//[attribute^='start']- selects elements where attribute starts with a value
//const search_with_classAttr = page.locator([id^='small']);
//[attribute$='end'] - selects elements  where attribute ends with a value
//Child Selector (parent > child),element is a direct child, const serachbox=page.locator('form>input).nth(0)
