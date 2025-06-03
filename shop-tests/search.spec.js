const { test, expect } = require('@playwright/test');

test('Clicking on category for watches displays Bvlgari Watch', async ({ page }) => {
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


test('Search for "bvlgari" displays the Bvlgari Watch', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Enter search query
  const searchBox = page.getByRole('searchbox', { name: 'Search for items...' });
  await searchBox.click();
  await searchBox.fill('bvlgari');

  await page.waitForTimeout(2000);
  // Expect the Bvlgari Bvlgari Watch to be visible in results
  await page.getByRole('heading', { name: 'Bvlgari Watch' }).click();
  
});


test('Search for invalid term displays no products found message', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Enter an invalid search query
  const searchBox = page.getByRole('searchbox', { name: 'Search for items...' });
  await searchBox.click();
  await page.waitForTimeout(2000);
  await searchBox.fill('aaa');

  // Expect the "no products found" message to be visible
  await page.waitForTimeout(3000);
  const noResultsMessage = page.getByRole('heading', { name: 'Oops! No products found.' });
  await expect(noResultsMessage).toBeVisible();

  
});