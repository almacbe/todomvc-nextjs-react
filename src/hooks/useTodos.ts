import { useState } from "react";
import { Todo } from "../types/Todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

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

  return { todos, setTodos, input, setInput, handleAddTodo };
} 