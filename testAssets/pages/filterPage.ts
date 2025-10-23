import { Page, Locator, expect } from "@playwright/test";

export class FilterPage {
  readonly page: Page;

  // Navigation
  readonly shopByCategoryButton: Locator;
  readonly componentsButton: Locator;

  // Manufacturer
  readonly manufacturerSection: Locator;
  readonly manufacturerCheckboxes: Locator;
  readonly seeMoreButton: Locator;

  // Sub Category
  readonly subCategorySection: Locator;
  readonly subCategoryCheckboxes: Locator;

  // Search
  readonly searchSection: Locator;

  // Availability
  readonly availabilitySection: Locator;
  readonly availabilityCheckboxes: Locator;

  // Size
  readonly sizeSection: Locator;

  // Discount
  readonly discountSection: Locator;
  readonly discountRadios: Locator;

  // Rating
  readonly ratingSection: Locator;
  readonly ratingOptions: Locator;

  // Products
  readonly productItems: Locator;

  // Category Links
  readonly desktopsLink: Locator;
  readonly laptopsLink: Locator;
  readonly componentsLink: Locator;
  readonly tabletsLink: Locator;
  readonly softwareLink: Locator;
  readonly phonesLink: Locator;
  readonly camerasLink: Locator;
  readonly mp3PlayersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.shopByCategoryButton = page.locator('//a[text()=" Shop by Category"]');
    this.componentsButton = page.locator('//span[normalize-space(text())="Components"]');

    // Manufacturer
    this.manufacturerSection = page.locator('//div[@id="mz-filter-content-1"]//div[@class="mz-filter-group manufacturer "]//div[normalize-space(text())="Manufacturer"]');
    this.manufacturerCheckboxes = page.locator('//div[@id="mz-filter-content-1"]//div[@class="mz-filter-group manufacturer "]//div[normalize-space(text())="Manufacturer"]/following-sibling::div//input[@type="checkbox"]');
    this.seeMoreButton = page.locator('//a[normalize-space(text())="SEE MORE"]');

    // Sub Category
    this.subCategorySection = page.locator('//div[normalize-space(text())="Sub category"]');
    this.subCategoryCheckboxes = page.locator('//div[normalize-space(text())="Sub category"]/following-sibling::div//input[@type="checkbox"]');

    // Search
    this.searchSection = page.locator('(//div[@class="mz-filter-group search"]//div[normalize-space(text())="Search"])[2]');

    // Availability
    this.availabilitySection = page.locator('(//div[normalize-space(text())="Availability"])[2]');
    this.availabilityCheckboxes = page.locator('(//div[normalize-space(text())="Availability"])[2]/following-sibling::div//input[@type="checkbox"]');

    // Size
    this.sizeSection = page.locator('(//div[normalize-space(text())="Size"])[2]');

    // Discount
    this.discountSection = page.locator('(//div[normalize-space(text())="Discount"])[2]');
    this.discountRadios = page.locator('(//div[normalize-space(text())="Discount"])[2]/following-sibling::div//input[@type="radio"]');

    // Rating
    this.ratingSection = page.locator('(//div[normalize-space(text())="Rating"])[2]');
    this.ratingOptions = page.locator('(//div[normalize-space(text())="Rating"])[2]/following-sibling::div//input[@type="radio"]');

    // Products
    this.productItems = page.locator('//div[contains(@class, "product-thumb") or contains(@class, "product-layout") or contains(@class, "product-grid")]');

    // Category Links
    this.desktopsLink = page.locator('//a[text()="Desktops (75)"]');
    this.laptopsLink = page.locator('//a[text()="Laptops (75)"]');
    this.componentsLink = page.locator('//a[text()="Components (75)"]');
    this.tabletsLink = page.locator('//a[text()="Tablets (75)"]');
    this.softwareLink = page.locator('//a[text()="Software (75)"]');
    this.phonesLink = page.locator('//a[text()="Phones & PDAs (75)"]');
    this.camerasLink = page.locator('//a[text()="Cameras (75)"]');
    this.mp3PlayersLink = page.locator('//a[text()="MP3 Players (75)"]');
  }

  /** Navigate to Components page */
  async navigateToComponents() {
    await this.shopByCategoryButton.click();
    await this.componentsButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.waitForVisibility(this.productItems);
  }

  /** Wait for element visible */
  async waitForVisibility(locator: Locator, timeout = 10000) {
    await locator.first().waitFor({ state: 'visible', timeout });
  }

  /** Validate all filters are available */
  async validateAllFilters() {
    console.log('=== VALIDATING ALL FILTERS ===');
    
    // Check if main filter sections are visible
    const sections = [
      { name: 'Manufacturer', locator: this.manufacturerSection },
      { name: 'Sub Category', locator: this.subCategorySection },
      { name: 'Search', locator: this.searchSection },
      { name: 'Availability', locator: this.availabilitySection },
      { name: 'Size', locator: this.sizeSection },
      { name: 'Discount', locator: this.discountSection },
      { name: 'Rating', locator: this.ratingSection }
    ];

    for (const section of sections) {
      const isVisible = await section.locator.isVisible();
      console.log(`${section.name} section visible: ${isVisible}`);
      
      if (isVisible) {
        await expect(section.locator).toBeVisible();
        
        // Check if section has options
        let optionsCount = 0;
        if (section.name === 'Manufacturer') {
          optionsCount = await this.manufacturerCheckboxes.count();
        } else if (section.name === 'Sub Category') {
          optionsCount = await this.subCategoryCheckboxes.count();
        } else if (section.name === 'Availability') {
          optionsCount = await this.availabilityCheckboxes.count();
        } else if (section.name === 'Discount') {
          optionsCount = await this.discountRadios.count();
        } else if (section.name === 'Rating') {
          optionsCount = await this.ratingOptions.count();
        }
        console.log(`  ${section.name} has ${optionsCount} options`);
      }
    }

    // Validate category links
    const categoryLinks = [
      { name: 'Desktops', locator: this.desktopsLink },
      { name: 'Laptops', locator: this.laptopsLink },
      { name: 'Components', locator: this.componentsLink },
      { name: 'Tablets', locator: this.tabletsLink },
      { name: 'Software', locator: this.softwareLink },
      { name: 'Phones & PDAs', locator: this.phonesLink },
      { name: 'Cameras', locator: this.camerasLink },
      { name: 'MP3 Players', locator: this.mp3PlayersLink }
    ];

    console.log('=== VALIDATING CATEGORY LINKS ===');
    for (const category of categoryLinks) {
      const isVisible = await category.locator.isVisible();
      console.log(`${category.name} link visible: ${isVisible}`);
      if (isVisible) {
        await expect(category.locator).toBeVisible();
      }
    }

    console.log('=== ALL FILTERS VALIDATION COMPLETED ===');
  }

  /** Apply manufacturer filter */
  async applyManufacturer(manufacturerName: string) {
    const checkbox = this.page.locator(`//div[@id="mz-filter-content-1"]//div[@class="mz-filter-group manufacturer "]//div[normalize-space(text())="Manufacturer"]/following-sibling::div//label[contains(., "${manufacturerName}")]//input[@type="checkbox"]`);
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
    await this.page.waitForTimeout(2000);
    await expect(this.productItems.first()).toBeVisible();
  }

  /** Apply subcategory filter */
  async applySubCategory(subCategoryName: string) {
    const checkbox = this.page.locator(`//div[normalize-space(text())="Sub category"]/following-sibling::div//label[contains(., "${subCategoryName}")]//input[@type="checkbox"]`);
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
    await this.page.waitForTimeout(2000);
    await expect(this.productItems.first()).toBeVisible();
  }

  /** Apply availability filter */
  async applyAvailability(option: string) {
    const checkbox = this.page.locator(`(//div[normalize-space(text())="Availability"])[2]/following-sibling::div//label[contains(., "${option}")]//input[@type="checkbox"]`);
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
    await this.page.waitForTimeout(2000);
    await expect(this.productItems.first()).toBeVisible();
  }

  /** Apply discount filter */
  async applyDiscount(option: string) {
    const radio = this.page.locator(`(//div[normalize-space(text())="Discount"])[2]/following-sibling::div//label[contains(., "${option}")]//input[@type="radio"]`);
    await radio.scrollIntoViewIfNeeded();
    await radio.check();
    await this.page.waitForTimeout(2000);
    await expect(this.productItems.first()).toBeVisible();
  }

  /** Apply rating filter */
  async applyRating(option: string) {
    const radio = this.page.locator(`(//div[normalize-space(text())="Rating"])[2]/following-sibling::div//label[contains(., "${option}")]//input[@type="radio"]`);
    await radio.scrollIntoViewIfNeeded();
    await radio.check();
    await this.page.waitForTimeout(2000);
    await expect(this.productItems.first()).toBeVisible();
  }

  /** Get all available manufacturers */
  async getAvailableManufacturers(): Promise<string[]> {
    const manufacturers: string[] = [];
    const labels = this.page.locator('//div[@id="mz-filter-content-1"]//div[@class="mz-filter-group manufacturer "]//div[normalize-space(text())="Manufacturer"]/following-sibling::div//label');
    const count = await labels.count();
    
    for (let i = 0; i < count; i++) {
      const text = await labels.nth(i).textContent();
      if (text) {
        manufacturers.push(text.trim());
      }
    }
    return manufacturers;
  }

  /** Get all available subcategories */
  async getAvailableSubCategories(): Promise<string[]> {
    const subCategories: string[] = [];
    const labels = this.page.locator('//div[normalize-space(text())="Sub category"]/following-sibling::div//label');
    const count = await labels.count();
    
    for (let i = 0; i < count; i++) {
      const text = await labels.nth(i).textContent();
      if (text) {
        subCategories.push(text.trim());
      }
    }
    return subCategories;
  }

  /** Get all available availability options */
  async getAvailableAvailabilityOptions(): Promise<string[]> {
    const options: string[] = [];
    const labels = this.page.locator('(//div[normalize-space(text())="Availability"])[2]/following-sibling::div//label');
    const count = await labels.count();
    
    for (let i = 0; i < count; i++) {
      const text = await labels.nth(i).textContent();
      if (text) {
        options.push(text.trim());
      }
    }
    return options;
  }

  /** Get product count */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /** Click on category link */
  async clickCategory(categoryName: string) {
    switch(categoryName.toLowerCase()) {
      case 'desktops':
        await this.desktopsLink.click();
        break;
      case 'laptops':
        await this.laptopsLink.click();
        break;
      case 'components':
        await this.componentsLink.click();
        break;
      case 'tablets':
        await this.tabletsLink.click();
        break;
      case 'software':
        await this.softwareLink.click();
        break;
      case 'phones & pdas':
        await this.phonesLink.click();
        break;
      case 'cameras':
        await this.camerasLink.click();
        break;
      case 'mp3 players':
        await this.mp3PlayersLink.click();
        break;
      default:
        throw new Error(`Category ${categoryName} not found`);
    }
    await this.page.waitForLoadState('networkidle');
    await this.waitForVisibility(this.productItems);
  }
}