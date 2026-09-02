import { test, expect } from "@playwright/test";

const pageUrl = "https://sdetqa.vercel.app/autoplay.html";

test.describe("Handling dropdowns", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
    await expect(page.getByText("Autoplay")).toBeVisible();
  });

  test("1.Page Load Validation", async ({ page }) => {
    //open the URL and verify the page loaded
    await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay");
    //verify the autoplay heading is visible
    await expect(page.getByText(" Dropdowns & more")).toBeVisible();
  });

  //single dropdown validations

  test("single select dropdown validations", async ({ page }) => {
    //Locate Country dropdown Dropdown should be visible
    const countryDropdown = page.locator("#country");
    await expect(countryDropdown).toBeVisible();
    //Get default selected value Default should be India (india)
    await expect(countryDropdown).toHaveValue("india");

    //select by visible label
    await countryDropdown.selectOption({ label: "USA" });
    // await countryDropdown.selectOption('USA');
    await expect(countryDropdown).toHaveValue("usa");

    //select by option value
    await countryDropdown.selectOption({ value: "uk" });
    await expect(countryDropdown).toHaveValue("uk");
    //select by index
    await countryDropdown.selectOption({ index: 3 });
    await expect(countryDropdown).toHaveValue("germany");
    //select by combination of value and label
    await countryDropdown.selectOption({ value: "france", label: "France" });
    await expect(countryDropdown).toHaveValue("france");

    //Count total dropdown options Count should be 5
    const options = countryDropdown.locator("option");
    await expect(options).toHaveCount(5);

    const optionsMul = page.locator("#country option");
    await expect(optionsMul).toHaveCount(5);

    //validate options list contains germany
    const optionsTexts = await options.allInnerTexts(); //capture text from all the options and retuns string array
    //options.allInnerTexts()-also includes special characters
    expect(optionsTexts).toContain("Germany");

    for (const option of optionsTexts) {
      console.log(option);
    }
  });

  //Multi Select Dropdown
  test("Multi Select Dropdown", async ({ page }) => {
    const colorsSelect = page.locator("#colors");
    //colors select should be visible
    await expect(colorsSelect).toBeVisible();

    //default value should be blue
    await expect(colorsSelect).toHaveValue("blue");

    //select Multiple options red, green, yellow
    await colorsSelect.selectOption([
      { label: "Red" },
      { label: "Green" },
      { label: "Yellow" },
    ]);

    await colorsSelect.selectOption([
      { value: "red" },
      { value: "green" },
      { value: "yellow" },
    ]);
    await colorsSelect.selectOption([{ index: 0 }, { index: 2 }, { index: 3 }]);
  });

  test("sorted options in dropdown", async ({ page }) => {
    const dropdownOptions = await page
      .locator("#sorted option")
      .allTextContents();

    //const dropdownOptions=await page.locator('#colors option').allTextContents()
    const originalList = dropdownOptions;
    const sortedList = [...dropdownOptions].sort();

    console.log("original list", originalList);
    console.log("sorted list", sortedList);

    expect(originalList).toEqual(sortedList);
  });
});
