import React from 'react';
import PropTypes from 'prop-types';

function TodoCard(props) {
  return (
    <div className="cursor-pointer my-2 p-6 w-96 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {/* eslint-disable */}
      <a href="#">
        {/* eslint-enable */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </h5>
      </a>
      {/* eslint-disable */}
      <button
        type="button"
        className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={props.onEditTodo.bind(this, props.todo)}
      >
        {/* eslint-enable */}
        See
      </button>
      {/* eslint-disable */}
    </div>
  );
}

TodoCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

export default React.memo(TodoCard);
