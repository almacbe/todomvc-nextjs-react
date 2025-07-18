import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

const todos = [
  { id: '1', title: 'Aprender React', completed: false },
  { id: '2', title: 'Aprender Testing', completed: true },
];

describe('TodoList', () => {
  it('muestra los títulos de los todos', () => {
    render(<TodoList todos={todos} />);
    expect(screen.getByText('Aprender React')).toBeInTheDocument();
    expect(screen.getByText('Aprender Testing')).toBeInTheDocument();
  });
});
