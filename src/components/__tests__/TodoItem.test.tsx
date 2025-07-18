import { render, screen } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  it('muestra el título del todo', () => {
    const todo = { id: '1', title: 'Tarea de prueba', completed: false };
    render(<TodoItem todo={todo} />);
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
  });
}); 