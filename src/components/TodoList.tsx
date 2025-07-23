import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import { filterTodos } from '../utils/filterTodos';
import { useState } from 'react';

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
  filter,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  filter: 'all' | 'active' | 'completed';
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const filteredTodos = filterTodos(todos, filter);
  if (filteredTodos.length === 0) return null;

  const handleDelete = (id: string) => {
    onDelete(id);
    if (editingId === id) setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => {
        const isEditing = editingId === todo.id;
        const liClass = (todo.completed ? 'completed ' : '') + (isEditing ? 'editing' : '');
        return (
          <li key={todo.id} data-testid="todo-item" className={liClass}>
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={handleDelete}
              editing={isEditing}
              setEditingId={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}
