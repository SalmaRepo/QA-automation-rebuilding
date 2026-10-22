import { test, expect } from "@playwright/test";
import fs from "fs";

test("Loign using saved cookies", async ({ browser }) => {
  const context = await browser.newContext();
  const sessionStorageData = JSON.parse(
    fs.readFileSync("./04-playwright-advanced/storage-data/session_data.json"),
  );
  context.addInitScript((storage) => {
    Object.keys(storage).forEach((key) => {
      sessionStorage.setItem(key, storage[key]);
    });
  }, sessionStorageData);

  /*
context.addInitScript((storage)=>{
    for(const key in storage){
        sessionStorage.setItem(key,storage[key])
    }
},sessionStorageData)
  */

  const page = await context.newPage();
  await page.goto("https://sdetqa.vercel.app/login_app");
  await expect(page.getByText("Dashboard Welcome")).toBeVisible();
   await expect(page.locator("#displayUser")).toContainText("admin");
  await page.waitForTimeout(5000);
  await context.close()
});
