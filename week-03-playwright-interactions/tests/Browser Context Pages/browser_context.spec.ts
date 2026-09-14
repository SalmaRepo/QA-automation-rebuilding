/*
A browser context in playwright represents an isolated browser session.

Each context has its own cookies ,local storage,session storage, and cache.

This allows you to stimulate multiple users within the same browser instance

Browsers-->contexts---->pages

browsers-->chromim,firefox,webkit

contexts--->we can have multiple contexts for multiple users/apps for the same browser,provide a wayto operate multiple independent browser sessions.

page-->new tab,window,popup

why Browser Context?

---------------\
Browser context provides session isolation without launching multiple browsers*/
import {test,chromium} from '@playwright/test'

test("Browser Context",async ()=>{

    //created chromium browser
    const browser=await chromium.launch()

    //create context 
    const context1=await browser.newContext()
    const context2=await browser.newContext()

    //create pages
    const context1_page=await context1.newPage()
    const context2_page=await context2.newPage()

    await context1_page.goto("https://www.saucedemo.com/")
    await context2_page.goto("https://www.saucedemo.com/")

    await context1_page.waitForTimeout(5000)
    
    await context2_page.waitForTimeout(5000)

    await context1.close()
    await context2.close()

    await browser.close()

})