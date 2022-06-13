import React from 'react';

const classesActive =
  'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500';
const classesDeactive =
  'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

function TodoTabs(props) {
  const onClickTab = (tab) => {
    props.onChangeTab(tab);
  };

  return (
    <ul className="cursor-pointer flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {props.tabs.map((tab) => (
        <li className="mr-2" key={tab.key} onClick={onClickTab.bind(this, tab)}>
          {/* eslint-disable */}
          <a
            aria-current="page"
            className={
              tab.key === props.selectedTab ? classesActive : classesDeactive
            }
          >
            {/* eslint-enable */}
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(TodoTabs);
