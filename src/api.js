export const getURLTodos = (todoCompleted) => {
  return todoCompleted
    ? 'https://jsonplaceholder.typicode.com/posts?completed=false'
    : 'https://jsonplaceholder.typicode.com/posts?completed=true';
};

export const getTodos = async (todoCompleted) => {
  const url = getURLTodos(todoCompleted);
  const json = await fetch(url).then((response) => response.json());
  return todoCompleted ? json.slice(0, 5) : json.slice(5, 10);
};
