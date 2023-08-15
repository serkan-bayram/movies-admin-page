import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Movie from "./Movie";

const GallerySection = (props) => {
  const { movieInfo } = props;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies((prevValues) => {
      return [...prevValues, movieInfo];
    });
  }, [movieInfo]); // Updating movies when movieInfo changes,
  //this will also prevents adding the same entry twice if you click add button twice
  //, but it will add anyway after you search for something else

  //Filtering the empty entries

  // TODO it adds same items when I change className (because whole gallerysection rerenders)

  return (
    <div className="w-full h-screen flex flex-wrap p-8 gap-6 content-start overflow-y-scroll">
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
