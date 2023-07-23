import { test } from '@playwright/test';

const TODO_TITLES = ['walk the dog', 'take out the trash', 'call mom'];
const TODO_DESC = [
  'rosco needs a walk at 3pm',
  'trash day is thursday!',
  'call your mother she worries',
];

test.beforeEach(async ({ page }) => {
  await page.goto('https://progress-todo-app.vercel.app');
});

test.describe('New Todo', () => {
  test('@smoke - should allow me to add todo items', async ({ page }) => {
    await page.locator('.create').click();
    const new_todo_title = page.getByPlaceholder('Your todo title');
    await new_todo_title.fill(TODO_TITLES[0]);
    const new_todo_desc = page.getByPlaceholder('Your todo description');
    await new_todo_desc.fill(TODO_DESC[0]);
    await page.locator('#submit-button').click();
  });
});
