const { test, expect } = require('@playwright/test');

test('Successful login with valid credentials', async ({ page }) => {
  await page.goto('https://aurora.heyappo.me/login');

  // Fill in inputs directly
  await page.getByRole('textbox', { name: 'Email' }).fill('amina.mujzin02@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('amina');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://aurora.heyappo.me/shop');
});

test('Login fails with invalid password', async ({ page }) => {
  await page.goto('https://aurora.heyappo.me/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('amina.mujzin02@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Username or password are invalid')).toBeVisible();
});

test('Sign up link redirects to signup page', async ({ page }) => {
  await page.goto('https://aurora.heyappo.me/login');

  await page.getByRole('link', { name: 'Sign up' }).click();

  await expect(page).toHaveURL('https://aurora.heyappo.me/signup');
});