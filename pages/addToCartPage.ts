import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator(".cart-icon"); // update selector if different
  }

  async addToCart(productName: string) {
    await this.page.getByRole("link", { name: productName }).click();
    await this.page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(this.page.locator(".alert-success")).toBeVisible();
  }

  async openCart() {
    await this.cartIcon.click();
    await expect(this.page.locator("h1")).toContainText("Shopping Cart");
  }
}
