import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test("Search for product", async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.searchProduct("iPhone");
});
