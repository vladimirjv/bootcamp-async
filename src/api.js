export const getTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const body = await response.json();
  return body.slice(0, 5);
};

export const createTodo = async (todo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({ ...todo }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const body = await response.json();
  return body;
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

export const deleteTodo = async (todoId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    {
      method: 'delete',
    }
  );
  return response;
};
