import { test, expect } from '@playwright/test';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';

test.describe('Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.new-todo');
  });

  test('should persist its data', async ({ page, context }) => {
    // Añade dos tareas y marca la segunda como completada
    await page.locator('.new-todo').fill(TODO_ITEM_ONE);
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill(TODO_ITEM_TWO);
    await page.locator('.new-todo').press('Enter');
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    // Verifica el estado
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li').nth(0)).toHaveText(TODO_ITEM_ONE);
    await expect(page.locator('.todo-list li').nth(1)).toHaveText(TODO_ITEM_TWO);
    await expect(page.locator('.todo-list li').nth(0)).not.toHaveClass(/completed/);
    await expect(page.locator('.todo-list li').nth(1)).toHaveClass(/completed/);
    // Recarga la página y verifica que el estado persiste
    await page.reload();
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li').nth(0)).toHaveText(TODO_ITEM_ONE);
    await expect(page.locator('.todo-list li').nth(1)).toHaveText(TODO_ITEM_TWO);
    await expect(page.locator('.todo-list li').nth(0)).not.toHaveClass(/completed/);
    await expect(page.locator('.todo-list li').nth(1)).toHaveClass(/completed/);
  });
}); 