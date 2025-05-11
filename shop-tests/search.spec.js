const { test, expect } = require('@playwright/test');

test('Clicking a product opens the product detail page', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Open the category dropdown and select 'Watches'
  await page.getByText('All Categories ▼').click();
  await page.getByText('Watches ▼').click();

  // Click on the specific product
  await page.locator('div').filter({ hasText: /^Bvlgari Bvlgari WatchPrice: 6600$/ }).nth(1).click();

  // Expect to land on the product detail page (ensure correct URL or page state)
  await expect(page).toHaveURL(/\/product\//);
});


test('Search for "bvlgari" displays the Bvlgari Bvlgari Watch', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Enter search query
  const searchBox = page.getByRole('searchbox', { name: 'Search for items...' });
  await searchBox.click();
  await searchBox.fill('bvlgari');

  // Expect the Bvlgari Bvlgari Watch to be visible in results
  const result = page.getByText('Bvlgari Bvlgari WatchPrice:');
  await expect(result).toBeVisible();

  // Click on the product
  await result.click();
});


test('Search for invalid term displays no products found message', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Enter an invalid search query
  const searchBox = page.getByRole('searchbox', { name: 'Search for items...' });
  await searchBox.click();
  await searchBox.fill('aaa');

  // Expect the "no products found" message to be visible
  const noResultsMessage = page.getByRole('heading', { name: 'Oops! No products found.' });
  await expect(noResultsMessage).toBeVisible();

  // Optionally click it (if needed)
  await noResultsMessage.click();
});