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


  test('Sorting products from A to Z and Z to A updates product order', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Sort A to Z
  await page.getByRole('combobox', { name: 'Sort by' }).locator('svg').click();
  await page.getByRole('option', { name: 'A to Z' }).click();

  // Expect the first product to be 'Bvlgari Bvlgari Watch'
  await expect(page.locator('div').filter({ hasText: /^Bvlgari WatchPrice: 43200$/ }).first()).toBeVisible();

  // Click to open product detail
  await page.getByRole('heading', { name: 'Bvlgari Bvlgari Watch' }).click();

  // Navigate back to shop
  await page.goto('https://aurora.heyappo.me/shop');

  // Sort Z to A
  await page.getByRole('combobox', { name: 'Sort by' }).locator('svg').click();
  await page.getByRole('option', { name: 'Z to A' }).click();

  // Expect the first product to be 'Trinity ring'
  const firstProductZA = await page.getByRole('heading').first();
  await expect(firstProductZA).toHaveText('Wire Bangle');

  // Click to open product detail
  await page.getByRole('heading', { name: 'Wire Bangle' }).click();
});


test('Sorting products by price from highest to lowest and lowest to highest', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Sort by highest to lowest price
  await page.getByRole('combobox', { name: 'Sort by' }).locator('svg').click();
  await page.getByText('Highest to lowest price').click();

  // Expect the first product to be 'Bvlgari Watch' with price 43200
  await expect(page.locator('div').filter({ hasText: /^Bvlgari WatchPrice: 43200$/ }).first()).toBeVisible();

  // Click on the product
  await page.getByText('Bvlgari WatchPrice: 43200').click();

  // Navigate back to shop
  await page.goto('https://aurora.heyappo.me/shop');

  // Sort by lowest to highest price
  await page.getByRole('combobox', { name: 'Sort by' }).locator('svg').click();
  await page.getByText('Lowest to highest price').click();

  // Expect the first product to be 'Trinity ring'
  await expect(page.getByText(/^Trinity ringPrice:/)).toBeVisible();

  // Click on the product
  await page.getByText(/^Trinity ringPrice:/).click();
});


test('Clear button resets selected filters', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Select filters
  const minimalistCheckbox = page.getByRole('checkbox', { name: 'Modern/Minimalist', exact: true });
  const statementCheckbox = page.getByRole('checkbox', { name: 'Statement/Bold', exact: true });

  await minimalistCheckbox.check();
  await statementCheckbox.check();

  // Assert filters are checked
  await expect(minimalistCheckbox).toBeChecked();
  await expect(statementCheckbox).toBeChecked();

  // Click Clear button
  await page.getByRole('button', { name: 'Clear' }).click();

  // Assert filters are unchecked
  await expect(minimalistCheckbox).not.toBeChecked();
  await expect(statementCheckbox).not.toBeChecked();
});