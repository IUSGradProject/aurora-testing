const { test, expect } = require('@playwright/test');

test('User logs in, adds item to cart, removes it, and sees empty cart message', async ({ page }) => {
  // Go to the shop page
  await page.goto('https://aurora.heyappo.me/shop');

  // Click on the login link
  await page.getByRole('link', { name: ' LOG IN' }).click();

  // Fill in email and password
  await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');

  // Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // Click on a product
  await page.getByText('Bvlgari WatchPrice:').click();

  // Add product to cart
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  
  await page.getByText('Product successfully added to').click();
  
  await page.goto('https://aurora.heyappo.me/cart');
  // Remove the product from the cart
  await page.getByRole('button', { name: '' }).click();

  // Verify the cart is empty
  await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
});


test('User logs in, adds product, and verifies cart update', async ({ page }) => {
    // Go to login page and log in
    await page.goto('https://aurora.heyappo.me/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Wait for redirection to /shop
    await page.waitForURL('**/shop');
  
    // Click on "SHOP" link (optional, depending on your navbar setup)
    await page.getByRole('link', { name: 'SHOP' }).click();
  
   await page.getByText('Bvlgari WatchPrice:').click();
  
    // On the product page, click "Add to Cart"
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  
    // Wait for CART (1) to appear
    await page.getByText('Product successfully added to').click();
  
    
    
    // Verify redirection to cart page
    await page.goto('https://aurora.heyappo.me/cart');
  
    // Optionally: Verify the item is listed in the cart
    await expect(page.getByRole('heading', { name: 'Bvlgari Watch' })).toBeVisible();
    

    // Remove the product from the cart
    await page.getByRole('button', { name: '' }).click();
  
  });
  
  
test('User logs in, opens product page, adds product to cart, and verifies it', async ({ page }) => {
    // Go to login page and log in
    await page.goto('https://aurora.heyappo.me/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Wait for redirection to /shop
    await page.waitForURL('**/shop');
  
    // Optional: Click SHOP link if needed
    await page.getByRole('link', { name: 'SHOP' }).click();
  
    // Find and click the specific product ("Bvlgari Bvlgari Watch") to enter product page
    await page.getByText('Bvlgari WatchPrice:').click();
  
    // On the product page, click "Add to Cart"
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  
    // Wait for CART (1) to be visible
    await page.getByText('Product successfully added to').click();
  
    // Verify cart page is loaded
    await page.goto('https://aurora.heyappo.me/cart');
  
    // Verify the product is listed in the cart
    await expect(page.getByRole('heading', { name: 'Bvlgari Watch' })).toBeVisible();
  
    await page.getByRole('link', { name: ' CART (1)' }).click();

    // Remove the product from the cart
    await page.getByRole('button', { name: '' }).click();
  
  
  });
  
test('User logs in, adds product to cart, proceeds to checkout, and verifies product', async ({ page }) => {
    // Go to login page and log in
    await page.goto('https://aurora.heyappo.me/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Wait for redirection to /shop
    await page.waitForURL('**/shop');
  
    // Click SHOP link to be sure on shop page
    await page.getByRole('link', { name: 'SHOP' }).click();
  
    // Click the specific product ("Bvlgari Bvlgari Watch")
    await page.getByText('Bvlgari WatchPrice:').click();
  
    // On product page, click "Add to Cart"
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  
    
    await page.getByText('Product successfully added to').click();
    // Verify cart page URL
    await page.goto('https://aurora.heyappo.me/cart');
  
    // Select the product checkbox
    await page.getByRole('checkbox').check();
  
    // Click "Proceed to Checkout"
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  
    // Verify on checkout page the correct product is listed
    await expect(page.getByRole('cell', { name: 'Bvlgari Watch' })).toBeVisible();
  
    await page.goto('https://aurora.heyappo.me/cart');

    // Remove the product from the cart
    await page.getByRole('button', { name: '' }).click();
  
  });
  

test('Cart quantity update reflects correct total price', async ({ page }) => {
  // Go to shop and log in
  await page.goto('https://aurora.heyappo.me/shop');
  await page.getByRole('link', { name: ' LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add product to cart
  await page.getByText('Bvlgari WatchPrice:').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
  await page.getByText('Product successfully added to').click();
  // Verify cart page URL
  await page.goto('https://aurora.heyappo.me/cart');

  // Change quantity to 10
  const quantityInput = page.getByRole('spinbutton');
  await quantityInput.fill('');
  await quantityInput.fill('10');

  // Check the checkbox to enable checkout
  await page.getByRole('checkbox').check();

  // Verify total is updated accordingly (replace this with dynamic check if needed)
  const totalText = await page.getByText('Total: $432,005.99');
  await expect(totalText).toBeVisible();
});
 