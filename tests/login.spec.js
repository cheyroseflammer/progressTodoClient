import { test, expect } from '@playwright/test';

// login variables
const email = 'cheyenneflammer1@gmail.com';
const password = 'password';

// test start and login
test.beforeEach('Has title, can login', async ({ page }) => {
  await page.goto('https://progress-todo-app.vercel.app');
  // expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Todo Pern App/);
  // find password input and click
  let password_input = await page.locator('input[type="password"]');
  //  fill password
  await password_input.fill(password);
  //  find email input and click
  let email_input = await page.locator('input[type="email"]');
  // fill email
  await email_input.fill(email);
  // find submit button
  let submit_button = await page.locator('input[type="submit"]');
  // click submit
  await submit_button.click();
  // grab head after login
  let logged_in_header = await page.locator('h1');
  // expect certain text
  await expect(logged_in_header).toHaveText('✅ Progress Tick List');
});
