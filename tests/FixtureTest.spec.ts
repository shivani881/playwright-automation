// IMPORT FROM YOUR NEW FIXTURE FILE, NOT @playwright/test
import { test } from '../Fixtures/BaseTest';

// Look at the arguments! 'textBox' is now auto-injected right next to 'page'!
test("Submit form using Fixtures", async ({ page, textBox }) => {
    
    await page.goto("https://demoqa.com/text-box", { waitUntil: "domcontentloaded" });
    
    // No 'new TextBoxPage(page)' required! Just use it immediately.
    await textBox.fillForm("Fixture Elite", "fixture@elite.com", "789 Auto St");
    
});