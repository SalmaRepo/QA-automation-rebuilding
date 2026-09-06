import {test,expect} from '@playwright/test'
import fs from 'fs';

test('Extracting Data from Table',async ({page})=>{

    const filePath="./tests/testdata.txt";

    //clear the file if it already exists from previous run 
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath)
    }

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html')

    const rowsLocator=page.locator('#example tbody tr');
    const nextButtonLocator=page.getByRole('link',{name:'Next'});
    let hasNextPage=true;
    let pageCount=1;
    let pageDataString=''
    while(hasNextPage){
        //wait for table rows to be visible
        await rowsLocator.first().waitFor({state:'visible'});
        console.log("page number==>",pageCount)
        const rows=await rowsLocator.all();
        for(const row of rows){
           const cells=await row.locator('td').allTextContents();
           if(cells.length>0){
            pageDataString+=cells.join(', ')+'\n';
            console.log(pageDataString)
           }
        }
        fs.appendFileSync(filePath,pageDataString)

        //check the next button visibility and is it enable before clicking
        if(await nextButtonLocator.isVisible() && await nextButtonLocator.isEnabled()){
            await nextButtonLocator.click();
            pageCount++
        }else{
            console.log("Reached end of the page");
            hasNextPage=false
        }

    }
})