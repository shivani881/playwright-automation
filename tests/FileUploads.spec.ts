import {test, expect} from "@playwright/test"

test("Standard File Upload", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator("#file-upload").setInputFiles('dummy.txt')
    await page.locator("#file-submit").click();
    await expect(page.locator("#uploaded-files")).toHaveText('dummy.txt')
})

test("File Chooser Upload", async({page})=>{
    await page.goto("https://demoqa.com/upload-download")
    const [filechooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.locator("#uploadFile").click()
    ])

    await filechooser.setFiles('dummy.txt')
    await expect(page.locator("#uploadedFilePath")).toContainText('dummy.txt')

        
 
})