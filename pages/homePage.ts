import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly myAccount: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly megaMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.myAccount = page.getByRole("button", { name: "My account" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Login" });

    this.searchBox = page.getByRole("textbox", { name: "Search For Products" });
    this.searchButton = page.getByRole("button", { name: "Search" }).first();

    this.megaMenu = page.getByRole("button", { name: "Mega Menu" });
  }

  async goto() {
    await this.page.goto("https://ecommerce-playground.lambdatest.io/");
  }

  async openMyAccountMenu() {
    await this.myAccount.click();
    await expect(this.registerLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
  }

  async clickRegister() {
    await this.openMyAccountMenu();
    await this.registerLink.click();
  }

  async clickLogin() {
    await this.openMyAccountMenu();
    await this.loginLink.click();
  }

  // Added back so your test works
  async assertSearchVisible() {
    await expect(this.searchBox).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  async searchProduct(product: string) {
    await this.searchBox.fill(product);
    await this.page.keyboard.press("Enter");
    await expect(this.page.locator("h1")).toContainText(product);
  }

  async addRandomProductToCart() {
    await this.megaMenu.hover();

    const links = this.page.locator(".dropdown-menu li a");
    const count = await links.count();

    const randomIndex = Math.floor(Math.random() * count);
    const productLink = links.nth(randomIndex);

    const productName = await productLink.innerText();
    console.log(`👉 Adding random product: ${productName}`);

    await productLink.click();

    const addToCartBtn = this.page.getByRole("button", { name: "Add to Cart" });
    await addToCartBtn.click();

    const successAlert = this.page.locator(".alert-success");
    await expect(successAlert).toContainText("Success");

    return productName;
  }
}
