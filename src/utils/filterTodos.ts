import { Todo, Filter } from '../types/Todo';

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === 'all') return todos;
  if (filter === 'active') return todos.filter((todo) => !todo.completed);
  if (filter === 'completed') return todos.filter((todo) => todo.completed);
  return todos;
}
