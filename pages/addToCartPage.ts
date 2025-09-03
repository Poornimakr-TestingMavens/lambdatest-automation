import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator(".cart-icon"); // update selector if different
  }

  async openCart() {
    await this.cartIcon.click();
    await expect(this.page.locator("h1")).toContainText("Shopping Cart");
  }
}
