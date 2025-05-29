const { test, expect } = require('@playwright/test');

//test('Successful signup with valid inputs', async ({ page }) => {
 // await page.goto('https://aurora.heyappo.me/signup');

 // await page.getByLabel('First name').fill('Amina');
 // await page.getByLabel('Last name').fill('Mujzin');
 // await page.getByLabel('Username').fill('aminauser123');
 // await page.getByLabel('Email').fill('amina.signup.test@example.com');

 // await page.getByRole('textbox', { name: 'Password', exact: true }).fill('AnesaneS123!');
 // await page.getByRole('textbox', { name: 'Confirm Password', exact: true }).fill('AnesaneS123!');

 // await page.getByRole('button', { name: 'Register' }).click();

 // await expect(page).toHaveURL('https://aurora.heyappo.me/login');
//});

test('Signup fails with weak password', async ({ page }) => {
    await page.goto('https://aurora.heyappo.me/signup');
  
    await page.getByLabel('First name').fill('Amina');
    await page.getByLabel('Last name').fill('Mujzin');
    await page.getByLabel('Username').fill('aminauser123');
    await page.getByLabel('Email').fill('amina.weakpw@example.com');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('weakpass');
    await page.getByRole('textbox', { name: 'Confirm Password', exact: true }).fill('weakpass');

    await page.getByRole('button', { name: 'Register' }).click();
  
    await expect(page.getByText('Password must be at least 8 characters, with uppercase, lowercase, number, and symbol.')).toBeVisible();
  });
  

test('Signup fails when passwords do not match', async ({ page }) => {
    await page.goto('https://aurora.heyappo.me/signup');
  
    await page.getByLabel('First name').fill('Amina');
    await page.getByLabel('Last name').fill('Mujzin');
    await page.getByLabel('Username').fill('aminauser123');
    await page.getByLabel('Email').fill('amina.mismatch@example.com');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('AnesaneS123!');
    await page.getByRole('textbox', { name: 'Confirm Password', exact: true }).fill('diffpass');
  
    await page.getByRole('button', { name: 'Register' }).click();
  
    await expect(page.getByText('Passwords do not match.')).toBeVisible();
  });
  

test('Signup fails with missing required fields', async ({ page }) => {
    await page.goto('https://aurora.heyappo.me/signup');
  
    // Do not fill anything
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('First name is required.', { exact: true })).toBeVisible();
    await expect(page.getByText('Last name is required.', { exact: true })).toBeVisible();
    await expect(page.getByText('Username is required.', { exact: true })).toBeVisible();
    await expect(page.getByText('Email is required.', { exact: true })).toBeVisible();
    await expect(page.getByText('Password is required.', { exact: true })).toBeVisible();
    await expect(page.getByText('Confirm password is required.', { exact: true })).toBeVisible();

   
  });
  
test('Signup fails with already registered email', async ({ page }) => {
    await page.goto('https://aurora.heyappo.me/signup');
  
    await page.getByLabel('First name').fill('Amina');
    await page.getByLabel('Last name').fill('Mujzin');
    await page.getByLabel('Username').fill('existinguser');
    await page.getByLabel('Email').fill('amina.mujzin02@gmail.com'); // assuming already used
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('AnesaneS123!');
    await page.getByRole('textbox', { name: 'Confirm Password', exact: true }).fill('AnesaneS123!');
  
    await page.getByRole('button', { name: 'Register' }).click();
  
    await expect(page.getByText('Email is already used.')).toBeVisible();
  });
  
test('Signup fails with invalid email address', async ({ page }) => {
    await page.goto('https://aurora.heyappo.me/signup');
  
    await page.getByLabel('First name').fill('Amina');
    await page.getByLabel('Last name').fill('Mujzin');
    await page.getByLabel('Username').fill('aminauser123');
    await page.getByLabel('Email').fill('not-an-email'); // invalid email format
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('ValidPass1!');
    await page.getByRole('textbox', { name: 'Confirm Password', exact: true }).fill('ValidPass1!');
  
    await page.getByRole('button', { name: 'Register' }).click();
  
    await expect(page.getByText('Enter a valid email address.', { exact: true })).toBeVisible();
  });


test('Signup fails with too short first name, last name, and username', async ({ page }) => {
    await page.goto('https://aurora.heyappo.me/signup');
  
    await page.getByLabel('First name').fill('A'); // too short
    await page.getByLabel('Last name').fill('B');  // too short
    await page.getByLabel('Username').fill('C');   // too short
    await page.getByLabel('Email').fill('shortinput@example.com');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('ValidPass1!');
    await page.getByRole('textbox', { name: 'Confirm Password', exact: true }).fill('ValidPass1!');
  
    await page.getByRole('button', { name: 'Register' }).click();
  
    await expect(page.getByText('First name must be at least 2 characters long.', { exact: true })).toBeVisible();
    await expect(page.getByText('Last name must be at least 2 characters long.', { exact: true })).toBeVisible();
    await expect(page.getByText('Username must be at least 2 characters long.', { exact: true })).toBeVisible();
  });

test('Signup page "Log in" link redirects to /login', async ({ page }) => {
    await page.goto('https://aurora.heyappo.me/signup');
  
    await page.getByRole('link', { name: 'Log in', exact: true }).click();
  
    await expect(page).toHaveURL('https://aurora.heyappo.me/login');
  });
  