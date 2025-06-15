//const { test, expect } = require('@playwright/test');

/*
test('Login, add product, delete it, verify in deleted products', async ({ page }) => {
  // Login
  await page.goto('https://aurora.heyappo.me/shop');

  // Click on the login link
  await page.getByRole('link', { name: ' LOG IN' }).click();
  
  await page.getByRole('textbox', { name: 'Email' }).fill('amina.mujzin02@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('amina');

  // Click Login
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.waitForTimeout(2000);
  
  await page.goto('https://aurora.heyappo.me/dashboard');

  // Add new product
  await page.getByRole('button', { name: '+ Add new' }).click();
  await page.locator('div').filter({ hasText: 'Product name' }).nth(4).click();
  await page.getByRole('textbox', { name: 'Product name' }).fill('test');
  await page.getByText('Image URL').click();
  await page.getByRole('textbox', { name: 'Image URL' }).fill('test');
  await page.getByRole('textbox', { name: 'Description' }).fill('test');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Price' }).fill('$10.00');
  await page.waitForTimeout(2000);
  await page.getByRole('spinbutton', { name: 'Sold items' }).fill('01');
  await page.getByRole('spinbutton', { name: 'Available items' }).fill('01');

  await page.getByRole('combobox', { name: 'Category' }).locator('span').click();
  await page.getByRole('option', { name: 'Necklaces' }).click();

  await page.getByRole('combobox', { name: 'Brand' }).locator('span').click();
  await page.getByRole('option', { name: 'Cartier' }).click();

  await page.locator('div').filter({ hasText: /^Style$/ }).nth(2).click();
  await page.getByText('Classic').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Submit' }).click();

  // Navigate through pages to find the product
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: 'Next page' }).click();
    const productCell = page.getByRole('cell', { name: 'test' });
    if (await productCell.isVisible()) break;
  }
*/
/*
  // Select and delete the product
  await page.getByRole('cell', { name: 'test' }).click();
  await page.getByRole('row', { name: /test.*\$10\.00.*/  /*}).getByRole('button').nth(1).click(); // delete icon
  await page.getByRole('button', { name: 'Delete', exact: true }).click();

  // Go to Deleted Products
  await page.getByRole('button', { name: 'Deleted Products' }).click();

  // Assert product is in deleted list
  const deletedProduct = page.getByRole('cell', { name: 'test' }).first();
  await expect(deletedProduct).toBeVisible(); 
}); */
