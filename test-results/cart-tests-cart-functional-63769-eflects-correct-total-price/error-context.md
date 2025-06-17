# Test info

- Name: Cart quantity update reflects correct total price
- Location: C:\Users\DT User\Desktop\aurora-testing\cart-tests\cart-functionality.spec.js:163:1

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '' })

    at C:\Users\DT User\Desktop\aurora-testing\cart-tests\cart-functionality.spec.js:201:49
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
    - link " CART (0)":
      - /url: /cart
    - link " PROFILE":
      - /url: /purchase-history
    - text: LOG OUT
- img
- heading "Your cart is empty" [level=3]
```

# Test source

```ts
  101 |     // Wait for CART (1) to be visible
  102 |     await page.getByText('Product successfully added to').click();
  103 |   
  104 |     // Verify cart page is loaded
  105 |     await page.goto('https://aurora.heyappo.me/cart');
  106 |   
  107 |     // Verify the product is listed in the cart
  108 |     await expect(page.getByRole('heading', { name: 'Bvlgari Watch' })).toBeVisible();
  109 |   
  110 |     
  111 |     await page.waitForTimeout(2000);
  112 |     // Remove the product from the cart
  113 |     await page.getByRole('button', { name: '' }).click();
  114 |     await page.waitForTimeout(2000);
  115 |     await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
  116 |   
  117 |   });
  118 |   
  119 | test('User logs in, adds product to cart, proceeds to checkout, and verifies product', async ({ page }) => {
  120 |     // Go to login page and log in
  121 |     await page.goto('https://aurora.heyappo.me/login');
  122 |     await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  123 |     await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
  124 |     await page.getByRole('button', { name: 'Login' }).click();
  125 |   
  126 |     // Wait for redirection to /shop
  127 |     await page.waitForURL('**/shop');
  128 |   
  129 |     // Click SHOP link to be sure on shop page
  130 |     await page.getByRole('link', { name: 'SHOP' }).click();
  131 |   
  132 |     // Click the specific product ("Bvlgari Bvlgari Watch")
  133 |     await page.getByRole('heading', { name: 'Bvlgari Watch', exact: true }).click();
  134 |
  135 |     await page.waitForTimeout(2000);
  136 |
  137 |     // On product page, click "Add to Cart"
  138 |     await page.getByRole('button', { name: 'Add to Cart' }).click();
  139 |   
  140 |     
  141 |     await page.getByText('Product successfully added to').click();
  142 |     // Verify cart page URL
  143 |     await page.goto('https://aurora.heyappo.me/cart');
  144 |   
  145 |     // Select the product checkbox
  146 |     await page.getByRole('checkbox').check();
  147 |   
  148 |     // Click "Proceed to Checkout"
  149 |     await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  150 |     await page.waitForTimeout(2000);
  151 |     // Verify on checkout page the correct product is listed
  152 |     await page.getByText('Bvlgari Watch').click();
  153 |   
  154 |     await page.goto('https://aurora.heyappo.me/cart');
  155 |     await page.waitForTimeout(2000);
  156 |     // Remove the product from the cart
  157 |     await page.getByRole('button', { name: '' }).click();
  158 |     await page.waitForTimeout(2000);
  159 |     await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
  160 |   });
  161 |   
  162 |
  163 | test('Cart quantity update reflects correct total price', async ({ page }) => {
  164 |   // Go to shop and log in
  165 |   await page.goto('https://aurora.heyappo.me/shop');
  166 |   await page.getByRole('link', { name: ' LOG IN' }).click();
  167 |   await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  168 |   await page.getByRole('textbox', { name: 'Password' }).fill('anesaneS123!');
  169 |   await page.getByRole('button', { name: 'Login' }).click();
  170 |
  171 |   // Add product to cart
  172 |   await page.getByRole('heading', { name: 'Bvlgari Watch', exact: true }).click();
  173 |   await page.waitForTimeout(2000);
  174 |
  175 |   await page.getByRole('button', { name: 'Add to Cart' }).click();
  176 |   
  177 |   await page.getByText('Product successfully added to').click();
  178 |   // Verify cart page URL
  179 |   await page.goto('https://aurora.heyappo.me/cart');
  180 |   await page.waitForTimeout(2000);
  181 |   // Change quantity to 10
  182 |   const quantityInput = page.getByRole('spinbutton');
  183 |   await quantityInput.fill('');
  184 |   await quantityInput.fill('10');
  185 |   await page.waitForTimeout(2000);
  186 |   // Check the checkbox to enable checkout
  187 |   await page.getByRole('checkbox').check();
  188 |   await page.waitForTimeout(2000);
  189 |   // Verify total is updated accordingly (replace this with dynamic check if needed)
  190 |   const totalText = await page.getByText('Total: $432,005.99');
  191 |   await expect(totalText).toBeVisible();
  192 |   await page.waitForTimeout(2000);
  193 |   // Verify redirection to cart page
  194 |   await page.goto('https://aurora.heyappo.me/cart');
  195 |
  196 |   await page.waitForTimeout(2000);
  197 |   await page.waitForTimeout(2000);
  198 |   
  199 |   
  200 |   // Remove the product from the cart
> 201 |   await page.getByRole('button', { name: '' }).click();
      |                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  202 |   await page.waitForTimeout(2000);
  203 |   await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
  204 | });
  205 |  
  206 |
```