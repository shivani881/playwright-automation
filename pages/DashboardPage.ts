import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator(".inventory_item_name ");
    }
   
    async getProductName(){
     // 1. Get the data
        const productsName = await this.productName.allTextContents();
        // 2. Filter the data
        const tShirts = productsName.filter(product => product.includes("T-Shirt"));
        // 3. RETURN the data to the test file!
        return tShirts;
        }
}