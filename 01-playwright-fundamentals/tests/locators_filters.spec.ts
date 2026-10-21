import {test,expect, Locator} from '@playwright/test'

/*
Playwright locators filter

1.Verify add to cart for product 2
2.Count items not having out of stock
3.Find items with "in stock"
4.Verify elements with data test-id
5.count all elements with test ids
6.Find "Say goodbye" button for John
7. Find "Say Hello" button for Mary
8.Find subscribe button using multiple conditions
9.Find "details" buttons for done tasks
10.Verify stock status count


*/

//hooks before each test and after all tests 

test.beforeEach(async({page})=>{
await page.goto('https://sdetqa.vercel.app/filters_practice.html')

})

/*test.afterAll(async ({page})=>{

    await page.close()
})*/

test('Verify add to cart for product 2',async ({page})=>{

//await page.goto('https://sdetqa.vercel.app/filters_practice.html')

const productButton2=page.getByRole('listitem')
.filter({hasText:'Product 2'})
.getByRole('button',{name: 'Add to cart'})

await expect(productButton2).toBeVisible();
//await productButton2.click()
})

test('Count items not having out of stock',async ({page})=>{

//await page.goto('https://sdetqa.vercel.app/filters_practice.html')

const countNotOutOfStock=
page.locator(".card").nth(1)//css locators
.getByRole('listitem')
.filter({hasNotText:'Out of stock'});


await expect(countNotOutOfStock).toHaveCount(3)

} )

test('Find items with in stock',async ({page})=>{

const countInStock=
page.getByRole('listitem')
.filter({hasText:'In stock'});


await expect(countInStock).toHaveCount(3)

})

test('Verify elements with data test-id',async ({page})=>{

    //locate elements using test-id
   const apple=page.getByTestId('apple');
   const banana=page.getByTestId('banana');
   const orange=page.getByTestId('orange');

   await expect(apple).toBeVisible();
   await expect(banana).toBeVisible();
   await expect(orange).toBeVisible();

   //here we used toContainText because toContainText passes paritail text also, 
   // here we excluded emojis. to have exact match we use toHaveText
   await expect(apple).toContainText('apple')
   await expect(banana).toContainText('banana')
   await expect(orange).toContainText('orange')

})

test('count all elements with test ids',async ({page})=>{

    //get all elements with test-id

    const testIdElements=page.locator('[data-testid]');

    //access different positions
    const firstElement=testIdElements.first();
    const lastElement=testIdElements.last();
    const fourthElement=testIdElements.nth(3);

    console.log("Fruits:",await firstElement.innerText(),await lastElement.innerText(),await fourthElement.innerText());

    await expect(testIdElements).toHaveCount(5)

})

test('Find "Say goodbye" button for John',async ({page})=>{

    const johnGoodbye=page.getByRole('listitem')
    .filter({hasText:'John'})
    .getByRole('button',{name:'Say goodbye'})

    await expect(johnGoodbye).toBeVisible()


})

test('Find "Say Hello" button for Mary',async ({page})=>{

    const maryHelloButton=page.getByRole('listitem')
    .filter({hasText:'Mary'})
    .getByRole('button',{name:'Say hello'})

    await expect(maryHelloButton).toBeVisible()


})
//Matching multiple locators using .and()
test('Find subscribe button using multiple conditions',async ({page})=>{

   const subscribeBtns=page
   .getByRole('button').and(page.getByTitle('Subscribe',{exact:true}));

   console.log("Subscribe buttons count", await subscribeBtns.count());

   await expect(subscribeBtns).toHaveCount(2);
   await expect(subscribeBtns.first()).toBeVisible();
   await expect(subscribeBtns.last()).toBeVisible();
})


test('Find "details" buttons for done tasks',async ({page})=>{ 

    const detailButtons=page.getByRole('listitem')
    .filter({hasText:'done'})
    .getByRole('button',{name:'details'})

    await expect(detailButtons).toHaveCount(2)
})

test('Verify stock status count',async ({page})=>{

const countInStock=
page.getByRole('listitem')
.filter({hasText:'In stock'});

const countOutStock=
page.getByRole('listitem')
.filter({hasText:'Out of stock'});

await expect(countInStock).toHaveCount(3);
await expect(countOutStock).toHaveCount(2);

})