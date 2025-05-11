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

test('Login fails with blank input', async ({ page }) => {
  await page.goto('https://aurora.heyappo.me/login');

  
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Please fill in both email and password fields.')).toBeVisible();
});

test('Sign up link redirects to signup page', async ({ page }) => {
  await page.goto('https://aurora.heyappo.me/login');

  await page.getByRole('link', { name: 'Sign up' }).click();

  await expect(page).toHaveURL('https://aurora.heyappo.me/signup');
});


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
