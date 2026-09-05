import { test, expect } from "@playwright/test";

test("validate product table", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay.html");

  // Count number of rows in the table → Expected: 4
  const table = page.locator("table").first();
  const columns = table.locator("thead th");
  const rows = table.locator("tbody tr");
  const rowCount = await rows.count();
  await expect(columns).toHaveCount(5);
  await expect(rows).toHaveCount(4);

  //Read all data from 2nd row (index 2 → 3rd row including header) → Expected: Keyboard |
  //Electronics | $79 | 0 | Out of Stock
  const row3 = rows.nth(2).locator("td");
  const row3Texts = await row3.allTextContents();
  console.log(
    row3Texts.reduce((val, text) => {
      return val + ` ${text} |`;
    }, ""),
  );
  await expect(row3).toHaveText([
    "Keyboard",
    "Electronics",
    "$79",
    "0",
    "Out of Stock",
  ]);

  //read all data from table(excliuding header)
  const tableData: string[][] = [];
  const rowsCount = await rows.count();

  for (let r = 0; r < rowsCount; r++) {
    const rowsTexts = await rows.nth(r).locator("td").allTextContents(); //gets all the data from the cells of all the rows;
    tableData.push(rowsTexts);
    console.log(`Row ${r + 1}:`, rowsTexts);
  }

  //console.log(tableData)
  let productNames = [];

  //Print all product names → Expected: Laptop, Mouse, Keyboard, Monitor
  for (let i = 0; i < tableData.length; i++) {
    productNames.push(tableData[i][0]);
    console.log(tableData[i][0]);
  }
  expect(productNames).toEqual(["Laptop", "Mouse", "Keyboard", "Monitor"]);

  //Print products where Stock = 0 → Expected: Keyboard

  const outOfStock = [];

  for (let r = 0; r < tableData.length; r++) {
    if (tableData[r][3] == "0") {
      outOfStock.push(tableData[r][0]);
      console.log("product name with stock 0 is", tableData[r][0]);
    }
  }
  console.log(outOfStock);
  expect(outOfStock).toEqual(["Keyboard"]);

  const inStock = [];
  //Print products where Status = "In Stock" → Expected: Laptop, Mouse, Monitor
  console.log("product name with stock status In Stock are");
  for (let r = 0; r < tableData.length; r++) {
    if (tableData[r][4] == "In Stock") {
      console.log(tableData[r][0]);
      inStock.push(tableData[r][0]);
    }
  }

  console.log(inStock);
  expect(inStock).toEqual(["Laptop", "Mouse", "Monitor"]);

  expect(inStock.length).toBe(3);
  expect(outOfStock.length).toBe(1);

  //Get price of a specific product (e.g., Mouse) → Expected: $29

  let mousePrice;

  for (let r = 0; r < tableData.length; r++) {
    if (tableData[r][0] == "Mouse") {
      mousePrice = tableData[r][2];
      break;
    }
  }

  expect(mousePrice).toBe("$29");

  const prices = [];
  let totalPrice;

  // Calculate total price of all products → Expected: 999 + 29 + 79 + 349 = 1456

  for (let i = 0; i < tableData.length; i++) {
    prices.push(tableData[i][2].slice(1));
  }

  totalPrice = prices.reduce((val, price) => {
    return val + Number(price);
  }, 0);
  console.log("totalPrice", totalPrice);

  expect(totalPrice).toEqual(1456);

  //Find product with highest price → Expected: Laptop ($999)

  let products: { [key: string]: number } = {};
  for (let i = 0; i < tableData.length; i++) {
    products[tableData[i][0]] = Number(tableData[i][2].slice(1));
  }
  const highPrice = Object.entries(products).reduce((max, price) =>
    price[1] > max[1] ? price : max,
  );
  console.log(`highest priced product is ${highPrice[0]} ($${highPrice[1]})`);
  expect(`${highPrice[0]} ($${highPrice[1]})`).toEqual("Laptop ($999)");

  //Find product with lowest price → Expected: Mouse ($29)
  const lowestPrice = Object.entries(products).reduce((max, price) =>
    price[1] < max[1] ? price : max,
  );
  console.log(
    `lowest priced product is ${lowestPrice[0]} ($${lowestPrice[1]})`,
  );
  expect(`${lowestPrice[0]} ($${lowestPrice[1]})`).toEqual("Mouse ($29)");

  //Print products with price greater than $100 → Expected: Laptop, Monitor
  const prodGreaterThanHundered = Object.entries(products).filter((prod) =>  prod[1] > 100).map(prod=>prod[0]);
  console.log(`prodcts greater than $100 are ${prodGreaterThanHundered}`);
});
