import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test("Add random product from Mega Menu", async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.addRandomProductToCart();
});
