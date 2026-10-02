import { test, expect } from "@playwright/test";

test("save Auth State",async({page})=>{
  await page.goto("https://tmqa.trackofarm.in")
 await page.locator('input[placeholder="Company Identifier"]:visible').fill('tm_roles');
await page.locator('input[placeholder="Enter your username"]:visible').fill('tm_roles');
await page.locator('input[placeholder="Enter your password"]:visible').fill('roles123');

// Button par bhi wahi trick use karein
await page.locator('#app-login-btn:visible').first().click();

// Dashboard aane ka intezaar karein
await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
  await page.context().storageState({ path: 'auth-state.json' });
})

test.describe("Bypass",()=>{
  test.use({storageState:'auth-state.json'})

test("tm login bypass", async ({ page, request }) => {


  await page.goto("https://tmqa.trackofarm.in/web/0/route/allocation/dashboard?lang=en")
//   const response = await request.post(
//     "https://tmqa.trackofarm.in/authenticate/user",
//     {
//       data: {
//         username: "tm_roles",
//         password: "roles123",
//         loginMode: "WEB",
//         companyIdentifier: "tm_roles",
//         language: "en",
//       },
//     },
//   );
//   expect(response.status()).toBe(200);
//   const body = await response.json();
//   console.log("print token", body.data.jwtToken);
//  // 1. Visit the base URL first so the browser initializes its storage
//   // await page.goto("https://tmqa.trackofarm.in");

//   // 2. Inject the token directly into Local Storage
//   // (If you found it in Session Storage, change 'localStorage' to 'sessionStorage')
//   await page.addInitScript((apidata) => {
//     window.localStorage.setItem('tm_roles_token', apidata.jwtToken);
//     // Set the login meta key (Must be stringified into a JSON string)
//     window.localStorage.setItem('tm_roles_loginMeta', JSON.stringify(apidata));
//   }, body.data);
  
//   // await page.reload();
//     // 3. Navigate directly to the protected page (UI login skipped!)
//     await page.goto('https://tmqa.trackofarm.in/web/0/route/allocation/dashboard?lang=en');
//     await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(5000)

});
})
