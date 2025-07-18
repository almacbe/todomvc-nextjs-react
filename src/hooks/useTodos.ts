import { useState } from "react";
import { Todo } from "../types/Todo";

export type Filter = 'all' | 'active' | 'completed';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>('all');

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
    setInput("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id: string, newTitle: string) => {
    setTodos(todos =>
      newTitle.trim() === ''
        ? todos.filter(todo => todo.id !== id)
        : todos.map(todo =>
            todo.id === id ? { ...todo, title: newTitle.trim() } : todo
          )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return {
    todos,
    setTodos,
    input,
    setInput,
    handleAddTodo,
    handleToggleTodo,
    handleEditTodo,
    handleDeleteTodo,
    filter,
    setFilter,
    filteredTodos,
    activeCount,
  };
} 