export const getURLTodos = (todoCompleted) => {
  return todoCompleted
    ? 'https://jsonplaceholder.typicode.com/todos?completed=false'
    : 'https://jsonplaceholder.typicode.com/todos?completed=true';
};
export const getTodos = async (URL, todoCompleted, signal) => {
  const json = await fetch(URL, {signal}).then((response) => response.json());
  return todoCompleted ? json.slice(0, 5) : json.slice(5, 10);
};

export const deleteTodo = async (todoId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    {
      method: 'delete',
    }
  );
  return response;
};

export const createTodo = async (todo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ ...todo }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response;
};

export const updateTodo = async (todo) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ ...todo }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
  );
  return response;
};
