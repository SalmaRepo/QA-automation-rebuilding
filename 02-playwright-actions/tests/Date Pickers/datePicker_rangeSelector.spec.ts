import { test, expect, Page } from "@playwright/test";
test("jquery date picker range selector", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay.html");
  const startDate = page.locator("#start-date");
  const endDate = page.locator("#end-date");
  //before filling the date we need to check the type attribute
  //if the type is mentioned as <input type=date/> then it only accepts
  //YY-MM-DD format
  await startDate.fill("2026-09-18"); //yy-mm-dd
  await endDate.fill("2026-10-18"); //yy-mm-dd

  await page.locator("button").filter({ hasText: "Submit" }).nth(1).click();
  const successMessage = page.locator("#result");
  await expect(successMessage).toBeVisible();
  console.log("starting:", await startDate.inputValue());
  console.log("ending:", await endDate.inputValue());
  await expect(startDate).toHaveValue("2026-09-18");
  await expect(endDate).toHaveValue("2026-10-18");
});
