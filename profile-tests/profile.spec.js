const { test, expect } = require('@playwright/test');

test('Logout redirects user to /login page', async ({ page }) => {
  // Navigate to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Go to login page
  await page.getByRole('link', { name: ' LOG IN' }).click();

  // Enter login credentials
  await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
  await page.getByRole('button', { name: 'Login' }).click();

  // Click the LOG OUT button
  await page.getByRole('link', { name: 'LOG OUT' }).click();

  // Expect to be redirected to the login page
  await expect(page).toHaveURL('https://aurora.heyappo.me/login');
});
