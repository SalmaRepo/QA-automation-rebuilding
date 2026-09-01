import {test,expect} from '@playwright/test'

const pageUrl='https://sdetqa.vercel.app/autoplay.html'

test.describe('Data entry form validation',()=>{

test.beforeEach(async ({page})=>{

    await page.goto(pageUrl);
    //await expect(page.getByText("AutoPlay")).toBeVisible();
})

test('1.Page Load Validation',async ({page})=>{
    //open the URL and verify the page loaded
await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay")
//verify the autoplay heading is visible
await expect(page.getByText('AutoPlay')).toBeVisible()
})

test('2.Input fields Validation',async ({page})=>{

    const nameField=page.getByLabel("name");
    const eamilField=page.getByLabel("email");
    const phoneField=page.getByLabel("phone");
    const addressField=page.getByLabel("address");

    //Field should be visible & enabled
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();

    //Check maxlength attribute of Full name =15
    await expect(nameField).toHaveAttribute('maxlength','15');

    //Enter and Verify Full name field
    nameField.fill('John Canedy')
    await expect(nameField).toHaveValue('John Canedy')

    //Email Field should be visible
    await expect(eamilField).toBeVisible();

    //email Value should match input
    eamilField.fill('tester@example.com')
    await expect(eamilField).toHaveValue('tester@example.com')

    //phone field assertions
    await expect(phoneField).toBeVisible();
    phoneField.fill('+91 1234567898');
    await expect(phoneField).toHaveValue('+91 1234567898');

    //Address filed should be visible and accept multi line text
    await expect(addressField).toBeVisible()
    addressField.fill("123 XYZ Lane \n Delhi,India")
    await expect(addressField).toHaveValue('123 XYZ Lane \n Delhi,India')

    await page.waitForTimeout(2000)
})

//Radio Button (Gender) Validation
test('3.Radio button Validation', async ({page})=>{

const maleRadio=page.getByLabel('Male',{exact:true});
const femaleRadio=page.getByLabel('Female',{exact:true});

//Locate Both Radio Buttons
await expect(maleRadio).toBeVisible();
await expect(femaleRadio).toBeVisible();

//Select Female and verify it is checked and male is not checked
femaleRadio.check()
await expect(femaleRadio).toBeChecked()
await expect(maleRadio).not.toBeChecked()



})


})