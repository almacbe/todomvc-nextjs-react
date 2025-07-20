import { test, expect } from '@playwright/test';

test.describe('TodoMVC Basic Test', () => {
  test('should display the todos heading', async ({ page }) => {
    // Navegar a la página raíz
    await page.goto('/');

    // Verificar que la página contiene el texto "todos" (el h1 de TodoMVC)
    await expect(page.locator('h1')).toContainText('todos');
  });
});
