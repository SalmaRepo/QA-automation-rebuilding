import { test, expect } from "@playwright/test";

const pageUrl = "https://sdetqa.vercel.app/autoplay.html";

test.describe("Data entry form validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
    //await expect(page.getByText("AutoPlay")).toBeVisible();
  });

  //Input Field Validations

  test("1.Page Load Validation", async ({ page }) => {
    //open the URL and verify the page loaded
    await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay");
    //verify the autoplay heading is visible
    await expect(page.getByText("AutoPlay")).toBeVisible();
  });

  test("2.Input fields Validation", async ({ page }) => {
    const nameField = page.getByLabel("name");
    const eamilField = page.getByLabel("email");
    const phoneField = page.getByLabel("phone");
    const addressField = page.getByLabel("address");

    //Field should be visible & enabled
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();

    //Check maxlength attribute of Full name =15
    await expect(nameField).toHaveAttribute("maxlength", "15");

    //Enter and Verify Full name field
    nameField.fill("John Canedy");
    await expect(nameField).toHaveValue("John Canedy");

    //Email Field should be visible
    await expect(eamilField).toBeVisible();

    //email Value should match input
    eamilField.fill("tester@example.com");
    await expect(eamilField).toHaveValue("tester@example.com");

    //phone field assertions
    await expect(phoneField).toBeVisible();
    phoneField.fill("+91 1234567898");
    await expect(phoneField).toHaveValue("+91 1234567898");

    //Address filed should be visible and accept multi line text
    await expect(addressField).toBeVisible();
    addressField.fill("123 XYZ Lane \n Delhi,India");
    await expect(addressField).toHaveValue("123 XYZ Lane \n Delhi,India");

    await page.waitForTimeout(2000);
  });

  //Radio Button (Gender) Validation
  test("3.Radio button Validation", async ({ page }) => {
    const maleRadio = page.getByLabel("Male", { exact: true });
    const femaleRadio = page.getByLabel("Female", { exact: true });

    //Locate Both Radio Buttons
    await expect(maleRadio).toBeVisible();
    await expect(femaleRadio).toBeVisible();

    //Select Female and verify it is checked and male is not checked
    await femaleRadio.check();
    await expect(femaleRadio).toBeChecked();
    await expect(maleRadio).not.toBeChecked();

    await page.waitForTimeout(2000);
  });

  //Check Box Validations
  test("4.check box validations", async ({ page }) => {
    //Select Sunday Checkbox
    const sundayCheckbox = page.getByLabel("sun");
    await sundayCheckbox.check();
    //sundayCheckbox.setChecked(true)

    //check all the checkboxes
    const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const allCheckBoxes = allDays.map((day) => {
      return page.getByLabel(day);
    });

    for (const checkbox of allCheckBoxes) {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }

    //uncheck last 3

    for (let i = allCheckBoxes.length - 3; i < allCheckBoxes.length; i++) {
      await allCheckBoxes[i].setChecked(false);
      await expect(allCheckBoxes[i]).not.toBeChecked();
    }

    //toggle all checkboxes
    for (const checkbox of allCheckBoxes) {
      const isCurrentlyChecked = await checkbox.isChecked();
      if (isCurrentlyChecked) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
      } else {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
      }
    }

    //select checkboxes of [1,3,6]->tue,thu,sun

    for (const i in [1, 3, 6]) {
      await allCheckBoxes[i].check();
      await expect(allCheckBoxes[i]).toBeChecked();
    }

    const friCheck = page.getByLabel("Fri");
    await friCheck.check();
    await expect(friCheck).toBeChecked();

    await page.waitForTimeout(2000);
  });

  //Submit button validations
  test("5.Submit Button Validation", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: "Submit" }).first();
    //is visible
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await expect(submitButton).toBeEnabled();

    await page.waitForTimeout(2000);
  });

  //Field level validations
  test("6.Field level validations", async ({ page }) => {
    const nameField = page.getByLabel("name");
    const eamilField = page.getByLabel("email");
    const phoneField = page.getByLabel("phone");
    const addressField = page.getByLabel("address");
    const submitButton = page.getByRole("button", { name: "Submit" }).first();
    const errorMessage = page.locator("#formErrors");

    //check error messag when all the fields are empty

    await nameField.fill("");
    await eamilField.fill("");
    await phoneField.fill("");
    await addressField.fill("");
    await submitButton.click();

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Please fix the following:");

    await page.waitForTimeout(2000);
  });

  //invalid email validation
  test("Invalid Email Format", async ({ page }) => {
    const eamilField = page.getByLabel("email");

    const submitButton = page.getByRole("button", { name: "Submit" }).first();
    const errorMessage = page.locator("#formErrors");

    await eamilField.fill("abcd");

    await submitButton.click();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Please enter a valid email address.",
    );
  });

  //Enter more than 15 chars in name Input should be restricted

  test("Enter more than 15 chars in name Input should be restricted", async ({
    page,
  }) => {
    const nameField = page.getByLabel("name");
    const nameMoreThan15 = "this Name is Way too long to accept";
    nameField.fill(nameMoreThan15);
    await expect(nameField).toHaveValue("this Name is Wa");
    await expect(nameField).toHaveValue(/.{15}/);
  });

  //Enter alphabets in phone field Should be restricted (if validation exists)

  test("Enter alphabets in phone field Should be restricted ", async ({
    page,
  }) => {
    const phoneField = page.getByLabel("phone");
    phoneField.fill("abcdefg");
    await expect(phoneField).toHaveValue("");
    phoneField.fill("123ABC456DEF789GHI");
    await expect(phoneField).toHaveValue(/^[^A-Za-z]*$/);
  });
});
