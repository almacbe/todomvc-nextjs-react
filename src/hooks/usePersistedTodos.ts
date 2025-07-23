import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';

export function usePersistedTodos(): [Todo[], (todos: Todo[]) => void] {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('todos');
      if (stored) setTodos(JSON.parse(stored) as Todo[]);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return [todos, setTodos];
}
