import React from 'react';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import './App.css';
import TodoCard from './components/TodoCard';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Excercise 1: Try to pull the first 5 todos from the API
  useEffect(() => {
    async function getInfo() {
      setLoading(true);
      try {
        const todoList = await getTodos();
        setTodos(todoList);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    getInfo();
  }, []);

  return (
    <div className="App p-2">
      <header className="App-header mb-2">
        <p className="text-4xl text-cyan-500">TODO APP</p>
      </header>

      {loading ? <p className="text-xl text-white">Loading..</p> : null}

      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          title={todo.title}
          onSeeTodo={() => {}}
        ></TodoCard>
      ))}
    </div>
  );
}

export default App;
