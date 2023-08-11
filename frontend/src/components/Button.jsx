import React from "react";

const Button = (props) => {
  return (
    <div className="w-1/3 mx-auto pt-6">
      <button
        onClick={(e) => {
          props.btnClicked();
          e.preventDefault();
        }}
        className="w-full bg-white"
      >
        Find
      </button>
    </div>
  );
};

export default Button;
