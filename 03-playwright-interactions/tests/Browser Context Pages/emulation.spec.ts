import { test, expect, devices } from "@playwright/test";

test("Emulator Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.google.com/");
  await page.waitForTimeout(5000);
});

test("emulator test on iphone15", async ({ browser }) => {
  const context = await browser.newContext({...devices['iPhone 15']});
  const page = await context.newPage();
  await page.goto("https://www.google.com/");
  await page.waitForTimeout(5000);
});
