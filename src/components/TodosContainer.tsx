'use client';

import { useState, useEffect } from 'react';
import { usePersistedTodos } from '../hooks/usePersistedTodos';
import { Todo } from '../types/Todo';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import { filterTodos } from '../utils/filterTodos';

export default function TodosContainer() {
  const [todos, setTodos] = usePersistedTodos();
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: input.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const activeCount = filterTodos(todos, 'active').length;
  const completedCount = filterTodos(todos, 'completed').length;

  const handleEdit = (id: string, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (trimmed === '') {
      deleteTodo(id);
    } else {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo)));
    }
  };

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;
      if (hash === '#/active') setFilter('active');
      else if (hash === '#/completed') setFilter('completed');
      else setFilter('all');
    }
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo(e);
          }}
          data-testid="new-todo-input"
        />
      </header>
      {todos.length > 0 && (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            id="toggle-all"
            checked={todos.length > 0 && todos.every((todo) => todo.completed)}
            onChange={() => {
              const allCompleted = todos.every((todo) => todo.completed);
              setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onEdit={handleEdit}
            onDelete={deleteTodo}
            editingId={editingId}
            setEditingId={setEditingId}
            filter={filter}
          />
        </section>
      )}
      {todos.length > 0 && (
        <TodoFooter
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={() => setTodos(todos.filter((todo) => !todo.completed))}
        />
      )}
    </>
  );
}
