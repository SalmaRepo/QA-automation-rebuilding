import { chromium } from "playwright";
import fs from "fs"

async function saveSessionStorage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://sdetqa.vercel.app/login_app");
  await page.getByRole("textbox", { name: "Username" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByLabel("⏳ Session").check();
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForSelector("text=Dashboard Welcome", { state: "visible" });
  const sessionStoargeData=await page.evaluate(()=>{
    return sessionStorage
  })

  fs.writeFileSync('./storage-data/session_data.json',JSON.stringify(sessionStoargeData))
}

saveSessionStorage()