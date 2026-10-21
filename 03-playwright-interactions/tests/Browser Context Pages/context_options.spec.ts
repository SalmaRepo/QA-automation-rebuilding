import {test} from '@playwright/test'

test('context options demo',async ({browser})=>{
    const context=await browser.newContext(
        //dark theme
        {
            colorScheme:'dark',

            permissions:[
                'notifications',
                'geolocation',
                'microphone'
            ],

            locale:'en-IN',
            timezoneId:'Asia/Kolkata',
            viewport:{
                width:1280,
                height:720
            },
            geolocation:{
                latitude:17.3843,
                longitude:78.4583
            }
        
            //igonore https certificate errors
            //ignoreHTTPSErrors:true
        
        }
    );
    const page=await context.newPage();
    await page.goto("https://www.google.com/");

})

//page level settings
test('page options',async ({page})=>{
    await page.setViewportSize({width:1920,height:1080})

    await page.goto('https://www.google.com')
    await page.waitForTimeout(5000)
})