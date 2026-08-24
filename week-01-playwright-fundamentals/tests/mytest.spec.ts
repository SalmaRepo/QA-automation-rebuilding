import {test,expect} from '@playwright/test';

/*
syntax for test case
//fixture -global variable : page,browser,context
//we provide async function to test case which will return promise
test("Title",async ({page})=>{

//step1
//step2
//step3.. // all these steps will return promises 
})

*/

//command to run playwright test npx playwright test , this will run all the tests, instead provide required file path 
//command to view report - npx playwright show-report
//command to see reports in ui or heades mode is npx playwright test path --headed
/*test case can be created in 4 ways
manual -pom runner
codegen
vs code extension
MCP by AI
playwright agent
*/
//test case can also be created using test runner by command npx playwright codegen (browserurl) 
// and also by vs code extension called playwright using vs code which will provide you testing icon below extension icon

test("Verify title",async ({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle("Demo Web Shop");//assertion


})