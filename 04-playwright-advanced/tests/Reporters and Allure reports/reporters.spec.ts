/*
playeright reporters are used to display and format the results of your test execution

types of reports- html, line,list,dot,json,junit,custom

in order to view the report immediately after running the test we do npx playwright show-report in CL , instead of that we can
add changes in config file in reports 

reporters:[['html',{open:'always',outputFolder:'my-reports'}]], //report opens in a folder

----------------
all other reporters
reporter:[
['html',{open:'always'}],
['list'],//detailed console output
['line'],//one-line progress output
['dot'],//minimal console output
['html',{open:'always',outputFolder:'my-reports'}],//HTML report 
['json',{outputFile:'myreports/results.json'}],//JSON report
['junit',{outputFile:'myreports/results.xml'}]//JUnit XML Report
['.tests/chapter_34_reporters_and_parallel_testing/customReporter.ts',{}]
['allure-playwright,{outputFolder:'allure-results}]//Allure report
]

------------------
we can also provide type in CLI
npx playwright test --reporter=html

----------------
Allure Reports
install -> npm install -g allure-commandline --save-dev


after installing check in C drive and program files if allure folder exists and also
go to environment variables and check in path if allure path is added

then install npm install -D allure-playwright

after test execution run ->allure generate ./allure-results -o ./allure-report --clean

allure open ./allure-report -->opens live server
*/
import { test, expect } from "@playwright/test";

test.describe("demowebshop Home page tests", () => {
  test("@P2 Regression logotest", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com");
    await expect(
      page.locator("img[alt='Tricentis Demo Web Shop']"),
    ).toBeVisible();
  });

  test("@P2 @Regression title test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com");
    expect(await page.title()).toContain("Demo Web Shop");
  });
});

test.describe("demowebshop User Login Tests", () => {
  test("@P1 @Sanity Login test with invalid credentials", async ({ page }) => {
    console.log("This test is expected to fail due to invalid credentials");
    await test.step("Open Login page", async () => {
      await page.goto("https://demowebshop.tricentis.com/login");
    });

    await test.step("Enter Login Credentials", async () => {
      await page.fill("#Email", "invalid@exmaple.com");
      await page.fill("#Password", "invalidpassword");
    });

    await test.step("Click login button", async () => {
      await page.locator('input[value="Log in"]').click();
    });

    await test.step("Verify unsuccesful login", async () => {
      //Assert user is still on loginpage
      await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
    });
  });

  test("@P1 @Sanity Login test with valid credentials", async ({ page }) => {
    await test.step("Open Login page", async () => {
      await page.goto("https://demowebshop.tricentis.com/login");
    });

    await test.step("Enter Login Credentials", async () => {
      await page.fill("#Email", "laura.taylor1234@exmaple.com");
      await page.fill("#Password", "test123");
    });

    await test.step("Click login button", async () => {
      await page.locator('input[value="Log in"]').click();
    });

    await test.step("Verify succesful login", async () => {
      const logoutLink = page.locator('a[href="/logout"]');
      await expect(logoutLink).toBeVisible({ timeout: 5000 });
    });
  });

  test("@P2 @Regression demowebshop search test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/login");
    await page.locator("#small-searchterms").fill("laptop");
    await page.locator("input[value='Search']").click();
    await expect
      .soft(page.locator("h2 a").nth(0))
      .toContainText("laptop", { ignoreCase: true });
  });

  //Failing test
  test("@P1 @Sanity demoblaze Login test", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html");
    await page.getByRole("link", { name: "Log in" }).click();
    await page.locator("#loginusername").fill("pavanol");
    await page.locator("#loginpassword").fill("test@123X");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.locator("#logout2")).toBeVisible();
    await expect(page.locator("#nameofuser")).toContainText("Welcome pavanol");
  });
});
