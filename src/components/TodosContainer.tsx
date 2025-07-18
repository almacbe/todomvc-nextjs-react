'use client';

import { useState } from 'react';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import { Todo } from '../types/Todo';

export type Filter = 'all' | 'active' | 'completed';

export default function TodosContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;
    setTodos([...todos, { id: crypto.randomUUID(), title, completed: false }]);
    setInput('');
  };

  const handleToggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleEditTodo = (id: string, newTitle: string) => {
    setTodos((todos) =>
      newTitle.trim() === ''
        ? todos.filter((todo) => todo.id !== id)
        : todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle.trim() } : todo)),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="w-full max-w-2xl rounded bg-white shadow-2xl">
      <header className="border-b border-gray-200 px-8 pt-8 pb-4">
        <form onSubmit={handleAddTodo}>
          <input
            className="w-full bg-transparent p-6 text-2xl font-light text-gray-700 placeholder-gray-400 outline-none focus:outline-none"
            placeholder="What needs to be done?"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            data-testid="new-todo-input"
            style={{ fontFamily: 'inherit' }}
          />
        </form>
      </header>
      <section className="px-8 py-4">
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </section>
      <footer className="px-8 pt-2 pb-6">
        <TodoFooter filter={filter} setFilter={setFilter} activeCount={activeCount} />
      </footer>
    </div>
  );
}
