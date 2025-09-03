// testManager.ts - single entry point for all imports

import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";
import { CartPage } from "../pages/addToCartPage";
import { CommonPage } from "../pages/commonPage";
import { TestDataFactory } from "./faker";

export const App = {
  HomePage,
  RegisterPage,
  LoginPage,
  CartPage,
  CommonPage,
  TestDataFactory,
};
