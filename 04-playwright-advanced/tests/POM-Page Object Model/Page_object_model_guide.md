# 📘 **Page Object Model (POM) in Playwright** 

## 🌟 **What is the Page Object Model (POM)?** 

The **Page Object Model (POM)** is a design pattern that helps organize Playwright automation code in a clean and structured way. 

In POM, **each web page (or an important section of a page)** is represented as a separate **class** . 

Instead of writing locators and page actions inside every test file, we keep them inside the corresponding page class. 

This makes the automation framework: 

- ✅ Easy to read 

- ✅ Easy to reuse 

- ✅ Easy to maintain 

- ✅ Easy to update when the UI changes 

# 🏗 **Main Parts of a Page Object** 

A Page Object class mainly contains **three parts** . 

## 1️⃣ **Locators** 

Locators identify the web elements available on a page. Instead of creating locators inside test files, we define them inside the Page Object. 

### **Example** 

```
usernameTextbox = this.page.getByLabel("Username");
loginButton = this.page.getByRole("button", { name: "Login" });
```

#### Here, 

`usernameTextbox` identifies the Username textbox. 

- `loginButton` identifies the Login button. 

This allows us to reuse these locators throughout the page class. 

## 2️⃣ **Constructor** 

The constructor receives Playwright's **Page** object. 

The `page` object allows the Page Object class to interact with the browser. 

### **Example** 

```
constructor(public page: Page) {}
```

Whenever we create an object of this class, Playwright automatically passes the current browser page. 

## 3️⃣ **Action Methods** 

Action methods contain the operations that a user performs on the page. 

For example: 

- Enter a username 

- Enter a password 

- Click the Login button 

- Search for a product 

- Add a product to the cart 

### **Example** 

```
async login(username: string, password: string) {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
}
```

Instead of writing these steps repeatedly in every test, we create one reusable method. 

Now any test can simply call: 

```
await loginPage.login("admin", "admin123");
```

# ✅ **Advantages of the Page Object Model** 

## ✔ **Easy to Maintain** 

If the application's UI changes, you only need to update the locator **in one place** , inside the Page Object. 

You don't have to modify every test file. 

## ✔ **Reusable** 

The same methods can be used in multiple test cases. 

### **Example** 

```
await loginPage.login("admin", "admin123");
```

The `login()` method can be reused wherever login is required. 

## ✔ **Cleaner Test Scripts** 

Test files contain only the test flow. 

All UI interaction code stays inside the Page Object. 

As a result, test cases become easier to read and understand. 

## ✔ **Less Duplicate Code** 

Common actions are written only once and reused throughout the project. 

This reduces duplicate code and makes maintenance easier. 

# 📌 **Best Practice** 

Keep the responsibilities of Page Objects and Test Files separate. 

## ✅ **Page Object Should Contain** 

- Locators 

- UI actions 

- Click 

   - Fill 

   - Select 

   - Hover 

Drag and Drop 

- etc. 

### **Example** 

```
async clickLogin() {
```

```
    await this.page.getByRole("button", { name: "Login" }).click();
}
```

## ✅ **Test File Should Contain** 

Test scenarios 

- Test data 

- Validations 

- Assertions using `expect()` 

### **Example** 

```
await loginPage.clickLogin();
```

```
await expect(page).toHaveURL(/dashboard/);
```

Notice that the assertion is written inside the test file, not inside the Page Object. 

# 💡 **Easy Way to Remember** 

### 🧩 **Page Object** 

**"How to perform actions on the page."** 

#### Examples: 

- Click buttons 

- Enter text 

- Select dropdown values 

- Navigate through the application 

### 🧪 **Test File** 

#### **"What should be verified after performing those actions."** 

Examples: 

- Verify the page URL 

- Verify a success message 

- Verify a product is displayed 

- Verify a user is logged in 

Keeping these responsibilities separate makes the framework easier to understand, maintain, and scale. 

# 💻 **Code Explanation** 

In this example, we automate the **Demoblaze** web application. 

**Application URL** 

#### **https://www.demoblaze.com/index.html** 

The framework is developed using the **Page Object Model (POM)** design pattern. 

# ✨ **What is Implemented?** 

The framework separates different responsibilities into different files. 

### 🧪 **Test Files** 

#### Contain: 

- Test scenarios 

- Assertions 

- Overall test flow 

### 📄 **Page Object Classes** 

Contain: 

Locators 

UI actions 

Reusable methods 

This separation makes the framework: 

- ✅ Clean 

- ✅ Reusable 

- ✅ Easy to maintain 

- ✅ Easy to scale for large projects 

If the application's UI changes, most updates are required only inside the Page Object classes. 

# 📄 **Page Object Classes** 

## 🔐 **LoginPage** 

Handles all login-related operations. 

### **Responsibilities** 

- Open the Login dialog 

- Enter the username 

- Enter the password 

- Click the Login button 

## 🏠 **HomePage** 

Handles interactions on the application's Home page. 

### **Responsibilities** 

- Open product details 

- Add products to the shopping cart 

- Navigate to the Cart page 

## <u>🛒</u> **CartPage** 

Handles shopping cart operations. 

### **Responsibilities** 

- Verify products in the cart 

- Remove products from the cart 

- Validate the cart status 

## 📝 **SignUpPage** 

Handles new user registration. 

### **Responsibilities** 

- Open the Sign Up dialog 

- Enter username 

- Enter password 

- Submit the registration form 

# 🔄 **End-to-End Test Flow** 

The test file **`pomtest.spec.ts`** performs the following workflow: 

1. 📝 Register a new user 

2. 🔐 Log in using the newly created account 

3. 🛍 Add a product to the shopping cart 

4. ✅ Verify the product is added to the cart 

5. ❌ Remove the product from the cart 

This demonstrates how multiple Page Object classes work together to complete a real user journey. 

# 📁 **Project Folder Structure** 

- `project-root/ ├── pages/ │   ├── HomePage.ts │   ├── LoginPage.ts │   ├── CartPage.ts │   └── SignUpPage.ts │` 

```
└── tests/
    └── pomtest.spec.ts
```

### 📂 **Explanation** 

**pages/** → Contains all Page Object classes. 

**tests/** → Contains Playwright test files. 

This folder structure keeps the project organized and easy to navigate. 

# 🏗 **Architecture Diagram** 

```
flowchart TD
```

`A[pomtest.spec.ts] --> B[` 🔐 `LoginPage]` 

`A --> C[` 🏠 `HomePage]` 

`A --> D[` 🛒 `CartPage]` 

`A --> E[` 📝 `SignUpPage]` 

```
    B --> F[Demoblaze Login UI]
```

```
    C --> G[Demoblaze Home UI]
```

```
    D --> H[Demoblaze Cart UI]
```

```
    E --> I[Demoblaze Sign Up UI]
```

📖 **Diagram Explanation** 

The **test file (** **`pomtest.spec.ts` )** controls the overall test flow. 

It calls methods from different **Page Object classes** whenever required. 

Each Page Object class interacts only with its corresponding page in the application. 

This separation keeps the test code simple while making the Page Objects reusable across multiple 

test cases. 

