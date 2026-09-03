//innerText() method returns the visible text of an element
//textConent() returns the text content of an element, including hidden elements.

import { test, expect } from "@playwright/test";

test("Comparing methods", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  let products = page.locator(".product-title");

  console.log(await products.nth(1).innerText()); //14.1-inch Laptop
  console.log(await products.nth(1).textContent());//           14.1-inch Laptop, textContent() also prints junk chars

  const text=await products.nth(1).textContent();

  //console.log(text.trim())-->here direct text.trim throws error as, 
  // sometimes text might be null or undefined due to page issues, 
  // its ok in JS but in TS we have to pass condition

  if(text!=null && text!=undefined){
    console.log(text.trim())
  }

  console.log(text?.trim())

  let productNames=await products.allInnerTexts();
  console.log("Product names captured by inner texts", productNames)/*Product names captured by inner texts [
  '$25 Virtual Gift Card',
  '14.1-inch Laptop',
  'Build your own cheap computer',
  'Build your own computer',
  'Build your own expensive computer',
  'Simple Computer'
]
*/

  productNames=await products.allTextContents();
  console.log("product names captured from text contents",productNames)/*product names captured from text contents [
  '\n            $25 Virtual Gift Card\n        ',
  '\n            14.1-inch Laptop\n        ',
  '\n            Build your own cheap computer\n        ',
  '\n            Build your own computer\n        ',
  '\n            Build your own expensive computer\n        ',
  '\n            Simple Computer\n        '
]*/


let productNamesTrimmed=productNames.map((text)=>text?.trim());
console.log("product names after trimming",productNamesTrimmed)

//all() -->converts Locator--->Locator[]
//returns array of locators
//returns array of loactors(stores locators of products)/coverts locators to array of locators
let productLocators=await products.all()
console.log(await productLocators[0].innerText())

});
