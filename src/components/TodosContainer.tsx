'use client';

import { useState, useEffect } from 'react';
import { usePersistedTodos } from '../hooks/usePersistedTodos';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

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

  const activeCount = todos.filter((todo) => !todo.completed).length;

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
          <ul className="todo-list">
            {todos.map((todo) => {
              const isVisible =
                filter === 'all' ||
                (filter === 'active' && !todo.completed) ||
                (filter === 'completed' && todo.completed);
              const isEditing = editingId === todo.id;
              return (
                <li
                  key={todo.id}
                  style={!isVisible ? { display: 'none' } : {}}
                  data-testid="todo-item"
                  className={
                    (todo.completed ? 'completed ' : '') + (isEditing ? 'editing' : '')
                  }
                >
                  <TodoItem
                    todo={todo}
                    onToggle={toggleTodo}
                    onEdit={handleEdit}
                    onDelete={deleteTodo}
                    editing={isEditing}
                    setEditingId={setEditingId}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeCount}</strong> item{activeCount !== 1 ? 's' : ''} left!
          </span>
          <ul className="filters">
            <li>
              <a className={filter === 'all' ? 'selected' : ''} href="#/">
                All
              </a>
            </li>
            <li>
              <a className={filter === 'active' ? 'selected' : ''} href="#/active">
                Active
              </a>
            </li>
            <li>
              <a className={filter === 'completed' ? 'selected' : ''} href="#/completed">
                Completed
              </a>
            </li>
          </ul>
          {todos.some((todo) => todo.completed) && (
            <button
              className="clear-completed"
              onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
}
