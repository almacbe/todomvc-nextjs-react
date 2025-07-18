"use client";

import { useTodos } from "../hooks/useTodos";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";

export default function Home() {
  const { todos, input, setInput, handleAddTodo } = useTodos();

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
