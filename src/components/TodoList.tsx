import TodoItem from "./TodoItem";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="divide-y divide-gray-200">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
} 