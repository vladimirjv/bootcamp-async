import React from 'react';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import './App.css';
import TodoCard from './components/TodoCard';
import TodoTabs from './components/TodoTabs';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoType, setTodoType] = useState('todo');

  const onChangeTab = (tab) => {
    if (todoType !== tab.key) {
      setTodoType(tab.key);
    }
  };

  useEffect(() => {
    getTodos(todoType === 'todo').then((todoList) => {
      setTodos(todoList);
    });
  }, [todoType]);

  return (
    <div className="App p-2">
      <header className="App-header mb-2">
        <p className="text-4xl text-cyan-500">TODO APP</p>
      </header>
      <TodoTabs onChangeTab={onChangeTab}></TodoTabs>
      {todos.map((todo) => (
        <TodoCard key={todo.id} title={todo.title} body={todo.body}></TodoCard>
      ))}
    </div>
  );
}

export default App;
