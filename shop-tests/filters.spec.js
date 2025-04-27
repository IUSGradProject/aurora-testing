const { test, expect } = require('@playwright/test');

test('User filters products by Cartier brand and opens a product', async ({ page }) => {
  // Step 1: Go to the Shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Step 2: Apply the "Cartier" brand filter
  await page.getByRole('checkbox', { name: 'Brands: Cartier Tiffany & Co' }).check();
  await page.getByRole('button', { name: 'Filter' }).click();

  // Optional: Wait for page to update with filtered results
  await page.waitForLoadState('networkidle'); // waits until no network connections for a moment

  // Step 3: Click on the specific "LOVE pendant" product
  await page.locator('div').filter({ hasText: /^LOVE pendantPrice: 2620$/ }).nth(1).click();

  // Step 4: Verify we are on the correct product page
  await expect(page).toHaveURL(/\/product\/.*/);
});


test('User filters products by price range and opens a product', async ({ page }) => {
    // Step 1: Go to the Shop page
    await page.goto('https://aurora.heyappo.me/shop');
  
    // Step 2: Set Min and Max Price
    await page.getByRole('spinbutton', { name: 'Min Price' }).click();
    await page.getByRole('spinbutton', { name: 'Min Price' }).fill('4000');
  
    await page.getByRole('spinbutton', { name: 'Max Price' }).click();
    await page.getByRole('spinbutton', { name: 'Max Price' }).fill('8000');
  
    // Step 3: Apply the price filter
    await page.getByRole('button', { name: 'Filter' }).click();
  
    // Optional: Wait for the page to finish updating
    await page.waitForLoadState('networkidle');
  
    // Step 4: Click on a specific filtered product
    await page.locator('div').filter({ hasText: /^Bvlgari Bvlgari WatchPrice: 6600$/ }).nth(1).click();
  
    // Step 5: Verify we are on the correct product page
    await expect(page).toHaveURL(/\/product\/.*/);
  });

test('User filters products by style "Classic Modern" and opens a product', async ({ page }) => {
    // Step 1: Navigate to the Shop page
    await page.goto('https://aurora.heyappo.me/shop');
  
    // Step 2: Check the "Classic Modern" style filter
    await page.getByRole('checkbox', { name: 'Styles: Classic Modern/' }).check();
  
    // Step 3: Click the Filter button
    await page.getByRole('button', { name: 'Filter' }).click();
  
    // Step 4: Wait for the results to update
    await page.waitForLoadState('networkidle');
  
    // Step 5: Click on the "LOVE pendant" product
    await page.locator('div').filter({ hasText: /^LOVE pendantPrice: 2620$/ }).nth(1).click();
  
    // Step 6: Verify navigation to the product page
    await expect(page).toHaveURL(/\/product\/.*/);
  });