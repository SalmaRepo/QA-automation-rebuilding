import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://qa-practice-html-pages.vercel.app/locators_filters.html",
    { waitUntil: "domcontentloaded" },
  );
});

/*
=========================================
PLAYWRIGHT FILTER LOCATORS — PRACTICE TASKS

SECTION 1 — 









SECTION 7 —

SECTION 8 — 

*/

//Products (Card A & B)
//1. Filter Card A's list items to only "In stock" using hasText —
//assert count is 2
//2.Use CSS locator (`.card`) + `.nth()` to isolate Card B, then
// filter its items with hasNotText: 'Out of stock' — assert count is 2

test("products stocks filter", async ({ page }) => {
  const cardAInStock = page
    .locator(".card")
    .nth(0)
    .getByRole("listitem")
    .filter({ hasText: "In stock" });

  await expect(cardAInStock).toHaveCount(2);

  const cardBOutStock = page
    .locator(".card")
    .nth(1)
    .getByRole("listitem")
    .filter({ hasNotText: "Out of stock" });

  await expect(cardBOutStock).toHaveCount(2);
});

//SECTION 2 — Fruits (data-testid)
//3. Assert total count of page.locator('[data-testid]') is 6
//4. Use .nth(3) on that locator and console.log its innerText,
//then confirm it against getByTestId() for the same fruit directly
test("Fruits Count test", async ({ page }) => {
  //Assert total count of page.locator('[data-testid]') is 6
  const fruitsCount = page.locator("[data-testid]");
  await expect(fruitsCount).toHaveCount(6);

  //Use .nth(3) on that locator and console.log its innerText,
  const fourthFruit = await fruitsCount.nth(3).innerText();
  console.log(fourthFruit);

  const fruitByTestId = page.getByTestId("grape");
  //then confirm it against getByTestId() for the same fruit directly
  await expect(fruitByTestId).toHaveText(fourthFruit);
});

/*SECTION 3 — Team Directory
5.  Filter for hasText: 'John Carter' — notice
   it also catches "John Carter's Manager" since it's a text substring
   match. Figure out how to isolate just the first "John Carter" row, and
   be ready to explain WHY substring matching causes this in an interview
6. Filter role 'button' + hasText to separately count "Say hello"
   vs "Say goodbye" buttons*/

test("team directory tests filter chain", async ({ page }) => {
  //Filter for hasText: 'John Carter'
  const johnCarterEng = page
    .getByRole("listitem")
    .filter({ hasText: "John Carter" })
    .filter({ hasNotText: "Manager" });

  //it also catches "John Carter's Manager" since it's a text substring
  //match. Figure out how to isolate just the first "John Carter" row
  await expect(johnCarterEng).toHaveCount(1);

  //Filter role 'button' + hasText to separately count "Say hello"
  //vs "Say goodbye" buttons
  const teamButtonHello = page.getByRole("button", { name: "Say hello" });
  const teamButtonGoodBye = page.getByRole("button", { name: "Say goodbye" });

  await expect(teamButtonHello).toHaveCount(2);
  await expect(teamButtonGoodBye).toHaveCount(3);
});

/*SECTION 4 — Newsletter Widgets
7.  Use .and() to find elements that are BOTH
   role=button AND title="Subscribe" (exact) — assert count. Be ready to
   explain why the styled <span> and the "Subscribe now" text don't match
8.  Now try getByTitle('Subscribe', {exact:true}) alone, no .and()
   — the count differs from Task 7. Explain why in a comment: this is the
   classic "role vs attribute-only matching" interview question*/

test("newsLetter tests .and ", async ({ page }) => {
  //Use .and() to find elements that are BOTH
  //role=button AND title="Subscribe" (exact) — assert count. Be ready to
  const subscribeButtons = page
    .getByRole("button")
    .and(page.getByTitle("Subscribe", { exact: true }));
  console.log("Subscribers count: ", await subscribeButtons.count());
  await expect(subscribeButtons).toHaveCount(2);

  const subscribeButtonsByTitle = page.getByTitle("Subscribe", { exact: true });
  console.log(
    "Subscribers count by title only: ",
    await subscribeButtonsByTitle.count(),
  );
  await expect(subscribeButtonsByTitle).toHaveCount(3);

  // why the styled <span> and the "Subscribe now" text don't match
  //we are looking for role button that has exactly Subscribe text on it, thats why span wont match ,and since we are expecting exact true match of Subscribe , subscribe now wont match

  //why in a comment: this is the
  //classic "role vs attribute-only matching" interview question

  //becuase getByRole gets the elements that we are looking for the particular role eg.button, since we did not look for getByRole along with the title, link and span elements also got counted
});

/*9.Filter list items by hasText for each status: 'done',
   'pending', 'in-progress' — assert counts (2, 2, 1)
10.Find "details" buttons vs "edit" buttons separately — assert
    counts*/

test("status test hasText", async ({ page }) => {
  //Filter list items by hasText for each status: 'done',
  //'pending', 'in-progress' — assert counts (2, 2, 1)

  const taskList = page.getByRole("listitem");
  const statusDone = taskList.filter({ hasText: "done" });

  const statusPending = taskList.filter({ hasText: "pending" });

  const statusInProgress = taskList.filter({ hasText: "in-progress" });

  await expect(statusDone).toHaveCount(2);
  await expect(statusPending).toHaveCount(2);
  await expect(statusInProgress).toHaveCount(1);

  //Find "details" buttons vs "edit" buttons separately — assert counts

  const detailButtons = page.getByRole("button", { name: "details" });
  const editButtons = page.getByRole("button", { name: "edit" });

  await expect(detailButtons).toHaveCount(2);
  await expect(editButtons).toHaveCount(3);
});

/* SECTION 6 — Auth Entry Points (.or())
11. Build a locator with .or() matching
    EITHER the "Login" button OR the "Sign in" link. Before running,
    predict what .count() returns given BOTH currently exist on the page
    — then run it and compare. Be ready to explain .or()'s behavior when
    both sides match vs. only one exists */
test("or case test", async ({ page }) => {
  const loginButton = page.getByRole("button", { name: "Login" });
  const signInLink = page.getByText("Sign in");
  const authEntry = loginButton.or(signInLink);
  await expect(authEntry).toHaveCount(2);
  console.log("auth count:", await authEntry.count());
});

/* Notifications Feed (has / hasNot)
12. filter({has: page.locator('img')}) → notifications WITH an
    avatar, assert count is 3
13. filter({hasNot: page.locator('img')}) → notifications WITHOUT
    an avatar, assert count is 2
14. Chain two filters together: hasText: 'Mary' AND has: img —
    assert count is 1. Be ready to explain why chaining .filter() calls is
    different from combining conditions inside ONE .filter() call*/

test("has and has not test , filter chaining", async ({ page }) => {
  //filter({has: page.locator('img')}) → notifications WITH an
  // avatar, assert count is 3

  const notificationAvatar = page
    .locator(".card").nth(7)
    .getByRole("listitem")
    .filter({ has: page.locator("img") });

  await expect(notificationAvatar).toHaveCount(3);

  //filter({hasNot: page.locator('img')}) → notifications WITHOUT
  // an avatar, assert count is 2
  const notificationWithoutAvatar = page
    .locator(".card")
    .nth(7)
    .getByRole("listitem")
    .filter({ hasNot: page.locator("img") });

  await expect(notificationWithoutAvatar).toHaveCount(2);

  /*Chain two filters together: hasText: 'Mary' AND has: img —
    assert count is 1. Be ready to explain why chaining .filter() calls is
    different from combining conditions inside ONE .filter() call
    */

  const chainFilter = page
    .getByRole("listitem")
    .filter({ hasText: "Mary" })
    .filter({ has: page.locator("img") });

  await expect(chainFilter).toHaveCount(1);

  const combined = page
    .getByRole("listitem")
    .filter({ hasText: "Mary", has: page.locator("img") });

  await expect(combined).toHaveCount(1);
});

/* Warehouse A vs B (bonus, combines everything)
15. Use `.region` CSS + `.nth()` to isolate Warehouse B, then
    filter for hasText: 'In stock' — assert count is 2, confirm Warehouse
    A's items aren't picked up*/

test("bonus combined test", async ({ page }) => {
  //isolating warehouse B

  const houseB = page
    .locator(".region")
    .nth(1)
    .getByRole("listitem")
    .filter({ hasText: "In stock" });

  await expect(houseB).toHaveCount(2);
});
