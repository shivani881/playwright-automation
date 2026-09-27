// 1. Import the base test from Playwright and rename it to 'base'
import { test as base } from '@playwright/test';
// 2. Import your Page Object class
import { TextBoxPage } from '../pages/TextBoxPage';

// 3. Define a TypeScript type so VS Code knows what fixtures exist
type MyFixtures = {
    textBox: TextBoxPage;
};

// 4. Extend Playwright's base test with your new fixture
export const test = base.extend<MyFixtures>({
    
    // Define the 'textBox' fixture
    textBox: async ({ page }, use) => {
        
        // SETUP: Playwright creates the object for you
        const textBoxPage = new TextBoxPage(page);
        
        // USE: Playwright injects the object into your test!
        await use(textBoxPage);
        //OR use
        // await use(new TextBoxPage(page))
    }
});

// Export expect so you can still use assertions in your tests
export { expect } from '@playwright/test';