import React from "react";
import Option from "./Option";

const Options = (props) => {
  const handleClick = (option) => {
    props.optionsClicked(option);
  };

  return (
    <div className="w-full px-4 h-12 border-solid border-2 border-sky-500 mt-6 flex justify-center gap-4">
      <Option whichOptionClicked={handleClick} order="1" />
      <Option whichOptionClicked={handleClick} order="2" />
      <Option whichOptionClicked={handleClick} order="3" />
      <Option whichOptionClicked={handleClick} order="4" />
      <Option whichOptionClicked={handleClick} order="5" />
    </div>
  );
};

export default Options;
