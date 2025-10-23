// import { Page, Locator } from "@playwright/test";
// import { Config } from "../utils/config";
// import categoriesData from '../utils/megamenuData.json'; // your JSON file

// export class HomePage {
//   readonly page: Page;

//   // Account section
//   readonly myAccount: Locator;
//   readonly registerLink: Locator;
//   readonly loginLink: Locator;

//   // Search section
//   readonly searchBox: Locator;
//   readonly searchButton: Locator;

//   // Navigation
//   readonly megaMenu: Locator;
//   readonly categoryLinks: Locator;

//   // Product section
//   readonly addToCartBtn: Locator;
//   readonly successAlert: Locator;
//   readonly productHeader: Locator;
//   readonly filterButton: Locator;
//   readonly componentsButton: Locator;

//   constructor(page: Page) {
//     this.page = page;

//     /** Account dropdown */ 
//     this.myAccount = page.locator(
//       `//i[@class='icon fas fa-user']/following-sibling::div[@class='info']/span[@class='title' and normalize-space(.)='My account']`
//     );

//     this.registerLink = page.locator(
//       `//a[normalize-space(text())="Register" or normalize-space(text())="Sign Up"]`
//     );

//     this.loginLink = page.locator(
//       `//a[normalize-space(text())="Login" or normalize-space(text())="Sign In"]`
//     );

//     this.filterButton = page.locator('//span[@data-original-title="Shop by Category"]');
//     this.componentsButton = page.locator('//span[normalize-space(text())="Components"]');

//     // Search bar
//     this.searchBox = page.getByRole("textbox", { name: "Search For Products" });
//     this.searchButton = page.getByRole("button", { name: "Search" }).first();

//     // Mega menu and categories
//     this.megaMenu = page.getByRole("button", { name: "Mega Menu" });
//     this.categoryLinks = page.locator(".dropdown-menu li a");

//     // Product actions
//     this.addToCartBtn = page.getByRole("button", { name: "Add to Cart" });
//     this.successAlert = page.locator(".alert-success");
//     this.productHeader = page.locator("h1");
//   }


//   /** Navigates to the home page */
//   async goto() {
//     await this.page.goto(Config.baseUrl);
//   }

//   /** Opens the "My Account" dropdown */
//   async openMyAccountMenu() {
//     await this.myAccount.click();
//   }

//   /** Clicks Register in the account dropdown */
//   async clickRegister() {
//     await this.openMyAccountMenu();
//     await this.registerLink.click();
//   }

//   /** Clicks Login in the account dropdown */
//   async clickLogin() {
//     await this.openMyAccountMenu();
//     await this.loginLink.click();
//   }

//   /** Hover mega menu and validate headings & sub-items */
//   async megaMenuHoverAndValidate() {
//     await this.megaMenu.hover();

//     for (const [heading, subItems] of Object.entries(categoriesData)) {
//       //  Check heading exists
//       const headingLocator = this.page.locator(`//h3[@class="design-title" and normalize-space(text())="${heading}"]`);
//       if (!(await headingLocator.isVisible())) {
//         throw new Error(`Heading "${heading}" not found in mega menu!`);
//       }

//       // Check sub-items exist under this heading
//       for (const item of subItems) {
//         const itemLocator = this.page.locator(`//h3[normalize-space(text())="${heading}"]/following-sibling::div//a[contains(text(),"${item}")]`);
//         if (!(await itemLocator.isVisible())) {
//           throw new Error(`Sub-item "${item}" under "${heading}" not found!`);
//         }
//       }
//     }

//     console.log("Mega menu headings and sub-items validated successfully!");
//   }

//   /** Fills search and submits */
//   async searchProduct(product: string) {
//     await this.searchBox.fill(product);
//     await this.page.keyboard.press("Enter");
//   }

//   /** Selects a random product from the mega menu and adds it to cart */
//   async addRandomProductToCart(): Promise<string> {
//     await this.megaMenu.hover();

//     const count = await this.categoryLinks.count();
//     const randomIndex = Math.floor(Math.random() * count);
//     const productLink = this.categoryLinks.nth(randomIndex);

//     const productName = await productLink.innerText();
//     console.log(` Adding random product: ${productName}`);

//     await productLink.click();
//     await this.addToCartBtn.click();

//     return productName;
//   }
// }
import { Page, Locator } from "@playwright/test";
import { Config } from "../../utils/config";
import categoriesData from '../../utils/megamenuData.json';

export class HomePage {
  readonly page: Page;

  // Account section
  readonly myAccount: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;

  // Search section
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  // Navigation
  readonly megaMenu: Locator;
  readonly categoryLinks: Locator;

  // Product section
  readonly addToCartBtn: Locator;
  readonly successAlert: Locator;
  readonly productHeader: Locator;

  // Filter section
  readonly filterButton: Locator;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly filterApplyButton: Locator;
  readonly productPrices: Locator;

  // Components section
  readonly componentsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Account dropdown
    this.myAccount = page.locator(`//i[@class='icon fas fa-user']/following-sibling::div[@class='info']/span[@class='title' and normalize-space(.)='My account']`);
    this.registerLink = page.locator(`//a[normalize-space(text())="Register" or normalize-space(text())="Sign Up"]`);
    this.loginLink = page.locator(`//a[normalize-space(text())="Login" or normalize-space(text())="Sign In"]`);

    // Search bar
    this.searchBox = page.getByRole("textbox", { name: "Search For Products" });
    this.searchButton = page.getByRole("button", { name: "Search" }).first();

    // Mega menu
    this.megaMenu = page.getByRole("button", { name: "Mega Menu" });
    this.categoryLinks = page.locator(".dropdown-menu li a");

    // Product actions
    this.addToCartBtn = page.getByRole("button", { name: "Add to Cart" });
    this.successAlert = page.locator(".alert-success");
    this.productHeader = page.locator("h1");
    

    // Filter section
    this.filterButton = page.locator('//div[@id="entry_217832"]');
    this.minPriceInput = page.locator('input[name="mz_fp[min]"]').first();
    this.maxPriceInput = page.locator('input[name="mz_fp[max]"]').first();
    this.filterApplyButton = page.locator('#button-filter'); // adjust selector if different
    this.productPrices = page.locator('.product-price'); // adjust selector based on your page

    // Components
    this.componentsButton = page.locator('//span[normalize-space(text())="Components"]');
  }

  /** Navigate to home page */
  async goto() {
    await this.page.goto(Config.baseUrl);
  }

  /** Open My Account dropdown */
  async openMyAccountMenu() {
    await this.myAccount.click();
  }

  /** Click Register */
  async clickRegister() {
    await this.openMyAccountMenu();
    await this.registerLink.click();
  }

  /** Click Login */
  async clickLogin() {
    await this.openMyAccountMenu();
    await this.loginLink.click();
  }

  /** Hover mega menu and validate categories & sub-items */
  async megaMenuHoverAndValidate() {
    await this.megaMenu.hover();

    for (const [heading, subItems] of Object.entries(categoriesData)) {
      const headingLocator = this.page.locator(`//h3[@class="design-title" and normalize-space(text())="${heading}"]`);
      if (!(await headingLocator.isVisible())) {
        throw new Error(`Heading "${heading}" not found in mega menu!`);
      }

      for (const item of subItems) {
        const itemLocator = this.page.locator(`//h3[normalize-space(text())="${heading}"]/following-sibling::div//a[contains(text(),"${item}")]`);
        if (!(await itemLocator.isVisible())) {
          throw new Error(`Sub-item "${item}" under "${heading}" not found!`);
        }
      }
    }

    console.log("Mega menu headings and sub-items validated successfully!");
  }

  /** Search product */
  async searchProduct(product: string) {
    await this.searchBox.fill(product);
    await this.page.keyboard.press("Enter");
  }

  /** Add random product from mega menu to cart */
  async addRandomProductToCart(): Promise<string> {
    await this.megaMenu.hover();

    const count = await this.categoryLinks.count();
    const randomIndex = Math.floor(Math.random() * count);
    const productLink = this.categoryLinks.nth(randomIndex);

    const productName = await productLink.innerText();
    console.log(`Adding random product: ${productName}`);

    await productLink.click();
    await this.addToCartBtn.click();

    return productName;
  }
  async waitForVisibility(locator: Locator, timeout: number = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }
  /** Open filter section */
 async openFilter() {
    await this.filterButton.click();
    await this.componentsButton.click();
    // Wait until the filter section is visible
    await this.waitForVisibility(this.minPriceInput, 5000); // 5 seconds timeout
}

  /** Apply price filter */
  async applyPriceFilter(min: number, max: number) {
    await this.openFilter();
    await this.minPriceInput.fill(min.toString());
    await this.maxPriceInput.fill(max.toString());
    //await this.filterApplyButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /** Validate that products are within the price range */
  async validateProductPrices(min: number, max: number) {
    const count = await this.productPrices.count();
    for (let i = 0; i < count; i++) {
      const priceText = await this.productPrices.nth(i).innerText();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      if (price < min || price > max) {
        throw new Error(`Product price ${price} is out of range ${min}-${max}`);
      }
    }
    console.log(`All products are within the price range ${min}-${max}`);
  }
}
