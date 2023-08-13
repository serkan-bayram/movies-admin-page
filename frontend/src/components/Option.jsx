import React from "react";

const Option = (props) => {
  const handleClick = (e) => {
    props.whichOptionClicked(props.order);
    e.preventDefault();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm p-4 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      {props.order}
    </button>
  );
};

export default Option;
