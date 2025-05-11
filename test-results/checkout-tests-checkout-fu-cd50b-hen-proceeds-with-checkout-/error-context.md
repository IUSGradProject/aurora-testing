# Test info

- Name: User logs in clicks on product, adds product to the cart then proceeds with checkout 
- Location: C:\Users\DT User\Desktop\aurora-testing\checkout-tests\checkout-functionality.spec.js:3:1

# Error details

```
Error: locator.check: Error: strict mode violation: getByRole('checkbox') resolved to 2 elements:
    1) <input type="checkbox" _ngcontent-ng-c605912419=""/> aka getByRole('checkbox').first()
    2) <input type="checkbox" _ngcontent-ng-c605912419=""/> aka getByRole('checkbox').nth(1)

Call log:
  - waiting for getByRole('checkbox')

    at C:\Users\DT User\Desktop\aurora-testing\checkout-tests\checkout-functionality.spec.js:27:39
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
    - link " CART (2)":
      - /url: /cart
    - link " PROFILE":
      - /url: /purchase-history
    - link "LOG OUT":
      - /url: /login
- checkbox
- img "Slika"
- button ""
- heading "LOVE pendant" [level=3]
- paragraph: "Price: $2,620.00"
- text: "Quantity:"
- spinbutton: "1"
- checkbox
- img "Slika"
- button ""
- heading "Bvlgari Watch" [level=3]
- paragraph: "Price: $43,200.00"
- text: "Quantity:"
- spinbutton: "4"
- heading "Order Summary" [level=2]
- paragraph: "Subtotal: $0.00"
- paragraph: "Shipping: $0.00"
- paragraph: "Total: $0.00"
- button "Proceed to Checkout" [disabled]
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test('User logs in clicks on product, adds product to the cart then proceeds with checkout ', async ({ page }) => {
   4 |      // Go to login page and log in
   5 |      await page.goto('https://aurora.heyappo.me/login');
   6 |      await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
   7 |      await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
   8 |      await page.getByRole('button', { name: 'Login' }).click();
   9 |    
   10 |      // Wait for redirection to /shop
   11 |      await page.waitForURL('**/shop');
   12 |    
   13 |      
   14 |    
   15 |      // Click the specific product ("Bvlgari Bvlgari Watch")
   16 |      await page.getByText('Bvlgari WatchPrice:').click();
   17 |    
   18 |      // On product page, click "Add to Cart"
   19 |      await page.getByRole('button', { name: 'Add to Cart' }).click();
   20 |    
   21 |      await page.getByText('Product successfully added to').click();
   22 |    
   23 |      // Verify cart page URL
   24 |      await page.goto('https://aurora.heyappo.me/cart');
   25 |    
   26 |      // Select the product checkbox
>  27 |      await page.getByRole('checkbox').check();
      |                                       ^ Error: locator.check: Error: strict mode violation: getByRole('checkbox') resolved to 2 elements:
   28 |    
   29 |      // Click "Proceed to Checkout"
   30 |      await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
   31 |    
   32 |
   33 |     // Fill out checkout form
   34 |     await page.getByRole('textbox', { name: 'Full Name' }).fill('anes');
   35 |     await page.getByRole('textbox', { name: 'Address' }).fill('anes');
   36 |     await page.getByRole('textbox', { name: 'City' }).fill('hadzici');
   37 |     await page.getByRole('textbox', { name: 'Zip Code' }).fill('71420');
   38 |   
   39 |     // Select payment method
   40 |     await page.locator('svg').click();
   41 |     await page.getByRole('option', { name: 'Pay on Delivery' }).click();
   42 |   
   43 |     // Submit the order
   44 |     await page.getByRole('button', { name: 'Submit Order' }).click();
   45 |   
   46 |     // Confirm success message
   47 |     await expect(page.getByText('Your order has been')).toBeVisible();
   48 |   
   49 |     // Optionally: Confirm URL is redirected to /home
   50 |    // await expect(page).toHaveURL('https://aurora.heyappo.me/home');
   51 |   });
   52 |   
   53 |
   54 |
   55 |
   56 | test('User logs in, purchases two products', async ({ page }) => {
   57 |      // Go to shop and log in
   58 |      await page.goto('https://aurora.heyappo.me/shop');
   59 |      await page.getByRole('link', { name: ' LOG IN' }).click();
   60 |      await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
   61 |      await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
   62 |      await page.getByRole('button', { name: 'Login' }).click();
   63 |    
   64 |      // Buy first product (Bvlgari Watch with quantity 2)
   65 |      await page.getByText('Bvlgari WatchPrice:').click();
   66 |      
   67 |      await page.getByRole('button', { name: 'Add to Cart' }).click();
   68 |      await expect(page.getByText('Product successfully added to')).toBeVisible();
   69 |
   70 |      await page.goto('https://aurora.heyappo.me/shop');
   71 |      // Buy second product (LOVE pendant)
   72 |      
   73 |      await page.getByText('LOVE pendantPrice:').click();
   74 |      await page.getByRole('button', { name: 'Add to Cart' }).click();
   75 |      await expect(page.getByText('Product successfully added to')).toBeVisible();
   76 |
   77 |      // Go to cart and select both products
   78 |      await page.goto('https://aurora.heyappo.me/cart');
   79 |      await page.getByRole('checkbox').first().check();
   80 |      await page.getByRole('checkbox').nth(1).check();
   81 |    
   82 |      // Proceed to checkout
   83 |      await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
   84 |      await page.getByRole('textbox', { name: 'Full Name' }).fill('Anes');
   85 |      await page.getByRole('textbox', { name: 'Address' }).fill('Piknjac');
   86 |      await page.getByRole('textbox', { name: 'City' }).fill('Hadzici');
   87 |      await page.getByRole('textbox', { name: 'Zip Code' }).fill('71240');
   88 |    
   89 |      // Choose payment method
   90 |      await page.getByRole('combobox', { name: 'Payment Method' }).locator('span').click();
   91 |      await page.getByRole('option', { name: 'Pay on Delivery' }).click();
   92 |    
   93 |      // Submit order
   94 |      await page.getByRole('button', { name: 'Submit Order' }).click();
   95 |      await expect(page.getByText(/Your order has been/i)).toBeVisible();
   96 |    
   97 |
   98 |    });
   99 |
  100 |
  101 |
  102 | test('Buy Now from product page works without visiting the cart', async ({ page }) => {
  103 |   // Go to the shop and log in
  104 |   // Go to shop and log in
  105 |   await page.goto('https://aurora.heyappo.me/shop');
  106 |   await page.getByRole('link', { name: ' LOG IN' }).click();
  107 |   await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  108 |   await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
  109 |   await page.getByRole('button', { name: 'Login' }).click();
  110 |    
  111 |   
  112 |   await page.getByText('Bvlgari WatchPrice:').click();
  113 |      
  114 |   await page.getByRole('button', { name: 'Buy Now' }).click();
  115 |
  116 |   // Fill in shipping details
  117 |   await page.getByRole('textbox', { name: 'Full Name' }).fill('anes piknjac');
  118 |   await page.getByRole('textbox', { name: 'Address' }).fill('p 7');
  119 |   await page.getByRole('textbox', { name: 'City' }).fill('ha');
  120 |   await page.getByRole('textbox', { name: 'Zip Code' }).fill('71240');
  121 |
  122 |   // Choose payment method
  123 |   await page.getByRole('combobox', { name: 'Payment Method' }).click();
  124 |   await page.getByRole('option', { name: 'Pay on Delivery' }).click();
  125 |
  126 |   // Submit the order and verify success
  127 |   await page.getByRole('button', { name: 'Submit Order' }).click();
```