import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

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
  if (todos.length === 0) return null;
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;
        const isVisible =
          filter === 'all' ||
          (filter === 'active' && !todo.completed) ||
          (filter === 'completed' && todo.completed);
        return (
          <li
            key={todo.id}
            data-testid="todo-item"
            className={
              (todo.completed ? 'completed ' : '') + (isEditing ? 'editing' : '')
            }
            style={!isVisible ? { display: 'none' } : {}}
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
