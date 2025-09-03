import { Page, expect } from "@playwright/test";

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoHome() {
    await this.page.goto("https://ecommerce-playground.lambdatest.io/");
    await expect(this.page).toHaveTitle(/Your Store/);
  }

  async saveSession(filePath: string = "storageState.json") {
    await this.page.context().storageState({ path: filePath });
  }

  async logout() {
    // In this site, logout appears in account dropdown
    await this.page.getByRole("link", { name: "Logout" }).click();
    await expect(this.page.locator("h1")).toHaveText("Account Logout");
  }
}
