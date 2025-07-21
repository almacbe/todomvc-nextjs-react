import { test, expect } from '@playwright/test';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';
const TODO_ITEM_THREE = 'book a doctors appointment';

async function createStandardItems(page) {
  await page.locator('.new-todo').fill(TODO_ITEM_ONE);
  await page.locator('.new-todo').press('Enter');
  await page.locator('.new-todo').fill(TODO_ITEM_TWO);
  await page.locator('.new-todo').press('Enter');
  await page.locator('.new-todo').fill(TODO_ITEM_THREE);
  await page.locator('.new-todo').press('Enter');
}

test.describe('Editing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
    await createStandardItems(page);
    // Doble click en el segundo item para editar
    await page.locator('.todo-list li').nth(1).dblclick();
  });

  test('should focus the input', async ({ page }) => {
    await expect(page.locator('.todo-list li').nth(1).locator('.edit')).toBeFocused();
  });

  test('should hide other controls when editing', async ({ page }) => {
    await expect(page.locator('.todo-list li').nth(1).locator('.toggle')).not.toBeVisible();
    await expect(page.locator('.todo-list li').nth(1).locator('label')).not.toBeVisible();
  });

  test('should save edits on enter', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.edit').fill('buy some sausages');
    await page.locator('.todo-list li').nth(1).locator('.edit').press('Enter');
    await expect(page.locator('.todo-list li').nth(1)).toHaveText('buy some sausages');
  });

  test('should save edits on blur', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.edit').fill('buy some sausages');
    await page.locator('.todo-list li').nth(1).locator('.edit').blur();
    await expect(page.locator('.todo-list li').nth(1)).toHaveText('buy some sausages');
  });

  test('should trim entered text', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.edit').fill('    buy some sausages  ');
    await page.locator('.todo-list li').nth(1).locator('.edit').press('Enter');
    await expect(page.locator('.todo-list li').nth(1)).toHaveText('buy some sausages');
  });

  test('should remove the item if an empty text string was entered', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.edit').fill('');
    await page.locator('.todo-list li').nth(1).locator('.edit').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(2);
  });

  test('should cancel edits on escape', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.edit').fill('foo');
    await page.locator('.todo-list li').nth(1).locator('.edit').press('Escape');
    await expect(page.locator('.todo-list li').nth(1)).toHaveText(TODO_ITEM_TWO);
  });
}); 