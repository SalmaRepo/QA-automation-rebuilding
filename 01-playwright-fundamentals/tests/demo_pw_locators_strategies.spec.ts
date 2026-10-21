import {test,expect} from '@playwright/test'

test("playwright locators",async ({page})=>{

await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")

/*getByrole - find by semantic role and accessible name */
/* Role locators include buttons,checkboxes,headings,links,lists,tables,any many more 
and follow w3c specifications for ARIA role.
Prefer for interactive elements like buttons,checkboxes,links,lists,headings,tables etc..,*/

//getbyRole will return locator type object but not promises 

const projectsLink=page.getByRole('link',{name:'Projects'})
await expect(projectsLink).toBeVisible() //all assertion methods return promise so use await

const signInButton=page.getByRole('button',{name:'Sign In'});
await expect(signInButton).toBeVisible()
await signInButton.click()

//getbyText() - Match visible text content on the page
//use this locator to find non-interactive elements like div,span ,p etc
//For interactive elements like button , a , input etc use role locators


const welcomeText = page.getByText('Welcome, John! 👋')
//const welcomeText = page.getByText('Welcome, John! 👋',{exact:true})//exact match 
await expect(welcomeText).toBeVisible();


//getByLabel() - Locate a form field using its label text
//when to use: Ideal for form field with visible labels

const emailField=page.getByLabel('Email Address');
await expect(emailField).toBeVisible();
await emailField.fill('tester@gmail.com')

//getByPlaceholder - Locate an input by placeholder text
//Best for inputs without a label but having a placeholder

const searchTextPlaceholder=page.getByPlaceholder('Search tests...');
await expect(searchTextPlaceholder).toBeVisible()
await searchTextPlaceholder.fill("Locators Practice.")

//getByAltText() - Locate an image by its alt attribute text
//identifies images and similar elements based on the alt attribute
//Use this locator when your element supports alt text such as img or area elements

await expect(page.getByAltText('Playwright logo')).toBeVisible()

//getByTitle() - locate an element using its title attribute
//when to use: When your element has a meaningful title attribute

const totalRunsBox=page.getByTitle('Total test runs');
await expect(totalRunsBox).toBeVisible();
await expect(totalRunsBox).toContainText('4,821')

//getByTestId() - Locate elememts using the data - testid attribute
//Locate an element based on its data-testid attribute(other attributes can be configured)
//When to use - when text or role based locators are unstable or not suitable
//sometimes testId might be changeed from developers end , in that case go to playwright.config.ts and in the use :{} update the testID as
//use:{testIdAttribute : "what ever test id is"}
const proPlanButton=page.getByTestId('product-card-pro')
await expect(proPlanButton).toBeVisible();
await proPlanButton.click()

const searchButton=page.getByTestId('search-input')
await expect(searchButton).toBeVisible()
await searchButton.click()

})



