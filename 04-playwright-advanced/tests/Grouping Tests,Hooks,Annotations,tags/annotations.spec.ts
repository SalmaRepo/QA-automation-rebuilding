/*
TEST ANNOTATIONS

Test annotations provide additional information about tests

playwright includes five core built-in annotations that natively control test runner behaviour

test.skip():Marks the test as irrelevant and prevents playwright from running it
test.fail():Informs playwright that the test is expected to fail 
test.fixme():Bypasses execution because the test is known to be broken , crashing or unstable.
test.slow():Triples the default test timeout for resource-heavy operations 
test.only():Focuses execution exclusively on this test,ignoring all the other tests in the project

test.describe()
test.step()

test.skip()  vs test.fixme()

Feature                         | test.skip()                           | test.fixme()
Executes the test               | No                                    | No
Purpose                         |Skip a test that should not run        | Mark as broken or not implemented
Indicates work is needed        | No                                    | Yes
Common use case                 | Environment browser, or configuration | Known bug,missing feature,flaky test under investigation
                                | Specific

*/

import {test,expect} from '@playwright/test'

const URL='https://playwright.dev'

//1.test.skip()

test.skip('Skip-Example-using test.skip()',async ({page})=>{
    await page.goto(URL);
    await expect(page).toHaveTitle(/Playwright/)

})

test('Runtime skip example',async ({page,browserName})=>{
console.log(`Running test in ${browserName}`);
//other then firefox it will skip everything
test.skip(browserName!=='firefox','runs only in firefox')
await page.goto(URL)
await expect(page).toHaveTitle(/Playwright/)
})

//test.fail()-Expected to fail
test.fail('Fail Example-using test.fail()',async ({page})=>{
    await page.goto(URL);
 //incorrect assertion(expected failure)
 await expect(page).toHaveTitle('Wrong Title');
 //await expect(page).toHaveTitle(/Playwright/)
})

//test.fixme()-test is not ready
test.fixme('Fix me example using test.fixme()',async ({page})=>{
    await page.goto(URL);
    //await expect(page).toHaveTitle(/Playwright/);
    await expect(page).toHaveTitle("Wrong Title")
})

//test.slow()-increase timeout
//Marks as test as "Slow".Slow test will be given triple the default timeout
//default timeout is 30 seconds,so slow test will have 90 seconds timeout

test('Slow exmaple-using test.slow()',async ({page})=>{
    test.slow();//make test wait fro 90 sec
    await page.goto(URL);
    await page.waitForTimeout(5000)
    await expect(page).toHaveTitle(/Playwright/);
})

//based on certain condition also we can make the test slow
test('Runtime slow Example',async ({page})=>{
    const runLongScenario=true;
    if(runLongScenario){
        test.slow()
    }

    await page.goto(URL);
    await expect(page).toHaveTitle(/Playwright/)
})

//test.only()
test.only('Only example-using test.only()',async ({page})=>{
    await page.goto(URL);
    await expect(page).toHaveTitle(/Playwright/)
})