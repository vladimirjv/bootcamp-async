export const getURLTodos = (todoCompleted) => {
  return todoCompleted
    ? 'https://jsonplaceholder.typicode.com/todos?completed=false'
    : 'https://jsonplaceholder.typicode.com/todos?completed=true';
};
export const getTodos = async (URL, todoCompleted) => {
  const json = await fetch(URL).then((response) => response.json());
  return todoCompleted ? json.slice(0, 5) : json.slice(5, 10);
};

export const deleteTodo = async (todoId) => {
  const response = await fetch({
    method: 'delete',
    url: `https://jsonplaceholder.typicode.com/todos/${todoId}`
  })
  return response;
}