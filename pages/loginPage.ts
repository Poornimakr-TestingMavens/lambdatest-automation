import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login form fields
    this.emailInput = page.getByLabel("E-Mail Address");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });

    // Post-login validation
    this.successHeader = page.locator("h2");
  }

  /**
   * Logs in with provided credentials
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.successHeader).toContainText("My Account");
  }
}
