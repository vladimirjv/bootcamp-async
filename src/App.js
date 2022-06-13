import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from './api';
import './App.css';
import TodoCard from './components/TodoCard';
import Todo from './components/Todo';
import Alert from './components/Alert';

function App() {
  const [todos, setTodos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState(false);

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
    setAlert('TODOS Obtained');
    setTimeout(() => setAlert(null), 1000);
  }, []);

  // Select the todo card
  const onSelectTodo = useCallback(
    (todo) => setSelectedTodo({ ...todo }),
    [selectedTodo]
  );

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

  /* TODO: Generate a function that update the selected TODO card, a loading
  status should be set at the beginning of the request and set to false when
  receiving a response, if the answer is correct, display a small notification
  and then hold for a moment to finally clear the alert and loading status. */
  const onUpdateTodo = async (todo) => {
    console.log(todo);
  };
  
  /* TODO: Generate a function that delete the selected TODO card, a loading
  status should be set at the beginning of the request and set to false when
  receiving a response, if the answer is correct, display a small notification
  and then hold for a moment to finally clear the alert and loading status. */
  const onDeleteTodo = async (todo) => {
    console.log(todo);
  };

  return (
    <div className="App p-2">
      <header className="App-header mb-2">
        <p className="text-4xl text-cyan-500">TODO APP</p>
      </header>

      <Alert alert={alert} />

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
