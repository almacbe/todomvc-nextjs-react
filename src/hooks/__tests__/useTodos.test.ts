import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../useTodos';

describe('useTodos', () => {
  it('filtra correctamente las tareas según el filtro', () => {
    const { result } = renderHook(() => useTodos());
    // Añadir tres tareas: una completada, dos activas
    act(() => {
      result.current.setTodos([
        { id: '1', title: 'A', completed: false },
        { id: '2', title: 'B', completed: true },
        { id: '3', title: 'C', completed: false },
      ]);
    });
    // Filtro all
    expect(result.current.filteredTodos).toHaveLength(3);
    // Filtro active
    act(() => { result.current.setFilter('active'); });
    expect(result.current.filteredTodos).toHaveLength(2);
    expect(result.current.filteredTodos.every(t => !t.completed)).toBe(true);
    // Filtro completed
    act(() => { result.current.setFilter('completed'); });
    expect(result.current.filteredTodos).toHaveLength(1);
    expect(result.current.filteredTodos[0].completed).toBe(true);
  });

  it('cuenta correctamente las tareas activas', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setTodos([
        { id: '1', title: 'A', completed: false },
        { id: '2', title: 'B', completed: true },
        { id: '3', title: 'C', completed: false },
      ]);
    });
    expect(result.current.activeCount).toBe(2);
  });
}); 