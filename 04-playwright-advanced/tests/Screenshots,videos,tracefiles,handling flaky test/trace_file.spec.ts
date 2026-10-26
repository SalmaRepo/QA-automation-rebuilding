/*Trace file is one of the playwrights most powerful debugging features.
Trace records almost everything that happend during a test

it includes
-Every action performed
-Screenshots
-DOM snapshots
-Console logs
-Network requests
-Timing information
-Source code

Think of trace as a 'video+screenshots+browser developer tools' 
combined in to one file

Approaches to capture trace file in playwright

1.Programatically(start and stop tracing normally within a test)
2.configure tracing in playwright.config.ts (used in most real projects) by use: {
   

    trace: 'on-first-retry',
    screenshot:'only-on-failure',
    video:'off'
  },
3.using CLI command ->npx playwright test testfilename --headed --trace on

ways to analyse trace file
1.in command prompt ie in terminal give npx playwright show-trace traces/tracefilename , this open trace viewer window
*/

import {test,chromium,expect} from '@playwright/test'
test('Record trace for Test',async ({},testInfo)=>{
    const browser=await chromium.launch();
 const context=await browser.newContext();

 //start tracing
 await context.tracing.start({
    screenshots:true,
    snapshots:true,
    sources:true
 })

 const page=await context.newPage();

 await page.goto('https://www.demoblaze.com/index.html');
 await page.getByRole('link',{name:'Log in'}).click();
 await page.locator('#loginusername').fill('pavanol');
 await page.locator('#loginpassword').fill('test@123');
 await page.waitForTimeout(3000)
 await page.getByRole('button',{name:'Log in'}).click();
 await page.waitForTimeout(10000)

 await expect(page.locator('#logout2')).toBeVisible();
 await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
 
 const tracePath=`traces/trace-${Date.now()}.zip`;//will use this path later

 await context.tracing.stop({
    path:tracePath
 })
 await testInfo.attach('Playwright trace',{
    path:tracePath,
    contentType:'application/zip'
 })

 await browser.close()
})