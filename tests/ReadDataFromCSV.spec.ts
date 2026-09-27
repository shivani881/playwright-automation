import { test } from "@playwright/test";
import fs from "fs"; // Node's built-in file reader
import path from "path"; // Node's built-in path builder
import { parse } from "csv-parse/sync"; // The translator library
import { TextBoxPage } from "../pages/TextBoxPage";
//install the "npm install -D csv-parse"

// 1. Locate and read the raw, dumb text from the file
const csvPath = path.join(__dirname, "../test-data/users.csv");
const rawText = fs.readFileSync(csvPath, "utf-8");

interface UserData {
  fullName: string;
  email: string;
  currentAddress: string;
}

// 2. Translate the text into an Array of Objects
const records: UserData[] = parse(rawText, {
  columns: true, // Tells the parser that the top row contains the variable names!
  skip_empty_lines: true, // Prevents blank lines at the bottom of the file from crashing the test
});

for (const data of records) {
  test(`Read data from csv ${data.fullName}`, async ({ page }) => {
    await page.goto("https://demoqa.com/text-box", {
      waitUntil: "domcontentloaded",
    });
    // await page.getByPlaceholder("Full Name").fill(data.fullName);
    // await page.getByPlaceholder("name@example.com").fill(data.email);
    // await page.getByPlaceholder("Current Address").fill(data.currentAddress);
    // await page.getByRole("button", { name: "Submit" }).click();
    //use pageobject class
   const textbox = new TextBoxPage(page);
    await textbox.fillForm(data.fullName, data.email, data.currentAddress);
    console.log("test passed");
  });
}
