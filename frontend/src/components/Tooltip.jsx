import React, { useState } from "react";

const Tooltip = () => {
  const [visibility, setVisibility] = useState(true);

  const handleVisibility = () => {
    setVisibility((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <div className="top-8 ml-4 relative">
      <button
        onMouseOver={handleVisibility}
        onMouseLeave={handleVisibility}
        data-tooltip-target="tooltip-no-arrow"
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Pro Tip
      </button>
      <div
        id="tooltip-no-arrow"
        role="tooltip"
        className="absolute z-10 -translate-y-5 translate-x-4  inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm  tooltip dark:bg-gray-700"
        style={
          visibility
            ? { visibility: "hidden", opacity: "0" }
            : { visibility: "visible", opacity: "100" }
        }
      >
        <div>Press ESC to Focus and Unfocus input</div>
        <div>Press F to Find movie</div>
        <div>Press A to Add movie</div>
      </div>
    </div>
  );
};

export default Tooltip;
