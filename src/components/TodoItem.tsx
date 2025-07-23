import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
  editing,
  setEditingId,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  editing: boolean;
  setEditingId: (id: string | null) => void;
}) {
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(todo.title);
  }, [todo.title]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = editValue.trim();
      if (trimmed === '') {
        onDelete(todo.id);
        setEditingId(null);
      } else {
        onEdit(todo.id, trimmed);
        setEditingId(null);
      }
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditValue(todo.title);
    }
  };

  const handleEditBlur = () => {
    const trimmed = editValue.trim();
    if (trimmed === '') {
      onDelete(todo.id);
      setEditingId(null);
    } else {
      onEdit(todo.id, trimmed);
      setEditingId(null);
    }
  };

  return (
    <>
      {!editing && (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <label onDoubleClick={() => setEditingId(todo.id)}>{todo.title}</label>
          <button
            className="destroy"
            onClick={() => {
              onDelete(todo.id);
              setEditingId(null);
            }}
          />
        </div>
      )}
      {editing && (
        <input
          ref={inputRef}
          className="edit"
          value={editValue}
          onChange={handleEditChange}
          onKeyDown={handleEditKeyDown}
          onBlur={handleEditBlur}
          data-testid="edit-input"
        />
      )}
    </>
  );
}
