import { test } from "@playwright/test";
import { App } from "../utils/testManager";

test("E2E flow", async ({ page }) => {
  const home = new App.HomePage(page);
  const register = new App.RegisterPage(page);
  const login = new App.LoginPage(page);
  const cart = new App.CartPage(page);
  const common = new App.CommonPage(page);

  // Generate user + product test data
  const userData = App.TestDataFactory.generateUser();
//  const productData = TestDataFactory.generateProduct();

  // Step 1: Go to homepage
  await home.goto();

  // Step 2: Register new user
  await home.clickRegister();
  await register.registerUser(userData);

  // Step 3: Logout after register
  await common.logout();

  // Step 4: Login with same credentials
  await home.clickLogin();
  await login.login(userData.email, userData.password);

  // Step 5: Search for a product
  await home.assertSearchVisible();
//  await home.searchProduct(productData.name);

  // Step 6: Add random product to cart
  const productName = await home.addRandomProductToCart();
  console.log(` Added to cart: ${productName}`);

  // Step 7: Open cart and validate
  await cart.openCart();
});
