import {test,expect} from "@playwright/test"


test("handle iframes", async({page})=>{
    await page.goto("https://demoqa.com/frames");
await expect(page.frameLocator("#frame1").locator("#sampleHeading")).toHaveText("This is a sample page")
await page.waitForTimeout(3000)
})

test.only("nested iframes", async({page})=>{
    await page.goto("https://demoqa.com/nestedframes");
 await expect(page.frameLocator("#frame1").frameLocator('iframe').locator('p')).toHaveText("Child Iframe")
  
    await page.waitForTimeout(3000)
})