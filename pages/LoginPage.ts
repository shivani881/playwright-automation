import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // 1. Declare the variables
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // 2. The constructor maps the variables to the elements on the screen
  constructor(page: Page) {
    this.page = page;
    // Using your excellent modern locators!
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.locator("#login-button"); 
    
  }

  // 3. Action method to load the page
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // 4. Action method to perform the login
  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }


}