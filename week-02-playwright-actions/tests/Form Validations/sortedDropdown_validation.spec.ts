import { test, expect } from "@playwright/test";

const pageURL = "https://www.bstackdemo.com/";

test.describe("sorted options validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageURL);
    await expect(page.getByText("Orders")).toBeVisible();
  });

  test("Low to High dropdown", async ({ page }) => {
    //Locate the "Order by" dropdown
    const orderOption = page.locator(".sort select");

    //Verify the dropdown is:visible and enabled
    await expect(orderOption).toBeVisible();
    await expect(orderOption).toBeEnabled();

    //Select the option "Lowest to highest"
    await orderOption.click();
    await orderOption.selectOption({ value: "lowestprice" });

    //Products should be sorted from lowest price to highest price
    const priceElements = page.locator(".shelf-item");
    const priceTexts = await priceElements.allTextContents();
    const prices = priceTexts.map((price) => {
      return Number(price.replace(/[^0-9.]/g, ""));
    });

    const sortedPrices = [...prices].sort();
    expect(prices).toEqual(sortedPrices);
  });

  test("retrive product information", async ({ page }) => {
    //Capture all product name elements
    const titles = await page.locator(".shelf-item__title").allTextContents();
    //Capture all product price elements
    const prices = await page.locator(".val b").allTextContents();
    //console.log(prices)
    //Number of product names = Number of product prices
    expect(titles.length).toEqual(prices.length);
    //Print each product name with its corresponding price in the console
    const products: { [key: string]: string } = {};
    for (let i = 0; i < titles.length; i++) {
      products[titles[i]] = prices[i];
    }
    console.log(products);
  });

  test("Identify and Print the Lowest Priced Product", async ({ page }) => {
    const orderOption = page.locator(".sort select");

    //Verify the dropdown is:visible and enabled
    await expect(orderOption).toBeVisible();
    await expect(orderOption).toBeEnabled();

    //Select the option "Lowest to highest"
    const oldFirstPrice = await page.locator(".val b").first().textContent();
    await orderOption.click();

    await orderOption.selectOption({ value: "lowestprice" });
    //await page.waitForTimeout(4000);
    //checking whether the product list has been sorted or not
    await expect(page.locator(".val b").first()).not.toHaveText(oldFirstPrice!);//oldFirstPrice! makes sure it is not null
    const firstprice = await page.locator(".val b").first().textContent();
    const firstTitle = await page
      .locator(".shelf-item__title")
      .first()
      .textContent();
    console.log("first product name:", firstTitle);
    console.log("first product price:", firstprice);
    const allPrices = await page.locator(".val b").allTextContents();
    const pricesNumbers = allPrices.map((price) => Number(price));
    const actualLowestPrice = Math.min(...pricesNumbers);
    expect(Number(firstprice)).toEqual(actualLowestPrice);
  });

  test('Identify and Print the Highest Priced Product',async ({page})=>{

    const orderOption = page.locator(".sort select");

    //Verify the dropdown is:visible and enabled
    await expect(orderOption).toBeVisible();
    await expect(orderOption).toBeEnabled();

    //Select the option "Lowest to highest"
    const oldFirstPrice = await page.locator(".val b").last().textContent();
    await orderOption.click();

    await orderOption.selectOption({ value: "lowestprice" });
    //await page.waitForTimeout(4000);
    //checking whether the product list has been sorted or not
    await expect(page.locator(".val b").last()).not.toHaveText(oldFirstPrice!);//oldFirstPrice! makes sure it is not null
    const lastprice = await page.locator(".val b").last().textContent();
    const lastTitle = await page
      .locator(".shelf-item__title")
      .last()
      .textContent();
    console.log("last product name:", lastTitle);
    console.log("last product price:", lastprice);
    const allPrices = await page.locator(".val b").allTextContents();
    const pricesNumbers = allPrices.map((price) => Number(price));
    const actualHighestPrice = Math.max(...pricesNumbers);
    expect(Number(lastprice)).toEqual(actualHighestPrice);
  })
});
