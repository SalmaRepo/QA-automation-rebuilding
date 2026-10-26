# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Reporters and Allure reports\reporters.spec.ts >> demowebshop User Login Tests >> @P1 @Sanity demoblaze Login test
- Location: tests\Reporters and Allure reports\reporters.spec.ts:110:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#logout2')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" locator('#logout2') with timeout 5000ms
  - waiting for locator('#logout2')
    13 × locator resolved to <a href="#" id="logout2" class="nav-link" onclick="logOut()">Log out</a>
       - unexpected value "hidden"

```

```yaml
- dialog "Log in":
  - document:
    - heading "Log in" [level=5]
    - button "Close"
    - text: "Username:"
    - textbox: pavanol
    - text: "Password:"
    - textbox: test@123X
    - button "Close"
    - button "Log in"
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: cart.html
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
  - list:
    - listitem
    - listitem
    - listitem
  - img "First slide"
  - img "Second slide"
  - button "Previous"
  - button "Next"
- link "CATEGORIES":
  - /url: ""
- link "Phones":
  - /url: "#"
- link "Laptops":
  - /url: "#"
- link "Monitors":
  - /url: "#"
- link:
  - /url: prod.html?idp_=1
- heading "Samsung galaxy s6" [level=4]:
  - link "Samsung galaxy s6":
    - /url: prod.html?idp_=1
- heading "$360" [level=5]
- paragraph: The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.
- link:
  - /url: prod.html?idp_=2
- heading "Nokia lumia 1520" [level=4]:
  - link "Nokia lumia 1520":
    - /url: prod.html?idp_=2
- heading "$820" [level=5]
- paragraph: The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.
- link:
  - /url: prod.html?idp_=3
- heading "Nexus 6" [level=4]:
  - link "Nexus 6":
    - /url: prod.html?idp_=3
- heading "$650" [level=5]
- paragraph: The Motorola Google Nexus 6 is powered by 2.7GHz quad-core Qualcomm Snapdragon 805 processor and it comes with 3GB of RAM.
- link:
  - /url: prod.html?idp_=4
- heading "Samsung galaxy s7" [level=4]:
  - link "Samsung galaxy s7":
    - /url: prod.html?idp_=4
- heading "$800" [level=5]
- paragraph: The Samsung Galaxy S7 is powered by 1.6GHz octa-core it comes with 4GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 200GB via a microSD card.
- link:
  - /url: prod.html?idp_=5
- heading "Iphone 6 32gb" [level=4]:
  - link "Iphone 6 32gb":
    - /url: prod.html?idp_=5
- heading "$790" [level=5]
- paragraph: It comes with 1GB of RAM. The phone packs 16GB of internal storage cannot be expanded. As far as the cameras are concerned, the Apple iPhone 6 packs a 8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies.
- link:
  - /url: prod.html?idp_=6
- heading "Sony xperia z5" [level=4]:
  - link "Sony xperia z5":
    - /url: prod.html?idp_=6
- heading "$320" [level=5]
- paragraph: Sony Xperia Z5 Dual smartphone was launched in September 2015. The phone comes with a 5.20-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 424 pixels per inch.
- link:
  - /url: prod.html?idp_=7
- heading "HTC One M9" [level=4]:
  - link "HTC One M9":
    - /url: prod.html?idp_=7
- heading "$700" [level=5]
- paragraph: The HTC One M9 is powered by 1.5GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card.
- link:
  - /url: prod.html?idp_=8
- heading "Sony vaio i5" [level=4]:
  - link "Sony vaio i5":
    - /url: prod.html?idp_=8
- heading "$790" [level=5]
- paragraph: Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight.
- link:
  - /url: prod.html?idp_=9
- heading "Sony vaio i7" [level=4]:
  - link "Sony vaio i7":
    - /url: prod.html?idp_=9
- heading "$790" [level=5]
- paragraph: REVIEW Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight, higher-resolution display, more storage space, and a Blu-ray drive.
- list:
  - listitem:
    - button "Previous"
  - listitem:
    - button "Next"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store
```

# Test source

```ts
  16  | ['line'],//one-line progress output
  17  | ['dot'],//minimal console output
  18  | ['html',{open:'always',outputFolder:'my-reports'}],//HTML report 
  19  | ['json',{outputFile:'myreports/results.json'}],//JSON report
  20  | ['junit',{outputFile:'myreports/results.xml'}]//JUnit XML Report
  21  | ['.tests/chapter_34_reporters_and_parallel_testing/customReporter.ts',{}]
  22  | ['allure-playwright,{outputFolder:'allure-results}]//Allure report
  23  | ]
  24  | 
  25  | ------------------
  26  | we can also provide type in CLI
  27  | npx playwright test --reporter=html
  28  | 
  29  | ----------------
  30  | Allure Reports
  31  | install -> npm install -g allure-commandline --save-dev
  32  | 
  33  | 
  34  | after installing check in C drive and program files if allure folder exists and also
  35  | go to environment variables and check in path if allure path is added
  36  | 
  37  | then install npm install -D allure-playwright
  38  | 
  39  | after test execution run ->allure generate ./allure-results -o ./allure-report --clean
  40  | 
  41  | */
  42  | import { test, expect } from "@playwright/test";
  43  | 
  44  | test.describe("demowebshop Home page tests", () => {
  45  |   test("@P2 Regression logotest", async ({ page }) => {
  46  |     await page.goto("https://demowebshop.tricentis.com");
  47  |     await expect(
  48  |       page.locator("img[alt='Tricentis Demo Web Shop']"),
  49  |     ).toBeVisible();
  50  |   });
  51  | 
  52  |   test("@P2 @Regression title test", async ({ page }) => {
  53  |     await page.goto("https://demowebshop.tricentis.com");
  54  |     expect(await page.title()).toContain("Demo Web Shop");
  55  |   });
  56  | });
  57  | 
  58  | test.describe("demowebshop User Login Tests", () => {
  59  |   test("@P1 @Sanity Login test with invalid credentials", async ({ page }) => {
  60  |     console.log("This test is expected to fail due to invalid credentials");
  61  |     await test.step("Open Login page", async () => {
  62  |       await page.goto("https://demowebshop.tricentis.com/login");
  63  |     });
  64  | 
  65  |     await test.step("Enter Login Credentials", async () => {
  66  |       await page.fill("#Email", "invalid@exmaple.com");
  67  |       await page.fill("#Password", "invalidpassword");
  68  |     });
  69  | 
  70  |     await test.step("Click login button", async () => {
  71  |       await page.locator('input[value="Log in"]').click();
  72  |     });
  73  | 
  74  |     await test.step("Verify unsuccesful login", async () => {
  75  |       //Assert user is still on loginpage
  76  |       await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
  77  |     });
  78  |   });
  79  | 
  80  |   test("@P1 @Sanity Login test with valid credentials", async ({ page }) => {
  81  |     await test.step("Open Login page", async () => {
  82  |       await page.goto("https://demowebshop.tricentis.com/login");
  83  |     });
  84  | 
  85  |     await test.step("Enter Login Credentials", async () => {
  86  |       await page.fill("#Email", "laura.taylor1234@exmaple.com");
  87  |       await page.fill("#Password", "test123");
  88  |     });
  89  | 
  90  |     await test.step("Click login button", async () => {
  91  |       await page.locator('input[value="Log in"]').click();
  92  |     });
  93  | 
  94  |     await test.step("Verify succesful login", async () => {
  95  |       const logoutLink = page.locator('a[href="/logout"]');
  96  |       await expect(logoutLink).toBeVisible({ timeout: 5000 });
  97  |     });
  98  |   });
  99  | 
  100 |   test("@P2 @Regression demowebshop search test", async ({ page }) => {
  101 |     await page.goto("https://demowebshop.tricentis.com/login");
  102 |     await page.locator("#small-searchterms").fill("laptop");
  103 |     await page.locator("input[value='Search']").click();
  104 |     await expect
  105 |       .soft(page.locator("h2 a").nth(0))
  106 |       .toContainText("laptop", { ignoreCase: true });
  107 |   });
  108 | 
  109 |   //Failing test
  110 |   test("@P1 @Sanity demoblaze Login test", async ({ page }) => {
  111 |     await page.goto("https://www.demoblaze.com/index.html");
  112 |     await page.getByRole("link", { name: "Log in" }).click();
  113 |     await page.locator("#loginusername").fill("pavanol");
  114 |     await page.locator("#loginpassword").fill("test@123X");
  115 |     await page.getByRole("button", { name: "Log in" }).click();
> 116 |     await expect(page.locator("#logout2")).toBeVisible();
      |                                            ^ Error: expect(locator).toBeVisible() failed
  117 |     await expect(page.locator("#nameofuser")).toContainText("Welcome pavanol");
  118 |   });
  119 | });
  120 | 
```