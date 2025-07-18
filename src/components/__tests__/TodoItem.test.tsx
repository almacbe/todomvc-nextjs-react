import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  it('muestra el título del todo', () => {
    const todo = { id: '1', title: 'Tarea de prueba', completed: false };
    render(<TodoItem todo={todo} onToggle={() => {}} />);
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
  });

  it('refleja el estado completado en el checkbox y el estilo', () => {
    const todo = { id: '1', title: 'Completada', completed: true };
    render(<TodoItem todo={todo} onToggle={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Completada')).toHaveClass('line-through');
  });

  it('llama a onToggle al hacer click en el checkbox', async () => {
    const todo = { id: '1', title: 'Toggle test', completed: false };
    const onToggle = jest.fn();
    render(<TodoItem todo={todo} onToggle={onToggle} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith('1');
  });
});
