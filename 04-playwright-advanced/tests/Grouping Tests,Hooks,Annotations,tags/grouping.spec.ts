/*Test Grouping
test.describe()-->used to organize related test cases in to logical groups
Benefits
--------
Organize tests
Improve readability
Allows group level tests
Apply annotations/tags to multiple tests

command to run only chromium browser - npx playwright test testname --project=chromium 

command to run only group1 tests -npx playwright test testname --project=chromium  --grep "Group1"



*/

import {test,expect} from '@playwright/test'

test.describe('Group1',async ()=>{
    test('Test 1',async()=>{
        console.log("This is Test1")
    })

     test('Test 2',async()=>{
        console.log("This is Test2")
    })
})


test.describe('Group2',async ()=>{
    test('Test 3',async()=>{
        console.log("This is Test3")
    })

     test('Test 4',async()=>{
        console.log("This is Test4")
    })
})

//Nested Groups

test.describe('E-commerce',()=>{
    test.describe('Login to app',()=>{
        test('Valid login check',async ()=>{
            console.log("This is Test1");
        })
        test('Invalid login check',async ()=>{
            console.log("This is Test2");
        });

        test.describe('Cart',()=>{
        test('Add item to Cart',async ()=>{
            console.log("This is Test3");
        })
        test('Remove Item from cart',async ()=>{
            console.log("This is Test4");
        })
    })
    })
})

test.describe.serial('Another Group',async ()=>{
    test('Test 1',async()=>{
        console.log("This is Test1")
    })

     test('Test 2',async()=>{
        console.log("This is Test2")
    })
})



