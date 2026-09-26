import { test, expect } from "@playwright/test";

test("handling dropdowns", async ({ page }) => {
   
 await page.goto("https://demoqa.com/select-menu");
    //select dropdown
  await page.locator("#oldSelectMenu").selectOption("4"); 
  //OR by label or index
//   await page.locator("#oldSelectMenu").selectOption({ label: "Purple" });
 
  //  Dropdown (<div> based)
  await page.locator("#withOptGroup").click();
  await page.getByText("Group 1, option 2", { exact: true }).click();
  await expect(page.locator("#withOptGroup")).toContainText(
    "Group 1, option 2",
  );

  //multi select dropdown

  // Find the hidden region, but click the visible box wrapping it!
  //In Playwright (and XPath), ".. " is a shortcut that means go up one level to the parent element."
  await page.locator("#react-select-4-live-region").locator("..").click();

  await page.getByRole("listbox").getByText("Green", { exact: true }).click();
    await page.getByRole("listbox").getByText("Black", { exact: true }).click();
  await expect(
    page.locator("#react-select-4-live-region").locator(".."),
  ).toContainText("Black");
 await page.waitForTimeout(3000);
});

test("autocomplete dropdown", async ({ page }) => {

    await page.goto("https://demoqa.com/auto-complete");
    await page.locator("#autoCompleteMultipleInput").fill('e');
    await page.locator("#react-select-2-listbox").getByText("Blue").click();
    await page.locator("#autoCompleteMultipleInput").fill('a');
    await page.locator("#react-select-2-listbox").getByText("Black").click();
    await expect(page.locator("#autoCompleteMultipleContainer")).toContainText("Blue");
await page.waitForTimeout(3000);
})

test("hover menu dropdown", async({page})=>{
   await page.goto("https://demoqa.com/menu");
   await page.getByRole('link', { name: 'Main Item 2' }).hover();
   await page.getByText("SUB SUB LIST »",{exact:true}).hover();
   await expect(page.getByText("Sub Sub Item 2")).toBeVisible();
   await page.getByText("Sub Sub Item 2").click();
 
})

test.only("Keyboard Navigation",async({page})=>{
  await page.goto("https://demoqa.com/auto-complete")
  await page.locator("#autoCompleteMultipleInput").fill('e')
  await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("Enter")
    await expect(page.locator("#autoCompleteMultipleContainer")).toContainText("Green")
   await page.waitForTimeout(3000);
})
