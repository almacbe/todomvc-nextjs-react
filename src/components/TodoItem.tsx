import { Todo } from '../types/Todo';

export default function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) {
  return (
    <li className="flex items-center p-4 text-xl gap-3" role="listitem">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 accent-green-500"
        aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      />
      <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
    </li>
  );
} 