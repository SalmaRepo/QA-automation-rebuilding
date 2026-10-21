/*
=====================================================
ASSERTIONS & AUTO-WAITING
=====================================================

-----------------------------------------------------
AUTO-RETRYING ASSERTIONS
-----------------------------------------------------
Playwright automatically retries these assertions until:
  - The assertion passes
  - The assertion timeout is reached (default 5 seconds)

During this time Playwright continuously polls and retests the
element (every 100ms) until the expected condition is met or the
5 second window expires. If it expires without passing, the test
throws a timeout error.

Benefits:
  - Reduces flaky tests
  - No need for manual waits (waitForTimeout())
  - Ideal for modern asynchronous web applications
  - Must be used with await

  await expect(locator).toBeVisible();

Default assertion timeout: 5 seconds. You can customize it globally:

  // playwright.config.ts
  export default defineConfig({
    expect: {
      timeout: 10000
    }
  });

-----------------------------------------------------
NON-RETRYING ASSERTIONS
-----------------------------------------------------
These assertions do not retry automatically. Since web pages
update asynchronously, excessive use of non-retrying assertions
can make tests flaky.

-----------------------------------------------------
AUTO-RETRYING ASSERTIONS (TYPES)
-----------------------------------------------------
- Visibility assertions
    toBeAttached(), toBeVisible(), toBeHidden(),
    toHaveAccessibleDescription(), toHaveAccessibleName()

- State assertions
    toBeChecked(), toBeDisabled(), toBeEditable(),
    toBeEnabled(), toBeFocused()

  ARIA labels (Accessible Rich Internet Applications):
  provides a standard for ARIA roles and attributes.

- Text assertions
    toContainText()  -> partial text
    toHaveText()     -> exact text
    toHaveValue(), toHaveValues()  -> for text we provided

- Attributes & properties
    toContainClass() -> to find one or more
    toHaveClass()    -> exact
    toHaveAttribute(), toHaveCSS(), toHaveId()

- Count assertions
    toHaveCount()

- Role assertions
    toHaveRole()  -> verifies ARIA role

- Page assertions
    toHaveTitle(), toHaveURL()

- API assertions
    toBeOK()

-----------------------------------------------------
NON-RETRYING ASSERTIONS (TYPES)  -> no await here
-----------------------------------------------------
- Value assertions
    toBe(), toEqual(), expect(value).toStrictEqual(),
    toBeDefined(), toBeUndefined(), toBeNull(),
    toBeTruthy(), toBeFalsy(), toBeNaN()

- Numeric assertions
    toBeCloseTo()  -> verifies two floating point numbers are
                      approximately equal
    toBeGreaterThan(), toBeGreaterThanOrEqual(),
    toBeLessThan(), toBeLessThanOrEqual()

- Collection & string assertions
    toContain(), toContainEqual(), toHaveLength(),
    toHaveProperty(), toMatch(), toMatchObject(),
    toBeInstanceOf()

-> Asymmetric matchers
   Useful for flexible matching inside other assertions.
   any(), anything(), arrayContaining(), arrayOf(), closeTo()

   expect(user).toEqual({ id: expect.any(Number) });

-> Negating assertions
   Use .not to verify the opposite condition.

   expect(value).not.toEqual(0);
   await expect(locator).not.toContainText("Admin");

-----------------------------------------------------
SOFT ASSERTIONS
-----------------------------------------------------
Normally a failed assertion stops test execution.
Soft assertions continue execution while marking the test as failed.

  await expect.soft(locator).toHaveText('welcome');
  console.log('This line still executes');

Use soft assertions when:
  - Collecting multiple failures
  - End-to-end validation
  - Form verification
  - UI regression testing

// soft-vs-hard-assertions.spec.ts

import { test, expect } from '@playwright/test';

test('Hard assertions example', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  // This assertion will fail & remaining assertions will not execute
  await expect(page).toHaveTitle('Demo web Shop2');
  await expect(page).toHaveURL('https://demowebshop.tricentis.com/');

  const logo = page.locator('img[alt="Tricentis Demo Web Shop"]');
  await expect(logo).toBeVisible();
  await page.waitForTimeout(5000);
});

test('Soft Assertions Example', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  await expect.soft(page).toHaveTitle('Demo web shop2');
  await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');

  const logo = page.locator('img[alt="Tricentis Demo Web Shop"]');
  await expect.soft(logo).toBeVisible();
  await page.waitForTimeout(5000);
});

-----------------------------------------------------
toHaveText() vs toContainText()
-----------------------------------------------------
Both assertions verify the visible text of an element, but they
differ in how strictly they compare the text.

Feature             | toHaveText()                 | toContainText()
--------------------|------------------------------|---------------------------
Comparison          | Exact text                   | Partial text
Match type          | Full match                   | Substring match
Best used when      | You know the complete        | You only need to verify
                    | expected text                | part of the text
Ignores extra spaces| yes                          | yes

-----------------------------------------------------
toHaveText() vs toHaveValue()
-----------------------------------------------------
These assertions verify different properties of an element.

Feature   | toHaveText()                       | toHaveValue()
----------|------------------------------------|---------------------------
Verifies  | Visible text                       | Value attribute
Used for  | Headings, labels, links, buttons,  | Textboxes, text areas,
          | paragraphs, divs                   | dropdowns
Checks    | Text displayed on screen           | User entered or selected
          |                                    | value

-----------------------------------------------------
AUTO-WAITING (auto-waiting.spec.ts)
-----------------------------------------------------
import { test, expect } from '@playwright/test';

test('auto waiting', async ({ page }) => {
  // test.setTimeout(2000);
  // test.slow();

  await page.goto('https://demowebshop.tricentis.com/');

  await expect(page).toHaveURL('https://demowebshop.tricentis.com/', { timeout: 10000 });

  await expect(page.locator('text=Welcome to our store')).toBeVisible();

  // By autowaiting Playwright will check the actionability checks like:
  // Visible, Stable, Receives Events, enabled, editable.

  // We can force stop the actionability checks:
  await page.locator('#small-searchterms').fill('Laptop');
  await page.locator('.button-1.search-box-button').click({ force: true });
});

=====================================================
PLAYWRIGHT WAITING METHODS
=====================================================

Method                                    | Waits for
------------------------------------------|---------------------------------
page.waitForLoadState('domcontentloaded') | HTML document loaded
page.waitForLoadState('load')             | Entire page loaded
page.waitForLoadState('networkidle')      | No network requests for 500ms
page.waitForSelector()                    | Element appears in DOM
page.waitForTimeout()                     | Fixed amount of time
page.waitForURL()                         | URL changes
page.waitForFunction()                    | JS condition becomes true
page.waitForEvent()                       | Browser / page event occurs

Common usage:
  - Wait until DOM is ready
  - Wait for images, css, js
  - SPA applications (use cautiously)
  - Wait for dynamic elements
  - Debugging only
  - Navigation verification
  - Custom waiting conditions
  - Downloads, popups, dialogs

-----------------------------------------------------
waitForSelector() vs locator.waitFor()
-----------------------------------------------------
Playwright provides two ways to explicitly wait for elements:
  - page.waitForSelector()  (Legacy approach)
  - locator.waitFor()       (Recommended approach)

waitForSelector()
  ts:
  const element = await page.waitForSelector('#btn', { state: 'visible' });
  await element.click();

  Characteristics:
    - Selector-based
    - Returns an ElementHandle
    - Requires manual waiting
    - More flaky than the locator-based approach

  Pros / cons:
    (yes) Returns ElementHandle when required
    (yes) Useful for some low-level DOM operations
    -> Requires managing ElementHandle
    -> More prone to stale element issues
    -> Less maintainable
    -> Considered a legacy approach

locator.waitFor()
  ts:
  await page.locator('#btn').waitFor({ state: 'visible' });
  await page.locator('#btn').click();

  let button = page.locator('#btn');
      ^ locator            ^ selector

  Characteristics:
    - Uses Locator API
    - Auto-waiting support
    - Cleaner code
    - Handles dynamic DOM updates
    - Highly maintainable
    - Recommended by Playwright

Feature           | page.waitForSelector()      | locator.waitFor()
------------------|-----------------------------|---------------------------
Approach          | Selector based              | Locator based
Introduced        | Earlier Playwright API      | Modern Playwright Locator
                  | (legacy)                    | API (recommended)
Syntax            | page.waitForSelector(sel)   | locator.waitFor()
Works with        | CSS / XPath / Text selector | Locator object
Return type       | Promise<ElementHandle>      | Promise<void> (no return value)
Element reference | Returns an ElementHandle    | Continues using same locator
Autowaiting       | Only waits for the          | Integrates with Playwright's
                  | specified state             | built-in auto-waiting
Action chaining   | Not supported directly      | Supported naturally with
                  |                             | locator methods
Stability         | Less stable                 | More stable
Dynamic elements  | More (prone to issues)      | Handled better


*/