import {test,expect} from '@playwright/test';

test("handle multiple tabs",async({page,context})=>{
 await page.goto("https://the-internet.herokuapp.com/windows")
//await Promise.all + [newtab]: Pauses the test to fire the click and
//  listener at the exact same time, using brackets to instantly unpack the new page object from the results array.

// context: The isolated parent browser session that houses all individual tabs, 
// which is why we must listen to it (not the original page) when a new window opens.
 const [newtab] = await Promise.all([
     context.waitForEvent('page'),
    page.getByRole("link",{name:"Click Here"}).click()

 ])

 await newtab.waitForLoadState();
 await expect(newtab.locator("div>h3")).toHaveText("New Window");

 })

 test("close tab and return to original tab",async({page,context})=>{
   await page.goto("https://demoqa.com/browser-windows")
   const [newtab] = await Promise.all([
    context.waitForEvent('page'),
     page.getByRole("button",{name:"New Tab"}).click()
   ])

   await newtab.waitForLoadState();
   await expect(newtab.locator("#sampleHeading")).toHaveText("This is a sample page")
  await newtab.close();
  await page.bringToFront();
  await expect(page.locator("#browserWindows>h1")).toHaveText("Browser Windows")
  await page.waitForTimeout(3000)
   
 })

 test.only("Find Lost Tab",async({page,context})=>{
    await page.goto("https://demoqa.com/browser-windows")
  await page.getByRole("button",{name:"New Tab"}).click()
  await page.waitForTimeout(3000);
   const alltabs = context.pages()

   for(const a of alltabs){
    if(a.url().includes('/sample')){        
   await expect(a.locator("#sampleHeading")).toHaveText("This is a sample page")
      break;
    }
   }
 })