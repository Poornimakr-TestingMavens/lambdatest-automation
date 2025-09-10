// testManager.ts
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";
import { CartPage } from "../pages/addToCartPage";
import { CommonPage } from "../pages/commonPage";
import { TestDataFactory } from "./faker";
import { CartApi } from "./cartApi";

export function App(page) {
  return {
    HomePage: new HomePage(page),
    RegisterPage: new RegisterPage(page),
    LoginPage: new LoginPage(page),
    CartPage: new CartPage(page),
    CommonPage: new CommonPage(page),
    TestDataFactory,
    CartApi: () => new CartApi(), // so you can call app.CartApi()
  };
}
