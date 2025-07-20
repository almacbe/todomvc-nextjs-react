import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';

describe('TodoMVC - Página principal', () => {
  it('muestra el input para añadir tareas', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/what needs to be done/i)).toBeInTheDocument();
  });

  it('permite añadir una tarea y la muestra en la lista', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, 'Aprender Testing{enter}');
    expect(screen.getByText('Aprender Testing')).toBeInTheDocument();
  });

  it('no añade tareas vacías', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, '   {enter}');
    // No debe aparecer ningún elemento en la lista de todos (excluyendo los filtros)
    expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument();
  });

  it('renderiza múltiples tareas', () => {
    // Simula el estado inicial con varias tareas
    const todos = [
      { id: '1', title: 'Tarea 1', completed: false },
      { id: '2', title: 'Tarea 2', completed: false },
      { id: '3', title: 'Tarea 3', completed: false },
    ];
    // Mock de useState para inyectar tareas
    jest.spyOn(require('react'), 'useState').mockImplementationOnce(() => [todos, jest.fn()]);
    render(<Home />);
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.getByText('Tarea 3')).toBeInTheDocument();
  });
});
