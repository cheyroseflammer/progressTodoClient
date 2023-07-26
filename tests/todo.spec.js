import { test, expect } from '@playwright/test';
// todos items array
const TODO_ITEMS = [
  { title: 'walk the dog', desc: 'rosco needs a walk at 3pm' },
  { title: 'take out the trash', desc: 'trash day is thursday!' },
  { title: 'call mom', desc: 'call your mother she worries' },
];
// direct to site before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://progress-todo-app.vercel.app');
});
// test new todos
test.describe('New Todo', () => {
  test('@smoke - should allow me to add todo items', async ({ page }) => {
    // grab title input element
    const new_todo_title = page.getByPlaceholder('Your todo title');
    // grab description input element
    const new_todo_desc = page.getByPlaceholder('Your todo description');
    // click the create button
    await page.locator("button[class='create-new']").click();
    // fill title input with first title in array
    await new_todo_title.fill(TODO_ITEMS[0].title);
    // fill description input with first description in array
    await new_todo_desc.fill(TODO_ITEMS[0].desc);
    // click submit todo
    await page.locator('input[id="sumbit-button"]').click();
    // assert title text matches
    await expect(page.locator('h2[class="task-title"]').first()).toHaveText(TODO_ITEMS[0].title);
    // assert description text matches
    await expect(page.locator('p[class="task-desc"]').first()).toHaveText(TODO_ITEMS[0].desc);
    // ADDING SECOND TODO
    // click the create button
    await page.locator("button[class='create-new']").click();
    // fill title input with first title in array
    await new_todo_title.fill(TODO_ITEMS[1].title);
    // fill description input with first description in array
    await new_todo_desc.fill(TODO_ITEMS[1].desc);
    // click submit todo
    await page.locator('input[id="sumbit-button"]').click();
    // assert title text matches
    await expect(page.locator('h2[class="task-title"]').nth(1)).toHaveText(TODO_ITEMS[1].title);
    // assert description text matches
    await expect(page.locator('p[class="task-desc"]').nth(1)).toHaveText(TODO_ITEMS[1].desc);
  });
  // modal should close when todo is added
  test('modal should close when hitting submit', async ({ page }) => {
    // clear state
    await deleteAllTodos(page);
    await page.locator("button[class='create-new']").click();
    // grab title input element
    const new_todo_title = page.getByPlaceholder('Your todo title');
    // grab description input element
    const new_todo_desc = page.getByPlaceholder('Your todo description');
    // fill title input with first title in array
    await new_todo_title.fill(TODO_ITEMS[0].title);
    // fill description input with first description in array
    await new_todo_desc.fill(TODO_ITEMS[0].desc);
    // click submit todo
    await page.locator('input[id="sumbit-button"]').click();
    // grab modal
    const modal_el = page.locator("div[class='modal']");
    // check its gone
    await expect(modal_el).toBeHidden();
    // delete
  });
  test('should append to bottom of list', async ({ page }) => {
    // clear state  before next test
    await deleteAllTodos(page);
    // readd todos for test
    // grab title input element
    const new_todo_title = page.getByPlaceholder('Your todo title');
    // grab description input element
    const new_todo_desc = page.getByPlaceholder('Your todo description');
    // click the create button
    await page.locator("button[class='create-new']").click();
    // fill title input with first title in array
    await new_todo_title.fill(TODO_ITEMS[0].title);
    // fill description input with first description in array
    await new_todo_desc.fill(TODO_ITEMS[0].desc);
    // click submit todo
    await page.locator('input[id="sumbit-button"]').click();
    // assert title text matches
    await new_todo_title.fill(TODO_ITEMS[1].title);
    // fill description input with first description in array
    await new_todo_desc.fill(TODO_ITEMS[1].desc);
    // click submit todo
    await page.locator('input[id="sumbit-button"]').click();
    // assert title text matches
    await expect(page.locator('h2[class="task-title"]').nth(1)).toHaveText(TODO_ITEMS[1].title);
    // assert description text matches
    await expect(page.locator('p[class="task-desc"]').nth(1)).toHaveText(TODO_ITEMS[1].desc);
  });
  test('should trim whitespace', async ({ page }) => {
    await deleteAllTodos(page);
    // grab title input element
    const new_todo_title = page.getByPlaceholder('Your todo title');
    // grab description input element
    const new_todo_desc = page.getByPlaceholder('Your todo description');
    // elements
    const expect_title = page.locator("h2[class='task-title']");
    const expected_desc = page.locator("p[class='task-desc']");
    // click the create button
    await page.locator("button[class='create-new']").click();
    // fill title input with first title in array
    await new_todo_title.fill('    Wash the car!    ');
    // fill description input with first description in array
    await new_todo_desc.fill('    Ubering wednesday   ');
    // click submit todo
    await page.locator('input[id="sumbit-button"]').click();
    await expect(expect_title).toHaveText('Wash the car!');
    await expect(expected_desc).toHaveText('Ubering wednesday');
  });
});
// test editing todos
test.describe('Editing todos', () => {
  test('@smoke - should be able to edit todos', async ({ page }) => {
    await deleteAllTodos(page);
    await addDefaultTodos(page);
    const second_todo_title = page.locator("h2[class='task-title']").nth(2);
    const second_todo_desc = page.locator("p[class='task-desc']").nth(2);
    const second_todo_btn = page.locator('button[class="edit"]').nth(2);
    await second_todo_btn.click();
    // grab place holders
    const edit_todo_title = page.getByPlaceholder('Your todo title');
    const edit_todo_desc = page.getByPlaceholder('Your todo description');
    // set todo
    await edit_todo_title.fill('Buy groceries');
    await edit_todo_desc.fill('oranges, apples, bread, carrots');
    // submit edit
    await page.locator('input[id="sumbit-button"]').click();
    // assert edit
    await expect(second_todo_title).toHaveText('Buy groceries');
    await expect(second_todo_desc).toHaveText('oranges, apples, bread, carrots');
  });
  test('edit should cancel when hitting x', async ({ page }) => {
    await deleteAllTodos(page);
    await addDefaultTodos(page);
    const todo_title = await page.locator("h2[class='task-title']").first();
    const todo_desc = await page.locator("p[class='task-desc']").first();
    const todo_btn = page.locator('button[class="edit"]').first();
    await todo_btn.click();
    // grab place holders
    const todo_title_input = page.getByPlaceholder('Your todo title');
    const todo_desc_input = page.getByPlaceholder('Your todo description');
    // set todo
    await todo_title_input.fill('Edit todo');
    await todo_desc_input.fill('Edit todo description');
    // find cancel button
    // eslint-disable-next-line testing-library/prefer-screen-queries
    await page.getByRole('button', { name: 'x' }).click();
    await expect(todo_title).toHaveText(TODO_ITEMS[0].title);
    await expect(todo_desc).toHaveText(TODO_ITEMS[0].desc);
  });
});
test.describe('Deleting todos', () => {
  test('@smoke - should be able to delete all todos.', async ({ page }) => {
    await deleteAllTodos(page);
    await addDefaultTodos(page);
    const delete_buttons = page.locator("button[class='delete']");
    for (let i = 0; i < (await delete_buttons.count()); i++) {
      await delete_buttons.nth(i).click();
    }
  });
});

// delete todos function
async function deleteAllTodos(page) {
  const delete_buttons = page.locator("button[class='delete']");
  for (let i = 0; i < (await delete_buttons.count()); i++) {
    await delete_buttons.nth(i).click();
  }
  await page.waitForTimeout(1000);
}
// add default todos function
async function addDefaultTodos(page) {
  await page.locator("button[class='create-new']").click();
  // grab title input element
  const new_todo_title = page.getByPlaceholder('Your todo title');
  // grab description input element
  const new_todo_desc = page.getByPlaceholder('Your todo description');
  for (const items of TODO_ITEMS) {
    await new_todo_title.fill(items.title);
    await new_todo_desc.fill(items.desc);
    await page.locator('input[id="sumbit-button"]').click();
  }
  await page.waitForTimeout(3000);
}
