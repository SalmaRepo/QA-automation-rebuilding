/*
Frames are different parts of a page
It is an HTML element that allows one web page to be embededded inside another web page.
ex-youtube videos,payment gateways,ads,external web pages
tag,frame,iframe,frameset-->contains multiple frames
page.frame(locator)--not autowaited
page.framelocator(locator)-->autowaited
*/
import { test, expect } from "@playwright/test";

test("frames", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames");
  //total number of frames present on page;
  const frames = page.frames();
  console.log("Number of frames", frames.length);
  expect(frames.length).toBe(7);
  //Approach1:using page.frame()-this approach is not recommended
  //pageframe() returns a frame object, it doesnot wait, can return null
  //after getting the frame object,we can locate and interact with the elemnts inside the frame
  const frame1 = page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_1",
  }); //1
  //page.locator('frameset').locator('frame').nth(0);//2
  //page.locator('frame["src="frame_1.html"]')//3
  if (frame1) {
    await frame1.locator("input[name='mytext1']").fill("Hello");
  } else {
    console.log("Frame1 is not available");
  }

  //Approach2-Using framelocator()
  //framelocator() is recommended approach because it directly locates elements inside an iframe without creating a frame object
  const txtName = page
    .frameLocator("frame[src='frame_1.html']")
    .locator("input[name='mytext1']");
  await txtName.fill("john");
});

test('inner frames',async ({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames");
    const frame3=page.frameLocator("frame[src='frame_3.html']");
    await frame3.locator("input[name='mytext3']").fill("welcome");

    //child inner frame
    const childFrame=frame3.frameLocator('iframe');
    await childFrame.getByRole('radio',{name:'I am a human'}).check();
    await childFrame.getByRole('checkbox',{name:'Form Autofilling'}).check()
})