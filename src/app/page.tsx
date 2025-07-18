"use client";

import { useTodos } from "../hooks/useTodos";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";

export default function Home() {
  const { todos, input, setInput, handleAddTodo, handleToggleTodo } = useTodos();

  return (
    <section className="bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-start sm:justify-center font-sans">
      <h1 className="text-[100px] font-light text-center text-gray-200 tracking-tight drop-shadow-md select-none mb-8 font-sans" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>todos</h1>
      <div className="bg-white shadow-2xl rounded w-full max-w-2xl">
        <header className="border-b border-gray-200 px-8 pt-8 pb-4">
          <form onSubmit={handleAddTodo}>
            <input
              className="w-full p-6 text-2xl font-light text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:outline-none"
              placeholder="What needs to be done?"
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              data-testid="new-todo-input"
              style={{ fontFamily: 'inherit' }}
            />
          </form>
        </header>
        <section className="px-8 py-4">
          <TodoList todos={todos} onToggle={handleToggleTodo} />
        </section>
        <footer className="px-8 pb-6 pt-2">
          <TodoFooter />
        </footer>
      </div>
      <footer className="mt-8 text-gray-400 text-xs text-center select-none">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="https://github.com/alfonso" className="underline hover:text-blue-500">alfonso</a></p>
        <p>Part of <a href="http://todomvc.com" className="underline hover:text-blue-500">TodoMVC</a></p>
      </footer>
    </section>
  );
}
