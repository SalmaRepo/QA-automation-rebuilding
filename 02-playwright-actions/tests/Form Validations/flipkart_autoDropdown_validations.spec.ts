import { test, expect } from "@playwright/test";

const pageURL = "https://www.flipkart.com/";

test.describe("flipkart Auto Dropdown validations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageURL);
  });

  test("search for a product", async ({ page }) => {
    //Close the login popup if it appears.
    const loginClose = page.locator(".b3wTlE");
    if (await loginClose.isVisible()) {
      await loginClose.click();
    }
    const searchInput = page
      .getByPlaceholder("Search for Products, Brands and More", { exact: true })
      .first();
    await expect(searchInput).toBeVisible();
    await searchInput.fill("smart");

    //Wait until the auto-suggestion list is displayed.
    await expect(page.locator(".Swx5kP").first()).toBeVisible();

    //Capture all the suggestion elements.
    const searchList = page.locator(".Swx5kP");
    //Verify that at least one suggestion is displayed.
    await expect(searchList.first()).toBeVisible();
    //Print the total number of suggestions.
    const searchCount = await searchList.count();
    console.log("search count", searchCount);
    //Print the 5th suggestion (if available).
    if (searchCount > 5) {
      console.log("fifth element is", await searchList.nth(4).innerText());
    }
    const searchListArray = await page.locator(".Swx5kP").all();
    for (const search of searchListArray) {
      console.log(await search.innerText());
    }

    //Click the "smartphone" suggestion when it is found.
    for (let i = 0; i < searchCount; i++) {
      const search = searchList.nth(i);
      const searchText = await search.innerText();
      if (searchText == "smartphone") {
        const smartPhoneSuggestion = search;
        await smartPhoneSuggestion.click();
        break;
      }
    }
    //Verify that the "smartphone" suggestion was successfully found and selected.
    const smartPhoneResult = page.locator("._Omnvo span");
    await expect(smartPhoneResult).toHaveText("smartphone");
    //Verify that the current URL contains "smartphone".
    await expect(page).toHaveURL(/smartphone/);
    //Verify that the search box value is updated to "smartphone".
    await expect(page.locator(".Vy9RSP")).toHaveValue("smartphone");
  });
});
