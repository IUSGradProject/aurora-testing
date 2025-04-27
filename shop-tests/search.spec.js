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
