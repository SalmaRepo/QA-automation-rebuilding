import {test,expect} from '@playwright/test'

import { SignUpPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';

test.describe.configure({mode:'serial'})

test.describe('Demoblaze Tests',()=>{
    const baseUrl='https://www.demoblaze.com/index.html';
    const testProduct='Nexus 6';
    const testPassword='Test@1234';
    let singedUpUser:{username:string;password:string}|undefined

    test.beforeEach(async ({page})=>{
        await page.goto(baseUrl)
    })

    test('User can sign up with a new account',async ({page})=>{
        const signUpPage=new SignUpPage(page);
        singedUpUser={
            username:`pavan_${Date.now()}`,
            password:testPassword
        };

        const alertMessage=await signUpPage.signUp(singedUpUser.username,singedUpUser.password);
        expect(alertMessage).toContain('Sign up successful')
    })

    test('User can login,add a product to cart and verify it',async ({page})=>{
        expect(singedUpUser).toBeDefined()
        const loginPage=new LoginPage(page);
        const homePage=new HomePage(page);
        const cartPage=new CartPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login(singedUpUser!.username,singedUpUser!.password)


        await page.waitForTimeout(2000)
        await homePage.addProductToCart(testProduct)
        await page.waitForTimeout(1000)

        await homePage.navigateToCart()
        await page.waitForTimeout(1000)

        await cartPage.waitForCartToLoad();
        const isProductInCart=await cartPage.isProductInCart(testProduct);
        expect(isProductInCart).toBe(true);

       await page.close()


    })
})



