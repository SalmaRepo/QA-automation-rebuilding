import { test, expect } from "@playwright/test";
import fs from "fs";

test.beforeEach("Navigate to File upload page", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay");
  await expect(page).toHaveURL(/autoplay/);
});

test.afterEach("closing the page", async ({ page }) => {
  await page.close();
});

test("File Download", async ({ page }) => {
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("button", { hasText: "Download File" }).click(),
  ]);
  expect(download.suggestedFilename()).toContain(`sample.txt`);
  //by default file gets downloaded to download folder, to change the download location
  //create a download folder in the project,
  //save the file in the customs path
  const downloadPath = "./week-03-playwright-interactions/downloads/sample.txt";
  //const downloadPath="downloads/`${download.suggestedFilename()}`"-->for dynamic file name
  await download.saveAs(downloadPath);
  //verify if downloaded file exists in the folder
  const fileExists = fs.existsSync(downloadPath);
  expect(fileExists).toBeTruthy();
  if (fileExists) {
    fs.unlinkSync(downloadPath); //deletes the files or cleans the files inside the folder
  }
});

test("open PDF", async ({ page }) => {
  const [pdfPage] = await Promise.all([
    page.context().waitForEvent("page"),
    page.locator("button", { hasText: "open pdf" }).click(),
  ]);
  expect(pdfPage).toBeTruthy();
  await pdfPage.close();
});

test("open PDF1", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://sdetqa.vercel.app/autoplay");
  //await expect(page).toHaveURL("/autoplay/");
  const [pdfPage] = await Promise.all([
    page.context().waitForEvent("page"),
    page.locator("button", { hasText: "open pdf" }).click(),
  ]);
  expect(pdfPage).toBeTruthy();
  await pdfPage.close();
});
