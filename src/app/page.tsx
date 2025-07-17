"use client";

import { useState } from "react";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";

// Definición del tipo Todo
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  // Estado para la lista de todos
  const [todos, setTodos] = useState<Todo[]>([]);
  // Estado para el input controlado
  const [input, setInput] = useState("");

  // Handler para añadir un nuevo todo
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

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded w-full max-w-xl p-8">
        <header className="mb-6">
          <h1 className="text-6xl font-light text-center text-gray-300 mb-4">todos</h1>
          <form onSubmit={handleAddTodo}>
            <input
              className="w-full p-4 text-2xl border-b border-gray-200 outline-none"
              placeholder="What needs to be done?"
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </form>
        </header>
        <section>
          <TodoList todos={todos} />
        </section>
        <footer className="mt-6">
          <TodoFooter />
        </footer>
      </div>
    </section>
  );
}
