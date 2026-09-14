//alert(),confirm(),prompt() dialogs/js alerts

//By default alerts are auto dismissed by playwright, so dont have to handle them
//however, you can register a dialog handler before the action that triggers the dialog
//to either dialog.accpet() or dialog.dismiss() it

import { test, expect } from "@playwright/test";

test.describe("Handle Dialog Alerts", () => {
  test.beforeEach("Navigate to the File Upload page", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/autoplay.html");
    await expect(page.getByText("AutoPlay")).toBeVisible();
  });

  test("Simple Dialog", async ({ page }) => {
    //awaits in the handler break the code
    page.on("dialog", (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toContain("Simple alert!");
      dialog.accept();
    });

    await page.getByRole("button", { name: "Simple" }).click();
  });

  test("Confirm Dialog", async ({ page }) => {
    //awaits in the handler break the code
    page.on("dialog", (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toContain("Confirm?");
      // dialog.accept()
      dialog.dismiss();
    });

    await page.getByRole("button", { name: "Confirm" }).click();
  });

  test("Prompt Dialog", async ({ page }) => {
    //awaits in the handler break the code
    page.on("dialog", (dialog) => {
      if (dialog.type() === "prompt") {
        dialog.accept("Welcome");
      } else if (dialog.type() === "alert") {
        dialog.accept();
      }
    });

    await page.getByRole("button", { name: "Prompt" }).click();
  });
});
