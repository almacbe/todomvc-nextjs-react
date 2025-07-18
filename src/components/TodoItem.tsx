import { Todo } from '../types/Todo';

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className="p-4 text-xl" role="listitem">
      {todo.title}
    </li>
  );
} 