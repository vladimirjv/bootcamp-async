import React from 'react';
import PropTypes from 'prop-types';

function TodoCard(props) {
  return (
    <div className="cursor-pointer my-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {/* eslint-disable */}
      <a href="#">
        {/* eslint-enable */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {props.body}
      </p>
      {/* eslint-disable */}
      <button
        type="button"
        className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        {/* eslint-enable */}
        Delete
      </button>
    </div>
  );
}

TodoCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

export default React.memo(TodoCard);
