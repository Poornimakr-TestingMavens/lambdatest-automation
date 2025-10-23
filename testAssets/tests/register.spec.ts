import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { TestDataFactory } from "../utils/faker";

test("Register new user", async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.clickRegister();

  const register = new RegisterPage(page);
  const user = TestDataFactory.generateUser();
  await register.registerUser(user);
});
