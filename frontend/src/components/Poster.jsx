import React from "react";

const Poster = (props) => {
  const posterStyle = {
    backgroundImage: props.posterLink ? `url('${props.posterLink}')` : "none",
  }; // setting the poster image

  return (
    <div
      className={
        props.type === "main"
          ? "w-2/3 bg-white h-96 mx-auto bg-cover bg-no-repeat rounded-md border transition-all duration-200 border-slate-600 shadow-2xl"
          : null
      }
      style={posterStyle}
    ></div>
  );
};

export default Poster;
