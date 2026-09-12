import { test, expect, Page } from "@playwright/test";

async function dismissSignInIfPresent(page: Page) {
  const dismissBtn = page.locator("button[aria-label='Dismiss sign-in info.']");
  try {
    await dismissBtn.waitFor({ state: "visible", timeout: 5000 });
    await dismissBtn.click();
  } catch {
    // popup never appeared — that's fine, move on
  }
}

async function selectDate(
  page: Page,
  targetDate: string,
  targetMonth: string,
  targetYear: string,
) {
  const nextMonthBtn = page.getByRole("button", { name: "Next month" });

  const dateString = `${targetMonth} ${targetDate}, ${targetYear}`;
  const dateLocator = page.locator(`span[aria-label*="${dateString}"]`);

  for (let attempt = 0; attempt < 12; attempt++) {
    const candidateDate = dateLocator.first();

    if (await candidateDate.isVisible()) {
      await candidateDate.click();
      return; //exit the function after suucess
    }

    if (await nextMonthBtn.isVisible()) {
      await nextMonthBtn.click();
    }

    //console.log("we could not find the date");
  }
}

test("Booking.com Date Picker", async ({ page }) => {
  /*await page.addStyleTag({
    content: `*, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }`,
  });*/
  await page.goto("https://www.booking.com/");
  await dismissSignInIfPresent(page);

  await page.waitForTimeout(3000);
  //select the destination
  const destination = page.locator("#searchbox-horizontal-destination-input");

  await expect(destination).toBeVisible();
  await dismissSignInIfPresent(page);
  await destination.click();
  await destination.fill("Chennai");
  await destination.click();
  await page.waitForTimeout(3000);

  const suggestion = page
    .locator(".c7fce4b81c")
    .getByText("Chennai", { exact: false })
    .first();
  await expect(suggestion).toBeVisible({
    timeout: 3000,
  });
  await suggestion.click();
  await expect(destination).toHaveValue(/Chennai/i, {
    timeout: 5000,
  });
  //check in check out
  const checkIncheckOutBtn = page.getByTestId("searchbox-dates-container");
  await checkIncheckOutBtn.focus();
  await page.keyboard.press("Enter");

  const dateDropDown = page.locator(
    "#calendar-searchboxdatepicker-tab-trigger",
  );
  await page.waitForTimeout(2000);
  await expect(dateDropDown).toBeVisible({ timeout: 5000 });
  const currentMonth = new Date().getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const checkinDate = { month: "September", date: "15", year: "2026" };
  await selectDate(page, checkinDate.date, checkinDate.month, checkinDate.year);
  await expect(page.getByTestId("date-display-field-start")).toContainText(
    /Sep 15/i,
  );

  const checkOutDate = { month: "October", date: "15", year: "2026" };
  await selectDate(
    page,
    checkOutDate.date,
    checkOutDate.month,
    checkOutDate.year,
  );
  await expect(page.getByTestId("date-display-field-end")).toContainText(
    /Oct 15/i,
  );
});
