const { test, expect } = require('@playwright/test');

test('User logs in clicks on product, adds product to the cart then proceeds with checkout ', async ({ page }) => {
     // Go to login page and log in
     await page.goto('https://aurora.heyappo.me/login');
     await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
     await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
     await page.getByRole('button', { name: 'Login' }).click();
   
     // Wait for redirection to /shop
     await page.waitForURL('**/shop');
   
     
   
     // Click the specific product ("Bvlgari Bvlgari Watch")
     await page.getByRole('heading', { name: 'Bvlgari Watch', exact: true }).click();
     await page.waitForTimeout(2000);
     // On product page, click "Add to Cart"
     await page.getByRole('button', { name: 'Add to Cart' }).click();
   
     await page.getByText('Product successfully added to').click();
   
     // Verify cart page URL
     await page.goto('https://aurora.heyappo.me/cart');
   
     // Select the product checkbox
     await page.getByRole('checkbox').check();
   
     // Click "Proceed to Checkout"
     await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
   

    // Fill out checkout form
    await page.getByRole('textbox', { name: 'Full Name' }).fill('anes');
    await page.getByRole('textbox', { name: 'Address' }).fill('anes');
    await page.getByRole('textbox', { name: 'City' }).fill('hadzici');
    await page.getByRole('textbox', { name: 'Zip Code' }).fill('71420');
  
    // Select payment method
    await page.locator('svg').click();
    await page.getByRole('option', { name: 'Pay on Delivery' }).click();
  
    // Submit the order
    await page.getByRole('button', { name: 'Submit Order' }).click();
  
    // Confirm success message
    await expect(page.getByText('Your order has been')).toBeVisible();
  
    // Optionally: Confirm URL is redirected to /home
   // await expect(page).toHaveURL('https://aurora.heyappo.me/home');
  });
  



test('User logs in, purchases two products', async ({ page }) => {
     // Go to shop and log in
     await page.goto('https://aurora.heyappo.me/shop');
     await page.getByRole('link', { name: ' LOG IN' }).click();
     await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
     await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
     await page.getByRole('button', { name: 'Login' }).click();
   
     // Buy first product (Bvlgari Watch with quantity 2)
     await page.getByRole('heading', { name: 'Bvlgari Watch', exact: true }).click();
     await page.waitForTimeout(2000);
     await page.getByRole('button', { name: 'Add to Cart' }).click();
     await expect(page.getByText('Product successfully added to')).toBeVisible();

     await page.goto('https://aurora.heyappo.me/shop');
     // Buy second product (LOVE pendant)
     await page.getByRole('heading', { name: 'LOVE pendant' }).click();
     await page.waitForTimeout(2000);
     await page.getByRole('button', { name: 'Add to Cart' }).click();
     await expect(page.getByText('Product successfully added to')).toBeVisible();

     // Go to cart and select both products
     await page.goto('https://aurora.heyappo.me/cart');
     await page.getByRole('checkbox').first().check();
     await page.getByRole('checkbox').nth(1).check();
   
     // Proceed to checkout
     await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
     await page.getByRole('textbox', { name: 'Full Name' }).fill('Anes');
     await page.getByRole('textbox', { name: 'Address' }).fill('Piknjac');
     await page.getByRole('textbox', { name: 'City' }).fill('Hadzici');
     await page.getByRole('textbox', { name: 'Zip Code' }).fill('71240');
   
     // Choose payment method
     await page.getByRole('combobox', { name: 'Payment Method' }).locator('span').click();
     await page.getByRole('option', { name: 'Pay on Delivery' }).click();
   
     // Submit order
     await page.getByRole('button', { name: 'Submit Order' }).click();
     await expect(page.getByText(/Your order has been/i)).toBeVisible();
   

   });



test('Buy Now from product page works without visiting the cart', async ({ page }) => {
  // Go to the shop and log in
  // Go to shop and log in
  await page.goto('https://aurora.heyappo.me/shop');
  await page.getByRole('link', { name: ' LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
  await page.getByRole('button', { name: 'Login' }).click();
   
  
  await page.getByRole('heading', { name: 'Bvlgari Watch', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Buy Now' }).click();

  // Fill in shipping details
  await page.getByRole('textbox', { name: 'Full Name' }).fill('anes piknjac');
  await page.getByRole('textbox', { name: 'Address' }).fill('p 7');
  await page.getByRole('textbox', { name: 'City' }).fill('ha');
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('71240');

  // Choose payment method
  await page.getByRole('combobox', { name: 'Payment Method' }).click();
  await page.getByRole('option', { name: 'Pay on Delivery' }).click();

  // Submit the order and verify success
  await page.getByRole('button', { name: 'Submit Order' }).click();
  await expect(page.getByText('Your order has been')).toBeVisible();
});

