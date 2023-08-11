import React from "react";

const Poster = (props) => {
  return (
    <div
      className={props.type === "main" ? "w-2/3 bg-white h-96 mx-auto" : null}
    ></div>
  );
};

export default Poster;
