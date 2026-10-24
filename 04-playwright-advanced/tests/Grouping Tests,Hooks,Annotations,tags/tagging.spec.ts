/*
TAGGING
------------------
tagging helps us to categorise the test
SINGLE TAG
test('login test',{
tag:'@smoke'
},async ({page})=>{
})

MULTIPLE TAGS
test('login test',{
tag:['@smoke','@regression']
},async ({page})=>{
})
we can also tag entirw group

*/

/*
1.Run all sanity tests
run npx playwright test /filefolder/ --project=chromium --grep "@sanity" will run all sanity tests
2.Run all regression tests
run npx playwright test /filefolder/ --project=chromium --grep "@regression" will run all regression tests

3.Run both sanity and regression tests
run npx playwright test /filefolder/ --project=chromium --grep "(?=.*@sanity)(?=.*@regression)" will run both sanity and regression

4.Run either sanity or regression test
run npx playwright test /filefolder/ --project=chromium --grep "@sanity|@regression" will run both sanity and regression

5.Run sanity tests that are not regression tests
run npx playwright test /filefolder/ --project=chromium --grep "@sanity" --grep-invert "@regression"

(?=  )->positive lookahead
.*  -> Any number of characters 
@sanity ->followed by @sanity
*/


import {test,expect} from '@playwright/test'

//Approach1
test('@sanity Check title of the home page',async ({page})=>{
await page.goto('https://www.google.com/');
await expect(page).toHaveTitle('Google')
})

//Approach2
test('Check url of the home page',{tag:'@regression'},async ({page})=>{
await page.goto('https://www.google.com/');
await expect(page).toHaveURL(/google/)
})

test('@sanity @regression Check title of the home page',async ({page})=>{
await page.goto('https://www.google.com/');
await expect(page).toHaveTitle('Google')
})

test('Check Navigation to store page',{tag:'@regression'},async ({page})=>{
await page.goto('https://www.google.com/');
await page.locator("text='Store'").click()
await expect(page).toHaveTitle('Google Store for Google Made Devices & Accessories')
})

test('Check Popular on google store',{tag:['@sanity','@regression']},async ({page})=>{
await page.goto('https://www.google.com/');
await page.locator("text='Store").click()
await expect(page.locator("text='Popular on the Google Store..")).toBeVisible()
})





