import { test, expect } from "@playwright/test";

test.describe("Dynamic Table", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/autoplay.html");
    await expect(page.getByText("Autoplay")).toBeVisible();
  });

  test("Chrome CPU load validation", async ({ page }) => {
    const rows = await page.locator("#taskTable tbody tr").all();
    const columnHead = await page.locator("#taskTable th").allInnerTexts();
    expect(rows.length).toBeGreaterThan(0);
    let cpuLoadChrome = "";
    //let indexOfCPU = 0;
    /*
    for (const column of columnHead) {
      if (column =="CPU (%)") {
        indexOfCPU = columnHead.indexOf(column);
      }
    }*/
    //validate cpu load in the table matches the red text
    for (const row of rows) {
      const processName = await row.locator("td").nth(0).innerText();

      if (processName == "Chrome") {
        //cpuLoadChrome = await row.locator("td").nth(indexOfCPU).innerText();
        //we can also do this by locator filter
        cpuLoadChrome = await row.locator("td", { hasText: "%" }).innerText();
        const expCPULoad = await page.locator(".chrome-cpu").innerText();
        expect(cpuLoadChrome).toBe(expCPULoad);
        break;
      }
    }

    //Validate format
    expect(cpuLoadChrome).toContain("%");
    const label = page.locator("strong.chrome-cpu");
    //validate label visiblle
    await expect(label).toBeVisible();

    //final validation
    await expect(label).toContainText(cpuLoadChrome);
  });

  test("Firefox Memory Usage Validation", async ({ page }) => {
    const rows = await page.locator("#taskTable tbody tr").all();
    expect(rows.length).toBeGreaterThan(0);
    let fireFoxMemory = "";
    for (const row of rows) {
      const processName = await row.locator("td").nth(0).innerText();

      if (processName == "Firefox") {
        fireFoxMemory = await row
          .locator("td", { hasText: /MB$/ }) //this is a regular expression where $ says there should not be any text after it 
          .innerText();
        const expFirefoxMemory = await page.locator(".firefox-memory").innerText();
        expect(fireFoxMemory).toBe(expFirefoxMemory);
        break;
      }
    }
    expect(fireFoxMemory).not.toBe("");
    expect(fireFoxMemory).toContain("MB");
    const label = page.locator("strong.firefox-memory");
    await expect(label).toBeVisible();
    await expect(label).toContainText(fireFoxMemory);
  });

  test("Chrome Network Speed Validation",async ({page})=>{
    const rows = await page.locator("#taskTable tbody tr").all();
    expect(rows.length).toBeGreaterThan(0);
    let chromeNetwork = "";
    for (const row of rows) {
      const processName = await row.locator("td").nth(0).innerText();

      if (processName == "Chrome") {
        chromeNetwork= await row
          .locator("td", { hasText: 'Mbps'})  
          .innerText();
        const expChromeNetwork = await page.locator(".chrome-network").innerText();
        expect(chromeNetwork).toBe(expChromeNetwork);
        break;
      }
    }
     expect(chromeNetwork).not.toBe("");
    expect(chromeNetwork).toContain("Mbps");
    const label = page.locator("strong.chrome-network");
    await expect(label).toBeVisible();
    await expect(label).toContainText(chromeNetwork);
  })

  test('Firefox Disk Space Validation',async ({page})=>{
    const rows = await page.locator("#taskTable tbody tr").all();
    expect(rows.length).toBeGreaterThan(0);
    let fireFoxDiskSpace = "";
    for (const row of rows) {
      const processName = await row.locator("td").nth(0).innerText();

      if (processName == "Firefox") {
        fireFoxDiskSpace = await row
          .locator("td", { hasText: 'MB/s' }) 
          .innerText();
        const expfireFoxDiskSpace = await page.locator(".firefox-disk").innerText();
        expect(fireFoxDiskSpace).toBe(expfireFoxDiskSpace);
        break;
      }
    }
    expect(fireFoxDiskSpace).not.toBe("");
    expect(fireFoxDiskSpace).toContain("MB");
    const label = page.locator("strong.firefox-disk");
    await expect(label).toBeVisible();
    await expect(label).toContainText(fireFoxDiskSpace);
  })
});
