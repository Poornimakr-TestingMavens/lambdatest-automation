import { Page, Locator } from "@playwright/test";
import { Config } from "../../utils/config";

export class CommonPage {
  readonly page: Page;
  readonly homeUrl: string;
  readonly logoutLink: Locator;
  readonly logoutHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Base URL for the application
    this.homeUrl = Config.baseUrl;

    // Locators
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.logoutHeader = page.locator("h1");
  }

  /**
   * Navigates to the home page
   */
  async gotoHome() {
    await this.page.goto(this.homeUrl);
  }

  /**
   * Saves the current session storage state
   */
  async saveSession(filePath: string = "storageState.json") {
    await this.page.context().storageState({ path: filePath });
  }

  /**
   * Logs the user out
   */
  async logout() {
    await this.logoutLink.click();
  }
}
