import React, { useState } from 'react';

function Todo(props) {
  const [title, setTitle] = useState(props.todo.title);
  const [body, setBody] = useState(props.todo.body);

  return (
    <div className="w-full cursor-pointer my-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div>
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export default Todo;
