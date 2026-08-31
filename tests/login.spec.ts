import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { DashboardPage } from '../pages/Dashboardpage';

test.describe("sauce labs tests", () => {
    let loginpage: LoginPage;
    let dashboard: DashboardPage
    test.beforeEach('Verify the SauceDemo login', async ({ page }) => {
        // 1. Navigate to the URL
        loginpage = new LoginPage(page)
        console.log("Navigating to SauceDemo...");
        await loginpage.navigate();
        await expect(page).toHaveTitle('Swag Labs');
        await loginpage.login("standard_user", "secret_sauce");
        await expect(page.locator(".app_logo")).toHaveText("Swag Labs")
    })
    // test("extract product names", async ({ page }) => {
    //     dashboard = new DashboardPage(page);
    //     const tshirts = await dashboard.getProductName();
    //     console.log(tshirts)
    //     // Now the test actually asserts something!
    //     expect(tshirts.length).toBeGreaterThan(0);
    //     await page.waitForTimeout(3000);
    // })

    test("verify dynamic add to cart button and badge", async ({ page }) => {
        dashboard = new DashboardPage(page);
        const firstAddToCart = page.locator(".btn_inventory").first()
        const cart = page.locator(".shopping_cart_badge")
        await expect(firstAddToCart).toBeVisible();
        await expect(firstAddToCart).toHaveText("Add to cart");
        await firstAddToCart.click();
        await expect(firstAddToCart).toHaveText('Remove');

      await  expect(cart).toBeVisible()
      await  expect(cart).toHaveText('1');
        await page.waitForTimeout(3000);

    })
});