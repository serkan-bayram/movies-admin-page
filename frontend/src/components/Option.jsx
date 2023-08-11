import React from "react";

const Option = (props) => {
  const handleClick = (e) => {
    props.whichOptionClicked(props.order);
    e.preventDefault();
  };

  return (
    <button
      onClick={handleClick}
      className="p-4 bg-white rounded-full flex items-center justify-center"
    >
      {props.order}
    </button>
  );
};

export default Option;
