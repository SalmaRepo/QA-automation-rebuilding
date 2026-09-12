import { test, expect, Page } from "@playwright/test";

async function selectDate(
  page: Page,
  dateInputSelector: string,
  targetDate: string,
  targetMonth: string,
  targetYear: string,
) {
  await page.locator(dateInputSelector).click();

  const monthCalc = (Number(targetMonth) - 1).toString();

  await page.locator(".ui-datepicker-month").selectOption({ value: monthCalc });
  await page.locator(".ui-datepicker-year").selectOption({ value: targetYear });

  await page
    .locator(`.ui-datepicker-calendar td`)
    .getByRole("link", { name: targetDate, exact: true })
    .click();
}

async function selectDateOfBirth(
  page: Page,
  birthDate: { day: string; month: string; year: string },
) {
  await selectDate(
    page,
    "#dob",
    birthDate.day,
    birthDate.month,
    birthDate.year,
  );
}

async function selectTravelDate(
  page: Page,
  dateInputSelector: string,
  travelDate: { day: string; month: string; year: string },
) {
  await selectDate(
    page,
    dateInputSelector,
    travelDate.day,
    travelDate.month,
    travelDate.year,
  );
}

async function billingInfo(page: Page, locatorInfo: string, Value: string) {
  await page.locator(locatorInfo).fill(Value);
  await expect(page.locator(locatorInfo)).toHaveValue(Value);
}

test("book dummy flight ticket", async ({ page }) => {
  await page.goto(
    "https://www.dummyticket.com/dummy-ticket-for-visa-application/",
  );

  const departureDate: Date = new Date();
  departureDate.setDate(departureDate.getDate() + 30); //set departure date
  const returnDate: Date = new Date(departureDate);
  returnDate.setDate(returnDate.getDate() + 10); //set return date

  //Open Application  Verify page title Verify Place Order button is visible
  const title = page.locator("p").filter({ hasText: "Dummy ticket booking" });
  await expect(title).toBeVisible();
  const placeOrder = page.locator("#place_order");
  await expect(placeOrder).toBeVisible();

  //Select Product
  const productSelect = page
    .locator(".product-item")
    .filter({ hasText: "Dummy ticket for Visa Application" })
    .locator(".opc-radio-list-label");
  await productSelect.check();
  await expect(productSelect).toBeChecked();

  // Enter Passenger Details
  await page.locator("#travname").fill("John");
  await expect(page.locator("#travname")).toHaveValue("John");
  await page.locator("#travlastname").fill("Smith");
  await expect(page.locator("#travlastname")).toHaveValue("Smith");
  const birthdate = "15";
  const birthMonth = "1";
  const birthYear = "1995";
  const birthDateObject = {
    day: birthdate,
    month: birthMonth,
    year: birthYear,
  };
  await selectDateOfBirth(page, birthDateObject);
  await expect(page.locator("#dob")).toHaveValue("15/01/1995");
  await page.getByLabel("Male", { exact: true }).first().check();
  await expect(page.getByLabel("Male", { exact: true }).first()).toBeChecked();

  // Enter Travel Details

  await page.locator("#traveltype_2").click();

  await page.locator("#fromcity").fill("Hyderabad");
  await expect(page.locator("#fromcity")).toHaveValue("Hyderabad");
  await page.locator("#tocity").fill("London");
  await expect(page.locator("#tocity")).toHaveValue("London");
  const departureDay = {
    day: departureDate.getDate().toString(),
    month: (departureDate.getMonth() + 1).toString(),
    year: departureDate.getFullYear().toString(),
  };

  await selectTravelDate(page, "#departon", departureDay);
  await expect(page.locator("#departon")).toHaveValue(
    `${departureDay.day}/${departureDay.month}/${departureDay.year}`,
  );

  const returnDay = {
    day: returnDate.getDate().toString(),
    month: (returnDate.getMonth() + 1).toString(),
    year: returnDate.getFullYear().toString(),
  };
  await selectTravelDate(page, "#returndate", returnDay);
  await expect(page.locator("#returndate")).toHaveValue(
    `${returnDay.day}/${returnDay.month}/${returnDay.year}`,
  );

  //Enter Billing Information
  const locatorInfos = [
    "#billname",
    "#billing_email",
    "#billing_address_1",
    "#billing_city",
    "#billing_postcode",
    "#billing_phone",
  ];
  const values = [
    "John Smith",
    `john.smith@test.com`,
    "Hitech City, Hyderabad",
    "Hyderabad",
    "500081",
    "9876543210",
  ];
  for (let i = 0; i < locatorInfos.length; i++) {
    await billingInfo(page, locatorInfos[i], values[i]);
  }

  await page.locator("#select2-billing_country-container").click();
  await page
    .locator("#select2-billing_country-results")
    .getByRole("option", { name: "India", exact: true })
    .click();
  await expect(page.locator("#select2-billing_country-container")).toHaveText(
    "India",
  );
  await page.locator("#select2-billing_state-container").click();
  await page
    .locator("#select2-billing_state-results")
    .getByRole("option", { name: "Telangana", exact: true })
    .click();
  await expect(page.locator("#select2-billing_state-container")).toHaveText(
    "Telangana",
  );
  await expect(page.locator(".product-details")).toHaveText(
    "Dummy ticket for Visa Application",
  );
  //.shop_table td bdi
  await expect(page.locator(".shop_table td bdi").first()).toContainText(
    "1,200",
  );
  await expect(page.getByRole("button", { name: "Place Order" })).toBeEnabled();
  await page.getByRole("button", { name: "Place Order" }).click();
  await expect(page.locator(".merchant-name").first()).toBeVisible({
    timeout: 10000,
  });
  await expect(page.locator(".merchant-name").first()).toHaveText(
    "SEAMANTOURS",
  );
});
