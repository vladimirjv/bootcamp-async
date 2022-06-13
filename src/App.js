import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { getTodosByType, createTodo, deleteTodo, updateTodo } from './api';
import './App.css';
import { tabs } from './config';
import TodoCard from './components/TodoCard';
import Todo from './components/Todo';
import Alert from './components/Alert';
import TodoTabs from './components/TodoTabs';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoType, setTodoType] = useState('todo');
  const [alert, setAlert] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
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

  // Select the todo card
  const onSelectTodo = useCallback(
    (todo) => setSelectedTodo({ ...todo }),
    [selectedTodo]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getTodosCallback() {
      try {
        const todoList = await getTodosByType(todoType === 'todo', signal);
        setTodos(todoList);
      } catch (e) {
        console.log(e);
      }
    }
    getTodosCallback();
    return () => controller.abort();
  }, [todoType]);

  const onCreateTodo = async (todo) => {
    try {
      setLoading(true);
      const body = await createTodo(todo);
      setAlert('Todo Created');
      console.log(body);
      setTimeout(() => {
        setLoading(false);
        setAlert(null);
        setNewTodo(false);
      }, 1200);
    } catch (e) {
      setLoading(false);
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
          onCreate={onCreateTodo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
          onCancel={() => {
            setSelectedTodo(null);
            setNewTodo(false);
          }}
          loading={loading}
        />
      ) : null}

      {!newTodo && !selectedTodo
        ? todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              title={todo.title}
              onSeeTodo={onSelectTodo}
            ></TodoCard>
          ))
        : null}
    </div>
  );
}

export default App;
