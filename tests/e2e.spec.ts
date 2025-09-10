import { test, expect } from "@playwright/test";
import { App } from "../utils/testManager";

test.describe("E2E Flow - LambdaTest Playground", () => {
  test("should register, login, add to cart, and clear cart", async ({ page }) => {
    const app = App(page);
    const userData = app.TestDataFactory.generateUser();

   
    await app.HomePage.goto();
    await expect(page).toHaveTitle(/Your Store/);


    await app.HomePage.clickRegister();
    await app.RegisterPage.registerUser(userData);
    await expect(app.RegisterPage.successHeader).toHaveText(
      "Your Account Has Been Created!"
    );


    await app.CommonPage.logout();
    await expect(app.CommonPage.logoutHeader).toHaveText("Account Logout");

 
    await app.HomePage.clickLogin();
    await app.LoginPage.login(userData.email, userData.password);

    await expect(app.HomePage.searchBox).toBeVisible();
    await expect(app.HomePage.searchButton).toBeVisible();

    const productName = await app.HomePage.addRandomProductToCart();
    await expect(app.HomePage.successAlert).toContainText("Success");
    console.log(` Added to cart: ${productName}`);

    await app.CartPage.openCart();

    const cartApi = app.CartApi();
    await cartApi.init();
    await cartApi.clearCart();
    await cartApi.dispose();

    await page.reload();
    await expect(app.CartPage.emptyMessage).toContainText("Your shopping cart is empty");
  });
});



