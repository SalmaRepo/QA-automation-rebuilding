/*
HOOKS

beforeAll() - use for database connection,start server,create test data

beforeEach() - use for launch application,login,common setup
Test1
afterEach() - use for logout,cleanup,capture logs/screenshots

beforeEach()
Test2
afterEach()

afterAll()- use for cleanup,delete testdata,close connections
*/

import {test,expect} from '@playwright/test'

const URL='https://www.saucedemo.com/'

//Run once before all tests
test.beforeAll(async()=>{
    console.log('start test execution')
})

//Run once after all tests
test.afterAll(async()=>{
    console.log('Finished test execution')
})

//runs before each test
test.beforeEach( async({page})=>{
await page.goto(URL);
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  await page.click("#login-button");
  console.log('Login completed')
})

//runs after each test

test.afterEach(async ({page},testInfo)=>{
console.log(`Test Name:${testInfo.title}`) //testInfo is a global variable in playwright    
console.log(`Test Stauts:${testInfo.status}`)

await page.locator('#react-burger-menu-btn').click();
await page.locator('#logout_sidebar_link').click();

console.log('Logout Completed');

})

//Test1
test('Verify products page',async ({page})=>{
    await expect(page).toHaveURL(/inventory/)
    await expect(page.locator('.title')).toHaveText('Products')
})

//Test2
test('Verify product count',async ({page})=>{
    const products=page.locator('.inventory_item');
    await expect(products).toHaveCount(6)
})

//Test 3
test('Verify shopping cart Icon',async ({page})=>{
    await expect(page.locator('.shopping_cart_link')).toBeVisible()
})