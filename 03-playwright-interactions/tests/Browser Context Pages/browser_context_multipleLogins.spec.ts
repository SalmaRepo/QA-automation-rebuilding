import {test,chromium} from '@playwright/test'

test('browser context for two different users',async ()=>{
    const browser=await chromium.launch();

    //User 1 context(Admin)
    const adminContext=await browser.newContext();
    const adminPage=await adminContext.newPage()

    //User 2 context(Customer)
    const userContext=await browser.newContext()
    const userPage=await userContext.newPage()

    //login as admin
    await adminPage.goto("https://www.saucedemo.com/");
    await adminPage.locator("#user-name").fill("standard_user");
    await adminPage.locator("#password").fill("secret_sauce");
    await adminPage.locator("#login-button").click();

    //login as another user
    await userPage.goto("https://www.saucedemo.com/");
    await userPage.locator("#user-name").fill("visual_user");
    await userPage.locator("#password").fill("secret_sauce");
    await userPage.locator("#login-button").click();

    console.log("Both users are logged in independently")

    await adminPage.waitForTimeout(5000);

    await adminContext.close()
    await userContext.close()

    await browser.close()



})