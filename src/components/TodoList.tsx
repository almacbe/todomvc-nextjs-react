import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle }: { todos: Todo[]; onToggle: (id: string) => void }) {
  return (
    <ul className="divide-y divide-gray-200" role="list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
} 