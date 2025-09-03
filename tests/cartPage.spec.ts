import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator(".cart-icon"); // update selector if needed
  }

  async openCart() {
    await this.cartIcon.click();
    await expect(this.page.locator("h1")).toContainText("Shopping Cart");
  }

  async assertCartEmpty() {
    // 🔹 update selector if your cart shows empty differently
    const emptyMessage = this.page.locator("div#content p").first();
    await expect(emptyMessage).toContainText("Your shopping cart is empty");
  }
}
