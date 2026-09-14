import {test,expect} from "@playwright/test"

test("pop up validations",async ({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay");
    await page.locator("#PopUp").click();

    const popupBox=page.locator("#inlinePopup");
    await expect(popupBox).toBeVisible()

    await expect(page.getByRole("heading",{name:"Be always in touch"})).toBeVisible();

    await (page.getByRole("button",{name:"Yes"})).click();

    await expect(popupBox).toBeHidden();
    await page.close()

})