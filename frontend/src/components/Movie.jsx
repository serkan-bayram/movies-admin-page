import React, { useState } from "react";
import Poster from "./Poster";
import Information from "./Information";

const Movie = (props) => {
  const link = "https://www.themoviedb.org/t/p/w1280" + props.poster;

  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="w-min h-min p-2">
      <Poster
        posterLink={link}
        handleMouseOver={handleMouseOver}
        handleMouseLeave={handleMouseLeave}
      />
      <Information
        movieName={props.movieName}
        releaseDate={props.releaseDate}
        hover={hover}
      />
    </div>
  );
};

export default Movie;
