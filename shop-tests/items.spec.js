const { test, expect } = require('@playwright/test');

test('Clicking a product opens the product detail page', async ({ page }) => {
  // Go to the shop page (assuming you’re already logged in)
  await page.goto('https://aurora.heyappo.me/shop');

  // Click on the product using the locator you provided
  await page.locator('div').filter({ hasText: /^LOVE pendantPrice: 2620$/ }).nth(1).click();

  // Expect to land on the product detail page with specific ID
  await expect(page).toHaveURL('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');

  
});


test('Add to cart shows login popup for guest users', async ({ page }) => {
    // Go directly to product page without logging in
    await page.goto('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');
  
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


test('Add product to cart and proceed to checkout', async ({ page }) => {
    // Go to login page and log in
    await page.goto('https://aurora.heyappo.me/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('aaa@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Wait for redirection to /shop
    await page.waitForURL('**/shop');
  
    // Navigate directly to product page
    await page.goto('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');
  
    // Add to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  
    // Wait for cart count to update (e.g., CART (1) appears)
    await expect(page.getByRole('link', { name: /CART \(1\)/ })).toBeVisible();
  
    // Manually click on cart link in navbar
    await page.getByRole('link', { name: /CART \(1\)/ }).click();
  
    // Confirm redirection to cart page
    await expect(page).toHaveURL('https://aurora.heyappo.me/cart');
  
    // Check the checkbox to select product
    await page.getByRole('checkbox').check();
  
    // Proceed to checkout
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  
    // Verify checkout page URL
    await expect(page).toHaveURL('https://aurora.heyappo.me/checkout');
  });

test('User clicks Buy Now, completes checkout form, and is redirected to homepage', async ({ page }) => {
    // Step 1: Login
    await page.goto('https://aurora.heyappo.me/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('aaa@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Wait for /shop page
    await page.waitForURL('**/shop');
  
    // Step 2: Go to product and click "Buy Now"
    await page.goto('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');
    await page.locator('text=Buy Now').click();


  
    await expect(page).toHaveURL(/\/checkout$/);


    // Step 3: Fill out the checkout form
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Anes Piknjac');
    await page.getByRole('textbox', { name: 'Address' }).fill('Patriotska liga 7');
    await page.getByRole('textbox', { name: 'City' }).fill('Hadzici');
    await page.getByRole('textbox', { name: 'Zip Code' }).fill('71420');
  
    // Choose "Pay on Delivery"
    await page.getByRole('combobox', { name: 'Payment Method' }).selectOption({ label: 'Pay on Delivery' });
  
    // Step 4: Submit the order
    await page.getByRole('button', { name: 'Submit Order' }).click();
  
    // Step 5: Confirm redirection to homepage
    await expect(page).toHaveURL('https://aurora.heyappo.me/');
  });