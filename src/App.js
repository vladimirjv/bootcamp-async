import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { getURLTodos, getTodos } from './api';
import { tabs } from './config';
import './App.css';
import TodoCard from './components/TodoCard';
import TodoTabs from './components/TodoTabs';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoType, setTodoType] = useState('todo');
  const [selectedTodo, setSelectedTodo] = useState(null);

  const onChangeTab = useCallback((tab) => setTodoType(tab.key), [todoType]);

  const getTodosCallback = async (url) => {
    const todoList = await getTodos(url, todoType === 'todo');
    setTodos(todoList);
  };

  useEffect(() => {
    const URL = getURLTodos(todoType === 'todo');
    setSelectedTodo();
    getTodosCallback(URL);
  }, [todoType]);

  // Component mounted, Error re-rendering
  useEffect(() => {
    console.log('RENDER APP');
  }, []);

  return (
    <div className="App p-2">
      <header className="App-header mb-2">
        <p className="text-4xl text-cyan-500">TODO APP</p>
      </header>

      <TodoTabs selectedTab={todoType} onChangeTab={onChangeTab} tabs={tabs} />

      {todos.map((todo) => (
        <TodoCard key={todo.id} title={todo.title} body={todo.body}></TodoCard>
      ))}
    </div>
  );
}

export default App;
