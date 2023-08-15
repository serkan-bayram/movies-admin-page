import React from "react";

const Poster = (props) => {
  const posterStyle = {
    backgroundImage: props.posterLink ? `url('${props.posterLink}')` : "none",
  }; // setting the poster image

  const handleMouseOver = () => {
    props.handleMouseOver();
  };

  const handleMouseLeave = () => {
    props.handleMouseLeave();
  };

  // We want these hover effects on little posters only so we are checking
  return (
    <div
      onMouseOver={props.type !== "main" ? handleMouseOver : null}
      onMouseLeave={props.type !== "main" ? handleMouseLeave : null}
      className={`bg-white  bg-cover bg-no-repeat rounded-md border border-slate-600  ${
        props.type === "main"
          ? "w-2/3 h-96  mx-auto transition-all duration-200 border-slate-600  shadow-2xl"
          : "w-36 h-56  shadow"
      }`}
      style={posterStyle}
    ></div>
  );
};

export default Poster;
