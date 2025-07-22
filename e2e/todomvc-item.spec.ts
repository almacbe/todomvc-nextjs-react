import { test, expect } from '@playwright/test';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';

function createItems(page) {
  return Promise.all([
    page.locator('.new-todo').fill(TODO_ITEM_ONE),
    page.locator('.new-todo').press('Enter'),
    page.locator('.new-todo').fill(TODO_ITEM_TWO),
    page.locator('.new-todo').press('Enter'),
  ]);
}

test.describe('Item', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
    await createItems(page);
  });

  test('should allow me to mark items as complete', async ({ page }) => {
    await page.locator('.todo-list li').nth(0).locator('.toggle').check();
    await expect(page.locator('.todo-list li').nth(0)).toHaveClass(/completed/);
    await expect(page.locator('.todo-list li').nth(1)).not.toHaveClass(/completed/);
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await expect(page.locator('.todo-list li').nth(0)).toHaveClass(/completed/);
    await expect(page.locator('.todo-list li').nth(1)).toHaveClass(/completed/);
  });

  test('should allow me to un-mark items as complete', async ({ page }) => {
    await page.locator('.todo-list li').nth(0).locator('.toggle').check();
    await expect(page.locator('.todo-list li').nth(0)).toHaveClass(/completed/);
    await expect(page.locator('.todo-list li').nth(1)).not.toHaveClass(/completed/);
    await page.locator('.todo-list li').nth(0).locator('.toggle').uncheck();
    await expect(page.locator('.todo-list li').nth(0)).not.toHaveClass(/completed/);
    await expect(page.locator('.todo-list li').nth(1)).not.toHaveClass(/completed/);
  });
});
