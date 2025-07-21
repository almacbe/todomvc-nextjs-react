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

test.describe('Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
    await createStandardItems(page);
  });

  test('should allow me to display active items', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.filters a').nth(1).click(); // Active
    await expect(page.locator('.todo-list li').nth(0)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(1)).not.toBeVisible();
    await expect(page.locator('.todo-list li').nth(2)).toBeVisible();
  });

  test('should respect the back button', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.filters a').nth(1).click(); // Active
    await page.locator('.filters a').nth(2).click(); // Completed
    await expect(page.locator('.todo-list li').nth(0)).not.toBeVisible();
    await expect(page.locator('.todo-list li').nth(1)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(2)).not.toBeVisible();
    await page.goBack(); // Active
    await expect(page.locator('.todo-list li').nth(0)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(1)).not.toBeVisible();
    await expect(page.locator('.todo-list li').nth(2)).toBeVisible();
    await page.goBack(); // All
    await expect(page.locator('.todo-list li').nth(0)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(1)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(2)).toBeVisible();
  });

  test('should allow me to display completed items', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.filters a').nth(2).click(); // Completed
    await expect(page.locator('.todo-list li').nth(0)).not.toBeVisible();
    await expect(page.locator('.todo-list li').nth(1)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(2)).not.toBeVisible();
    await page.locator('.filters a').nth(0).click(); // All
    await expect(page.locator('.todo-list li').nth(0)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(1)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(2)).toBeVisible();
  });

  test('should allow me to display all items', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.filters a').nth(1).click(); // Active
    await page.locator('.filters a').nth(2).click(); // Completed
    await page.locator('.filters a').nth(0).click(); // All
    await expect(page.locator('.todo-list li').nth(0)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(1)).toBeVisible();
    await expect(page.locator('.todo-list li').nth(2)).toBeVisible();
  });

  test('should highlight the currently applied filter', async ({ page }) => {
    await expect(page.locator('.filters a').nth(0)).toHaveClass(/selected/);
    await page.locator('.filters a').nth(1).click();
    await expect(page.locator('.filters a').nth(1)).toHaveClass(/selected/);
    await page.locator('.filters a').nth(2).click();
    await expect(page.locator('.filters a').nth(2)).toHaveClass(/selected/);
  });
}); 