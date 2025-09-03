import { request, expect, APIRequestContext } from "@playwright/test";

export class CartApi {
  private requestContext!: APIRequestContext;
  private baseUrl: string = "https://ecommerce-playground.lambdatest.io";

  async init() {
    this.requestContext = await request.newContext();
  }

  async clearCart() {
    // 🔹 Adjust endpoint to match your app’s cart API
    const response = await this.requestContext.post(
      `${this.baseUrl}/index.php?route=checkout/cart/clear`
    );
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async dispose() {
    await this.requestContext.dispose();
  }
}
