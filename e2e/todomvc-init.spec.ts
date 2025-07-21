import { test, expect } from '@playwright/test';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';
const TODO_ITEM_THREE = 'book a doctors appointment';

test.describe('When page is initially opened', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
  });

  test('should focus on the todo input field', async ({ page }) => {
    await expect(page.locator('.new-todo')).toBeFocused();
  });
});

test.describe('No Todos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
  });

  test('should hide main and footer when no todos exist', async ({ page }) => {
    await expect(page.locator('.main')).not.toBeVisible();
    await expect(page.locator('.footer')).not.toBeVisible();
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });
}); 