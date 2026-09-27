import {Page, Locator} from "@playwright/test"

export class TextBoxPage{
  readonly page : Page;
  readonly fullNameInput : Locator;
  readonly emailInput : Locator;
  readonly currentAddressInput : Locator;
  readonly submitButton:Locator;

  constructor(page:Page){
    this.page = page;
    this.fullNameInput = page.getByPlaceholder("Full Name");
     this.emailInput = page.getByPlaceholder("name@example.com")
     this.currentAddressInput = page.getByPlaceholder("Current Address")
     this.submitButton = page.getByRole("button", { name: "Submit" })
  }

  async fillForm(name:string,email:string,address:string){
    await this.fullNameInput.fill(name)
   await this.emailInput.fill(email)
   await this.currentAddressInput.fill(address)
   await this.submitButton.click();

  }
}