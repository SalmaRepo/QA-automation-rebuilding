import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to File upload page", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay");
  await expect(page).toHaveURL(/autoplay/);
});

test.afterEach("closing the page", async ({ page }) => {
  await page.close();
});

test("single file upload", async ({ page }) => {
  const singleFileInput = page.locator("#singleFileInput");
  const uploadSingleButton = page.getByRole("button", {
    name: "Upload Single File",
  });
  const uploadStatus = page.locator("#singleFileStatus");
  await singleFileInput.setInputFiles(`simple.txt`);
  await uploadSingleButton.click();
  await expect(uploadStatus).toHaveText(/Single file selected: simple.txt/);
  await page.waitForTimeout(5000);
});

test("multiple file upload", async ({ page }) => {
  const multipleFileInput = page.locator("#multipleFileInput");
  const uploadMultipleButton = page.getByRole("button", {
    name: "Upload Multiple Files",
  });
  await page.waitForLoadState("load"); //wait until page loads for second file upload
  const uploadStatus = page.locator("#multipleFileStatus");
  await multipleFileInput.setInputFiles(
    "uploads/simple.txt",
    "uploads/simple.txt",
  );
  await uploadMultipleButton.click();
  await expect(uploadStatus).toContainText(/simple.txt,simple.txt/);
  await page.waitForTimeout(5000)
});
