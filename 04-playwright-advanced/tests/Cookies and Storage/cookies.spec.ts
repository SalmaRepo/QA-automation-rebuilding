/*
Cookies                     | Local Storage                   | Session Storage          
============================================================================================================                
->Stored in the browser and   | Stored only in the browser       |. Stored only for one browser tab
sent with every http request  |                                  |
->Small size(4kb)             | .Large Size(5-10mb)              | .Cleared when tab is closed                
->can have expiry time        |. Never expires until manually    | .Same size as local storage
                              |   cleared                        |  .not shared across tabs      
-> Used mainly for            | .Not sent to the server          |                       
authentication and sessions   |   automatically                  |    ex-multi step form data,tempraray UI state                               
ex-login session,             | ex-Theme preference,language     |                          
JWT token,user prefences -    |      setting,cached data         |                  
   language, theme, currency  |                                  |

 =============================================================================================================
   Feature         |      Cookies     |      Local storage    |  Session storage 
   Sent to Server  |      yes         |      no               |  no         
   Expiry          |      Configurable|      never            |  On tab close       
   Storage Size    |      Small       |      Large            |  Large        
   Scope           |  All tabs        | All tabs              | Single tab


   Browser--->Context--->Page

   1.Create Browser Context   browser.newContext()
   2.Create new page          context.newPage()
   3.Add Cookies              context.addCookies()
   4.Get Cookies              context.cookies()
   5.Clear cookies            context.clearCookies()
*/

import { test, chromium } from "@playwright/test";

test("cookies", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  //Add cookies
  await context.addCookies([
    {
      name: "usrename",
      value: "salma",
      domain: "playwright.dev",
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "Lax",
    },
    {
      name:'auth token',
      value:'xyz123secret',
      url:'https://example.com'
    }
  ]);

  //Get all cookies
  let cookies=await context.cookies();
  console.log("Cookies===>,",cookies);

  //clear all the cookies
  await context.clearCookies();
  cookies=await context.cookies();

  console.log("After clearing cookies=",cookies)
  await context.close()
  await browser.close()


});
