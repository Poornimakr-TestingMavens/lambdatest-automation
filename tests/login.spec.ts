import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

test("Login with valid credentials", async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.clickLogin();

  const login = new LoginPage(page);
  await login.login("test@example.com", "Password123"); // replace with valid creds
});
