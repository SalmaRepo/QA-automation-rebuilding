import { test, expect } from "@playwright/test";

test("CSS Xpath locators practice", async ({ page }) => {
  //Locate the search input by #id and by .class[name="q"] — fill and
  //assert value with toHaveValue() using both selectors

  await page.goto(
    "https://qa-practice-html-pages.vercel.app/css_xpath_locators.html",
  );

  const searchId = page.locator("#search-box");
  await searchId.fill("Lenovo Laptop");
  await expect(searchId).toHaveValue("Lenovo Laptop");
  const searchClass = page.locator(".search-input");
  await searchClass.fill("Dell Laptop");
  await expect(searchClass).toHaveValue("Dell Laptop");

  //Run `form > input` (assert count 1, direct child only) AND
  //`form input` (assert count 2, includes nested) on #profile-form —
  //explain the > vs space difference

  //direct child with >
  const formInputDirect = page.locator("form#profile-form>input");
  await expect(formInputDirect).toHaveCount(1);

  const formChilds = page.locator("form#profile-form input");
  await expect(formChilds).toHaveCount(2); // with space we get all the child elements

  //Use sibling combinator `label + input` to find the radio button right
  //after the Basic Plan label — assert its id

  const radio1 = page.locator("label[for='plan-basic']+input");
  await expect(radio1).toHaveAttribute("id", "plan-basic");

  //Run all three attribute operators in one test: [href*="computer"]
  //(contains, count 2), [href^="/build"] (starts-with, count 2),
  //[href$=".pdf"] (ends-with, count 2)
  const computers = page.locator("a[href*='computer']");
  console.log("contains computer: ", await computers.count());
  await expect(computers).toHaveCount(2);

  const builds = page.locator("a[href^='/build']");
  console.log("starts with build: ", await builds.count());
  await expect(builds).toHaveCount(2);

  const pdfs = page.locator("a[href$='.pdf']");
  console.log("ends with pdf: ", await pdfs.count());
  await expect(pdfs).toHaveCount(2);

  //XPath position() and last() together: get the 3rd <li> in the My
  //Account sidebar ('Payment methods'), and the last <li> ('Wishlist')

  const listThird = await page
    .locator('//div[@class="column my-account"]//li[position()=3]')
    .textContent();
  const listLast = await page
    .locator('//div[@class="column my-account"]//li[last()]')
    .textContent();
  expect(listThird).toBe("Payment methods");
  expect(listLast).toBe("Wishlist");

  //Compare XPath contains(@href,'computer') vs starts-with(@href,
  //'/build') — assert both counts

  const computerContains = page.locator("//h2//a[contains(@href,'computer')]");
  await expect(computerContains).toHaveCount(2);

  const buildStartsWith = page.locator("//h2//a[starts-with(@href,'/build')]");
  await expect(buildStartsWith).toHaveCount(2);

  //Compare exact XPath text()='Register' (1 match) vs
  //contains(text(),'Login') (2 matches)

  const registerText = page.locator("//a[text()='Register']");
  await expect(registerText).toHaveCount(1);

  const containsRegister = page.locator("//a[contains(text(),'Login')]");
  await expect(containsRegister).toHaveCount(2);

  //Use the Playwright-specific CSS pseudo-class :visible — assert it
   //matches only the visible button, not the hidden one
   const visibleBtn = page.locator('#visible-btn:visible');
await expect(visibleBtn).toBeVisible();

const hiddenBtn = page.locator('#hidden-btn:visible');
await expect(hiddenBtn).toHaveCount(0);

  // 9. Use attribute-existence selectors: [disabled] → toBeDisabled(),
  //    [required] → toHaveAttribute('required', '')
  const disabledInput = page.locator('[disabled]');
  await expect(disabledInput).toBeDisabled();

  const requiredInput = page.locator('[required]');
  await expect(requiredInput).toHaveAttribute('required', '');

  // 10. Use :nth-child(3) on the color boxes — assert text is '3'
  const thirdBox = page.locator('.box:nth-child(3)');
  await expect(thirdBox).toHaveText('3');

  // 11. XPath axes: preceding-sibling::span[1] from #crumb-current
  //     (assert 'Electronics'), and ancestor::div[@id='laptop-section']
  //     from .section-desc (assert visible)
  const precedingCrumb = page.locator("//span[@id='crumb-current']//preceding-sibling::span[1]");
  await expect(precedingCrumb).toHaveText('Electronics');

  const ancestorSection = page.locator("//p[@class='section-desc']//ancestor::div[@id='laptop-section']");
  await expect(ancestorSection).toBeVisible();

  // 12. Compare multiple attribute predicates — XPath vs CSS equivalent
  const xpathMultiAttr = page.locator("//button[@data-action='save' and @data-role='admin']");
  await expect(xpathMultiAttr).toHaveCount(1);

  const cssMultiAttr = page.locator('button[data-action="save"][data-role="admin"]');
  await expect(cssMultiAttr).toHaveCount(1);

  // 13. Use CSS :not() to select all .task items EXCLUDING .archived
  //     ones — assert count is 3
  const activeTasks = page.locator(".task:not(.archived)");
  await expect(activeTasks).toHaveCount(3);

  // 14. Use CSS :first-child and :last-child on the Menu Items list —
  //     assert 'Home' and 'Contact'. Then :nth-last-child(2) — 'About'
  const firstMenuItem = page.locator('#menu-list li:first-child');
  await expect(firstMenuItem).toHaveText('Home');

  const lastMenuItem = page.locator('#menu-list li:last-child');
  await expect(lastMenuItem).toHaveText('Contact');

  const nthLastMenuItem = page.locator('#menu-list li:nth-last-child(2)');
  await expect(nthLastMenuItem).toHaveText('About');

  // 15. Use CSS general sibling combinator (~) — from #username-input,
  //     select the error message even though .hint sits in between
  const errorMsg = page.locator('#username-label~.error-msg');
  await expect(errorMsg).toBeVisible();

  // 16. Use [id^="btn-"] to match BOTH dynamically-generated buttons —
  //     assert count is 2
  const dynamicButtons = page.locator('[id^="btn-"]');
  await expect(dynamicButtons).toHaveCount(2);

  // 17. Use XPath's normalize-space() on #padded-text — assert trimmed
  //     text equals 'Order Confirmed'
  const normalizedText = page.locator("//p[normalize-space()='Order Confirmed']");
  await expect(normalizedText).toBeVisible();

  // 18. Use XPath's parent:: axis from #inner-span to select its
  //     containing .outer div — assert visible
  const parentDiv = page.locator("//span[@id='inner-span']/parent::div");
  await expect(parentDiv).toBeVisible();

  // 19. Use XPath's or() in a predicate — assert count is 2
  const statusOr = page.locator("//span[@class='status' and (text()='Shipped' or text()='Delivered')]");
  await expect(statusOr).toHaveCount(2);



});
