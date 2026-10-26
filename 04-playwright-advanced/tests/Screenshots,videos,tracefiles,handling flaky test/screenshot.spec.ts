/*
Approaches to capture screenshots in playwright

1.programatically
2.Globally via playwright config file

*/

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https:playwright.dev");
});

//1.Screenshot of only the visible viewport (default)
test("Viewport screenshot", async ({ page }) => {
  await page.screenshot({ path: "screenshots/01-viewport.png" });
});

//Full page screenshot
test("Full page screenshot", async ({ page }) => {
  await page.screenshot({
    path: "screenshots/02-fullpage.png",
    fullPage: true,
  });
});

//JPEG screenshot with quality
//Quality works only with JPEG
test("JPEG Screenshot", async ({ page }) => {
  await page.screenshot({
    path: "screenshots/03-quality.jpg",
    type: "jpeg",
    quality: 70,
  });
});

//Capture specific area
//x,y,width,height

test("Clip screenshot", async ({ page }) => {
  await page.screenshot({
    path: "screenshots/04-clip.png",
    clip: {
      x: 100,
      y: 100,
      width: 700,
      height: 400,
    },
  });
});

//screenshot for particular element
test("Element screenshot", async ({ page }) => {
  const logo = page.locator(".navbar__brand"); //logo
  await logo.screenshot({
    path: "screenshots/05-logo.png",
  });
});

//screenshot after scrolling
test("screenshot after scroll", async ({ page }) => {
  await page.evaluate(() => window.scrollBy(0, 600));

  await page.screenshot({ path: "screenshots/06-scroll.png" });
});

//mask senitive elements

test("Screenshot with mask", async ({ page }) => {
  const serachBox = page.locator(".DocSearch-Button");
  await page.screenshot({
    path: "screenshots/07-mask.png",
    mask: [serachBox],
  });
});

//Hide caret - unwanted window
//useful while capturing forms
test("Hide caret", async ({ page }) => {
  await page.keyboard.press("/");
  await page.screenshot({
    path: "screenshots/08-hide-caret.png",
    caret: "hide",
  });
});

//omit background
//works with png only
//transparent background
test("Transparent background", async ({ page }) => {
  await page.screenshot({
    path: "screenshots/09-transparent.png",
    omitBackground: true,
  });
});

//Disable animation
test("Disable Animations", async ({ page }) => {
  await page.screenshot({
    path: "screenshots/10-no-animation.png",
    animations: "disabled",
  });
});

//Full page+mask+disable animation
//multiple options together

test("Multiple Screenshot options", async ({ page }) => {
  const searchBox = page.locator(".DocSearch-Button");
  await page.screenshot({
    path: "screenshots/13-combined.png",
    fullPage: true,
    mask: [searchBox],
    animations: "disabled",
  });
});

//Save screenshots with timestamps(dynamic)-preserves old screenshots
test("Dynamic name", async ({ page }, testInfo) => {
  const timestamp = Date.now();

  //Method1//Adding current milliseconds
  let fileName = `screenshots/homepage_${timestamp}.png`;
  await page.screenshot({ path: fileName });

  //Method 2//include testname+timestamp
  fileName = `screenshots/${testInfo.title}_${timestamp}.png`;
  await page.screenshot({ path: fileName });
});

//two ways to attach screenshot to html reports
//1.capture the screenshot,keep it in a place and then attach it to html report
//2.capture the screenshot which will be there in the buffer temporary location and then directly attach it to html report

//Capture screenshot in to buffer-temporary memory location
//(No file created)

test("Screenshot buffer", async ({ page }) => {
  const imageBuffer = await page.screenshot();
  console.log(`Buffer Size=${imageBuffer.length} bytes`);
});

//Attach screenshot to the html report
test("Attach Screenshot to Report", async ({ page }, testInfo) => {
  //capture screenshot as buffer, no file created
  const screenshot = await page.screenshot();

  //Attach HTML report
  await testInfo.attach("Homepage Screenshot", {
    
    body: screenshot,
    contentType: "image/png",
  });
});

//Save screenshot first,then attach it to html report
test('Attach saved screenshot',async ({page},testInfo)=>{
    const fileName=`screenshots/home_${Date.now()}.png`;
    await page.screenshot({path:fileName});
    await testInfo.attach('Homepage Screenshot',{
        path:fileName,
        contentType:'image/png'
    })

})
