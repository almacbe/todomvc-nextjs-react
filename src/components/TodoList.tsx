"use client";

import { useState } from "react";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="divide-y divide-gray-200">
      {todos.map(todo => (
        <li key={todo.id} className="p-4 text-xl">{todo.title}</li>
      ))}
    </ul>
  );
} 