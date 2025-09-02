import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";
import { CartPage } from "../pages/addToCartPage";
import { TestDataFactory } from "../utils/faker";

test.describe("Lambdatest Playground - Register, Login & Cart", () => {
  test("Register -> Login -> Add random items to cart", async ({ page }) => {
    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const cart = new CartPage(page);

    const userData = TestDataFactory.generateUser();
    const productData = TestDataFactory.generateProduct(); // ✅ random product

    // Navigate to Mega Menu
    await page.getByRole("link", { name: "Mega Menu" }).click();

    // Search random product
    await home.searchProduct(productData.searchTerm);

    // Add first product to cart
    const firstProduct = page.locator(".product-thumb").first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.getByRole("button", { name: "Add to Cart" }).click();

    // Assert success message
    await expect(page.locator(".alert-success")).toContainText("Success");
  });
});
