import {test,expect} from '@playwright/test'
test('Auth Popup',async ({browser})=>{
    const context=await browser.newContext(
        {
           httpCredentials:{
            username:'admin',
            password:'admin'
           }
        }
    )

    const page=await context.newPage()
    //await page.goto("https://admin:admin@the-internet.herokuapp.com/basic-auth")

    //navigate to url without credentials in the url
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await expect(page.locator('text=congratulations')).toBeVisible();
    await page.waitForTimeout(3000)
})