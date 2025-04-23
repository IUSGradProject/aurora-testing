# Test info

- Name: User clicks Buy Now, completes checkout form, and is redirected to homepage
- Location: C:\Users\DT User\Desktop\aurora-testing\shop-tests\items.spec.js:76:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /\/checkout$/
Received string:  "https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea"
Call log:
  - expect.toHaveURL with timeout 5000ms
  - waiting for locator(':root')
    9 × locator resolved to <html lang="en" data-critters-container="">…</html>
      - unexpected value "https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea"

    at C:\Users\DT User\Desktop\aurora-testing\shop-tests\items.spec.js:92:24
```

# Page snapshot

```yaml
- banner:
  - img "Aurora Jewels Logo"
  - text: Aurora
  - navigation:
    - link "HOME":
      - /url: /
    - link "SHOP":
      - /url: /shop
    - link " CART (1)":
      - /url: /cart
    - link " PROFILE":
      - /url: /purchase-history
    - link "LOG OUT":
      - /url: /login
- img "Product"
- heading "LOVE pendant" [level=2]
- text: $2,620.00
- paragraph: "A child of 1970s New York, the LOVE collection remains today an iconic symbol of love that transgresses convention. The screw motifs, ideal oval shape and undeniable elegance establish the piece as a timeless tribute to passionate romance. Studded with diamonds, yellow gold or rose gold: how far would you go for love?"
- 'heading "Brand: Cartier" [level=5]'
- separator
- text: "Quantity:"
- spinbutton: "1"
- text: "Subtotal: $2,620.00"
- button "Add to Cart"
- button "Buy Now"
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test('Clicking a product opens the product detail page', async ({ page }) => {
   4 |   // Go to the shop page (assuming you’re already logged in)
   5 |   await page.goto('https://aurora.heyappo.me/shop');
   6 |
   7 |   // Click on the product using the locator you provided
   8 |   await page.locator('div').filter({ hasText: /^LOVE pendantPrice: 2620$/ }).nth(1).click();
   9 |
   10 |   // Expect to land on the product detail page with specific ID
   11 |   await expect(page).toHaveURL('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');
   12 |
   13 |   
   14 | });
   15 |
   16 |
   17 | test('Add to cart shows login popup for guest users', async ({ page }) => {
   18 |     // Go directly to product page without logging in
   19 |     await page.goto('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');
   20 |   
   21 |     // Click "Add to Cart" as a guest
   22 |     await page.getByRole('button', { name: 'Add to Cart' }).click();
   23 |   
   24 |     // Expect the login popup to appear with proper text/buttons
   25 |     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
   26 |     await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
   27 |   
   28 |     // Click "Cancel" first and expect the popup to disappear
   29 |     await page.getByRole('button', { name: 'Cancel' }).click();
   30 |
   31 |   
   32 |     // Click "Add to Cart" again and now click "Login"
   33 |     await page.getByRole('button', { name: 'Add to Cart' }).click();
   34 |     await page.getByRole('button', { name: 'Login' }).click();
   35 |   
   36 |     // Expect to be redirected to login page
   37 |     await expect(page).toHaveURL('https://aurora.heyappo.me/login');
   38 |   });
   39 |
   40 |
   41 | test('Add product to cart and proceed to checkout', async ({ page }) => {
   42 |     // Go to login page and log in
   43 |     await page.goto('https://aurora.heyappo.me/login');
   44 |     await page.getByRole('textbox', { name: 'Email' }).fill('aaa@gmail.com');
   45 |     await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
   46 |     await page.getByRole('button', { name: 'Login' }).click();
   47 |   
   48 |     // Wait for redirection to /shop
   49 |     await page.waitForURL('**/shop');
   50 |   
   51 |     // Navigate directly to product page
   52 |     await page.goto('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');
   53 |   
   54 |     // Add to cart
   55 |     await page.getByRole('button', { name: 'Add to Cart' }).click();
   56 |   
   57 |     // Wait for cart count to update (e.g., CART (1) appears)
   58 |     await expect(page.getByRole('link', { name: /CART \(1\)/ })).toBeVisible();
   59 |   
   60 |     // Manually click on cart link in navbar
   61 |     await page.getByRole('link', { name: /CART \(1\)/ }).click();
   62 |   
   63 |     // Confirm redirection to cart page
   64 |     await expect(page).toHaveURL('https://aurora.heyappo.me/cart');
   65 |   
   66 |     // Check the checkbox to select product
   67 |     await page.getByRole('checkbox').check();
   68 |   
   69 |     // Proceed to checkout
   70 |     await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
   71 |   
   72 |     // Verify checkout page URL
   73 |     await expect(page).toHaveURL('https://aurora.heyappo.me/checkout');
   74 |   });
   75 |
   76 | test('User clicks Buy Now, completes checkout form, and is redirected to homepage', async ({ page }) => {
   77 |     // Step 1: Login
   78 |     await page.goto('https://aurora.heyappo.me/login');
   79 |     await page.getByRole('textbox', { name: 'Email' }).fill('aaa@gmail.com');
   80 |     await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
   81 |     await page.getByRole('button', { name: 'Login' }).click();
   82 |   
   83 |     // Wait for /shop page
   84 |     await page.waitForURL('**/shop');
   85 |   
   86 |     // Step 2: Go to product and click "Buy Now"
   87 |     await page.goto('https://aurora.heyappo.me/product/9a4971b1-dc60-4340-b05f-0adab05f74ea');
   88 |     await page.locator('text=Buy Now').click();
   89 |
   90 |
   91 |   
>  92 |     await expect(page).toHaveURL(/\/checkout$/);
      |                        ^ Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
   93 |
   94 |
   95 |     // Step 3: Fill out the checkout form
   96 |     await page.getByRole('textbox', { name: 'Full Name' }).fill('Anes Piknjac');
   97 |     await page.getByRole('textbox', { name: 'Address' }).fill('Patriotska liga 7');
   98 |     await page.getByRole('textbox', { name: 'City' }).fill('Hadzici');
   99 |     await page.getByRole('textbox', { name: 'Zip Code' }).fill('71420');
  100 |   
  101 |     // Choose "Pay on Delivery"
  102 |     await page.getByRole('combobox', { name: 'Payment Method' }).selectOption({ label: 'Pay on Delivery' });
  103 |   
  104 |     // Step 4: Submit the order
  105 |     await page.getByRole('button', { name: 'Submit Order' }).click();
  106 |   
  107 |     // Step 5: Confirm redirection to homepage
  108 |     await expect(page).toHaveURL('https://aurora.heyappo.me/');
  109 |   });
```