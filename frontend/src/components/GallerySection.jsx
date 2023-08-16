import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Movie from "./Movie";

const GallerySection = (props) => {
  const { movieInfo } = props;

  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:5000/api/movies")
      .then((response) => {
        const { data } = response;
        // We are editing and changing keys of retrieved data from database because I gave
        // different names and it is the worst experience of my life
        const newData = [];
        for (let i = 0; i < data.length; i++) {
          const director = [{ directorName: data[i].director }];
          const acting = [
            { actorName: data[i].actors[0], character: data[i].characters[0] },
            { actorName: data[i].actors[1], character: data[i].characters[1] },
            { actorName: data[i].actors[2], character: data[i].characters[2] },
          ];
          newData.push({
            mId: data[i].movieId,
            mName: data[i].movieName,
            date: data[i].releaseDate,
            poster: data[i].posterPath,
            1: director,
            0: acting,
          });
        }
        setMovies(newData);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    setMovies((prevValues) => {
      const lastAdded = prevValues[Object.keys(prevValues).length - 1]; // We are checking is the
      //last item same with new one because
      //when we change anything in this component it re renders and add the last item again
      if (prevValues.length === 0) {
        fetchData(); // Fetching from database at the load
        return [];
      }

      if (lastAdded === movieInfo) {
        return [...prevValues];
      } else {
        return [...prevValues, movieInfo];
      }
    });
  }, [movieInfo]);

  const handleNotification = (content) => {
    props.notification(content);
  };

  const deleteSignal = (movieId) => {
    setMovies(
      movies.filter((movie) => {
        console.log(movie.mId, movieId);
        if (movie.mId !== movieId) return movie;
      })
    );
  };

  //Filtering the empty entries
  return (
    <div className="w-full h-screen pb-32 flex flex-wrap p-8 gap-6 content-start overflow-y-scroll">
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
              movieId={movie.mId}
              notification={handleNotification}
              deleteSignal={deleteSignal}
            />
          );
        })}
    </div>
  );
};

export default GallerySection;
