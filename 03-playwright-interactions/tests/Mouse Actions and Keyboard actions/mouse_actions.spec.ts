import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to File upload page", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay");
  await expect(page).toHaveURL(/autoplay/);
});

test("1.Toggle button changes state when clicked", async ({ page }) => {
  const toggleButton = page.locator("#toggleBtn");
  const originalToggleText = await toggleButton.textContent();
  await page.waitForTimeout(5000);
  await toggleButton.click();
  await toggleButton.click();
  await page.waitForTimeout(5000);
  //await page.mouse.click(x: 1033.2000732421875, y: 233.96250915527344) ->based on coordinates
  //in order to get coordinates, inspect the element  and go to console and type
  //$0.getBoundingClientRect(), this gives x and y corodinates
  const toggledText = await toggleButton.textContent();
  console.log(toggledText);
  expect(toggledText).not.toBe(originalToggleText);
});

test("Right Click/Context Click", async ({ page }) => {
  const rightClickButton = page.locator("button", {
    hasText: "Right Click Me",
  });
  await rightClickButton.click({ button: "right" });
  await page.waitForTimeout(3000);
  //capture options and verify them if needed
  const allOptions = await page
    .locator("#customContextMenu button")
    .allInnerTexts();
  console.log(allOptions);
  expect(allOptions).toEqual([
    "Edit",
    "Cut",
    "Copy",
    "Paste",
    "Delete",
    "Quit",
  ]);
  let quitOption = page.locator("button", { hasText: "Quit" });
  await expect(quitOption).toBeVisible();
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("Quit");
    dialog.accept();
  });
  await quitOption.click();
});

test("Mouse hover interaction and tooltip", async ({ page }) => {
  const hoverButton = page.locator('Span:has-text("Hover me")');
  await hoverButton.hover();
  console.log("attribute value", await hoverButton.getAttribute("title"));
  expect(await hoverButton.getAttribute("title")).toBe("This is a tooltip");
});

test("Double click button triggers the expected action", async ({ page }) => {
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("Double clicked");
    dialog.accept();
  });
  await page.getByRole("button", { name: "Double Click" }).dblclick();
});

test("copy text button transfers text from field1 to field2", async ({
  page,
}) => {
  const field1 = page.locator("#field1");
  const field2 = page.locator("#field2");
  const copyTextButton = page.locator("button", { hasText: "Copy Text" });
  await field1.fill("welcome");
  await copyTextButton.dblclick();
  await page.waitForTimeout(3000);
  await expect(field2).toHaveValue("welcome");
});

test("Drag and drop the draggable element in to the drop zone", async ({
  page,
}) => {
  let sourceItem = page.getByText("Drag me");
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("Dropped");
    dialog.accept();
  });
  let targetItem = page.getByText("Drop Zone");
  await sourceItem.dragTo(targetItem);
});

test("Range Slider", async ({ page }) => {
  const slider = page.locator("#priceSlider");
  await slider.focus();
  await page.keyboard.press("Home");
  //await page.keyboard.press('End');
  for (let i = 0; i < 50; i++) {
    await page.keyboard.press("ArrowRight");
  }
  await expect(page.locator("#sliderVal")).toHaveText("50");
});
