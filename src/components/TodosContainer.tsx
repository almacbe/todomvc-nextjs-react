'use client';

import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';

export default function TodosContainer() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('todos');
      if (stored) return JSON.parse(stored);
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editOriginal, setEditOriginal] = useState('');
  const editInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
    setEditOriginal(title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      finishEditing(id);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const finishEditing = (id: string) => {
    const trimmed = editValue.trim();
    if (trimmed === '') {
      deleteTodo(id);
    } else {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, title: trimmed } : todo));
    }
    setEditingId(null);
    setEditValue('');
    setEditOriginal('');
  };

  const cancelEditing = () => {
    setEditValue(editOriginal);
    setEditingId(null);
    setEditOriginal('');
  };

  useEffect(() => {
    if (editingId && editInputRefs.current[editingId]) {
      editInputRefs.current[editingId]?.focus();
    }
  }, [editingId]);

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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Filtrado de todos según el filtro activo
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

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
          onKeyDown={e => {
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
            checked={todos.length > 0 && todos.every(todo => todo.completed)}
            onChange={e => {
              const allCompleted = todos.every(todo => todo.completed);
              setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos.map((todo) => {
              const isVisible =
                filter === 'all' ||
                (filter === 'active' && !todo.completed) ||
                (filter === 'completed' && todo.completed);
              return (
                <li
                  key={todo.id}
                  className={
                    todo.completed && editingId === todo.id
                      ? 'completed editing'
                      : editingId === todo.id
                      ? 'editing'
                      : todo.completed
                      ? 'completed'
                      : ''
                  }
                  data-testid="todo-item"
                  style={!isVisible ? { display: 'none' } : {}}
                >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label onDoubleClick={() => startEditing(todo.id, todo.title)}>{todo.title}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)} />
                </div>
                {editingId === todo.id && (
                  <input
                    className="edit"
                    ref={el => {
                      editInputRefs.current[todo.id] = el;
                    }}
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={() => finishEditing(todo.id)}
                    onKeyDown={e => handleEditKeyDown(e, todo.id)}
                  />
                )}
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
              <a
                className={filter === 'all' ? 'selected' : ''}
                href="#/"
              >
                All
              </a>
            </li>
            <li>
              <a
                className={filter === 'active' ? 'selected' : ''}
                href="#/active"
              >
                Active
              </a>
            </li>
            <li>
              <a
                className={filter === 'completed' ? 'selected' : ''}
                href="#/completed"
              >
                Completed
              </a>
            </li>
          </ul>
          {todos.some(todo => todo.completed) && (
            <button className="clear-completed" onClick={() => setTodos(todos.filter(todo => !todo.completed))}>Clear completed</button>
          )}
        </footer>
      )}
    </>
  );
}
