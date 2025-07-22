import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodosContainer from '../TodosContainer';

// Mock crypto.randomUUID for deterministic IDs
global.crypto = {
  ...global.crypto,
  randomUUID: () => `${Math.random().toString(36).substring(2, 10)}-xxxx-xxxx-xxxx-xxxxxxxxxxxx`,
};

describe('TodosContainer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('elimina todos los completados al hacer click en "Clear completed"', async () => {
    render(<TodosContainer />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    // Agregar 3 todos
    await userEvent.type(input, 'Tarea 1{enter}');
    await userEvent.type(input, 'Tarea 2{enter}');
    await userEvent.type(input, 'Tarea 3{enter}');
    // Marcar la segunda como completada
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]); // Marca la segunda tarea
    // Click en 'Clear completed'
    const clearBtn = screen.getByText(/clear completed/i);
    await userEvent.click(clearBtn);
    // Solo deben quedar las tareas activas
    const items = screen.getAllByTestId('todo-item');
    expect(items).toHaveLength(2);
    const texts = items.map(item => item.textContent);
    expect(texts.some(t => t?.includes('Tarea 2'))).toBe(true);
    expect(texts.some(t => t?.includes('Tarea 3'))).toBe(true);
  });

  it('no elimina nada si no hay completados', async () => {
    render(<TodosContainer />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, 'A{enter}');
    await userEvent.type(input, 'B{enter}');
    await userEvent.type(input, 'C{enter}');
    const clearBtn = screen.getByText(/clear completed/i);
    await userEvent.click(clearBtn);
    const items = screen.getAllByTestId('todo-item');
    expect(items).toHaveLength(3);
    const texts = items.map(item => item.textContent);
    expect(texts.some(t => t?.includes('A'))).toBe(true);
    expect(texts.some(t => t?.includes('B'))).toBe(true);
    expect(texts.some(t => t?.includes('C'))).toBe(true);
  });

  it('elimina todos si todos están completados', async () => {
    render(<TodosContainer />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, 'A{enter}');
    await userEvent.type(input, 'B{enter}');
    await userEvent.type(input, 'C{enter}');
    // Marcar todos como completados
    const checkboxes = screen.getAllByRole('checkbox');
    for (const cb of checkboxes.slice(1)) await userEvent.click(cb);
    const clearBtn = screen.getByText(/clear completed/i);
    await userEvent.click(clearBtn);
    expect(screen.queryAllByTestId('todo-item')).toHaveLength(0);
  });

  it('el botón no aparece si no hay completados', async () => {
    render(<TodosContainer />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, 'A{enter}');
    await userEvent.type(input, 'B{enter}');
    expect(screen.queryByText(/clear completed/i)).not.toBeNull(); // Aparece porque hay todos
    // Eliminar todos los todos
    const destroyBtns = screen.getAllByRole('button');
    for (const btn of destroyBtns) await userEvent.click(btn);
    expect(screen.queryByText(/clear completed/i)).toBeNull(); // No aparece si no hay todos
  });
}); 