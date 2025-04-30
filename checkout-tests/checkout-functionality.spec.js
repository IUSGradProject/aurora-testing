const { test, expect } = require('@playwright/test');

test('User completes checkout by filling information and submitting order', async ({ page }) => {
     // Go to login page and log in
     await page.goto('https://aurora.heyappo.me/login');
     await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
     await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
     await page.getByRole('button', { name: 'Login' }).click();
   
     // Wait for redirection to /shop
     await page.waitForURL('**/shop');
   
     
   
     // Click the specific product ("Bvlgari Bvlgari Watch")
     await page.locator('div').filter({ hasText: /^Bvlgari Bvlgari WatchPrice: 6600$/ }).nth(1).click();
   
     // On product page, click "Add to Cart"
     await page.getByRole('button', { name: 'Add to Cart' }).click();
   
     // Wait until CART (1) is visible
     await expect(page.getByRole('link', { name: /CART \(1\)/ })).toBeVisible();
   
     // Click CART (1) to open cart page
     await page.getByRole('link', { name: /CART \(1\)/ }).click();
   
     // Verify cart page URL
     await expect(page).toHaveURL('https://aurora.heyappo.me/cart');
   
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
  