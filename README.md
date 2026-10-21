# QA Automation Rebuilding

A structured record of rebuilding my QA automation skills with **Playwright and TypeScript**. Each folder holds the tests, notes and practice labs I wrote while learning a topic, committed as I went.

**Background:** ISTQB CTFL certified QA professional (manual testing and full-stack web development), returning to IT and building real depth in test automation.

## Tech stack

- Playwright (Test Runner)
- TypeScript
- Node.js
- VS Code
- Git and GitHub

## Learning path

Started with TypeScript fundamentals, then moved through Playwright topic by topic. Folders are numbered in learning order, not by time spent: some topics took a few days, others a few weeks.

| Folder | Focus | Status |
|--------|-------|--------|
| `01-playwright-fundamentals` | Setup and locators | Done |
| `02-playwright-actions` | Form elements, tables, date pickers, dialogs | Done |
| `03-playwright-interactions` | Browser contexts, tabs, files, mouse and keyboard, frames | Done |
| `04-playwright-advanced` | Assertions, storage, data-driven testing, reporting, Page Object Model | In progress |
| `05-api-testing` | API testing with Playwright | Planned |
| `06-mcp-and-ai` | Playwright MCP, agents, AI-assisted testing | Planned |

## What each folder covers

### 01-playwright-fundamentals
- Playwright setup and first tests
- Locators: `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`, `getByAltText`, `getByTitle`, `getByTestId`
- Filtering locators
- CSS selectors
- XPath, including operators and functions

### 02-playwright-actions
- Input boxes and radio buttons
- Checkboxes and form validations
- Dropdowns
- Web tables: static, dynamic and paginated
- Date pickers (custom elements)
- Dialogs and alerts

### 03-playwright-interactions
- Browser contexts, fixtures and emulation
- Multiple tabs and windows
- File upload and download
- Mouse and keyboard actions
- Scrolling techniques
- Shadow DOM and SVG elements
- Frames

### 04-playwright-advanced
- Assertions and auto-waiting (done)
- Cookies (done)
- Local and session storage (next)
- Parameterization and data-driven testing
- Grouping tests, hooks, annotations and tagging
- Screenshots, videos, traces and flaky tests
- Playwright and Allure reports
- Page Object Model

## Repository structure

```
QA-automation-rebuilding/
├── 01-playwright-fundamentals/
├── 02-playwright-actions/
├── 03-playwright-interactions/
├── 04-playwright-advanced/
│   ├── tests/
│   │   ├── Assertions and Autowaiting/
│   │   └── Cookies and Storage/
│   └── playwright.config.ts
├── downloads/
└── README.md
```

Each folder is its own Playwright project, with its own `tests/` folder and config.

## What's coming next

1. **Finish `04-playwright-advanced`:** storage, data-driven testing, hooks, reporting and Page Object Model.
2. **`05-api-testing`:** API basics, GET, POST, PATCH, PUT, DELETE, schema testing, mocking and network interception, API authentication.
3. **`06-mcp-and-ai`:** Playwright MCP, Playwright agents, AI-assisted test generation.
4. **Projects:** after the Page Object Model, I'll start building projects, each in its own repository.

## Running the tests

Run tests from inside the folder you want, for example:

```bash
cd 04-playwright-advanced
npm install
npx playwright install
npx playwright test
```

Tests can also be run from the VS Code Playwright Test Runner extension.

## Notes

- Generated folders (`node_modules/`, `test-results/`, `playwright-report/`, `storage-data/`) are not committed.