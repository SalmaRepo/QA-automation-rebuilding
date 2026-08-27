/*
ASSIGNMENT: Playwright Locators Practice
Page: https://qa-practice-html-pages.vercel.app/playwright_locators.html



CONSTRAINTS:
- For each task, write the locator, then chain at least one assertion
  before interacting

*/

/*TASK 1 — getByRole() — Sign In button
- Assert "Sign In" button is visible
- Click it, then assert "Sign Out" button becomes visible
- Bonus: assert "Sign In" button is no longer visible after the click*/

import {test,expect,Locator} from '@playwright/test'

test.only("playwright locators practice 1",async ({page})=>{

await page.goto("https://qa-practice-html-pages.vercel.app/playwright_locators.html");

async function visibleAssert(ele: Locator){
  return await expect(ele).toBeVisible();
}
const signInRole=page.getByRole('button',{name:'Sign In'});
await visibleAssert(signInRole);
await signInRole.click();
await expect(page.getByRole('button',{name:'Sign Out'})).toBeVisible();
await expect(page.getByRole('button',{name:'Sign In'})).not.toBeVisible()

/*TASK 2 — getByLabel() — Registration form
- Fill "Full Name" using its label
- Fill "Email Address" using its label
- Select a country from the dropdown by label (use selectOption())
- Check "I agree to the Terms and Conditions" checkbox via its label
- Click "Register" and assert the resulting confirmation/success state */

const name:string='John F'

const nameForm=page.getByLabel('Full Name');
await visibleAssert(nameForm);
console.log("Called assert function")
await nameForm.fill(name);
const emailForm=page.getByLabel('Email Address');
await emailForm.fill("johnF@gmail.com");
await visibleAssert(emailForm);
const countrySelectForm=page.getByLabel('Country')
await visibleAssert(countrySelectForm);
await countrySelectForm.selectOption('India');
const checkForm=page.getByLabel('I agree to the Terms and Conditions');
await visibleAssert(checkForm);
await checkForm.click();
const registerButton = page.getByRole('button', { name: 'Register' });
await visibleAssert(registerButton)
await registerButton.click();
const confrimAfterReg=page.getByText(`Registration successful for ${name} `);
await visibleAssert(confrimAfterReg);



/*TASK 3 — getByPlaceholder() — Search & Feedback
- Fill the "Search products" input
- Assert the product list (Laptop Stand / Wireless Mouse / Mechanical Keyboard) is visible
- Fill the "Feedback" field using its placeholder
- Click "Submit Feedback" */

const searchProd=page.getByPlaceholder('Search products...');
await visibleAssert(searchProd);
const searchList:string[]=['Laptop Stand','Wireless Mouse','Mechanical Keyboard']
for(let product of searchList){
await searchProd.fill(product);
await expect(page.getByText(product)).toBeVisible();


}

await searchProd.fill('charger');
for (const term of searchList) {
  await expect(page.getByText(term)).not.toBeVisible();
}

const feedBack=page.getByPlaceholder('Tell us what you think...');
await visibleAssert(feedBack);
await feedBack.fill("I find this laptop good");

const submitButton = page.getByRole('button', { name: 'Submit Feedback' });
await visibleAssert(submitButton)
await submitButton.click();
const confrimAfterSubmit=page.getByText(`Thanks for your feedback! `);
await visibleAssert(confrimAfterSubmit);

/*TASK 4 — getByAltText() — Product gallery
- Assert all 3 images are visible by alt text:
  "Product thumbnail A", "Product thumbnail B", "Empty cart illustration"
- Bonus: use a partial/regex match ({ exact: false }) to match both thumbnails
  with one locator, then assert count() is 2*/

  const imagesAlts:string[]=["Product thumbnail A", "Product thumbnail B", "Empty cart illustration"]

  for(const thumbnail of imagesAlts){
  await expect(page.getByAltText(thumbnail)).toBeVisible()
  }

 
  await expect(page.getByAltText('Product thumbnail',{exact:false})).toHaveCount(2);


 /*TASK 5 — getByTitle() — Stat boxes
- Locate each stat box by its title attribute
- Assert visible numbers using toContainText():
  Users: 1,204 | Failures: 7 | */

  const stat1=page.getByTitle("Total number of registered users");
  await visibleAssert(stat1);
  await expect(stat1).toContainText("Users: 1,204");
  
  const stat2=page.getByTitle("Total number of failed test runs today");
  await visibleAssert(stat2);
  await expect(stat2).toContainText("Failures: 7");

   const stat3=page.getByTitle("Average build duration in minutes");
  await visibleAssert(stat3);
  await expect(stat3).toContainText("Avg Build: 4.2m");

  /*TASK 6 — getByTestId() — Pricing cards
- Locate the "Pro" pricing card by test id, assert visible, assert it contains "$19"
- Click the "Basic" card's button (find its test id) and assert the resulting UI change*/

const proCard=page.getByTestId('plan-pro');
await visibleAssert(proCard);
await expect(proCard).toContainText('$19');
const basicCard=page.getByTestId('plan-basic');
await visibleAssert(basicCard);
await basicCard.click();
await expect(page.getByText('You selected: Basic — $0')).toBeVisible()


  /*TASK 7 — getByText() — Order table
- Assert each order ID is visible: ORD-1001, ORD-1002, ORD-1003
- For each row, assert the adjacent status text: "Shipped", "Processing", "Cancelled"
- Bonus: use getByRole('row', { name: 'ORD-1002' }) then .getByText('Processing')
  scoped inside that row — combining role + text locators
*/

//using only arrays

/*const tableOrders:string[]=['ORD-1001','ORD-1002','ORD-1003']
const orderStatus:string[]=["Shipped", "Processing", "Cancelled"]

for(let order of tableOrders){
  await expect(page.getByText(order)).toBeVisible();

  const row = page.getByRole('row', { name: order });
await expect(row).toBeVisible();
await expect(row.getByText(orderStatus[tableOrders.indexOf(order)])).toBeVisible();
}*/

//using objects

const orders = [
  { id: 'ORD-1001', status: 'Shipped' },
  { id: 'ORD-1002', status: 'Processing' },
  { id: 'ORD-1003', status: 'Cancelled' },
];

for (const order of orders) {
  const row = page.getByRole('row', { name: order.id });
  await expect(row).toBeVisible();
  await expect(row.getByText(order.status)).toBeVisible();
}

/* TASK 8 — Combined challenge — Delete with confirmation
- Click "Delete Account", assert confirmation text
  "Are you sure? This cannot be undone." appears via getByText()
- Click "Cancel" and assert the confirmation disappears
- Click "Delete Account" again, then click "Yes, Delete" (role locator),
  assert the final deleted state */

  const deleteButton=page.getByRole('button',{name:'Delete Account'});
  await deleteButton.click();
  const areYouSure=page.getByText('Are you sure? This cannot be undone.');
  await visibleAssert(areYouSure);
  
  const cancelButton=page.getByRole('button',{name:'Cancel'});
  await cancelButton.click();
  await expect(areYouSure).not.toBeVisible();

   const deleteButton1=page.getByRole('button',{name:'Delete Account'});
  await deleteButton1.click();

  await deleteButton.click()

  const accountDeleted=page.getByText('Account deleted.');
  await visibleAssert(accountDeleted);





  


    
})