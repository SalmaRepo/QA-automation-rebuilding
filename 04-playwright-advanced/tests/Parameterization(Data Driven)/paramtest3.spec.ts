import { test, expect } from "@playwright/test";
import fs from "fs";

const jsonPath = "./04-playwright-advanced/test-data/data.json";

const loginTestData: any = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

for (const {email, password, validity} of loginTestData) {
  test.describe("Login data driven test", async () => {
    test(`login test for ${email}`, async ({ page }) => {
      await page.goto("https://demowebshop.tricentis.com/login");

      await page.locator("#Email").fill(email);
      await page.locator("#Password").fill(password);
      await page.locator('input[value="Log in"]').click();

      if (validity.toLowerCase() === "valid") {
        //Assert logout link is visible indicates successful login
        const logoutLink = page.locator('a[href="/logout"]');
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        //Assert error message is visible
        const errorMessage = page.locator(".validation-summary-errors");
        await expect(errorMessage).toBeVisible();

        //Assert user is still on login page
        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }
    });
  });
}
