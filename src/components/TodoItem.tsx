import { Todo } from '../types/Todo';

export default function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) {
  return (
    <li
      className="flex items-center gap-4 px-4 py-2 border-b border-gray-100 last:border-b-0 group bg-white"
      role="listitem"
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-7 h-7 accent-green-500 transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none -ml-2 cursor-pointer"
        aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      />
      <span
        className={
          'flex-1 text-2xl font-light break-all transition-colors duration-150 ' +
          (todo.completed ? 'line-through text-gray-400 opacity-60' : 'text-gray-700')
        }
        style={{ textDecorationThickness: todo.completed ? 2 : undefined, textDecorationStyle: 'solid', transition: 'text-decoration 0.2s', opacity: todo.completed ? 0.6 : 1 }}
      >
        {todo.title}
      </span>
    </li>
  );
} 