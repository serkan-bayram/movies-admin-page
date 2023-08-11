import React from "react";

const Poster = (props) => {
  const posterStyle = {
    backgroundImage: props.posterLink ? `url('${props.posterLink}')` : "none",
  };

  return (
    <div
      className={
        props.type === "main"
          ? "w-2/3 bg-white h-96 mx-auto bg-cover bg-no-repeat"
          : null
      }
      style={posterStyle}
    ></div>
  );
};

export default Poster;
