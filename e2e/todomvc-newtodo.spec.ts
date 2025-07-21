import { test, expect } from '@playwright/test';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';
const TODO_ITEM_THREE = 'book a doctors appointment';

test.describe('New Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
  });

  test('should allow me to add todo items', async ({ page }) => {
    await page.locator('.new-todo').fill(TODO_ITEM_ONE);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li').first()).toHaveText(TODO_ITEM_ONE);
    await page.locator('.new-todo').fill(TODO_ITEM_TWO);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li').nth(0)).toHaveText(TODO_ITEM_ONE);
    await expect(page.locator('.todo-list li').nth(1)).toHaveText(TODO_ITEM_TWO);
  });

  test('should clear text input field when an item is added', async ({ page }) => {
    await page.locator('.new-todo').fill(TODO_ITEM_ONE);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.new-todo')).toHaveValue('');
  });

  test('should append new items to the bottom of the list', async ({ page }) => {
    await page.locator('.new-todo').fill(TODO_ITEM_ONE);
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill(TODO_ITEM_TWO);
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill(TODO_ITEM_THREE);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.locator('.todo-list li').nth(0)).toHaveText(TODO_ITEM_ONE);
    await expect(page.locator('.todo-list li').nth(1)).toHaveText(TODO_ITEM_TWO);
    await expect(page.locator('.todo-list li').nth(2)).toHaveText(TODO_ITEM_THREE);
  });

  test('should trim text input', async ({ page }) => {
    await page.locator('.new-todo').fill('   ' + TODO_ITEM_ONE + '  ');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li').first()).toHaveText(TODO_ITEM_ONE);
  });

  test('should show main and footer when items added', async ({ page }) => {
    await page.locator('.new-todo').fill(TODO_ITEM_ONE);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.main')).toBeVisible();
    await expect(page.locator('.footer')).toBeVisible();
  });
}); 