import { chromium } from "playwright";

async function saveAdminStorage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://sdetqa.vercel.app/login_app");
  await page.getByRole("textbox", { name: "Username" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  //await page.getByLabel("🍪 Cookie").check();
  await page.getByLabel("💾 Local").check();
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForSelector("text=Dashboard Welcome", { state: "visible" });
  await context.storageState({ path: "./storage-data/admin_data.json" }); // this works for both local and cookies storage
  await browser.close();
}

async function saveUserStorage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://sdetqa.vercel.app/login_app");
  await page.getByRole("textbox", { name: "Username" }).fill("testuser1");
  await page.getByRole("textbox", { name: "Password" }).fill("testuser123");
  await page.getByLabel("🍪 Cookie").check();
  //await page.getByLabel('💾 Local').check();
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForSelector("text=Dashboard Welcome", { state: "visible" });
  await context.storageState({ path: "./storage-data/user_data.json" }); // this works for both local and cookies storage
  await browser.close();
}

saveAdminStorage();
saveUserStorage();
