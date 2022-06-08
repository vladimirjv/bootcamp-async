import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { getURLTodos, getTodos, deleteTodo } from './api';
import { tabs } from './config';
import './App.css';
import TodoCard from './components/TodoCard';
import TodoTabs from './components/TodoTabs';
import Todo from './components/Todo';
import Alert from './components/Alert';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoType, setTodoType] = useState('todo');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [alert, setAlert] = useState(null);

  const onChangeTab = useCallback(
    (tab) => {
      setSelectedTodo(null);
      setTodoType(tab.key);
    },
    [todoType]
  );

  const onSelectTodo = useCallback(
    (todo) => setSelectedTodo({ ...todo, completed: todoType !== 'todo' }),
    [selectedTodo]
  );

  const onDeleteTodo = async (todo) => {
    const {ok, status} = await deleteTodo(todo.id);
    console.log(ok, status)
  }

  useEffect(() => {
    const URL = getURLTodos(todoType === 'todo');
    async function getTodosCallback() {
      const todoList = await getTodos(URL, todoType === 'todo');
      setTodos(todoList);
    }
    getTodosCallback();
  }, [todoType]);

  return (
    <div className="App p-2">
      <header className="App-header mb-2">
        <p className="text-4xl text-cyan-500">TODO APP</p>
      </header>

      <Alert alert={alert}/>

      <TodoTabs selectedTab={todoType} onChangeTab={onChangeTab} tabs={tabs} />

      {selectedTodo ? <Todo todo={selectedTodo} /> : null}

      {!selectedTodo
        ? todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              title={todo.title}
              onEditTodo={onSelectTodo}
              onDelete={onDeleteTodo}
            ></TodoCard>
          ))
        : null}
    </div>
  );
}

export default App;
