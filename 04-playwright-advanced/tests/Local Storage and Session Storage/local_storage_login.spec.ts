import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("Login as admin and check Dashboard", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./04-playwright-advanced/storage-data/admin_data.json",
  });

  const page = await context.newPage();
  await page.goto("https://sdetqa.vercel.app/login_app");
  await expect(
    page.getByText("Dashboard Welcome", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#displayUser")).toContainText("admin");
  await page.waitForTimeout(5000);
  await context.close();
});

test("Login as User and check Dashboard", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./04-playwright-advanced/storage-data/user_data.json",
  });

  const page = await context.newPage();
  await page.goto("https://sdetqa.vercel.app/login_app");
  await expect(
    page.getByText("Dashboard Welcome", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#displayUser")).toContainText("testuser1");
  await page.waitForTimeout(5000);
  await context.close();
});
