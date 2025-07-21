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

test.describe.skip('Clear completed button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
    await createStandardItems(page);
  });

  test('should display the correct text', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await expect(page.locator('.clear-completed')).toHaveText('Clear completed');
  });

  test('should remove completed items when clicked', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.clear-completed').click();
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li').nth(0)).toHaveText(TODO_ITEM_ONE);
    await expect(page.locator('.todo-list li').nth(1)).toHaveText(TODO_ITEM_THREE);
  });

  test('should be hidden when there are no items that are completed', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await expect(page.locator('.clear-completed')).toBeVisible();
    await page.locator('.clear-completed').click();
    await expect(page.locator('.clear-completed')).not.toBeVisible();
  });
}); 