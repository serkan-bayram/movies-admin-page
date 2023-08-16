import React, { useState } from "react";
import axios from "axios";
import Poster from "./Poster";
import Information from "./Information";

const Movie = (props) => {
  const link = "https://www.themoviedb.org/t/p/w1280" + props.poster;

  const [hover, setHover] = useState(false);
  // const [render, setRender] = useState(true);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const deleteMovie = async () => {
    await axios
      .delete(
        `http://localhost:5000/api/movies/${encodeURIComponent(
          props.movieId
        )}/${encodeURIComponent(props.movieName)}`
      )
      .then((response) => {
        props.deleteSignal(props.movieId);
        props.notification(`${props.movieName} is deleted.`);
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <div className="w-min h-min p-2">
      <Poster
        posterLink={link}
        handleMouseOver={handleMouseOver}
        handleMouseLeave={handleMouseLeave}
        deleteMovie={deleteMovie}
      />
      <Information
        movieName={props.movieName}
        releaseDate={props.releaseDate}
        acting={props.acting}
        directing={props.directing}
        hover={hover}
      />
    </div>
  );
};

export default Movie;
