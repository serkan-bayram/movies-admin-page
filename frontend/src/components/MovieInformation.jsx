import React, { useState, useEffect } from "react";

const MovieInformation = (props) => {
  const [information, setInformation] = useState(props.information);
  const [padding, setPadding] = useState(2.5);

  const informationMap = {
    movieName: "Movie Name",
    releaseDate: "Release Date",
  };

  const handleMouseOver = () => {
    // Transition with padding
    if (information.length > props.content.length) {
      setPadding(1);
    } else {
      setPadding(5);
    }
    const newInformation = informationMap[props.content] || "";
    setInformation(newInformation);
  };

  const handleMouseLeave = () => {
    setPadding(2.5);

    setInformation(props.information);
  };

  useEffect(() => {
    setInformation(props.information);
    if (props.hover) {
      handleMouseOver();
    } else {
      handleMouseLeave();
    }
  }, [props.information, props.hover]);

  return (
    <div
      className={`${props.theme} text-xs transition-all duration-200 select-none font-medium mr-2 px-${padding} py-0.5 rounded-sm `}
    >
      {information}
    </div>
  );
};

export default MovieInformation;
