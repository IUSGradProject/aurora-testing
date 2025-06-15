# Test info

- Name: Login, add product, delete it, verify in deleted products
- Location: C:\Users\DT User\Desktop\aurora-testing\admin-tests\admin.spec.js:4:1

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Next page' })

    at C:\Users\DT User\Desktop\aurora-testing\admin-tests\admin.spec.js:48:59
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
    - link "DASHBOARD":
      - /url: /dashboard
    - link " CART (0)":
      - /url: /cart
    - link " PROFILE":
      - /url: /purchase-history
    - text: LOG OUT
- heading "Create product" [level=2]
- text: Product name
- textbox "Product name": test
- text: Image URL
- textbox "Image URL": test
- text: Description
- textbox "Description": test
- text: Price
- textbox "Price": $10.00
- text: Price is required. Sold items
- spinbutton "Sold items": "01"
- text: Available items
- spinbutton "Available items": "01"
- text: Category
- combobox "Category Necklaces": Necklaces
- text: Brand
- combobox "Brand Cartier": Cartier
- text: Style
- combobox "Style Classic": Classic
- button "Submit"
- button "Cancel"
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 |
   4 | test('Login, add product, delete it, verify in deleted products', async ({ page }) => {
   5 |   // Login
   6 |   await page.goto('https://aurora.heyappo.me/shop');
   7 |
   8 |   // Click on the login link
   9 |   await page.getByRole('link', { name: ' LOG IN' }).click();
  10 |   
  11 |   await page.getByRole('textbox', { name: 'Email' }).fill('amina.mujzin02@gmail.com');
  12 |   await page.getByRole('textbox', { name: 'Password' }).fill('amina');
  13 |
  14 |   // Click Login
  15 |   await page.waitForTimeout(2000);
  16 |   await page.getByRole('button', { name: 'Login' }).click();
  17 |   
  18 |   await page.waitForTimeout(2000);
  19 |   
  20 |   await page.goto('https://aurora.heyappo.me/dashboard');
  21 |
  22 |   // Add new product
  23 |   await page.getByRole('button', { name: '+ Add new' }).click();
  24 |   await page.locator('div').filter({ hasText: 'Product name' }).nth(4).click();
  25 |   await page.getByRole('textbox', { name: 'Product name' }).fill('test');
  26 |   await page.getByText('Image URL').click();
  27 |   await page.getByRole('textbox', { name: 'Image URL' }).fill('test');
  28 |   await page.getByRole('textbox', { name: 'Description' }).fill('test');
  29 |   await page.waitForTimeout(2000);
  30 |   await page.getByRole('textbox', { name: 'Price' }).fill('$10.00');
  31 |   await page.waitForTimeout(2000);
  32 |   await page.getByRole('spinbutton', { name: 'Sold items' }).fill('01');
  33 |   await page.getByRole('spinbutton', { name: 'Available items' }).fill('01');
  34 |
  35 |   await page.getByRole('combobox', { name: 'Category' }).locator('span').click();
  36 |   await page.getByRole('option', { name: 'Necklaces' }).click();
  37 |
  38 |   await page.getByRole('combobox', { name: 'Brand' }).locator('span').click();
  39 |   await page.getByRole('option', { name: 'Cartier' }).click();
  40 |
  41 |   await page.locator('div').filter({ hasText: /^Style$/ }).nth(2).click();
  42 |   await page.getByText('Classic').click();
  43 |   await page.waitForTimeout(2000);
  44 |   await page.getByRole('button', { name: 'Submit' }).click();
  45 |
  46 |   // Navigate through pages to find the product
  47 |   for (let i = 0; i < 5; i++) {
> 48 |     await page.getByRole('button', { name: 'Next page' }).click();
     |                                                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  49 |     const productCell = page.getByRole('cell', { name: 'test' });
  50 |     if (await productCell.isVisible()) break;
  51 |   }
  52 |
  53 |   // Select and delete the product
  54 |   await page.getByRole('cell', { name: 'test' }).click();
  55 |   await page.getByRole('row', { name: /test.*\$10\.00.*/ }).getByRole('button').nth(1).click(); // delete icon
  56 |   await page.getByRole('button', { name: 'Delete', exact: true }).click();
  57 |
  58 |   // Go to Deleted Products
  59 |   await page.getByRole('button', { name: 'Deleted Products' }).click();
  60 |
  61 |   // Assert product is in deleted list
  62 |   const deletedProduct = page.getByRole('cell', { name: 'test' }).first();
  63 |   await expect(deletedProduct).toBeVisible();
  64 | });
  65 |
```