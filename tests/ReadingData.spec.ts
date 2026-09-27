import { test } from "@playwright/test";
import testdata from "../test-data/users.json";

for (const data of testdata) {
  test(`Form submit for ${data.fullName}`, async ({ page }) => {

    await page.goto("https://demoqa.com/text-box",{ waitUntil: "domcontentloaded" });
    await page.getByPlaceholder("Full Name").fill(process.env.MY_SECRET_NAME!);
    console.log(process.env.MY_SECRET_NAME!)
    await page.getByPlaceholder("name@example.com").fill(data.email);
    await page.getByPlaceholder("Current Address").fill(data.currentAddress);
    await page.locator("#permanentAddress").fill(data.permanentAddress);
    await page.getByRole("button", { name: "Submit" }).click();
  });
}
