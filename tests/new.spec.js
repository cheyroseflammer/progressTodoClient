import { test, expect } from '@playwright/test';

test('can add new todo', async ({ page }) => {
  await page.goto('https://progress-todo-app.vercel.app');
  // find add new todo button
  let new_todo_btn = await page.locator('.create');
  // click it
  await new_todo_btn.click();
  // grab title input and fill
  await page.fill("input[name='title']", 'Title');
});
