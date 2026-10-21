/*
Test 1
Open browser->Login->Save cookies

Test 2
open new browser->Load cookies ->verify automatic login

|          Part        |    Purpose  
--------------------------------------------------------------------------
|    fs               |  Node.js file system module
|  writeFileSync()    |  Writes data to a file synchronously               
|  cookieFile         |  File pathe where cookies are saved
|  cookies            |  Javscript object/array containing cookie data
|   JSON.stringify()  |  Converts the object to a JSON string
|   null              |  Includes all object properties(no custom filtering)
|   2                 |  Formats the JSON with 2-space indenation for readability

*/

import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
const cookieFile =
  "./04-playwright-advanced/storage-data/cookies.data.json";
const url = "https://sdetqa.vercel.app/login_app";

test.describe.configure({ mode: "serial" }); //parallel is the default mode but if we want serially , we need to mention

test("Login and Save cookies", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);

  await page.getByRole("textbox", { name: "Username" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByLabel("🍪 Cookie").check();
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Dashboard Welcome")).toBeVisible();
  const cookies = await context.cookies();
  fs.writeFileSync(cookieFile, JSON.stringify(cookies, null, 2));

  console.log("Cookies saved successfully");

  await page.waitForTimeout(5000);
});

test("Loign using saved cookies", async ({ browser }) => {
  const context = await browser.newContext();
  const savedCookies = JSON.parse(fs.readFileSync(cookieFile, "utf8"));
  context.addCookies(savedCookies);
  const page = await context.newPage();
  await page.goto(url);
  await expect(page.getByText("Dashboard Welcome")).toBeVisible();
  await page.waitForTimeout(5000);
});
