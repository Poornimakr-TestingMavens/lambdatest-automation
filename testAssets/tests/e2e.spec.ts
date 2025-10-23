import { test, expect } from "@playwright/test";
import { App } from "../../utils/testManager";

test.describe("E2E Flow - LambdaTest Playground", () => {
  test("should login and validate mega menu categories & sub-items", async ({ page }) => {
    // Initialize the app object with all page objects
    const app = App(page);

    // Navigate to Home Page
    await app.HomePage.goto();
    await expect(page).toHaveTitle(/Your Store/);

    // Optional: Login if required
    await app.HomePage.clickLogin();
    // If you have login data:
    // await app.LoginPage.login("email@example.com", "password123");

    // Validate mega menu categories & sub-items using JSON test data
    await app.HomePage.megaMenuHoverAndValidate();
    const minPrice = 98;
    const maxPrice = 2000;
    await app.HomePage.applyPriceFilter(minPrice, maxPrice);

    // Validate filtered product prices
    await app.HomePage.validateProductPrices(minPrice, maxPrice);

    // -------------------------
    // Optional: uncomment for further steps
    // -------------------------
    await expect(app.HomePage.searchBox).toBeVisible();
    // await expect(app.HomePage.searchButton).toBeVisible();

    // const productName = await app.HomePage.addRandomProductToCart();
    // await expect(app.HomePage.successAlert).toContainText("Success");
    // console.log(`Added to cart: ${productName}`);

    // await app.CartPage.openCart();
    // const cartApi = app.CartApi();
    // await cartApi.init();
    // await cartApi.clearCart();
    // await cartApi.dispose();

    // await page.reload();
    // await expect(app.CartPage.emptyMessage).toContainText("Your shopping cart is empty");
  });
});
