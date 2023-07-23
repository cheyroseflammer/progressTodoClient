import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://progress-todo-app.vercel.app/');
  await page.locator('input[type="email"]').fill('demo@email.com');
  await page.locator('input[type="password"]').fill('testing');
  await page.locator('input[type="submit"]').click();
  //  save state
  await page.context().storageState({ path: './LoginAuth.json' });

  await browser.close();
}
