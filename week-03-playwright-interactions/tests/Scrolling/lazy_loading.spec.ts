import {test,expect} from '@playwright/test'


test('Lazy Loading page',async ({page})=>{
await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');
let previousHeight=0;
const count=0;
while(true){
    await page.evaluate(()=>window.scrollTo(0,window.document.body.scrollHeight));
    const bookCount=await page.locator('#divItemCard').count();
    await page.waitForTimeout(2000)

    
    const currentHeight=await page.evaluate(()=>document.body.scrollHeight)
    console.log("=========================")
    console.log("Previous Height:",previousHeight);
    console.log("Current Height:",currentHeight)
    //Get current scroll Height
    if(previousHeight===currentHeight){
        break
    }
    previousHeight=currentHeight
}

})