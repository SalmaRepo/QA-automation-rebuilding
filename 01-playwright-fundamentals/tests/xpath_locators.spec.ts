import {test,expect} from '@playwright/test'

test('demo of xpath locator with paywright',async ({page})=>{

await page.goto("https:demowebshop.tricentis.com")

//Absolute Xpath(full xpath) - Not recommened since we have to start with root and reach the necessary element travelling so long

//Relative Xpath(partial Xpath) with single attribute
//Syntax - //tagname[@attr=value]

const logo=page.locator("//img[@alt='Tricentis Demo Web Shop']")
await expect(logo).toBeVisible()

//XPATH with contains()
let products=page.locator('//h2//a[contains(@href,"computer")]')
const productsCount=await products.count()
console.log("Number of Products: ",productsCount)
expect(productsCount).toBeGreaterThan(0); //no await needed as it is non retrying assertion
console.log(await products.nth(1).textContent())//gives the text
console.log(await products.allTextContents())
//await products.click();//Error - strict mode voilation as we are trying to perform single action on group of elements
await products.nth(0).click()

await page.goBack()


//xpath with starts with()
let buildProducts=page.locator('//h2/a[starts-with(@href,"/build")]')
const count=await buildProducts.count()
console.log("build proudcts count :",count)
expect(count).toBeGreaterThan(0);
expect(count).toBe(3);//if you know exact count

//xpath with text
let registerLink=page.locator('//a[text()="Register"]')
await expect(registerLink).toBeVisible()

//XPATH with last()
//const wishlist=page.locator("//div[@class='column my-account']//li").last()
const wishlistText=await page.locator("//div[@class='column my-account']//li[last()]").textContent()
expect(wishlistText).toBe('Wishlist')

//xpath with position()
const addressesText=await page.locator("//div[@class='column my-account']//li[position()=3]").textContent()
expect(addressesText).toBe('Addresses')






})