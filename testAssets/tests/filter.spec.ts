import { test, expect } from '@playwright/test';
import { FilterPage } from '../../pages/filterPage';

test.describe('Product Filters Validation', () => {
  let filterPage: FilterPage;

  test.beforeEach(async ({ page }) => {
    filterPage = new FilterPage(page);
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await filterPage.navigateToComponents();
  });

  test('Validate all filters and categories are available', async () => {
    await filterPage.validateAllFilters();
  });

  test('Apply Manufacturer Filter', async () => {
    const manufacturerVisible = await filterPage.manufacturerSection.isVisible();
    if (manufacturerVisible) {
      const manufacturers = await filterPage.getAvailableManufacturers();
      console.log('Available manufacturers:', manufacturers);
      
      if (manufacturers.length > 0) {
        await filterPage.applyManufacturer(manufacturers[0]);
        const count = await filterPage.getProductCount();
        console.log(`Products after selecting ${manufacturers[0]}:`, count);
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  test('Apply Sub Category Filter', async () => {
    const subCategoryVisible = await filterPage.subCategorySection.isVisible();
    if (subCategoryVisible) {
      const subCategories = await filterPage.getAvailableSubCategories();
      console.log('Available subcategories:', subCategories);
      
      if (subCategories.length > 0) {
        await filterPage.applySubCategory(subCategories[0]);
        const count = await filterPage.getProductCount();
        console.log(`Products after selecting ${subCategories[0]}:`, count);
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  test('Apply Availability Filter', async () => {
    const availabilityVisible = await filterPage.availabilitySection.isVisible();
    if (availabilityVisible) {
      const availabilityOptions = await filterPage.getAvailableAvailabilityOptions();
      console.log('Available availability options:', availabilityOptions);
      
      if (availabilityOptions.length > 0) {
        await filterPage.applyAvailability(availabilityOptions[0]);
        const count = await filterPage.getProductCount();
        console.log(`Products after selecting ${availabilityOptions[0]}:`, count);
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  test('Apply Discount Filter', async () => {
    const discountVisible = await filterPage.discountSection.isVisible();
    if (discountVisible && await filterPage.discountRadios.count() > 0) {
      await filterPage.applyDiscount('10% off or more');
      const count = await filterPage.getProductCount();
      console.log('Products after discount filter:', count);
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Apply Rating Filter', async () => {
    const ratingVisible = await filterPage.ratingSection.isVisible();
    if (ratingVisible && await filterPage.ratingOptions.count() > 0) {
      await filterPage.applyRating('★★★★ & up');
      const count = await filterPage.getProductCount();
      console.log('Products after rating filter:', count);
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Apply Multiple Filters', async () => {
    let filtersApplied = 0;
    
    if (await filterPage.manufacturerSection.isVisible()) {
      const manufacturers = await filterPage.getAvailableManufacturers();
      if (manufacturers.length > 0) {
        await filterPage.applyManufacturer(manufacturers[0]);
        filtersApplied++;
      }
    }
    
    if (await filterPage.subCategorySection.isVisible()) {
      const subCategories = await filterPage.getAvailableSubCategories();
      if (subCategories.length > 0) {
        await filterPage.applySubCategory(subCategories[0]);
        filtersApplied++;
      }
    }
    
    if (await filterPage.availabilitySection.isVisible()) {
      const availabilityOptions = await filterPage.getAvailableAvailabilityOptions();
      if (availabilityOptions.length > 0) {
        await filterPage.applyAvailability(availabilityOptions[0]);
        filtersApplied++;
      }
    }
    
    console.log(`Applied ${filtersApplied} filters`);
    
    if (filtersApplied > 0) {
      const count = await filterPage.getProductCount();
      console.log('Products after multiple filters:', count);
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Navigate to different categories', async () => {
    // Test navigating to different categories
    await filterPage.clickCategory('Laptops');
    let count = await filterPage.getProductCount();
    console.log('Laptops products count:', count);
    expect(count).toBeGreaterThan(0);

    await filterPage.clickCategory('Desktops');
    count = await filterPage.getProductCount();
    console.log('Desktops products count:', count);
    expect(count).toBeGreaterThan(0);
  });
});