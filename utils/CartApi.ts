import { request, expect, APIRequestContext } from "@playwright/test";
import { Config } from "./config";

export class CartApi {
  private requestContext!: APIRequestContext;
  private baseUrl: string = Config.baseUrl;

  async init() {
    this.requestContext = await request.newContext();
  }

  async clearCart() {
    const response = await this.requestContext.post(
      `${this.baseUrl}${Config.cartClearEndpoint}`
    );
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async dispose() {
    await this.requestContext.dispose();
  }
}
