import { Page, Locator } from "@playwright/test";
import { Config } from "../utils/config";

export class HomePage {
  readonly page: Page;

  // Account section
  readonly myAccount: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;

  // Search section
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  // Navigation
  readonly megaMenu: Locator;
  readonly categoryLinks: Locator;

  // Product section
  readonly addToCartBtn: Locator;
  readonly successAlert: Locator;
  readonly productHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * Account dropdown
     * */ 
     this.myAccount = page.locator(
      `//button[normalize-space(text())="My account" or normalize-space(text())="My Account"]`
    );

    this.registerLink = page.locator(
      `//a[normalize-space(text())="Register" or normalize-space(text())="Sign Up"]`
    );

    this.loginLink = page.locator(
      `//a[normalize-space(text())="Login" or normalize-space(text())="Sign In"]`
    );

    // Search bar
    this.searchBox = page.getByRole("textbox", { name: "Search For Products" });
    this.searchButton = page.getByRole("button", { name: "Search" }).first();

    // Mega menu and categories
    this.megaMenu = page.getByRole("button", { name: "Mega Menu" });
    this.categoryLinks = page.locator(".dropdown-menu li a");

    // Product actions
    this.addToCartBtn = page.getByRole("button", { name: "Add to Cart" });
    this.successAlert = page.locator(".alert-success");
    this.productHeader = page.locator("h1");
  }

  /** Navigates to the home page */
  async goto() {
    await this.page.goto(Config.baseUrl);
  }

  /** Opens the "My Account" dropdown */
  async openMyAccountMenu() {
    await this.myAccount.hover();
  }

  /** Clicks Register in the account dropdown */
  async clickRegister() {
    await this.openMyAccountMenu();
    await this.registerLink.click();
  }

  /** Clicks Login in the account dropdown */
  async clickLogin() {
    await this.openMyAccountMenu();
    await this.loginLink.click();
  }

  /** Fills search and submits */
  async searchProduct(product: string) {
    await this.searchBox.fill(product);
    await this.page.keyboard.press("Enter");
  }

  /** Selects a random product from the mega menu and adds it to cart */
  async addRandomProductToCart(): Promise<string> {
    await this.megaMenu.hover();

    const count = await this.categoryLinks.count();
    const randomIndex = Math.floor(Math.random() * count);
    const productLink = this.categoryLinks.nth(randomIndex);

    const productName = await productLink.innerText();
    console.log(` Adding random product: ${productName}`);

    await productLink.click();
    await this.addToCartBtn.click();

    return productName;
  }
}
