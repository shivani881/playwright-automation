import {test, expect} from "@playwright/test"

test("handle Dialog", async({page})=>{
    await page.goto("https://demoqa.com/alerts")
     page.on("dialog",async (dialog)=>{
        console.log("aleart says:",dialog.message());
        await dialog.dismiss();
    })

    await page.locator("#confirmButton").click();
    await expect(page.locator("#confirmResult")).toHaveText("You selected Cancel");
})

test.only("prompt", async({page})=>{
     await page.goto("https://demoqa.com/alerts")
     page.on("dialog",async(dialog)=>{
        console.log("aleart says:",dialog.message());
       await dialog.accept("My name is shivani")
     })
    await page.locator("#promtButton").click();
    await expect(page.locator("#promptResult")).toHaveText("You entered My name is shivani")
})