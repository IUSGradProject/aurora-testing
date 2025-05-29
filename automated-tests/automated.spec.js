// const { test, expect } = require('@playwright/test');

// test('Repeat login-cart-checkout test', async ({ page }) => {
//   const repeatCount = 10;

//   for (let i = 1; i <= repeatCount; i++) {
//     console.log(`\n🚀 Starting iteration ${i}`);

//     await page.goto('https://aurora.heyappo.me/shop');
//     await page.getByRole('link', { name: ' LOG IN' }).click();
//     await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
//     await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
//     await page.getByRole('button', { name: 'Login' }).click();

//     await page.getByRole('heading', { name: 'Bvlgari Watch', exact: true }).click();
//     await page.waitForTimeout(2000);
//     await page.getByRole('button', { name: 'Add to Cart' }).click();
//     await page.getByText('Product successfully added to').click();

//     await page.goto('https://aurora.heyappo.me/cart');
//     await page.waitForTimeout(2000);
//     await page.getByRole('button', { name: '' }).click();
//     await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();

//     await page.getByText('LOG OUT').click();
//     await expect(page).toHaveURL('https://aurora.heyappo.me/login');

//     console.log(`✅ Completed iteration ${i}`);
//   }
// });
