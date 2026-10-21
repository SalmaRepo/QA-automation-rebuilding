import { test, expect } from "@playwright/test";

test("Bootstrap Dropdown", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  //Enter username as Admin Username should be entered successfully
  const userName = page.getByPlaceholder("Username");
  await userName.fill("Admin");
  await expect(userName).toHaveValue("Admin");

  //Enter password as admin123 Password should be entered successfully
  const passWord = page.getByPlaceholder("Password");
  await passWord.fill("admin123");
  await expect(passWord).toHaveValue("admin123");

  //Click on Login button User should be logged in and dashboard
  //should be displayed

  const LoginButton = page.getByRole("button", { name: "Login" });
  await LoginButton.click();
  await expect(page.getByRole("link", { name: "PIM" })).toBeVisible();

  //Click on PIM menu   PIM page should be opened
  await page.getByRole("link", { name: "PIM" }).click();
  await expect(page.getByRole("heading", { name: "PIM" })).toBeVisible();

  //Click on Job Title dropdown ,Dropdown options should be displayed
  const jobTitleDropdown = page.locator("form i").nth(2);
  await jobTitleDropdown.click();
  //await page.waitForTimeout(5000);
  //difference between jquery dropdown and bootstrap dropdown - bootstrap doesnot have a selector tag and options are not visible after clicking it and inspecting
  /*there are 3 ways to capture the hidden options 
  1.by clicking on debugger option in selectors hub, and click on dropdown,we get the options , 
  the screen freezes, then capture the options.*/

  //check dropdown is visible
  const options = page.locator("div[role='listbox'] span");
  await expect(options.first()).toBeVisible();

  //Capture all dropdown options

  const optionsText = await options.allTextContents();

  //Count number of options
  const optionsCount = await options.count();
  console.log("Number of Options: ", optionsCount);

  //Iterate through options and print each one
  //Find option "Automaton Tester" Matching option should be identified
  for (let i = 0; i < optionsCount; i++) {
    const option = options.nth(i);
    const optionText = await option.textContent();
    console.log(`${optionText}`);
    if (optionText == "Automaton Tester") {
      option.click();
      break;
    }
  }

  //verification of selected value in the dropdown
  await expect(page.locator(".oxd-select-text-input").nth(2)).toHaveText(
    "Automaton Tester",
  );
});
