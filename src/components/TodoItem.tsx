import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleEdit = () => {
    setEditing(true);
    setEditValue(todo.title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEdit(todo.id, editValue);
      setEditing(false);
    } else if (e.key === 'Escape') {
      setEditing(false);
      setEditValue(todo.title);
    }
  };

  const handleEditBlur = () => {
    onEdit(todo.id, editValue);
    setEditing(false);
  };

  return (
    <li
      className="group flex items-center gap-4 border-b border-gray-100 bg-white px-4 py-2 last:border-b-0"
      role="listitem"
      onDoubleClick={handleEdit}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="-ml-2 h-7 w-7 cursor-pointer accent-green-500 transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      />
      {editing ? (
        <input
          ref={inputRef}
          className="flex-1 rounded border border-blue-200 px-2 py-1 text-2xl font-light break-all outline-none focus:ring-2 focus:ring-blue-400"
          value={editValue}
          onChange={handleEditChange}
          onKeyDown={handleEditKeyDown}
          onBlur={handleEditBlur}
          data-testid="edit-input"
        />
      ) : (
        <span
          className={
            'flex-1 text-2xl font-light break-all transition-colors duration-150 ' +
            (todo.completed ? 'text-gray-400 line-through opacity-60' : 'text-gray-700')
          }
          style={{
            textDecorationThickness: todo.completed ? 2 : undefined,
            textDecorationStyle: 'solid',
            transition: 'text-decoration 0.2s',
            opacity: todo.completed ? 0.6 : 1,
          }}
        >
          {todo.title}
        </span>
      )}
      <button
        className="ml-2 px-2 text-xl font-bold text-gray-300 transition-colors hover:text-red-500"
        aria-label="Eliminar tarea"
        onClick={() => onDelete(todo.id)}
        tabIndex={editing ? -1 : 0}
      >
        ×
      </button>
    </li>
  );
}
