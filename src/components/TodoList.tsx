import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle }: { todos: Todo[]; onToggle: (id: string) => void }) {
  if (todos.length === 0) return null;
  return (
    <ul className="shadow-inner rounded-b overflow-hidden divide-y divide-gray-100" role="list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
} 