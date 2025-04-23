const { test, expect } = require('@playwright/test');

test('Navbar links navigate correctly', async ({ page }) => {
  await page.goto('https://aurora.heyappo.me/');

  // Check 'HOME' link
  await page.getByRole('link', { name: 'HOME' }).click();
  await expect(page).toHaveURL('https://aurora.heyappo.me/');

  // Check 'SHOP' link
  await page.getByRole('link', { name: 'SHOP' }).click();
  await expect(page).toHaveURL('https://aurora.heyappo.me/shop');

  // Check 'CART' link
  await page.getByRole('link', { name: ' CART (0)' }).click();
  await expect(page).toHaveURL('https://aurora.heyappo.me/cart');

  // Check 'LOG IN' link
  await page.getByRole('link', { name: ' LOG IN' }).click();
  await expect(page).toHaveURL('https://aurora.heyappo.me/login');
});
