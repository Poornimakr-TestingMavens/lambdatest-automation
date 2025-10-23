// testManager.ts
import { HomePage } from "../testAssets/pages/homePage";
import { RegisterPage } from "../testAssets/pages/registerPage";
//import { CartPage } from "../pages/filterPage";
import { CommonPage } from "../testAssets/pages/commonPage";
import { TestDataFactory } from "./faker";
import { CartApi } from "./cartApi";
import { Page } from "@playwright/test";

export function App(page: Page) {
  return {
    HomePage: new HomePage(page),
    RegisterPage: new RegisterPage(page),
    //CartPage: new CartPage(page),
    CommonPage: new CommonPage(page),
    TestDataFactory,
    CartApi: () => new CartApi(), // so you can call app.CartApi()
  };
}
