const { test, expect } = require('@playwright/test');

test('Clicking a product opens the product detail page', async ({ page }) => {
  // Go to the shop page (assuming you’re already logged in)
  await page.goto('https://aurora.heyappo.me/shop');

  // Click on the product using the locator you provided
  await page.locator('div').filter({ hasText: /^Bvlgari Bvlgari WatchPrice: 6600$/ }).nth(1).click();

  // Expect to land on the product detail page (ensure correct URL or page state)
  await expect(page).toHaveURL(/\/product\//);
  
});


test('Add to cart shows login popup for guest users', async ({ page }) => {
    // Go directly to product page without logging in
    await page.goto('https://aurora.heyappo.me/shop');
  
    await page.locator('div').filter({ hasText: /^Bvlgari Bvlgari WatchPrice: 6600$/ }).nth(1).click();

    // Expect to land on the product detail page (ensure correct URL or page state)
    await expect(page).toHaveURL(/\/product\//);

    // Click "Add to Cart" as a guest
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  
    // Expect the login popup to appear with proper text/buttons
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  
    // Click "Cancel" first and expect the popup to disappear
    await page.getByRole('button', { name: 'Cancel' }).click();

  
    // Click "Add to Cart" again and now click "Login"
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Expect to be redirected to login page
    await expect(page).toHaveURL('https://aurora.heyappo.me/login');
  });

