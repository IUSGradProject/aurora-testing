const { test, expect } = require('@playwright/test');

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
  
    await page.locator('div').filter({ hasText: /^Bvlgari Bvlgari WatchPrice: 6600$/ }).nth(1).click();
  
    // On the product page, click "Add to Cart"
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  
    // Wait for CART (1) to appear
    await expect(page.getByRole('link', { name: /CART \(1\)/ })).toBeVisible();
  
    // Click on the CART (1) link
    await page.getByRole('link', { name: /CART \(1\)/ }).click();
  
    // Verify redirection to cart page
    await expect(page).toHaveURL('https://aurora.heyappo.me/cart');
  
    // Optionally: Verify the item is listed in the cart
    await expect(page.getByRole('heading', { name: 'Bvlgari Bvlgari Watch' })).toBeVisible();
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
    await page.locator('div').filter({ hasText: /^Bvlgari Bvlgari WatchPrice: 6600$/ }).nth(1).click();
  
    // On the product page, click "Add to Cart"
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  
    // Wait for CART (1) to be visible
    await expect(page.getByRole('link', { name: /CART \(1\)/ })).toBeVisible();
  
    // Click on CART (1) to open cart page
    await page.getByRole('link', { name: /CART \(1\)/ }).click();
  
    // Verify cart page is loaded
    await expect(page).toHaveURL('https://aurora.heyappo.me/cart');
  
    // Verify the product is listed in the cart
    await expect(page.getByRole('heading', { name: 'Bvlgari Bvlgari Watch' })).toBeVisible();
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
  
    // Verify on checkout page the correct product is listed
    await expect(page.getByRole('cell', { name: 'Bvlgari Bvlgari Watch' })).toBeVisible();
  });
  
 