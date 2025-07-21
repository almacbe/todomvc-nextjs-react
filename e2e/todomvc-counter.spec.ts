import { test, expect } from '@playwright/test';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';

test.describe('Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
  });

  test('should display the current number of todo items', async ({ page }) => {
    await page.locator('.new-todo').fill(TODO_ITEM_ONE);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-count')).toHaveText(/1 item left/);
    await page.locator('.new-todo').fill(TODO_ITEM_TWO);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-count')).toHaveText(/2 items left/);
  });
}); 