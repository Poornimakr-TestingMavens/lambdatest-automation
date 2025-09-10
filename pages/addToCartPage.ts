import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartHeader: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locator for the cart icon in the header
    this.cartIcon = page.locator(".cart-icon");

    // Locator for the cart page heading (e.g., "Shopping Cart")
    this.cartHeader = page.locator("h1");

    // Locator for the empty cart message
    this.emptyMessage = page.locator("div#content p").first();
  }

  /**
   * Opens the cart
   */
  async openCart() {
    await this.cartIcon.click();
  }
}
