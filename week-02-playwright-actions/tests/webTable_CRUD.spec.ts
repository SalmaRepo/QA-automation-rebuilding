import { test, expect, Locator } from "@playwright/test";

test("Web Table CRUD Validations", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay.html");
  page.on("dialog", (dialog) => dialog.accept());

  //The page opens successfully and the Web Table with xCRUD section is displayed.
  await expect(
    page.getByText("Web Table with CRUD ", { exact: true }),
  ).toBeVisible();

  const table = page.locator("#dynamicTable");
  const tableHead = table.locator("thead th");
  const tableRows = table.locator("tbody tr");
  const rowCount = await tableRows.count();
  const columnCount = await tableHead.count();

  //Verify the CRUD table is displayed.
  const tableHeadTexts = await tableHead.allInnerTexts();
  expect(tableHeadTexts).toEqual(["#", "Name", "Role", "Action"]);

  // Verify the input fields and buttons
  const name = page.getByPlaceholder("Name");
  await expect(name).toBeVisible();
  await expect(name).toBeEnabled();
  const role = page.getByPlaceholder("Role");
  await expect(role).toBeVisible();
  await expect(role).toBeEnabled();
  const search = page.getByPlaceholder("Search table...");
  await expect(search).toBeVisible();
  await expect(search).toBeEnabled();
  const addButton = page.getByRole("button", { name: "Add" });
  await expect(addButton).toBeVisible();
  await expect(addButton).toBeEnabled();
  const dynamicButton = page.getByRole("button", { name: "Dynamic" });
  await expect(dynamicButton).toBeVisible();
  await expect(dynamicButton).toBeEnabled();
  const deleteButtons = page.getByRole("button", { name: "Delete" });

  //Verify the default table data. The table contains two records: Alice and Bob.

  const tableInfo: string[][] = [];

  for (let r = 0; r < rowCount; r++) {
    const tableData = tableRows.nth(r).locator("td");
    const cells = await tableData.allInnerTexts();
    tableInfo.push(cells);
  }

  //console.log(tableInfo);
  const nameInfo = [];
  for (let i = 0; i < tableInfo.length; i++) {
    nameInfo.push(tableInfo[i][1]);
  }

  expect(nameInfo).toEqual(["Alice", "Bob"]);

  // Enter Sam Tester as Name and QA Lead as Role. Click Add.
  await name.fill("Sam Tester");
  await role.fill("QA Lead");
  await addButton.click();
  const newInfo = await tableRows.nth(2).locator("td").allInnerTexts();
  expect(newInfo[1]).toEqual("Sam Tester");

  let newData: string[][] = [];
  let updatedRows = table.locator("tbody tr");
  let updatedRowCount = await updatedRows.count();
  //console.log( updatedRowCount);
  for (let r = 0; r < updatedRowCount; r++) {
    const tableData = updatedRows.nth(r).locator("td");
    const cells = await tableData.allInnerTexts();
    newData.push(cells);
  }

  expect(updatedRowCount).toEqual(3);
  let newData1: string[][] = [];
  //Search for Alice in the search box Only the Alice record is visible, and other rows are hidden.
  await search.fill("Alice");
  const visibleRows = table.locator("tbody tr:visible");
  const visibleRowCount = await visibleRows.count();
  expect(visibleRowCount).toEqual(1);

  const visibleRowText = await visibleRows
    .first()
    .locator("td")
    .allInnerTexts();
  expect(visibleRowText[1]).toEqual("Alice");

  //Clear the search box.All table rows become visible again

  await search.clear();
  const AllRows = table.locator("tbody tr");
  const allRowCount = await AllRows.count();
  expect(allRowCount).toEqual(3);

  //Delete the Bob record by clicking Delete and accept the confirmation dialog.
  const newRows: string[][] = [];
  for (let r = 0; r < allRowCount; r++) {
    const tableData = AllRows.nth(r).locator("td");
    const cells = await tableData.allInnerTexts();
    if (cells[1] == "Bob") {
      await deleteButtons.nth(r).click();
      continue;
    } 
    
  }
  const updatedCountAfterDelete=await AllRows.count()

  for (let r = 0; r < updatedCountAfterDelete; r++) {
    const tableData = AllRows.nth(r).locator("td:visible");
    const cells = await tableData.allInnerTexts();
    newRows.push(cells)
    
  }

  expect(newRows.length).toEqual(2);

  //Click the + Dynamic button.A new dynamic record is added to the table with values such
  //as New and Dev, confirming the button works successfully.\
  const rowsAfterDynamic: string[][] = [];
  await dynamicButton.click();
  const dynamicRows = table.locator("tbody tr");
  const dynamicRowCount = await dynamicRows.count();
  expect(await dynamicRows.last().locator("td").allInnerTexts()).toEqual([
    "3",
    "New",
    "Dev",
    "Delete",
  ]);

  /*import { test, expect, Locator } from "@playwright/test";

// Reads all rows from a given rows locator and returns their cell text as a 2D array
async function getTableData(rows: Locator): Promise<string[][]> {
  const count = await rows.count();
  const data: string[][] = [];
  for (let r = 0; r < count; r++) {
    const cells = await rows.nth(r).locator("td").allInnerTexts();
    data.push(cells);
  }
  return data;
}

test("Web Table CRUD Validations", async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay.html");

  // Auto-accept any confirmation dialogs (needed for the Delete step)
  page.on("dialog", (dialog) => dialog.accept());

  // 1. Page opens with CRUD table section visible
  await expect(
    page.getByText("Web Table with CRUD ", { exact: true }),
  ).toBeVisible();

  const table = page.locator("#dynamicTable");
  const tableHead = table.locator("thead th");
  const tableRows = table.locator("tbody tr");

  // 2. Verify table headers
  const tableHeadTexts = await tableHead.allInnerTexts();
  expect(tableHeadTexts).toEqual(["#", "Name", "Role", "Action"]);

  // 3. Verify inputs and buttons
  const name = page.getByPlaceholder("Name");
  const role = page.getByPlaceholder("Role");
  const search = page.getByPlaceholder("Search table...");
  const addButton = page.getByRole("button", { name: "Add" });
  const dynamicButton = page.getByRole("button", { name: "Dynamic" });

  for (const field of [name, role, search, addButton, dynamicButton]) {
    await expect(field).toBeVisible();
    await expect(field).toBeEnabled();
  }

  // 4. Verify default table data (Alice, Bob)
  const initialData = await getTableData(tableRows);
  const initialNames = initialData.map((row) => row[1]);
  expect(initialNames).toEqual(["Alice", "Bob"]);

  // 5. Add Sam Tester / QA Lead
  await name.fill("Sam Tester");
  await role.fill("QA Lead");
  await addButton.click();

  await expect(tableRows).toHaveCount(3);
  const afterAddData = await getTableData(tableRows);
  expect(afterAddData[2][1]).toEqual("Sam Tester");

  // 6. Search for Alice — only her row should be visible
  await search.fill("Alice");
  const visibleRows = table.locator("tbody tr:visible");
  await expect(visibleRows).toHaveCount(1);
  const visibleData = await getTableData(visibleRows);
  expect(visibleData[0][1]).toEqual("Alice");

  // 7. Clear search — all rows visible again
  await search.clear();
  await expect(table.locator("tbody tr:visible")).toHaveCount(3);

  // 8. Delete Bob (dialog auto-accepted via the handler above)
  const beforeDeleteData = await getTableData(tableRows);
  const bobRowIndex = beforeDeleteData.findIndex((row) => row[1] === "Bob");
  const deleteButtons = page.getByRole("button", { name: "Delete" });
  await deleteButtons.nth(bobRowIndex).click();

  // Verify against the REAL DOM state after deletion, not a locally-built array
  await expect(tableRows).toHaveCount(2);
  const afterDeleteData = await getTableData(tableRows);
  expect(afterDeleteData.map((row) => row[1])).toEqual(["Alice", "Sam Tester"]);

  // 9. Click + Dynamic — new row added
  await dynamicButton.click();
  await expect(tableRows).toHaveCount(3);
  const afterDynamicData = await getTableData(tableRows);
  expect(afterDynamicData[afterDynamicData.length - 1].slice(1)).toEqual([
    "New",
    "Dev",
    "Delete",
  ]);
});*/
});
