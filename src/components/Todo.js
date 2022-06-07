import React, { useState, useEffect } from 'react';
import { getTodoById } from '../api';

function Todo(props) {
  const [title, setTitle] = useState(props.todo.title);
  const [completed, setCompleted] = useState(props.todo.completed);

  return (
    <div className="w-full cursor-pointer my-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="mt-2">
        <label
          for="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Title
        </label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>

      <label
        for="default-toggle"
        className="mt-2 inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="default-toggle"
          className="sr-only peer"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Completed
        </span>
      </label>

      {/* eslint-disable */}
      <button
        type="button"
        className="w-full mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {/* eslint-enable */}
        Edit
      </button>
      {/* eslint-disable */}
      <button
        type="button"
        className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        {/* eslint-enable */}
        Cancel
      </button>
    </div>
  );
}

export default Todo;
