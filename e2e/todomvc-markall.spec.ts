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

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
    await createStandardItems(page);
  });

  test('should allow me to mark all items as completed', async ({ page }) => {
    await page.locator('.toggle-all').check();
    for (let i = 0; i < 3; i++) {
      await expect(page.locator('.todo-list li').nth(i)).toHaveClass(/completed/);
    }
  });

  test('should correctly update the complete all checked state', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.locator('.todo-list li').nth(i).locator('.toggle').check();
    }
    await expect(page.locator('.toggle-all')).toBeChecked();
  });

  test('should allow me to clear the completion state of all items', async ({ page }) => {
    await page.locator('.toggle-all').check();
    await page.locator('.toggle-all').uncheck();
    for (let i = 0; i < 3; i++) {
      await expect(page.locator('.todo-list li').nth(i)).not.toHaveClass(/completed/);
    }
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
    await page.locator('.toggle-all').check();
    await expect(page.locator('.toggle-all')).toBeChecked();
    await page.locator('.todo-list li').nth(0).locator('.toggle').uncheck();
    await expect(page.locator('.toggle-all')).not.toBeChecked();
    await page.locator('.todo-list li').nth(0).locator('.toggle').check();
    await expect(page.locator('.toggle-all')).toBeChecked();
  });
}); 