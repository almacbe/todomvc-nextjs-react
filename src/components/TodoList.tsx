import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}) {
  if (todos.length === 0) return null;
  return (
    <ul className="divide-y divide-gray-100 overflow-hidden rounded-b shadow-inner" role="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
