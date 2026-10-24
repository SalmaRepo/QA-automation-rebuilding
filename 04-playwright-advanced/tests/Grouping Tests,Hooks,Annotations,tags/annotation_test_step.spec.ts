import { test, expect } from "@playwright/test";

//reports will be clean using test.step()
//npx playwright show-report

test("login without test.step()", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  await page.click("#login-button");
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".title")).toHaveText("Products");
});

test("login with test.step()", async ({ page }) => {
  await test.step("open login page", async () => {
    await page.goto("https://www.saucedemo.com");
  });

  await test.step("enter login credentials", async () => {
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
  });

  await test.step("click login button", async () => {
    await page.click("#login-button");
  });

  await test.step("very succesful login", async () => {
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toHaveText("Products");
  });
});

//returning values from test.step()

test("Return value from test.step()", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");

  const userName = await test.step("Get username", async () => {
    return "standard_user";
  });

  await test.step("Login", async () => {
    await page.fill("#user-name", userName);
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
  });

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".title")).toHaveText("Products");
});
