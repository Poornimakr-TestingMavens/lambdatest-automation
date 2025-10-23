import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;


  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly telephone: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly privacyPolicy: Locator;
  readonly continueButton: Locator;

  
  readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator("#input-firstname");
    this.lastName = page.locator("#input-lastname");
    this.email = page.locator("#input-email");
    this.telephone = page.locator("#input-telephone");
    this.password = page.locator("#input-password");
    this.confirmPassword = page.locator("#input-confirm");

    // Privacy Policy checkbox (direct input)
    this.privacyPolicy = page.locator('label[for="input-agree"]');

    // Continue button
    this.continueButton = page.locator("input[value='Continue']");

    // Success header after registration
    this.successHeader = page.locator("h1");
  }

  /**
   * Registers a new user
   */
  async registerUser(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.telephone.fill(user.phone);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);

    await this.privacyPolicy.click();
    await this.continueButton.click();
  }
}
