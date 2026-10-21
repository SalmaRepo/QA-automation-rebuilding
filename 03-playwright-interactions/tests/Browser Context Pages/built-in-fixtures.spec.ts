import { test, expect } from "@playwright/test";

test("Page fixture test", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  await page.click("text=Register");
  await expect(page).toHaveURL(/register/);
});

test("Context fixture test", async ({ context }) => {
  const myPage1 = await context.newPage();
  myPage1.goto("https://demowebshop.tricentis.com/");
  await myPage1.locator("text=Register").click();
  await expect(myPage1).toHaveURL(/register/);

  const myPage2=await context.newPage();
  await myPage2.goto('https://www.google.com/');
  await myPage2.locator('input.gNO89b:visible');
  await expect(myPage2).toHaveURL('/google/')
});

test("browser fixture test",async ({browser})=>{

    const context1=await browser.newContext();
    const context1_Page1=await context1.newPage();
    await context1_Page1.goto("https://www.google.com/");
    const context1_Page2=await context1.newPage();
    await context1_Page2.goto("https://www.rediff.com/")
  const context2=await browser.newContext();
    const context2_Page1=await context1.newPage();
    await  context2_Page1.goto("https://www.google.com/");
    const  context2_Page2=await context1.newPage();
    await  context2_Page2.goto("https://www.rediff.com/")
    
})
