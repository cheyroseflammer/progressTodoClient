import { test, expect } from '@playwright/test';

test('has login title', async ({ page }) => {
  await page.goto('https://progress-todo-app.vercel.app');

  await expect(page).toHaveTitle('Todo Pern App');
});
