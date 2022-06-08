import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {
  getURLTodos,
  getTodos,
  deleteTodo,
  createTodo,
  updateTodo,
} from './api';
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
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState(false);

  const onChangeTab = useCallback(
    (tab) => {
      setSelectedTodo(null);
      setNewTodo(false);
      setTodoType(tab.key);
    },
    [todoType]
  );

  const onSelectTodo = useCallback(
    (todo) => setSelectedTodo({ ...todo, completed: todoType !== 'todo' }),
    [selectedTodo]
  );

  useEffect(() => {
    const URL = getURLTodos(todoType === 'todo');
    const controller = new AbortController();
    const signal = controller.signal;
    async function getTodosCallback() {
      try {
        const todoList = await getTodos(URL, todoType === 'todo', signal);
        setTodos(todoList);
      } catch (e) {
        console.log(e);
      }
    }
    getTodosCallback();
    return () => controller.abort();
  }, [todoType]);

  const onDeleteTodo = async (todo) => {
    setLoading(true);
    const { ok, status } = await deleteTodo(todo.id);
    if (ok && status === 200) {
      setAlert('Deleted');
      setTimeout(() => {
        setAlert(null);
        setSelectedTodo(null);
        setLoading(false);
      }, 3000);
    }
  };

  const onUpdateTodo = async (todo) => {
    setLoading(true);
    const { ok, status } = await updateTodo(todo);
    if (ok && status === 200) {
      setAlert('Updated');
      setTimeout(() => {
        setAlert(null);
        setSelectedTodo(null);
        setLoading(false);
      }, 1500);
    }
  };

  const onCreateTodo = async (todo) => {
    const response = await createTodo(todo);
    const body = await response.json();
    setLoading(true);
    if (response.ok && response.status === 201) {
      setAlert('Todo Created');
      setTimeout(() => {
        setAlert(null);
        setSelectedTodo(null);
        setNewTodo(false);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="App p-2">
      <header className="App-header mb-2">
        <p className="text-4xl text-cyan-500">TODO APP</p>
      </header>

      <Alert alert={alert} />

      <TodoTabs selectedTab={todoType} onChangeTab={onChangeTab} tabs={tabs} />

      {!newTodo && !selectedTodo ? (
        <button
          type="button"
          className="w-96 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={setNewTodo.bind(this, true)}
        >
          New Todo
        </button>
      ) : null}

      {selectedTodo || newTodo ? (
        <Todo
          todo={selectedTodo}
          onDelete={onDeleteTodo}
          onCancel={() => {
            setSelectedTodo(null);
            setNewTodo(false);
          }}
          onCreate={onCreateTodo}
          onUpdate={onUpdateTodo}
          loading={loading}
        />
      ) : null}

      {!newTodo && !selectedTodo
        ? todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              title={todo.title}
              onEditTodo={onSelectTodo}
            ></TodoCard>
          ))
        : null}
    </div>
  );
}

export default App;
