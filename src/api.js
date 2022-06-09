// URL to get todos https://jsonplaceholder.typicode.com/todos'
export const getTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const body = await response.json();
  return body.slice(0, 5);
};
