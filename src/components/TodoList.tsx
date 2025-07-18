import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="divide-y divide-gray-200" role="list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
} 