import { test,expect } from "@playwright/test";
test("Screenshots from cofig", async ({{page}}) => {
await page.goto("https://www.demoblaze.com/index.html");
  await page.getByRole("link", { name: "Log in" }).click();
  await page.locator("#loginusername").fill("pavanol");
  await page.locator("#loginpassword").fill("test@123");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForTimeout(3000);

  await expect(page.locator("#logout2")).toBeVisible();
  await expect(page.locator("#nameofuser")).toContainText("Welcome pavanol");
  //config test should be run only through npx playwright test testfile path
  //we can see all in the test results folder
});
