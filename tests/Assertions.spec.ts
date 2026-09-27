import {test,expect} from "@playwright/test"

test("Advanced Assertions", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls")
    await expect(page.getByRole("checkbox")).toBeVisible();
    await page.getByRole('button', {name: "Remove"}).click();
    await expect(page.getByRole("checkbox")).not.toBeVisible();

    await expect(page.locator("#input-example input")).toBeDisabled();
   await page.getByRole('button', {name: "Enable"}).click();
      await expect(page.locator("#input-example input")).toBeEnabled();
      await page.locator('#input-example input').fill("Playwright Master")
      await expect(page.locator('#input-example input')).toHaveValue("Playwright Master")

})

test.only("Soft Assertions", async({page})=>{
    await page.goto("https://demoqa.com/text-box");
    await page.getByPlaceholder("Full Name").fill("shivani rawat");
    await page.getByPlaceholder("name@example.com").fill("shivani@gmail.com")
    await page.getByPlaceholder("Current Address").fill("noida sec-62")
     await page.locator("#permanentAddress").fill("noida sec-62")
     await page.getByRole("button",{name:"Submit"}).click();

     await expect.soft(page.locator("#name")).toHaveText("Name:shiva89");
     await expect.soft(page.locator("#email")).toHaveText("Email:shivani@gmail.com")
     await expect.soft(page.locator("p#currentAddress")).toHaveText("Current Address :abc");
     await expect.soft(page.locator("p#permanentAddress")).toHaveText("Permananet Address :noida sec-62")
     await expect.soft(page.locator("#output")).toBeVisible();
      console.log("finish execution")
})