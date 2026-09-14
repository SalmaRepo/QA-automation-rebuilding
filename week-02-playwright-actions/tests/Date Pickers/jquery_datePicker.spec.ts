import { test, expect, Page } from "@playwright/test";

async function selectDate(
  page: Page,
  targetYear: string,
  targetMonth: string,
  targetDate: string,
  isFuture?: boolean,
) {
  while (true) {
    const currentMonth = await page.locator(".ui-datepicker-month").innerText();
    const currentYear = await page.locator(".ui-datepicker-year").innerText();
    if (currentMonth == targetMonth && currentYear == targetYear) {
      break;
    }

    if (isFuture) {
      await page.locator(".ui-datepicker-next").click(); //next button
    } else {
      await page.locator(".ui-datepicker-prev").click(); //previous button
    }
  }

  //select Date
  /*
  const dates=await page.locator(".ui-datepicker-calendar td").all();
  for(const date of dates){
    const dateText=await date.innerText()
    if(dateText==targetDate){
        await date.click();
        break
    }
  }*/
 page.locator(".ui-datepicker-calendar td",{hasText:targetDate}).first().click()//we are using first here to avoid selecting duplicates
}

test("jquery date picker", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay.html");
  const dateInput = page.locator("#datepicker1");
  await expect(dateInput).toBeVisible();
  //Directly set the date using fill()
  /*
    await dateInput.fill("09/15/2026");//mm/dd/yy
    */

  //Select the date through calendar

  //clicking on date picker
  await dateInput.click();
  //target date(past/future)
  const targetYear = "2027";
  const targetMonth = "September";
  const targetDate = "7";

  //Select date from the calendar
  //calling reusable function to select date

  await selectDate(page, targetYear, targetMonth, targetDate,true);
  
  await page.waitForTimeout(5000);

  await expect(dateInput).toHaveValue("09/07/2027"); //mm/dd/yy
});
