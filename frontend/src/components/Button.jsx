import React from "react";

const Button = (props) => {
  return (
    <div className="w-1/3 mx-auto pt-6 flex items-center justify-center">
      <button
        onClick={(e) => {
          props.btnClicked();
          e.preventDefault();
        }}
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l transition-all focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Find
      </button>
    </div>
  );
};

export default Button;
