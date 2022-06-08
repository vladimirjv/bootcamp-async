import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { getTodos } from './api';
import './App.css';
import TodoCard from './components/TodoCard';

function App() {
  const [todos, setTodos] = useState([]);

  // Excercise 1: Try to pull the first 5 todos from the API
  useEffect(() => {}, []);

  return (
    <div className="App p-2">
      <header className="App-header mb-2">
        <p className="text-4xl text-cyan-500">TODO APP</p>
      </header>

      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          title={todo.title}
          onEditTodo={onSelectTodo}
        ></TodoCard>
      ))}
    </div>
  );
}

export default App;
