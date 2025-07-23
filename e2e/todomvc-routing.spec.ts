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
    // Solo deben existir los items activos
    const items = await page.locator('.todo-list li').all();
    expect(items.length).toBe(2);
    const texts = await Promise.all(items.map(async (el) => await el.textContent()));
    expect(texts.some((t) => t?.includes('buy some cheese'))).toBe(true);
    expect(texts.some((t) => t?.includes('book a doctors appointment'))).toBe(true);
  });

  test('should respect the back button', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.filters a').nth(1).click(); // Active
    await page.locator('.filters a').nth(2).click(); // Completed
    // Solo debe existir el item completado
    let items2 = await page.locator('.todo-list li').all();
    expect(items2.length).toBe(1);
    let texts2 = await Promise.all(items2.map(async (el) => await el.textContent()));
    expect(texts2.some((t) => t?.includes('feed the cat'))).toBe(true);
    await page.goBack(); // Active
    // Ahora deben existir los 2 items activos
    let itemsActive = await page.locator('.todo-list li').all();
    expect(itemsActive.length).toBe(2);
    let textsActive = await Promise.all(itemsActive.map(async (el) => await el.textContent()));
    expect(textsActive.some((t) => t?.includes('buy some cheese'))).toBe(true);
    expect(textsActive.some((t) => t?.includes('book a doctors appointment'))).toBe(true);
    // Volver a All
    await page.locator('.filters a').nth(0).click();
    let itemsAll = await page.locator('.todo-list li').all();
    expect(itemsAll.length).toBe(3);
    let textsAll = await Promise.all(itemsAll.map(async (el) => await el.textContent()));
    expect(textsAll.some((t) => t?.includes('buy some cheese'))).toBe(true);
    expect(textsAll.some((t) => t?.includes('feed the cat'))).toBe(true);
    expect(textsAll.some((t) => t?.includes('book a doctors appointment'))).toBe(true);
  });

  test('should allow me to display completed items', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.filters a').nth(2).click(); // Completed
    // Solo deben existir los items completados
    let items3 = await page.locator('.todo-list li').all();
    expect(items3.length).toBe(1);
    let texts3 = await Promise.all(items3.map(async (el) => await el.textContent()));
    expect(texts3.some((t) => t?.includes('feed the cat'))).toBe(true);
    await page.locator('.filters a').nth(0).click(); // All
    // Ahora deben existir los 3 items
    let itemsAll2 = await page.locator('.todo-list li').all();
    expect(itemsAll2.length).toBe(3);
    let textsAll2 = await Promise.all(itemsAll2.map(async (el) => await el.textContent()));
    expect(textsAll2.some((t) => t?.includes('buy some cheese'))).toBe(true);
    expect(textsAll2.some((t) => t?.includes('feed the cat'))).toBe(true);
    expect(textsAll2.some((t) => t?.includes('book a doctors appointment'))).toBe(true);
  });

  test('should allow me to display all items', async ({ page }) => {
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await page.locator('.filters a').nth(1).click(); // Active
    await page.locator('.filters a').nth(2).click(); // Completed
    await page.locator('.filters a').nth(0).click(); // All
    // Ahora deben existir los 3 items
    let itemsAll3 = await page.locator('.todo-list li').all();
    expect(itemsAll3.length).toBe(3);
    let textsAll3 = await Promise.all(itemsAll3.map(async (el) => await el.textContent()));
    expect(textsAll3.some((t) => t?.includes('buy some cheese'))).toBe(true);
    expect(textsAll3.some((t) => t?.includes('feed the cat'))).toBe(true);
    expect(textsAll3.some((t) => t?.includes('book a doctors appointment'))).toBe(true);
  });

  test('should highlight the currently applied filter', async ({ page }) => {
    await expect(page.locator('.filters a').nth(0)).toHaveClass(/selected/);
    await page.locator('.filters a').nth(1).click();
    await expect(page.locator('.filters a').nth(1)).toHaveClass(/selected/);
    await page.locator('.filters a').nth(2).click();
    await expect(page.locator('.filters a').nth(2)).toHaveClass(/selected/);
  });
});
