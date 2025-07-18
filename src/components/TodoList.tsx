import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onEdit, onDelete }: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}) {
  if (todos.length === 0) return null;
  return (
    <ul className="shadow-inner rounded-b overflow-hidden divide-y divide-gray-100" role="list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
} 