import React, { useState } from "react";

const Poster = (props) => {
  const posterStyle = {
    backgroundImage: props.posterLink ? `url('${props.posterLink}')` : "none",
  }; // setting the poster image

  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => {
    setIsHover(true);
    props.handleMouseOver();
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    props.handleMouseLeave();
  };

  // We want these hover effects on little posters only so we are checking
  return (
    <div
      onMouseOver={props.type !== "main" ? handleMouseOver : null}
      onMouseLeave={props.type !== "main" ? handleMouseLeave : null}
      className={`bg-white bg-cover bg-no-repeat rounded-md border border-slate-600  ${
        props.type === "main"
          ? "w-2/3 h-96  mx-auto transition-all duration-200 border-slate-600  shadow-2xl"
          : "w-36 h-56 relative   shadow"
      }`}
      style={posterStyle}
    >
      {props.type !== "main" && isHover ? (
        <button onClick={props.deleteMovie}>
          <svg
            className="w-6 h-6 absolute top-1 right-1 text-white bg-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default Poster;
