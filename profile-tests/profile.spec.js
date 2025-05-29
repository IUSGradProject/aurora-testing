const { test, expect } = require('@playwright/test');

// deactivation feature

test('User buys product with Buy Now and sees it in purchase history', async ({ page }) => {
  // Go to the shop
  await page.goto('https://aurora.heyappo.me/shop');

  // Login
  await page.getByRole('link', { name: ' LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to product and use Buy Now
  await page.getByText('Bvlgari WatchPrice:').click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Buy Now' }).click();

  // Fill checkout form
  await page.getByRole('textbox', { name: 'Full Name' }).fill('aa');
  await page.getByRole('textbox', { name: 'Address' }).fill('aa');
  await page.getByRole('textbox', { name: 'City' }).fill('aa');
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('aa');

  // Select payment method
  await page.locator('div').filter({ hasText: 'Payment Method' }).nth(2).click();
  await page.getByRole('option', { name: 'Pay on Delivery' }).click();

  // Submit order
  await page.getByRole('button', { name: 'Submit Order' }).click();

  // Confirm order success message
  await expect(page.getByText('Your order has been')).toBeVisible();

  // Navigate to profile page
  await page.getByRole('link', { name: ' PROFILE' }).click();

  // Assert product is listed in purchase history
  const productCells = page.getByRole('cell', { name: 'Bvlgari Watch' });
  await expect(productCells.first()).toBeVisible();


  // Optional: Check date or price if known
  // await expect(page.getByText('Order date: May 11, 2025')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '$6600' })).toBeVisible();
});