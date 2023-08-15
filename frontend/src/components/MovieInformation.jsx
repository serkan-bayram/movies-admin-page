import React, { useState, useEffect } from "react";

const MovieInformation = (props) => {
  const defaultPadding = 0.5;

  const [information, setInformation] = useState(props.information);
  const [padding, setPadding] = useState(defaultPadding);

  const informationMap = {
    movieName: "Movie Name",
    releaseDate: "Release Date",
    directorName: "Director",
    actorName: props.character,
  };

  const handleMouseOver = () => {
    // Transition with padding
    if (information.length > props.content.length) {
      setPadding(0.25);
    } else {
      setPadding(1);
    }
    const newInformation = informationMap[props.content] || "";
    setInformation(newInformation);
  };

  const handleMouseLeave = () => {
    setPadding(defaultPadding);
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
      className={`${props.theme} 
     text-xs transition-all  duration-200 select-none font-medium mr-2 py-0.5 rounded-sm `}
      style={{ paddingInline: padding + "rem" }}
    >
      {information}
    </div>
  );
};

export default MovieInformation;
