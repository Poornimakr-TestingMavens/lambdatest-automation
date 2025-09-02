import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly myAccount: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // More stable: use role-based locator instead of XPath
    this.myAccount = page.getByRole("button", { name: "My account" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Login" });

    this.searchBox = this.page.getByRole("textbox", {
      name: "Search For Products",
    });
    this.searchButton = this.page.getByRole("button", { name: "Search" }).first();
  }

  async goto() {
    await this.page.goto("https://ecommerce-playground.lambdatest.io/");
  }

  async openMyAccountMenu() {
    await this.myAccount.scrollIntoViewIfNeeded();
    await this.myAccount.click(); 
    await expect(this.registerLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
  }

  async clickRegister() {
    await this.openMyAccountMenu();
    await this.registerLink.click();
  }

  async assertSearchVisible() {
    await expect(this.searchBox).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  async searchProduct(product: string) {
    await this.searchBox.fill(product);
    await this.page.keyboard.press("Enter");
    await expect(this.page.locator("h1")).toContainText(product);
  }
  async clickLogin() {
  await this.openMyAccountMenu();
  await this.loginLink.click();
}

}
