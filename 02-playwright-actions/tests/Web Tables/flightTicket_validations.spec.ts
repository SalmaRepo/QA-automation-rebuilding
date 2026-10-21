import { test, expect } from "@playwright/test";

test("Book Lowest Price Flight Successfully", async ({ page }) => {
  await page.goto("https://blazedemo.com/");
  const selectLocator = page.locator(".form-inline");
  //Select Boston as departure city
  const boston = await selectLocator.nth(0).selectOption({ value: "Boston" });
  //Select London as destination city
  const london = await selectLocator.nth(1).selectOption({ value: "London" });
  //Click on Find Flights button
  const findFlightButton = page.locator(".btn-primary");
  await findFlightButton.click();
  //Verify that flights result table is displayed
  const table = page.locator(".table");
  await expect(table).toBeVisible();
  //Count number of flight rows
  const flightRows = page.locator(".table tbody tr");
  const flightRowCount = await flightRows.count();
  //Verify at least one flight is available
  expect(flightRowCount).toBeGreaterThan(0);
  //Capture all flight prices from the table
  const headerCells = await page.locator(".table th").allInnerTexts();
  const priceHeadIndex = headerCells.indexOf("Price");
  const prices = [];
  for (const row of await flightRows.all()) {
    const price = await row.locator("td").nth(priceHeadIndex).innerText();
    prices.push(price);
  }
  //console.log(prices)
  //Identify the lowest price among all flights
  const lowestPrice = Math.min(
    ...prices.map((price) => Number(price.slice(1))),
  );
  const indexOfLowestPrice = prices
    .map((price) => Number(price.slice(1)))
    .indexOf(lowestPrice);
  //console.log(indexOfLowestPrice);
  await page.locator(".btn-small").nth(indexOfLowestPrice).click();
  await expect(page.locator("h2")).toContainText("has been reserved");
  //Enter passenger details:
  await page.getByPlaceholder("First Last").fill("John");
  await page.getByLabel("Address").fill("1403 American Beauty Ln");
  await page.getByLabel("City").fill("Columbus");
  await page.getByLabel("State").fill("OH");
  await page.getByLabel("Zip Code").fill("43240");
  await page.locator("#cardType").selectOption({ value: "amex" });
  await page.getByPlaceholder("Credit Card Number").fill("6789067345231267");
  await page.getByPlaceholder("Month").fill("10");
  await page.getByPlaceholder("Year").fill("2024");
  await page.getByPlaceholder("John Smith").fill("John Canedy");
  //Click on Purchase Flight button
  await page.locator(".btn-primary").click();
  //Capture confirmation message
  await expect(page.locator("h1")).toHaveText(
    "Thank you for your purchase today!",
  );
});
