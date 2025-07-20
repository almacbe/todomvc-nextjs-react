'use client';

import { useState } from 'react';
import { Todo } from '../types/Todo';

export default function TodosContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addTodo}>
          <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            data-testid="new-todo-input"
          />
        </form>
      </header>
      <section className="main">
        <input className="toggle-all" type="checkbox" id="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''} data-testid="todo-item">
              <div className="view">
                <input 
                  className="toggle" 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label>{todo.title}</label>
                <button 
                  className="destroy" 
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong> item{activeCount !== 1 ? 's' : ''} left!
        </span>
        <ul className="filters">
          <li>
            <a 
              className={filter === 'all' ? 'selected' : ''} 
              onClick={() => setFilter('all')}
              style={{ cursor: 'pointer' }}
            >
              All
            </a>
          </li>
          <li>
            <a 
              className={filter === 'active' ? 'selected' : ''} 
              onClick={() => setFilter('active')}
              style={{ cursor: 'pointer' }}
            >
              Active
            </a>
          </li>
          <li>
            <a 
              className={filter === 'completed' ? 'selected' : ''} 
              onClick={() => setFilter('completed')}
              style={{ cursor: 'pointer' }}
            >
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    </section>
  );
}
