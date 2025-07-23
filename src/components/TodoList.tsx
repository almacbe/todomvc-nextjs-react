import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import { filterTodos } from '../utils/filterTodos';

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
  editingId,
  setEditingId,
  filter,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  filter: 'all' | 'active' | 'completed';
}) {
  const filteredTodos = filterTodos(todos, filter);
  if (filteredTodos.length === 0) return null;
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => {
        const isEditing = editingId === todo.id;
        return (
          <li
            key={todo.id}
            data-testid="todo-item"
            className={(todo.completed ? 'completed ' : '') + (isEditing ? 'editing' : '')}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              editing={isEditing}
              setEditingId={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}
