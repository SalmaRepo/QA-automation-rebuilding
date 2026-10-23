/*
Pre-requisite
install the csv-parse module to read CSV files:
npm install csv-parse
*/

import { test, expect } from "@playwright/test";
import fs from "fs";
import {parse} from 'csv-parse/sync'

interface LoginData {
  email: string;
  password: string;
  validity: string;
}

const csvPath='./04-playwright-advanced/test-data/data.csv';

const fileContent=fs.readFileSync(csvPath,'utf-8');
const records=parse(fileContent,
    {columns:true,
        skip_empty_lines:true}) as LoginData[];


  test.describe("Login data driven test", async () => {
    for (const data of records) {
    test(`login test for ${data.email}`, async ({ page }) => {
      await page.goto("https://demowebshop.tricentis.com/login");

      await page.locator("#Email").fill(data.email); 
      await page.locator("#Password").fill(data.password);
      await page.locator('input[value="Log in"]').click();

      if (data.validity.toLowerCase() === "valid") {
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
  };
})
