import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Movie from "./Movie";

const GallerySection = (props) => {
  const { movieInfo } = props;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies((prevValues) => {
      const lastAdded = prevValues[Object.keys(prevValues).length - 1]; // We are checking is the
      //last item same with new one because
      //when we change anything in this component it re renders and add the last item again
      if (lastAdded === movieInfo) {
        return [...prevValues];
      } else {
        return [...prevValues, movieInfo];
      }
    });
  }, [movieInfo]);

  //Filtering the empty entries
  return (
    <div className="w-full h-screen pb-24 flex flex-wrap p-8 gap-6 content-start overflow-y-scroll">
      {movies
        .filter((movie) => {
          if (movie.mName !== undefined && movie.mName !== "") return movie;
        })
        .map((movie) => {
          return (
            <Movie
              key={uuidv4()}
              movieName={movie.mName}
              poster={movie.poster}
              releaseDate={movie.date}
              acting={movie[0]}
              directing={movie[1]}
            />
          );
        })}
    </div>
  );
};

export default GallerySection;
