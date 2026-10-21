/*SVG elements are slightly different from normal HTML elements because 
they use <svg> tags,<circle>,<rect>,<path>,<line> etc, Playwright handles svg elements as any other
DOM element, you can locate them using css,xpath,attributes or text

<svg width="100" height="100">
<circle 
id='playBtn'
cx='50
cy='50'
r='40'
fill='green'>
</circle>
</svg>

in selenium general standard xpath will not work to locate

in playwright we can locate svg elements normally

*/

import { test, expect } from "@playwright/test";

const url = "https://sdetqa.vercel.app/autoplay";

test.describe("svg handling", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("shape tests", async ({ page }) => {
    let circle = page.locator("svg circle");
    await expect(circle).toBeVisible();
    await circle.click();

    const rect = page.locator("#rect-shape");
    await rect.click();

    circle = page.locator("circle[fill='DeepSkyBlue']");
    await expect(circle).toBeVisible();

    const fill = await page.locator("svg circle").getAttribute("fill");
    expect(fill).toBe("DeepSkyBlue");

    const shapes_count = page.locator(".shape");
    console.log(await shapes_count.count());
    expect(shapes_count).toHaveCount(4);
  });

  test("handle svg bar chart", async ({ page }) => {
    await page.locator("svg rect").nth(1).click();
    const bars = page.locator("svg").nth(1).locator("rect");
    const bars_count = await bars.count();
    expect(bars_count).toBe(5);

    const labels = page.locator("svg").nth(1).locator("text");
    const labels_count = await labels.count();
    expect(labels_count).toBe(5);

    expect(bars_count).toEqual(labels_count);

    for (let i = 0; i < bars_count; i++) {
      const label = await labels.nth(i).textContent();
      const height = await bars.nth(i).getAttribute("height");
      console.log(`${label}:${height}`);
    }
    let maxHeight = 0;
    for (let i = 0; i < bars_count; i++) {
      const height = Number(await bars.nth(i).getAttribute("height"));
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    expect(maxHeight).toBe(70);
  });
});
